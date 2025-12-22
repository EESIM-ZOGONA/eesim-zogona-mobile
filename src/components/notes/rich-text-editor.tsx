import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { colors, fontSize, fontFamily, spacing } from '../../constants/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface RichTextEditorProps {
  initialContent?: string;
  onChange: (html: string, plainText: string) => void;
  onFormatChange?: (formats: string[]) => void;
  placeholder?: string;
  minHeight?: number;
  editorHeight?: number;
}

export interface RichTextEditorRef {
  executeCommand: (command: string, value?: string) => void;
  dismissKeyboard: () => void;
}

// HTML pour l'éditeur
const createEditorHtml = (placeholder: string, initialContent: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <style>
    * {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      background: transparent;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    #editor {
      min-height: 300px;
      padding: 0;
      font-size: 20px;
      line-height: 1.7;
      color: #1a1a2e;
      outline: none;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    #editor:empty:before {
      content: attr(data-placeholder);
      color: #9ca3af;
      font-size: 20px;
      pointer-events: none;
    }
    #editor p {
      margin: 0 0 14px 0;
    }
    #editor h1 {
      font-size: 30px;
      font-weight: 700;
      margin: 24px 0 14px 0;
      color: #1a1a2e;
    }
    #editor h2 {
      font-size: 27px;
      font-weight: 600;
      margin: 20px 0 12px 0;
      color: #1a1a2e;
    }
    #editor h3 {
      font-size: 25px;
      font-weight: 600;
      margin: 18px 0 10px 0;
      color: #1a1a2e;
    }
    #editor h4 {
      font-size: 23px;
      font-weight: 600;
      margin: 16px 0 8px 0;
      color: #1a1a2e;
    }
    #editor ul, #editor ol {
      margin: 14px 0;
      padding-left: 32px;
      font-size: 20px;
    }
    #editor li {
      margin-bottom: 8px;
    }
    #editor blockquote {
      margin: 14px 0;
      padding: 14px 24px;
      border-left: 4px solid #6366f1;
      background: #f0f0ff;
      color: #4b5563;
      font-size: 20px;
    }
    #editor a {
      color: #6366f1;
      text-decoration: underline;
    }
    #editor strong, #editor b {
      font-weight: 700;
    }
    #editor em, #editor i {
      font-style: italic;
    }
    #editor u {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div id="editor" contenteditable="true" data-placeholder="${placeholder}"></div>
  <script>
    const editor = document.getElementById('editor');

    // Initialiser le contenu
    editor.innerHTML = ${JSON.stringify(initialContent || '')};

    // Fonction pour envoyer le contenu au React Native
    function sendContent() {
      const html = editor.innerHTML;
      const text = editor.innerText || editor.textContent || '';
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'content',
        html: html,
        text: text.trim()
      }));
    }

    // Fonction pour envoyer les formats actifs
    function sendActiveFormats() {
      const formats = [];
      if (document.queryCommandState('bold')) formats.push('bold');
      if (document.queryCommandState('italic')) formats.push('italic');
      if (document.queryCommandState('underline')) formats.push('underline');

      // Vérifier les headings
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        let node = selection.getRangeAt(0).startContainer;
        while (node && node !== editor) {
          if (node.nodeName === 'H1') formats.push('h1');
          if (node.nodeName === 'H2') formats.push('h2');
          if (node.nodeName === 'BLOCKQUOTE') formats.push('quote');
          if (node.nodeName === 'UL') formats.push('ul');
          if (node.nodeName === 'OL') formats.push('ol');
          node = node.parentNode;
        }
      }

      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'formats',
        formats: formats
      }));
    }

    // Écouter les changements
    editor.addEventListener('input', function() {
      sendContent();
    });

    // Écouter les changements de sélection
    document.addEventListener('selectionchange', function() {
      sendActiveFormats();
    });

    // Focus initial
    editor.addEventListener('focus', function() {
      sendActiveFormats();
    });

    // Exécuter une commande de formatage
    function executeCommand(command, value) {
      editor.focus();

      switch(command) {
        case 'bold':
          document.execCommand('bold', false, null);
          break;
        case 'italic':
          document.execCommand('italic', false, null);
          break;
        case 'underline':
          document.execCommand('underline', false, null);
          break;
        case 'h1':
          document.execCommand('formatBlock', false, '<h1>');
          break;
        case 'h2':
          document.execCommand('formatBlock', false, '<h2>');
          break;
        case 'ul':
          document.execCommand('insertUnorderedList', false, null);
          break;
        case 'ol':
          document.execCommand('insertOrderedList', false, null);
          break;
        case 'quote':
          document.execCommand('formatBlock', false, '<blockquote>');
          break;
        case 'link':
          if (value) {
            const selection = window.getSelection();
            if (selection.toString()) {
              document.execCommand('createLink', false, value);
            } else {
              document.execCommand('insertHTML', false, '<a href="' + value + '">' + value + '</a>');
            }
          }
          break;
        case 'paragraph':
          document.execCommand('formatBlock', false, '<p>');
          break;
      }

      sendContent();
      sendActiveFormats();
    }

    // Recevoir les commandes de React Native
    window.executeCommand = executeCommand;

    // Envoyer le contenu initial
    setTimeout(function() {
      sendContent();
      sendActiveFormats();
    }, 100);
  </script>
</body>
</html>
`;

export const RichTextEditor = React.forwardRef<RichTextEditorRef, RichTextEditorProps>(
  ({ initialContent = '', onChange, onFormatChange, placeholder = 'Commencez à écrire...', minHeight = 300 }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const [editorReady, setEditorReady] = useState(false);

    // Mémoriser le HTML pour éviter de recréer la WebView à chaque render
    const htmlSource = useRef(createEditorHtml(placeholder, initialContent)).current;

    // Stocker les callbacks dans des refs pour éviter les re-renders
    const onChangeRef = useRef(onChange);
    const onFormatChangeRef = useRef(onFormatChange);

    useEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
      onFormatChangeRef.current = onFormatChange;
    }, [onFormatChange]);

    const handleMessage = useCallback((event: WebViewMessageEvent) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);

        if (data.type === 'content') {
          onChangeRef.current(data.html, data.text);
        } else if (data.type === 'formats' && onFormatChangeRef.current) {
          onFormatChangeRef.current(data.formats);
        }
      } catch (e) {
        console.error('WebView message error:', e);
      }
    }, []);

    const executeCommand = useCallback((command: string, value?: string) => {
      if (webViewRef.current && editorReady) {
        const js = `executeCommand('${command}'${value ? `, '${value.replace(/'/g, "\\'")}'` : ''}); true;`;
        webViewRef.current.injectJavaScript(js);
      }
    }, [editorReady]);

    const dismissKeyboard = useCallback(() => {
      Keyboard.dismiss();
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`document.activeElement.blur(); true;`);
      }
    }, []);

    React.useImperativeHandle(ref, () => ({
      executeCommand,
      dismissKeyboard,
    }));

    return (
      <View style={[styles.container, { minHeight }]}>
        <WebView
          ref={webViewRef}
          source={{ html: htmlSource }}
          style={styles.webView}
          originWhitelist={['*']}
          onMessage={handleMessage}
          onLoad={() => setEditorReady(true)}
          scrollEnabled={true}
          keyboardDisplayRequiresUserAction={false}
          hideKeyboardAccessoryView={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          mixedContentMode="compatibility"
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          allowFileAccess={true}
          scalesPageToFit={false}
          autoManageStatusBarEnabled={false}
          overScrollMode="never"
        />
      </View>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
