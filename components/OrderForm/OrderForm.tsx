'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './OrderForm.module.css';

interface WoodSpecies {
  id: string;
  nameUk: string;
  nameEn: string;
  colorHex: string;
  gradient: string;
  hardness: string;
  descUk: string;
  descEn: string;
  priceFactor: number;
}

interface ProductType {
  id: string;
  titleUk: string;
  titleEn: string;
  subtitleUk: string;
  subtitleEn: string;
  icon: string;
  image: string;
  basePrice: number;
  popularDimensions: string;
}

const productTypes: ProductType[] = [
  {
    id: 'tables',
    titleUk: 'Столи з масиву та слябів',
    titleEn: 'Live-Edge & Solid Wood Tables',
    subtitleUk: 'Обідні, журнальні та письмові столи з живим краєм або різьбленням',
    subtitleEn: 'Dining, coffee and work tables with live edges or carved details',
    icon: '🪵',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80',
    basePrice: 12000,
    popularDimensions: '180 × 90 × 75 см',
  },
  {
    id: 'furniture',
    titleUk: 'Авторські меблі & Комоди',
    titleEn: 'Bespoke Furniture & Credenzas',
    subtitleUk: 'Комоди, тумби, шафи з художньою різбленою фурнітурою та рельєфами',
    subtitleEn: 'Sideboards, dressers and cabinets with hand-carved facades',
    icon: '🪑',
    image: '/images/portfolio/fairy-carved-dresser.jpg',
    basePrice: 18000,
    popularDimensions: '140 × 90 × 45 см',
  },
  {
    id: 'carving',
    titleUk: 'Різьблені панно & Барельєфи',
    titleEn: 'Carved Wall Panels & Bas-Reliefs',
    subtitleUk: 'Картини з масиву, барельєфи, сакральне різьблення та герби',
    subtitleEn: 'Solid wood reliefs, sacred panels, family crests and art',
    icon: '🖼️',
    image: '/images/portfolio/madonna-child-relief.jpg',
    basePrice: 6500,
    popularDimensions: '60 × 45 см',
  },
  {
    id: 'lighting',
    titleUk: 'Рустик-освітлення & Декор',
    titleEn: 'Rustic Lighting & Decor',
    subtitleUk: 'Люстри з масивних балок, бра з підсвіткою та настінний декор',
    subtitleEn: 'Solid beam chandeliers, sconces with warm ambient lighting',
    icon: '💡',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
    basePrice: 4500,
    popularDimensions: '120 × 25 × 20 см',
  },
  {
    id: 'custom',
    titleUk: 'Індивідуальний проєкт / Pinterest',
    titleEn: 'Custom Design by Sketch / Pinterest',
    subtitleUk: 'Виготовлення за вашим ескізом, фотографією чи дизайн-проєктом',
    subtitleEn: 'Crafting strictly by your sketch, photo or interior blueprints',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    basePrice: 8000,
    popularDimensions: 'За індивідуальними замірами',
  },
];

const woodSpecies: WoodSpecies[] = [
  {
    id: 'oak',
    nameUk: 'Дуб натуральний',
    nameEn: 'Natural Oak',
    colorHex: '#c79a61',
    gradient: 'linear-gradient(135deg, #d8ac73 0%, #ba8a50 50%, #9e7239 100%)',
    hardness: 'Висока (3.8 HB)',
    descUk: 'Шляхетна виразна текстура, максимальна довговічність і міцність на десятиліття.',
    descEn: 'Noble expressive texture, highest durability and lifelong resilience.',
    priceFactor: 1.0,
  },
  {
    id: 'walnut',
    nameUk: 'Американський горіх',
    nameEn: 'American Walnut',
    colorHex: '#5e402b',
    gradient: 'linear-gradient(135deg, #7c583e 0%, #5b3d28 50%, #3e2617 100%)',
    hardness: 'Середня-висока (3.5 HB)',
    descUk: 'Глибокий шоколадний колір із дивовижними переливами волокон. Топовий преміум.',
    descEn: 'Deep rich chocolate tones with mesmerizing grain waves. Top-tier luxury.',
    priceFactor: 1.35,
  },
  {
    id: 'ash',
    nameUk: 'Білий Ясен',
    nameEn: 'White Ash',
    colorHex: '#dfbe8f',
    gradient: 'linear-gradient(135deg, #ecd3aa 0%, #d8b684 50%, #ba9460 100%)',
    hardness: 'Дуже висока (4.0 HB)',
    descUk: 'Світлий виразний малюнок річних кілець. Ідеальний для сучасного скандинавського стилю.',
    descEn: 'Bright expressive growth rings. Flawless match for modern Nordic aesthetics.',
    priceFactor: 0.95,
  },
  {
    id: 'maple',
    nameUk: 'Клен благородний',
    nameEn: 'Hard Maple',
    colorHex: '#ebd1ab',
    gradient: 'linear-gradient(135deg, #f5e4c8 0%, #e8caa0 50%, #cfad81 100%)',
    hardness: 'Висока (3.6 HB)',
    descUk: 'Оксамитова шовковиста текстура, теплий молочно-кремовий тон.',
    descEn: 'Silky smooth texture with warm milky-cream ambient tone.',
    priceFactor: 1.05,
  },
  {
    id: 'karagach',
    nameUk: 'В’яз / Карагач (Сляб)',
    nameEn: 'Elm / Karagach Slab',
    colorHex: '#8b5e3c',
    gradient: 'linear-gradient(135deg, #a4734d 0%, #855835 50%, #613c20 100%)',
    hardness: 'Висока (3.7 HB)',
    descUk: 'Неповторний дикий малюнок живого краю та контрастні відтінки заболоні.',
    descEn: 'Unrivalled organic live-edge curves with high-contrast sapwood contours.',
    priceFactor: 1.15,
  },
];

const edgeOptions = [
  { id: 'live-edge', labelUk: 'Природний живий край (Live Edge)', labelEn: 'Natural Live Edge', descUk: 'Збережена природна форма стовбура дерева' },
  { id: 'straight', labelUk: 'Прямий класичний край (90°)', labelEn: 'Straight Classic (90°)', descUk: 'Рівна строга геометрія' },
  { id: 'chamfer', labelUk: 'Елегантна фаска під 45°', labelEn: 'Refined 45° Chamfer', descUk: 'Знята тонка кромка для витонченого вигляду' },
  { id: 'rounded', labelUk: 'М’який скруглений радіус', labelEn: 'Soft Rounded Radius', descUk: 'Безпечні плавні кути для дітей та затишку' },
];

const finishOptions = [
  { id: 'rubio-oil', labelUk: 'Еко Масло-віск Rubio Monocoat (Мат)', labelEn: 'Eco Oil-Wax Rubio (Matte)', descUk: 'Відчуття живої теплої деревини на дотик' },
  { id: 'matte-lacquer', labelUk: 'Матовий поліуретановий лак', labelEn: 'Ultra-Matte Protective Lacquer', descUk: 'Підвищена стійкість до вологи та плям' },
  { id: 'epoxy-accent', labelUk: 'Із заливкою епоксидною смолою (River/Тріщини)', labelEn: 'Epoxy Resin River & Inlays', descUk: 'Прозора, димчаста або кольорова смола' },
  { id: 'patina', labelUk: 'Художнє патинування / Брашування', labelEn: 'Artisanal Patina / Wire-Brushed', descUk: 'Ефект благородного вінтажу з проявленням рельєфу' },
];

export default function OrderForm() {
  const [mode, setMode] = useState<'wizard' | 'express'>('wizard');
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>('tables');
  const [selectedWood, setSelectedWood] = useState<string>('oak');
  const [selectedEdge, setSelectedEdge] = useState<string>('live-edge');
  const [selectedFinish, setSelectedFinish] = useState<string>('rubio-oil');
  const [length, setLength] = useState<number>(180);
  const [width, setWidth] = useState<number>(90);
  const [comment, setComment] = useState<string>('');
  const [fileList, setFileList] = useState<string[]>([]);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessenger, setContactMessenger] = useState('Telegram');
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic estimate calculation
  const currentProduct = productTypes.find(p => p.id === selectedType) || productTypes[0];
  const currentWood = woodSpecies.find(w => w.id === selectedWood) || woodSpecies[0];
  
  // Base calculation formula
  const sizeFactor = selectedType === 'tables' ? (length * width) / (180 * 90) : 1;
  const finishMultiplier = selectedFinish === 'epoxy-accent' ? 1.3 : selectedFinish === 'patina' ? 1.15 : 1.0;
  const estimatedPriceMin = Math.round((currentProduct.basePrice * currentWood.priceFactor * sizeFactor * finishMultiplier) / 100) * 100;
  const estimatedPriceMax = Math.round(estimatedPriceMin * 1.35 / 100) * 100;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map(f => f.name);
      setFileList(prev => [...prev, ...names]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const names = Array.from(e.dataTransfer.files).map(f => f.name);
      setFileList(prev => [...prev, ...names]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const openTelegramDirect = () => {
    const text = encodeURIComponent(
      `👋 Вітаю! Хочу замовити виріб WoodEx:\n` +
      `🪵 Тип: ${currentProduct.titleUk}\n` +
      `🌳 Дерево: ${currentWood.nameUk}\n` +
      `📐 Розміри: ${length} × ${width} см\n` +
      `✨ Оздоблення: ${edgeOptions.find(e => e.id === selectedEdge)?.labelUk}, ${finishOptions.find(f => f.id === selectedFinish)?.labelUk}\n` +
      `💰 Орієнтовна вартість: ~${estimatedPriceMin.toLocaleString()} - ${estimatedPriceMax.toLocaleString()} ₴\n` +
      (comment ? `💬 Коментар: ${comment}\n` : '') +
      `👤 Контакт: ${contactName || 'Клієнт'} (${contactPhone || 'в чаті'})`
    );
    window.open(`https://t.me/+380979112973?text=${text}`, '_blank');
  };

  const openViberDirect = () => {
    const text = encodeURIComponent(
      `Вітаю! Замовлення WoodEx: ${currentProduct.titleUk}, ${currentWood.nameUk}, ${length}x${width}см. Орієнтир: ~${estimatedPriceMin.toLocaleString()} ₴.`
    );
    window.open(`viber://chat?number=%2B380979112973`, '_blank');
  };

  if (submitted) {
    return (
      <section className={`section ${styles.section}`} id="order">
        <div className="container">
          <div className={styles.successCard}>
            <div className={styles.successBadge}>🌿 Заявку прийнято</div>
            <h2 className={styles.successTitle}>Дякуємо за довіру до WoodEx!</h2>
            <p className={styles.successDesc}>
              Майстер зв'яжеться з вами протягом <strong>15–30 хвилин</strong> для детального обговорення ескізу, підбору слябів та точного розрахунку вартості.
            </p>

            <div className={styles.summaryBox}>
              <div className={styles.summaryItem}>
                <span>Обраний виріб:</span>
                <strong>{currentProduct.titleUk}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Порода дерева:</span>
                <strong>{currentWood.nameUk}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Габарити:</span>
                <strong>{length} × {width} см</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Орієнтовний бюджет:</span>
                <strong className={styles.priceHighlight}>{estimatedPriceMin.toLocaleString()} – {estimatedPriceMax.toLocaleString()} ₴</strong>
              </div>
            </div>

            <div className={styles.successActions}>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => { setSubmitted(false); setStep(1); }}
              >
                Зробити ще один розрахунок
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={openTelegramDirect}
              >
                💬 Написати напряму майстру в Telegram
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${styles.section}`} id="order">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <span>🌿</span> Індивідуальне виробництво
          </span>
          <h2>
            Створіть свій <span className="gradient-text">ідеальний виріб</span>
          </h2>
          <p className="section-desc">
            Оберіть тип меблів, породу натурального дерева та параметри — отримайте точний розрахунок і консультацію майстра з 3D-ескізом.
          </p>

          <div className={styles.modeTabs}>
            <button 
              type="button" 
              className={`${styles.modeTab} ${mode === 'wizard' ? styles.modeTabActive : ''}`}
              onClick={() => setMode('wizard')}
            >
              🎨 Інтерактивний Конфігуратор
            </button>
            <button 
              type="button" 
              className={`${styles.modeTab} ${mode === 'express' ? styles.modeTabActive : ''}`}
              onClick={() => setMode('express')}
            >
              ⚡ Швидке замовлення за фото (30 сек)
            </button>
          </div>
        </div>

        {mode === 'wizard' ? (
          <div className={styles.configuratorWrap}>
            {/* Steps Progress Bar */}
            <div className={styles.stepper}>
              {[
                { num: 1, label: 'Тип виробу' },
                { num: 2, label: 'Порода дерева' },
                { num: 3, label: 'Параметри & Фініш' },
                { num: 4, label: 'Ескіз & Контакти' },
              ].map((s) => (
                <button
                  type="button"
                  key={s.num}
                  className={`${styles.stepItem} ${step === s.num ? styles.stepCurrent : ''} ${step > s.num ? styles.stepFinished : ''}`}
                  onClick={() => setStep(s.num)}
                >
                  <div className={styles.stepCircle}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className={styles.stepText}>{s.label}</span>
                </button>
              ))}
            </div>

            <div className={styles.gridContainer}>
              {/* Left Column: Interactive Steps */}
              <div className={styles.leftColumn}>
                
                {/* STEP 1: Product Type */}
                {step === 1 && (
                  <div className={styles.stepContent}>
                    <div className={styles.stepTitleBox}>
                      <span className={styles.stepBadge}>Крок 1 з 4</span>
                      <h3>Оберіть категорію виробу</h3>
                      <p>Кожен виріб виготовляється вручну під індивідуальні розміри вашого простору.</p>
                    </div>

                    <div className={styles.productGrid}>
                      {productTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`${styles.productCard} ${selectedType === type.id ? styles.productCardActive : ''}`}
                          onClick={() => setSelectedType(type.id)}
                        >
                          <div className={styles.productImgBox}>
                            <Image
                              src={type.image}
                              alt={type.titleUk}
                              fill
                              style={{ objectFit: 'cover' }}
                              sizes="320px"
                            />
                            <span className={styles.productIconBadge}>{type.icon}</span>
                            {selectedType === type.id && (
                              <div className={styles.checkBadge}>✓ Обрано</div>
                            )}
                          </div>
                          <div className={styles.productInfo}>
                            <h4>{type.titleUk}</h4>
                            <p>{type.subtitleUk}</p>
                            <div className={styles.productMeta}>
                              <span className={styles.metaPrice}>від {type.basePrice.toLocaleString()} ₴</span>
                              <span className={styles.metaDim}>{type.popularDimensions}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Wood Species */}
                {step === 2 && (
                  <div className={styles.stepContent}>
                    <div className={styles.stepTitleBox}>
                      <span className={styles.stepBadge}>Крок 2 з 4</span>
                      <h3>Оберіть породу масиву деревини</h3>
                      <p>Ми використовуємо виключно сухий масив камерної сушки (8–10% вологості) з екологічно чистих регіонів.</p>
                    </div>

                    <div className={styles.woodGrid}>
                      {woodSpecies.map((wood) => (
                        <div
                          key={wood.id}
                          className={`${styles.woodCard} ${selectedWood === wood.id ? styles.woodCardActive : ''}`}
                          onClick={() => setSelectedWood(wood.id)}
                        >
                          <div className={styles.woodSwatchWrap}>
                            <div 
                              className={styles.woodSwatchCircle} 
                              style={{ background: wood.gradient }}
                            >
                              <div className={styles.woodRingTexture} />
                            </div>
                            {selectedWood === wood.id && <span className={styles.woodCheck}>✓</span>}
                          </div>
                          <div className={styles.woodDetails}>
                            <div className={styles.woodHeader}>
                              <h4>{wood.nameUk}</h4>
                              <span className={styles.woodHardness}>{wood.hardness}</span>
                            </div>
                            <p>{wood.descUk}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Dimensions & Finishes */}
                {step === 3 && (
                  <div className={styles.stepContent}>
                    <div className={styles.stepTitleBox}>
                      <span className={styles.stepBadge}>Крок 3 з 4</span>
                      <h3>Розміри, кромка та покриття</h3>
                      <p>Налаштуйте габарити під вашу кімнату та оберіть тактильні відчуття поверхні.</p>
                    </div>

                    {/* Dimensions Sliders */}
                    <div className={styles.dimensionSection}>
                      <h4>Габарити виробу (см)</h4>
                      <div className={styles.slidersRow}>
                        <div className={styles.sliderGroup}>
                          <div className={styles.sliderHeader}>
                            <label>Довжина / Висота</label>
                            <span className={styles.sliderVal}>{length} см</span>
                          </div>
                          <input 
                            type="range" 
                            min={40} 
                            max={350} 
                            step={5} 
                            value={length} 
                            onChange={(e) => setLength(Number(e.target.value))}
                            className={styles.rangeInput}
                          />
                        </div>

                        <div className={styles.sliderGroup}>
                          <div className={styles.sliderHeader}>
                            <label>Ширина / Глибина</label>
                            <span className={styles.sliderVal}>{width} см</span>
                          </div>
                          <input 
                            type="range" 
                            min={30} 
                            max={160} 
                            step={5} 
                            value={width} 
                            onChange={(e) => setWidth(Number(e.target.value))}
                            className={styles.rangeInput}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Edge Style */}
                    <div className={styles.optionsBlock}>
                      <h4>Тип обробки кромки</h4>
                      <div className={styles.optionsGrid}>
                        {edgeOptions.map((edge) => (
                          <button
                            type="button"
                            key={edge.id}
                            className={`${styles.optionBtn} ${selectedEdge === edge.id ? styles.optionBtnActive : ''}`}
                            onClick={() => setSelectedEdge(edge.id)}
                          >
                            <div className={styles.optionRadio}>
                              {selectedEdge === edge.id && <span className={styles.radioDot} />}
                            </div>
                            <div className={styles.optionTexts}>
                              <strong>{edge.labelUk}</strong>
                              <span>{edge.descUk}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Finish Style */}
                    <div className={styles.optionsBlock}>
                      <h4>Фінішне захисне покриття</h4>
                      <div className={styles.optionsGrid}>
                        {finishOptions.map((fin) => (
                          <button
                            type="button"
                            key={fin.id}
                            className={`${styles.optionBtn} ${selectedFinish === fin.id ? styles.optionBtnActive : ''}`}
                            onClick={() => setSelectedFinish(fin.id)}
                          >
                            <div className={styles.optionRadio}>
                              {selectedFinish === fin.id && <span className={styles.radioDot} />}
                            </div>
                            <div className={styles.optionTexts}>
                              <strong>{fin.labelUk}</strong>
                              <span>{fin.descUk}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Sketch & Contact */}
                {step === 4 && (
                  <div className={styles.stepContent}>
                    <div className={styles.stepTitleBox}>
                      <span className={styles.stepBadge}>Крок 4 з 4</span>
                      <h3>Завантаження референсів та контакти</h3>
                      <p>Додайте фото вашого інтер'єру або фото з Pinterest. Ми підготуємо точний 3D-ескіз.</p>
                    </div>

                    {/* Drag and Drop Zone */}
                    <div
                      className={`${styles.dropZone} ${dragging ? styles.dropZoneActive : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        multiple 
                        accept="image/*,.pdf" 
                        onChange={handleFileUpload} 
                      />
                      <span className={styles.dropIcon}>📁</span>
                      <strong>Перетягніть фото або натисніть для завантаження</strong>
                      <span>PNG, JPG, PDF до 25 МБ (фото кімнати, ескіз, Pinterest)</span>

                      {fileList.length > 0 && (
                        <div className={styles.filesList}>
                          {fileList.map((f, i) => (
                            <span key={i} className={styles.fileTag}>📎 {f}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={styles.contactForm}>
                      <div className={styles.field}>
                        <label className="form-label">Ваші побажання або особливості простору</label>
                        <textarea
                          className="form-textarea"
                          rows={3}
                          placeholder="Наприклад: висота ніжок 75 см, теплий золотистий відтінок дуба під паркет..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>

                      <div className={styles.fieldsRow}>
                        <div className={styles.field}>
                          <label className="form-label">Ваше ім'я *</label>
                          <input
                            className="form-input"
                            type="text"
                            placeholder="Як до вас звертатися?"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            required
                          />
                        </div>
                        <div className={styles.field}>
                          <label className="form-label">Номер телефону *</label>
                          <input
                            className="form-input"
                            type="tel"
                            placeholder="+380 (XX) XXX-XX-XX"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Navigation */}
                <div className={styles.navBar}>
                  {step > 1 ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setStep(s => s - 1)}
                    >
                      ← Назад
                    </button>
                  ) : <div />}

                  {step < 4 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setStep(s => s + 1)}
                    >
                      Продовжити: {step === 1 ? 'Вибір дерева' : step === 2 ? 'Параметри' : 'Ескіз & Контакти'} →
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      🌿 Надіслати замовлення майстру
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Sticky Live Preview & Calculation Box */}
              <div className={styles.rightColumn}>
                <div className={styles.stickyCard}>
                  <div className={styles.previewHeader}>
                    <span className={styles.liveIndicator}>● Онлайн розрахунок</span>
                    <h4>Ваша конфігурація</h4>
                  </div>

                  <div className={styles.previewMain}>
                    <div className={styles.previewThumb}>
                      <Image
                        src={currentProduct.image}
                        alt={currentProduct.titleUk}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <h5>{currentProduct.titleUk}</h5>
                      <span className={styles.selectedWoodLabel}>
                        <span 
                          className={styles.smallSwatch} 
                          style={{ background: currentWood.gradient }} 
                        />
                        {currentWood.nameUk}
                      </span>
                    </div>
                  </div>

                  <div className={styles.specsList}>
                    <div className={styles.specRow}>
                      <span>Габарити:</span>
                      <strong>{length} × {width} см</strong>
                    </div>
                    <div className={styles.specRow}>
                      <span>Кромка:</span>
                      <strong>{edgeOptions.find(e => e.id === selectedEdge)?.labelUk.split('(')[0]}</strong>
                    </div>
                    <div className={styles.specRow}>
                      <span>Покриття:</span>
                      <strong>{finishOptions.find(f => f.id === selectedFinish)?.labelUk.split('(')[0]}</strong>
                    </div>
                    {fileList.length > 0 && (
                      <div className={styles.specRow}>
                        <span>Прикріплено фото:</span>
                        <strong>{fileList.length} шт.</strong>
                      </div>
                    )}
                  </div>

                  <div className={styles.priceEstimateBlock}>
                    <div className={styles.priceLabel}>Орієнтовна вартість:</div>
                    <div className={styles.priceValue}>
                      ~{estimatedPriceMin.toLocaleString()} – {estimatedPriceMax.toLocaleString()} ₴
                    </div>
                    <div className={styles.priceNote}>
                      Включає підбір матеріалу, виготовлення, фінішне покриття та пакування.
                    </div>
                  </div>

                  <div className={styles.directMessengers}>
                    <p className={styles.messengerTitle}>Або обговоріть миттєво в чаті:</p>
                    <div className={styles.messengerButtons}>
                      <button 
                        type="button" 
                        className={styles.tgBtn} 
                        onClick={openTelegramDirect}
                      >
                        ✈️ Telegram
                      </button>
                      <button 
                        type="button" 
                        className={styles.viberBtn} 
                        onClick={openViberDirect}
                      >
                        💜 Viber
                      </button>
                    </div>
                  </div>

                  <div className={styles.guaranteePills}>
                    <span>🛡️ 3 роки гарантії</span>
                    <span>📐 Безкоштовний 3D-ескіз</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Express Order by Photo */
          <div className={styles.expressCard}>
            <div className={styles.expressGrid}>
              <div className={styles.expressInfo}>
                <div className={styles.expressBadge}>⚡ Найшвидший спосіб</div>
                <h3>Маєте фото з Pinterest чи інтер'єру?</h3>
                <p>
                  Просто прикріпіть зображення або посилання — наш майстер розрахує точну вартість і запропонує найкращі варіанти деревини протягом 15 хвилин.
                </p>

                <ul className={styles.expressBenefits}>
                  <li>✓ Швидка оцінка без зайвих форм</li>
                  <li>✓ Поради щодо порід дерева та практичності</li>
                  <li>✓ Знижка 5% при замовленні комплекту меблів</li>
                </ul>

                <div className={styles.fastMessengerSection}>
                  <span>Напишіть нам прямо зараз:</span>
                  <div className={styles.messengerButtons}>
                    <button type="button" className={styles.tgBtn} onClick={openTelegramDirect}>
                      ✈️ Відправити фото в Telegram
                    </button>
                    <button type="button" className={styles.viberBtn} onClick={openViberDirect}>
                      💜 Відправити фото у Viber
                    </button>
                  </div>
                </div>
              </div>

              <form className={styles.expressForm} onSubmit={handleSubmit}>
                <h4>Або залиште заявку на дзвінок:</h4>

                <div
                  className={`${styles.dropZone} ${dragging ? styles.dropZoneActive : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    multiple 
                    accept="image/*,.pdf" 
                    onChange={handleFileUpload} 
                  />
                  <span className={styles.dropIcon}>📸</span>
                  <strong>Прикріпіть фото виробу</strong>
                  <span>Натисніть для вибору файлу</span>

                  {fileList.length > 0 && (
                    <div className={styles.filesList}>
                      {fileList.map((f, i) => (
                        <span key={i} className={styles.fileTag}>📎 {f}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.field}>
                  <label className="form-label">Короткий коментар або розміри</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Напр. стіл на 6 персон, дуб" 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label className="form-label">Ваше ім'я *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ваше ім'я" 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className="form-label">Телефон *</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="+380 (XX) XXX-XX-XX" 
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  📞 Отримати швидкий розрахунок
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
