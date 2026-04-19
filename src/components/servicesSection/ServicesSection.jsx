// src/components/ServicesSection/ServicesSection.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronRight, Star, X, CheckCircle2, Info } from 'lucide-react';
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
  const [selectedService, setSelectedService] = useState(null);

  // Ссылки и стейт для плавного свайпа (как в блоге)
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const [sliderConstraints, setSliderConstraints] = useState({ left: 0, right: 0 });

  // Пересчитываем границы свайпа с защитой от бесконечных рендеров
  useEffect(() => {
    if (sliderRef.current && trackRef.current) {
      const timeoutId = setTimeout(() => {
        if (!sliderRef.current || !trackRef.current) return;
        
        const sliderWidth = sliderRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        
        const newLeft = trackWidth > sliderWidth ? -(trackWidth - sliderWidth) : 0;

        setSliderConstraints((prev) => {
          if (prev.left === newLeft) return prev; 
          return { left: newLeft, right: 0 };
        });
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [servicesData.length]);

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

        {/* НОВЫЙ БЛОК СЛАЙДЕРА СВОБОДНОГО СВАЙПА */}
        <motion.div 
          className="servicesSection__slider-viewport"
          ref={sliderRef}
          variants={scrollVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div 
            className="servicesSection__slider-track"
            ref={trackRef}
            drag={sliderConstraints.left < 0 ? "x" : false}
            dragConstraints={sliderConstraints}
            dragElastic={0.1}
          >
            {servicesData.map((item) => (
              <div 
                key={item.id} 
                className="serviceCard-wrapper"
              >
                <div 
                  className="serviceCard" 
                  onClick={() => setSelectedService(item)}
                >
                  
                  <div className="serviceCard__cover">
                    <div className="serviceCard__top-tags">
                      {item.topTags.map((tag, i) => (
                        <span key={i} className={`serviceCard__badge ${tag.includes('Хит') ? 'serviceCard__badge--hot' : ''}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <img src={item.image} className="serviceCard__illustration-img" alt={item.title} />
                  </div>

                  <div className="serviceCard__content">
                    <h3 className="serviceCard__title">{item.title}</h3>
                    <div className="serviceCard__rating"></div>
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
            onClick={() => setSelectedService(null)} 
          >
            <motion.div 
              className="serviceDetails__card"
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} 
            >
              <button className="serviceDetails__close" onClick={() => setSelectedService(null)}>
                <X size={24} />
              </button>

              <div className="serviceDetails__cover">
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

                <button 
                  className="serviceDetails__btn-main"
                  onClick={() => {
                    setSelectedService(null); 
                    openModal(selectedService.title); 
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