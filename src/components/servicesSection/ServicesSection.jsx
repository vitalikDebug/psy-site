// src/components/ServicesSection/ServicesSection.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronRight, Star, X, CheckCircle2, Info } from 'lucide-react'; // Добавили X, CheckCircle2 и Info
import './ServicesSection.css';
import { useModal } from '@/context/ModalContext';

const servicesData = [
  {
    id: 1,
    title: 'Консультация',
    subtitle: 'Разбор вашей ситуации и подбор формата работы.',
    includes: [
      'Анализ речи и симптомов',
      'Определение причины заикания',
      'Рекомендации и план работы'
    ],
    result: 'Понятный пошаговый план действий и снятие родительской тревожности.',
    tags: ['#анализ_речи', '#план_действий', '#снятие_тревоги'],
    format: 'Онлайн',
    duration: '60 минут',
    note: 'Обязательный первый шаг',
    buttonText: 'Записаться',
    topTags: ['Онлайн', 'С чего начать'],
    image: '/a6ad3d85-3a4b-458a-8506-4571583d3640.png', 
    // emoji: '💬', 
    bgColor: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)'
  },
  {
    id: 2,
    title: 'Курс для родителей',
    subtitle: '«Речь без заикания». Для родителей детей с первыми запинками.',
    includes: [
      'Понимание механизма заикания',
      'Как правильно реагировать',
      'Что говорить, а чего нельзя'
    ],
    result: 'Снижается напряжение у ребёнка, уменьшаются запинки, вы понимаете, как действовать.',
    tags: ['#механизм_заикания', '#реакция_родителя', '#без_паники'],
    format: 'Самостоятельно',
    duration: 'Доступ навсегда',
    note: 'Для любого возраста',
    buttonText: 'Записаться',
    topTags: ['Онлайн', 'Хит продаж 🔥'],
    image: '/ChatGPT_Image_19_._2026_._00_31_40.png', 
  
    bgColor: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
  },
  {
    id: 3,
    title: 'Мини-интенсив',
    subtitle: 'Для школьников с легким заиканием и первыми запинками.',
    includes: [
      'Мягкая коррекция речи',
      'Снижение речевого напряжения',
      'Проработка страха перед ответом'
    ],
    result: 'Уменьшаются запинки, ребёнок говорит спокойнее, снижается тревога.',
    tags: ['#мягкая_коррекция', '#снятие_напряжения', '#уверенность'],
    format: 'Онлайн',
    duration: '2 недели (6-7 встреч)',
    note: 'Бережный старт',
    buttonText: 'Записаться',
    topTags: ['Специалисту', 'Практика'],
    image: '/ChatGPT_Image_19_._2026_._00_32_08.png',
    emoji: '🌱',
    bgColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: 4,
    title: 'Полный интенсив',
    subtitle: 'Для школьников с закрепившимся заиканием и страхом школы.',
    includes: [
      'Глубокая работа со страхом речи',
      'Настройка речевого дыхания',
      'Закрепление спокойной речи'
    ],
    result: 'Свободная речь без ступоров, уверенность у доски и в общении со сверстниками.',
    tags: ['#страх_речи', '#речевое_дыхание', '#свободное_общение'],
    format: 'Онлайн / Офлайн',
    duration: '10–12 встреч',
    note: 'Глубокая проработка',
    buttonText: 'Записаться',
    topTags: ['Глубокая работа', 'VIP'],
    image: '/ChatGPT_Image_19_._2026_._00_31_52.png', 
    emoji: '🚀',
    bgColor: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)'
  },
  {
    id: 5,
    title: 'Для взрослых',
    subtitle: 'Индивидуальная работа со страхом общения и звонков.',
    includes: [
      'Работа с телесным напряжением',
      'Преодоление страха публичности',
      'Свободное общение по телефону'
    ],
    result: 'Уверенность на публике, свободное общение по телефону, контроль над речью.',
    tags: ['#телесные_блоки', '#публичность', '#телефонные_звонки'],
    format: 'Индивидуально',
    duration: 'От 10 встреч',
    note: 'Конфиденциально',
    buttonText: 'Записаться',
    topTags: ['18+', 'Индивидуально'],
    image: '/ChatGPT_Image_19_._2026_._00_31_48.png',
    emoji: '🎯',
    bgColor: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
  }
];

const scrollVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 20, duration: 0.8 }
  }
};

export default function ServicesSection() {
  const { openModal } = useModal();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [selectedService, setSelectedService] = useState(null); // Стейт для модалки подробностей

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setCardsToShow(1);
      else if (window.innerWidth <= 1100) setCardsToShow(2);
      else setCardsToShow(3);
    };
    
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, servicesData.length - cardsToShow);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleDragEnd = (e, { offset }) => {
    const swipeThreshold = 50; 
    if (offset.x < -swipeThreshold && currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1); 
    } else if (offset.x > swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1); 
    }
  };

  // Блокируем скролл сайта при открытой модалке
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedService]);

  return (
    <section className="servicesSection" id='services'>
      <div className="servicesSection__container">
        
        <motion.div 
          className="servicesSection__header"
          variants={scrollVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="servicesSection__title">Форматы работы</h2>
        </motion.div>

        <motion.div 
          className="slider-wrapper-animated"
          variants={scrollVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="slider-viewport">
            <motion.div 
              className="slider-track"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${currentIndex * (100 / cardsToShow)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {servicesData.map((item) => (
                <div 
                  key={item.id} 
                  className="serviceCard-wrapper"
                  style={{ flex: `0 0 ${100 / cardsToShow}%` }}
                >
                  {/* Клик по карточке открывает подробности (selectedService) */}
                  <div 
                    className="serviceCard" 
                    onClick={() => setSelectedService(item)}
                  >
                    
                    <div className="serviceCard__cover" style={{ background: item.bgColor }}>
                      <div className="serviceCard__top-tags">
                        {item.topTags.map((tag, i) => (
                          <span key={i} className={`serviceCard__badge ${tag.includes('Хит') ? 'serviceCard__badge--hot' : ''}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      
 
                      <img 
    src={item.image} 
    className="serviceCard__illustration-img" 
    alt={item.title} 
  />
                      {/* <div className="serviceCard__illustration">{item.emoji}</div> */}
                    </div>

                    <div className="serviceCard__content">
                      <h3 className="serviceCard__title">{item.title}</h3>
                      <div className="serviceCard__rating">
                        {/* <Star size={14} className="star-icon" fill="currentColor" /> */}
                        {/* <span>5.0 <span>(отлично)</span></span> */}
                      </div>
                      <p className="serviceCard__subtitle">{item.subtitle}</p>

                      <div className="serviceCard__tags">
                        {item.tags.map((tag, i) => (
                          <span key={i} className={`serviceCard__hashtag color-${i}`}>{tag}</span>
                        ))}
                      </div>

                      <div className="serviceCard__features-grid">
                        <div className="feature-item">
                          <span className="feature-label">Формат</span>
                          <span className="feature-val">{item.format}</span>
                        </div>
                        <div className="feature-item">
                          <span className="feature-label">Длительность</span>
                          <span className="feature-val">{item.duration}</span>
                        </div>
                      </div>

                      <div className="serviceCard__footer">
                        <div className="serviceCard__author">
                          <User size={14} /> <span>Юлия Шкаранда</span>
                        </div>
                        
                        {/* Кнопка "Записаться" открывает форму. e.stopPropagation() не дает открыться окну подробностей */}
                        <button 
                          className="serviceCard__btn"
                          onClick={(e) => {
                            e.stopPropagation(); 
                            openModal(item.title);
                          }} 
                        >
                          {item.buttonText} <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="slider-controls">
            <div className="slider-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot-pill ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* =========================================
          МОДАЛЬНОЕ ОКНО С ПОДРОБНОСТЯМИ КУРСА
      ========================================= */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="serviceDetails__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)} // Закрыть по клику на фон
          >
            <motion.div 
              className="serviceDetails__card"
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Клик внутри окна не закрывает его
            >
              <button className="serviceDetails__close" onClick={() => setSelectedService(null)}>
                <X size={24} />
              </button>

              {/* Красивая обложка внутри модалки */}
              <div className="serviceDetails__cover" style={{ background: selectedService.bgColor }}>
                <img src={selectedService.image} alt={selectedService.title} className="serviceDetails__img" />
              </div>

              <div className="serviceDetails__scroll-area">
                <h3 className="serviceDetails__title">{selectedService.title}</h3>
                <p className="serviceDetails__subtitle">{selectedService.subtitle}</p>

                <hr className="serviceDetails__divider" />

                <h4 className="serviceDetails__section-title">Что входит:</h4>
                <ul className="serviceDetails__list">
                  {selectedService.includes.map((feature, i) => (
                    <li key={i}>
                      <CheckCircle2 size={20} className="serviceDetails__icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="serviceDetails__result">
                  <div className="serviceDetails__result-title">
                    <Star size={16} className="serviceDetails__result-icon" /> Результат:
                  </div>
                  <p>{selectedService.result}</p>
                </div>

                <div className="serviceDetails__note">
                  <Info size={16} className="serviceDetails__note-icon" />
                  <p>{selectedService.note}</p>
                </div>

                {/* Главная кнопка действия внутри модалки */}
                <button 
                  className="serviceDetails__btn-main"
                  onClick={() => {
                    setSelectedService(null); // Закрываем детали
                    openModal(selectedService.title); // И сразу открываем форму заявки
                  }}
                >
                  Записаться на {selectedService.title.toLowerCase()}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}