// src/components/ServicesSection/ServicesSection.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, Info } from 'lucide-react';
import './ServicesSection.css';
import { useModal } from '@/context/ModalContext';

const servicesData = [
  {
    id: 1,
    title: 'КОНСУЛЬТАЦИЯ',
    subtitle: 'Первый этап. Разбор ситуации и подбор формата работы.',
    includes: [
      'Анализ речи и симптомов',
      'Определение причины заикания',
      'Рекомендации и план работы'
    ],
    result: 'Понятный пошаговый план действий и снятие родительской тревожности.',
    note: 'Обязательный первый шаг перед началом любой работы.',
    format: 'Онлайн, 60 минут',
    buttonText: 'Записаться на консультацию',
  },
  {
    id: 2,
    title: 'КУРС ДЛЯ РОДИТЕЛЕЙ',
    subtitle: '“Речь без заикания”. Для родителей детей с первыми запинками.',
    includes: [
      'Понимание механизма заикания',
      'Как правильно реагировать',
      'Что говорить, а чего нельзя'
    ],
    result: 'Снижается напряжение у ребёнка, уменьшаются запинки, вы понимаете, как действовать.',
    note: 'Подходит родителям детей любого возраста. Доступ навсегда.',
    format: 'Самостоятельное изучение',
    buttonText: 'Хочу на курс',
  },
  {
    id: 3,
    title: 'МИНИ-ИНТЕНСИВ',
    subtitle: 'Для школьников с легким заиканием и первыми запинками.',
    includes: [
      'Мягкая коррекция речи',
      'Снижение речевого напряжения',
      'Проработка страха перед ответом'
    ],
    result: 'Уменьшаются запинки, ребёнок говорит спокойнее, снижается тревога.',
    note: 'Идеальный формат для бережного старта и мягкой коррекции.',
    format: '6–7 встреч (2 недели)',
    buttonText: 'Узнать подробнее',
  },
  {
    id: 4,
    title: 'ПОЛНЫЙ ИНТЕНСИВ',
    subtitle: 'Для школьников с закрепившимся заиканием и страхом школы.',
    includes: [
      'Глубокая работа со страхом речи',
      'Настройка речевого дыхания',
      'Закрепление спокойной речи'
    ],
    result: 'Свободная речь без ступоров, уверенность у доски и в общении со сверстниками.',
    note: 'Глубокая проработка закрепившегося заикания и страхов.',
    format: '10–12 встреч, будние дни',
    buttonText: 'Узнать подробнее',
  },
  {
    id: 5,
    title: 'ДЛЯ ВЗРОСЛЫХ',
    subtitle: 'Индивидуальная работа со страхом общения и звонков.',
    includes: [
      'Работа с телесным напряжением',
      'Преодоление страха публичности',
      'Свободное общение по телефону'
    ],
    result: 'Уверенность на публике, свободное общение по телефону, контроль над речью.',
    note: 'Полная конфиденциальность и глубокое погружение в вашу проблему.',
    format: 'От 10 встреч, индивидуально',
    buttonText: 'Узнать подробнее',
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

  // Авто-перелистывание
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 15000); // 15 секунд

    return () => clearTimeout(timer);
  }, [currentIndex, maxIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Логика свайпа (Drag)
  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold = 50; // Минимальный сдвиг в пикселях для перелистывания
    if (offset.x < -swipeThreshold && currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1); // Свайп влево -> следующий слайд
    } else if (offset.x > swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1); // Свайп вправо -> предыдущий слайд
    }
  };

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
          <h2 className="servicesSection__title">ФОРМАТЫ РАБОТЫ</h2>
          <p className="servicesSection__subtitle">
            Выберите подходящий формат в зависимости от вашей ситуации.
          </p>
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
              dragConstraints={{ left: 0, right: 0 }} // Ограничиваем свободный полет, чтобы он возвращался
              dragElastic={0.2} // Упругость при натяжении
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
                  <div className="serviceCard">
                    
                    <div className="serviceCard__top">
                      <h3 className="serviceCard__title">{item.title}</h3>
                      <p className="serviceCard__subtitle">{item.subtitle}</p>
                    </div>

                    <hr className="serviceCard__divider" />

                    <div className="serviceCard__body">
                      <ul className="serviceCard__list">
                        {item.includes.map((feature, i) => (
                          <li key={i}>
                            <CheckCircle2 size={18} className="serviceCard__icon" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="serviceCard__result">
                        <div className="serviceCard__result-title">
                           <Star size={16} className="serviceCard__result-icon" />
                           Результат:
                        </div>
                        <p>{item.result}</p>
                      </div>

                      <div className="serviceCard__note">
                        <Info size={14} className="serviceCard__note-icon" />
                        <p>{item.note}</p>
                      </div>
                    </div>

                    <div className="serviceCard__footer">
                      <p className="serviceCard__format">{item.format}</p>
                      <button 
                        className="serviceCard__btn"
                        onClick={() => openModal(`${item.title}`)} 
                      >
                        {item.buttonText}
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* НОВЫЙ БЛОК КОНТРОЛЛОВ (Прямоугольные точки-пилюли с таймером) */}
          <div className="slider-controls">
            <div className="slider-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot-pill ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Перейти к слайду ${index + 1}`}
                >
                  {/* Заполняющийся ползунок внутри активной точки */}
                  {currentIndex === index && (
                    <motion.div 
                      key={`fill-${currentIndex}`} // Ключ заставляет анимацию перезапускаться
                      className="slider-dot-fill"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 15, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}