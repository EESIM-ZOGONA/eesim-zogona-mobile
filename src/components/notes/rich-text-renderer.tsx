import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

export interface RichTextRendererProps {
  html: string;
  maxLines?: number;
  baseFontSize?: number;
}

interface ParsedNode {
  type: 'text' | 'element';
  tag?: string;
  content?: string;
  children?: ParsedNode[];
  attributes?: Record<string, string>;
}

const VOID_TAGS = ['br', 'hr', 'img'];

function parseHTML(html: string): ParsedNode[] {
  const nodes: ParsedNode[] = [];
  let remaining = html.trim();

  while (remaining.length > 0) {
    const tagStart = remaining.indexOf('<');

    if (tagStart === -1) {
      if (remaining.trim()) {
        nodes.push({ type: 'text', content: decodeEntities(remaining) });
      }
      break;
    }

    if (tagStart > 0) {
      const textContent = remaining.slice(0, tagStart);
      if (textContent.trim()) {
        nodes.push({ type: 'text', content: decodeEntities(textContent) });
      }
      remaining = remaining.slice(tagStart);
      continue;
    }

    const tagEndIndex = remaining.indexOf('>');
    if (tagEndIndex === -1) break;

    const tagContent = remaining.slice(1, tagEndIndex);
    const isClosing = tagContent.startsWith('/');
    const isSelfClosing = tagContent.endsWith('/') || VOID_TAGS.some(t => tagContent.toLowerCase().startsWith(t));

    if (isClosing) {
      remaining = remaining.slice(tagEndIndex + 1);
      break;
    }

    const spaceIndex = tagContent.indexOf(' ');
    const tagName = (spaceIndex === -1 ? tagContent : tagContent.slice(0, spaceIndex))
      .toLowerCase()
      .replace('/', '');

    const attributes: Record<string, string> = {};
    if (spaceIndex !== -1) {
      const attrString = tagContent.slice(spaceIndex + 1);
      const hrefMatch = attrString.match(/href=["']([^"']+)["']/);
      if (hrefMatch) {
        attributes.href = hrefMatch[1];
      }
    }

    remaining = remaining.slice(tagEndIndex + 1);

    if (isSelfClosing || VOID_TAGS.includes(tagName)) {
      nodes.push({ type: 'element', tag: tagName, children: [], attributes });
      continue;
    }

    const closingTag = `</${tagName}>`;
    let depth = 1;
    let searchIndex = 0;
    let innerEnd = -1;

    while (depth > 0 && searchIndex < remaining.length) {
      const nextOpen = remaining.indexOf(`<${tagName}`, searchIndex);
      const nextClose = remaining.indexOf(closingTag, searchIndex);

      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        searchIndex = nextOpen + 1;
      } else {
        depth--;
        if (depth === 0) {
          innerEnd = nextClose;
        }
        searchIndex = nextClose + closingTag.length;
      }
    }

    if (innerEnd === -1) {
      innerEnd = remaining.length;
    }

    const innerContent = remaining.slice(0, innerEnd);
    remaining = remaining.slice(innerEnd + closingTag.length);

    nodes.push({
      type: 'element',
      tag: tagName,
      children: parseHTML(innerContent),
      attributes,
    });
  }

  return nodes;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

interface RenderContext {
  baseFontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

function renderNode(
  node: ParsedNode,
  index: number,
  context: RenderContext
): React.ReactNode {
  if (node.type === 'text') {
    const textStyle = [
      styles.text,
      { fontSize: context.baseFontSize },
      context.bold && styles.bold,
      context.italic && styles.italic,
      context.underline && styles.underline,
    ];
    return (
      <Text key={index} style={textStyle}>
        {node.content}
      </Text>
    );
  }

  const children = node.children?.map((child, i) =>
    renderNode(child, i, {
      ...context,
      bold: context.bold || node.tag === 'strong' || node.tag === 'b',
      italic: context.italic || node.tag === 'em' || node.tag === 'i',
      underline: context.underline || node.tag === 'u',
    })
  );

  switch (node.tag) {
    case 'p':
      return (
        <Text key={index} style={[styles.paragraph, { fontSize: context.baseFontSize }]}>
          {children}
        </Text>
      );

    case 'h1':
      return (
        <Text key={index} style={styles.h1}>
          {children}
        </Text>
      );

    case 'h2':
      return (
        <Text key={index} style={styles.h2}>
          {children}
        </Text>
      );

    case 'strong':
    case 'b':
      return (
        <Text key={index} style={styles.bold}>
          {children}
        </Text>
      );

    case 'em':
    case 'i':
      return (
        <Text key={index} style={styles.italic}>
          {children}
        </Text>
      );

    case 'u':
      return (
        <Text key={index} style={styles.underline}>
          {children}
        </Text>
      );

    case 'ul':
      return (
        <View key={index} style={styles.list}>
          {node.children?.map((li, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <View style={styles.listItemContent}>
                {li.children?.map((child, j) =>
                  renderNode(child, j, context)
                )}
              </View>
            </View>
          ))}
        </View>
      );

    case 'ol':
      return (
        <View key={index} style={styles.list}>
          {node.children?.map((li, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.number}>{i + 1}.</Text>
              <View style={styles.listItemContent}>
                {li.children?.map((child, j) =>
                  renderNode(child, j, context)
                )}
              </View>
            </View>
          ))}
        </View>
      );

    case 'li':
      return children;

    case 'blockquote':
      return (
        <View key={index} style={styles.blockquote}>
          <Text style={[styles.blockquoteText, { fontSize: context.baseFontSize }]}>
            {children}
          </Text>
        </View>
      );

    case 'a':
      const href = node.attributes?.href;
      return (
        <Text
          key={index}
          style={styles.link}
          onPress={() => href && Linking.openURL(href)}
        >
          {children}
        </Text>
      );

    case 'br':
      return <Text key={index}>{'\n'}</Text>;

    case 'div':
    case 'span':
      return <Text key={index}>{children}</Text>;

    default:
      return children ? <Text key={index}>{children}</Text> : null;
  }
}

export function RichTextRenderer({
  html,
  maxLines,
  baseFontSize = fontSize.md,
}: RichTextRendererProps) {
  const parsedContent = useMemo(() => {
    if (!html || html.trim() === '') return [];
    return parseHTML(html);
  }, [html]);

  const renderedContent = useMemo(() => {
    const context: RenderContext = {
      baseFontSize,
      bold: false,
      italic: false,
      underline: false,
    };
    return parsedContent.map((node, index) => renderNode(node, index, context));
  }, [parsedContent, baseFontSize]);

  if (maxLines) {
    return (
      <Text numberOfLines={maxLines} style={styles.container}>
        {renderedContent}
      </Text>
    );
  }

  return <View style={styles.container}>{renderedContent}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 24,
  },
  paragraph: {
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  h1: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    lineHeight: 32,
  },
  h2: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    lineHeight: 28,
  },
  bold: {
    fontFamily: fontFamily.bold,
    fontWeight: '700',
  },
  italic: {
    fontStyle: 'italic',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  list: {
    marginVertical: spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  bullet: {
    width: 20,
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  number: {
    width: 24,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  listItemContent: {
    flex: 1,
  },
  blockquote: {
    marginVertical: spacing.sm,
    paddingLeft: spacing.md,
    paddingVertical: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
  },
  blockquoteText: {
    fontFamily: fontFamily.regular,
    fontStyle: 'italic',
    color: colors.text.secondary,
    lineHeight: 24,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
