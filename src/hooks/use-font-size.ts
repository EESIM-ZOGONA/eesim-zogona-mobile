import { useState, useEffect, useCallback } from 'react';
import { getFontSizeIndex, saveFontSizeIndex } from '../services/bible-storage';

const FONT_SIZES = [16, 18, 20, 22, 24, 28];
const LINE_HEIGHTS = [26, 30, 34, 38, 42, 48];
const DEFAULT_SIZE_INDEX = 2;

export interface UseFontSizeReturn {
  fontSizeIndex: number;
  fontSize: number;
  lineHeight: number;
  increase: () => void;
  decrease: () => void;
  canIncrease: boolean;
  canDecrease: boolean;
  loading: boolean;
}

export function useFontSize(): UseFontSizeReturn {
  const [fontSizeIndex, setFontSizeIndex] = useState(DEFAULT_SIZE_INDEX);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFontSize() {
      try {
        const savedIndex = await getFontSizeIndex();
        if (savedIndex >= 0 && savedIndex < FONT_SIZES.length) {
          setFontSizeIndex(savedIndex);
        }
      } catch (error) {
        console.error('Error loading font size:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFontSize();
  }, []);

  const increase = useCallback(() => {
    setFontSizeIndex((prev) => {
      const newIndex = Math.min(prev + 1, FONT_SIZES.length - 1);
      saveFontSizeIndex(newIndex).catch(console.error);
      return newIndex;
    });
  }, []);

  const decrease = useCallback(() => {
    setFontSizeIndex((prev) => {
      const newIndex = Math.max(prev - 1, 0);
      saveFontSizeIndex(newIndex).catch(console.error);
      return newIndex;
    });
  }, []);

  return {
    fontSizeIndex,
    fontSize: FONT_SIZES[fontSizeIndex],
    lineHeight: LINE_HEIGHTS[fontSizeIndex],
    increase,
    decrease,
    canIncrease: fontSizeIndex < FONT_SIZES.length - 1,
    canDecrease: fontSizeIndex > 0,
    loading,
  };
}
