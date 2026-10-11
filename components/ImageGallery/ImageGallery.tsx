'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Zoom & pan state
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

  // Pinch zoom state
  const lastPinchDist = useRef(0);
  const lastPinchScale = useRef(1);

  const containerRef = useRef<HTMLDivElement>(null);

  const MIN_SCALE = 1;
  const MAX_SCALE = 5;

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const openLightbox = useCallback((idx: number) => {
    setActiveIdx(idx);
    setLightboxOpen(true);
    resetZoom();
    document.body.style.overflow = 'hidden';
  }, [resetZoom]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    resetZoom();
    document.body.style.overflow = '';
  }, [resetZoom]);

  const goTo = useCallback((idx: number) => {
    setActiveIdx(idx);
    resetZoom();
  }, [resetZoom]);

  const goPrev = useCallback(() => {
    goTo(activeIdx > 0 ? activeIdx - 1 : images.length - 1);
  }, [activeIdx, images.length, goTo]);

  const goNext = useCallback(() => {
    goTo(activeIdx < images.length - 1 ? activeIdx + 1 : 0);
  }, [activeIdx, images.length, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === '+' || e.key === '=') setScale(s => Math.min(s + 0.5, MAX_SCALE));
      if (e.key === '-') setScale(s => Math.max(s - 0.5, MIN_SCALE));
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, closeLightbox, goPrev, goNext, resetZoom]);

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
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    translateStart.current = { ...translate };
  }, [scale, translate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setTranslate({
      x: translateStart.current.x + dx,
      y: translateStart.current.y + dy,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ===== Touch Pinch Zoom & Pan =====
  const getTouchDist = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      lastPinchDist.current = getTouchDist(e.touches);
      lastPinchScale.current = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      // Pan start
      setIsDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      translateStart.current = { ...translate };
    }
  }, [scale, translate]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      // Pinch zoom
      const dist = getTouchDist(e.touches);
      const ratio = dist / lastPinchDist.current;
      const newScale = Math.min(Math.max(lastPinchScale.current * ratio, MIN_SCALE), MAX_SCALE);
      setScale(newScale);
      if (newScale <= 1) setTranslate({ x: 0, y: 0 });
    } else if (e.touches.length === 1 && isDragging) {
      // Pan
      const dx = e.touches[0].clientX - dragStart.current.x;
      const dy = e.touches[0].clientY - dragStart.current.y;
      setTranslate({
        x: translateStart.current.x + dx,
        y: translateStart.current.y + dy,
      });
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    lastPinchDist.current = 0;
  }, []);

  // Double-tap to toggle zoom
  const lastTap = useRef(0);
  const handleDoubleTap = useCallback((e: React.TouchEvent) => {
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
  }, [scale, resetZoom]);

  const zoomPercent = Math.round(scale * 100);

  return (
    <div className={styles.gallery}>
      {/* Main preview image */}
      <div
        className={styles.mainImageWrap}
        onClick={() => openLightbox(activeIdx)}
        role="button"
        tabIndex={0}
        aria-label="Відкрити зображення на весь екран"
      >
        <Image
          src={images[activeIdx]}
          alt=""
          fill
          aria-hidden="true"
          className={styles.mainImageBlur}
          sizes="600px"
        />
        <Image
          src={images[activeIdx]}
          alt={alt}
          fill
          className={styles.mainImage}
          sizes="600px"
          priority
        />
        <span className={styles.zoomHint}>🔍 Натисніть для збільшення</span>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className={styles.thumbStrip}>
          {images.map((src, i) => (
            <div
              key={i}
              className={`${styles.thumb} ${i === activeIdx ? styles.thumbActive : ''}`}
              onClick={() => setActiveIdx(i)}
              role="button"
              tabIndex={0}
              aria-label={`Зображення ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${alt} — ${i + 1}`}
                fill
                className={styles.thumbImg}
                sizes="72px"
              />
            </div>
          ))}
        </div>
      )}

      {/* ===== Lightbox ===== */}
      {lightboxOpen && (
        <div className={styles.lightbox} onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}>
          {/* Close button */}
          <button
            className={styles.closeBtn}
            onClick={closeLightbox}
            aria-label="Закрити"
          >
            ✕
          </button>

          {/* Zoom info */}
          <div className={styles.lightboxHeader}>
            <span className={styles.zoomInfo}>
              🔍 {zoomPercent}%
            </span>
            <div className={styles.lightboxControls}>
              <button className={styles.controlBtn} onClick={() => setScale(s => Math.max(s - 0.5, MIN_SCALE))} aria-label="Зменшити">−</button>
              <button className={styles.controlBtn} onClick={resetZoom} aria-label="Скинути">⊡</button>
              <button className={styles.controlBtn} onClick={() => setScale(s => Math.min(s + 0.5, MAX_SCALE))} aria-label="Збільшити">+</button>
            </div>
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button className={styles.navPrev} onClick={goPrev} aria-label="Попереднє">‹</button>
              <button className={styles.navNext} onClick={goNext} aria-label="Наступне">›</button>
            </>
          )}

          {/* Zoomable image */}
          <div
            ref={containerRef}
            className={styles.lightboxImageContainer}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={(e) => { handleTouchStart(e); handleDoubleTap(e); }}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIdx]}
              alt={alt}
              className={styles.lightboxImage}
              draggable={false}
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              }}
            />
          </div>

          {/* Lightbox thumbnails */}
          {images.length > 1 && (
            <div className={styles.lightboxThumbs}>
              {images.map((src, i) => (
                <div
                  key={i}
                  className={`${styles.lightboxThumb} ${i === activeIdx ? styles.lightboxThumbActive : ''}`}
                  onClick={() => goTo(i)}
                  role="button"
                  tabIndex={0}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${alt} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}

          {/* Touch hint on mobile */}
          <div className={styles.touchHint}>
            Розведіть пальці для збільшення • Подвійний тап для зуму
          </div>
        </div>
      )}
    </div>
  );
}
