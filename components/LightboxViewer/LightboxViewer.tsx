'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import styles from './LightboxViewer.module.css';

export interface LightboxItem {
  id: string;
  image: string;
  title: string;
  description?: string;
  woodType?: string;
  dimensions?: string;
  orderUrl?: string;
}

interface LightboxViewerProps {
  items: LightboxItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (newIndex: number) => void;
  locale?: string;
}

export default function LightboxViewer({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  locale = 'uk',
}: LightboxViewerProps) {
  const [activeIdx, setActiveIdx] = useState(currentIndex);

  // Zoom and pan state
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

  // Touch gesture state
  const lastPinchDist = useRef(0);
  const lastPinchScale = useRef(1);
  const lastTap = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const MIN_SCALE = 1;
  const MAX_SCALE = 5;

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  // Sync external index changes
  useEffect(() => {
    setActiveIdx(currentIndex);
    resetZoom();
  }, [currentIndex, resetZoom]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      resetZoom();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, resetZoom]);

  const goTo = useCallback(
    (idx: number) => {
      setActiveIdx(idx);
      resetZoom();
      if (onNavigate) onNavigate(idx);
    },
    [onNavigate, resetZoom]
  );

  const goPrev = useCallback(() => {
    if (items.length <= 1) return;
    const nextIdx = activeIdx > 0 ? activeIdx - 1 : items.length - 1;
    goTo(nextIdx);
  }, [activeIdx, items.length, goTo]);

  const goNext = useCallback(() => {
    if (items.length <= 1) return;
    const nextIdx = activeIdx < items.length - 1 ? activeIdx + 1 : 0;
    goTo(nextIdx);
  }, [activeIdx, items.length, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === '+' || e.key === '=') setScale(s => Math.min(s + 0.5, MAX_SCALE));
      if (e.key === '-') setScale(s => Math.max(s - 0.5, MIN_SCALE));
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose, goPrev, goNext, resetZoom]);

  // ===== Mouse Wheel Zoom =====
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.25 : 0.25;
    setScale(prev => {
      const next = Math.min(Math.max(prev + delta, MIN_SCALE), MAX_SCALE);
      if (next <= 1) setTranslate({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // ===== Mouse Drag Pan =====
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY };
      translateStart.current = { ...translate };
    },
    [scale, translate]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setTranslate({
        x: translateStart.current.x + dx,
        y: translateStart.current.y + dy,
      });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ===== Touch Pinch Zoom & Pan =====
  const getTouchDist = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        lastPinchDist.current = getTouchDist(e.touches);
        lastPinchScale.current = scale;
      } else if (e.touches.length === 1 && scale > 1) {
        setIsDragging(true);
        dragStart.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        translateStart.current = { ...translate };
      }
    },
    [scale, translate]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const dist = getTouchDist(e.touches);
        if (lastPinchDist.current > 0) {
          const ratio = dist / lastPinchDist.current;
          const newScale = Math.min(Math.max(lastPinchScale.current * ratio, MIN_SCALE), MAX_SCALE);
          setScale(newScale);
          if (newScale <= 1) setTranslate({ x: 0, y: 0 });
        }
      } else if (e.touches.length === 1 && isDragging) {
        const dx = e.touches[0].clientX - dragStart.current.x;
        const dy = e.touches[0].clientY - dragStart.current.y;
        setTranslate({
          x: translateStart.current.x + dx,
          y: translateStart.current.y + dy,
        });
      }
    },
    [isDragging]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    lastPinchDist.current = 0;
  }, []);

  // Double tap to toggle zoom
  const handleDoubleTap = useCallback(
    (e: React.TouchEvent) => {
      const now = Date.now();
      if (now - lastTap.current < 300) {
        e.preventDefault();
        if (scale > 1) {
          resetZoom();
        } else {
          setScale(2.5);
        }
      }
      lastTap.current = now;
    },
    [scale, resetZoom]
  );

  if (!isOpen || !items.length) return null;

  const currentItem = items[activeIdx] || items[0];
  const zoomPercent = Math.round(scale * 100);
  const isEn = locale === 'en';

  return (
    <div
      className={styles.lightbox}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Header */}
      <div className={styles.topBar}>
        <div className={styles.itemCounter}>
          {activeIdx + 1} / {items.length}
        </div>

        <div className={styles.zoomControls}>
          <button
            className={styles.controlBtn}
            onClick={() => setScale(s => Math.max(s - 0.5, MIN_SCALE))}
            aria-label="Зменшити"
          >
            −
          </button>
          <span className={styles.zoomPercent}>🔍 {zoomPercent}%</span>
          <button className={styles.controlBtn} onClick={resetZoom} aria-label="Скинути">
            ⊡
          </button>
          <button
            className={styles.controlBtn}
            onClick={() => setScale(s => Math.min(s + 0.5, MAX_SCALE))}
            aria-label="Збільшити"
          >
            +
          </button>
        </div>

        <button className={styles.closeBtn} onClick={onClose} aria-label="Закрити">
          ✕
        </button>
      </div>

      {/* Main Canvas with Zoom */}
      <div
        ref={containerRef}
        className={styles.canvasArea}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={e => {
          handleTouchStart(e);
          handleDoubleTap(e);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={e => {
          if (e.target === e.currentTarget && scale === 1) onClose();
        }}
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={e => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Попереднє"
            >
              ‹
            </button>
            <button
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={e => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Наступне"
            >
              ›
            </button>
          </>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentItem.image}
          alt={currentItem.title}
          className={styles.imageElement}
          draggable={false}
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          }}
        />
      </div>

      {/* Bottom Info Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.infoCard}>
          <div className={styles.infoLeft}>
            <div className={styles.infoBadges}>
              {currentItem.woodType && (
                <span className={styles.badgeWood}>🌲 {currentItem.woodType}</span>
              )}
              {currentItem.dimensions && (
                <span className={styles.badgeDim}>📐 {currentItem.dimensions}</span>
              )}
            </div>
            <h3 className={styles.itemTitle}>{currentItem.title}</h3>
            {currentItem.description && (
              <p className={styles.itemDesc}>{currentItem.description}</p>
            )}
          </div>

          <div className={styles.orderAction}>
            <Link
              href={currentItem.orderUrl || `/${locale}/#order`}
              className="btn btn-primary btn-sm"
              onClick={onClose}
            >
              ✨ {isEn ? 'Order this piece' : 'Замовити схожий виріб'}
            </Link>
          </div>
        </div>

        <div className={styles.touchHint}>
          {isEn
            ? 'Pinch to zoom • Double tap to toggle 2.5x • Mouse wheel to zoom'
            : 'Розведіть пальці для наближення • Подвійний тап для зуму • Коліщатко миші для масштабу'}
        </div>
      </div>
    </div>
  );
}
