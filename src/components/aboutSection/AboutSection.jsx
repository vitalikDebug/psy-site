// src/components/AboutSection/AboutSection.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Award, X, CheckCircle2, XCircle, Heart, Shield, Sparkles, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import './AboutSection.css';

// Данные для Bento
const bentoCards = [
  { id: 'photo-1', type: 'photo', src: "/photo_2025-11-28_14-57-46.jpg", alt: "Юлия Шкаранда", name: "Юлия Шкаранда", role: "Психолог, Логопед" },
  { id: 'text-1', type: 'text', title: "Комплексный подход", text: "Работа с корнем проблемы через психологию, а не просто маскировка речевых симптомов." },
  { id: 'photo-2', type: 'photo', src: "/photo_2025-11-28_14-57-43.jpg", alt: "Процесс работы", name: "Процесс", role: "Индивидуальные сессии" },
  { id: 'text-2', type: 'text', title: "Опыт и экспертиза", text: "Более 15 лет практики и 15000+ часов работы с детьми и взрослыми." },
  { id: 'photo-3', type: 'photo', src: "/photo_2025-11-28_14-57-44.jpg", alt: "Детали работы", name: "Результат", role: "Свободная речь" },
  { id: 'text-3', type: 'text', title: "Поддержка 24/7", text: "Сопровождение и ответы на вопросы в закрытом сообществе." }
];

const diplomas = [
  "/diplomas/file-001.png",
  "/diplomas/file-002.png",
  "/diplomas/file-003.png",
  "/diplomas/file-004.png",
  "/diplomas/file-005.png",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 20 } }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function AboutSection() {
  const { openModal } = useModal();
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [isDiplomaModalOpen, setIsDiplomaModalOpen] = useState(false);
  
  // Состояния для слайдера дипломов
  const [currentDiplomaIndex, setCurrentDiplomaIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); // Для полноэкранного просмотра

  const nextDiploma = () => {
    setCurrentDiplomaIndex((prev) => (prev === diplomas.length - 1 ? 0 : prev + 1));
  };

  const prevDiploma = () => {
    setCurrentDiplomaIndex((prev) => (prev === 0 ? diplomas.length - 1 : prev - 1));
  };

  return (
    <section className="aboutSection" id='about'>
      
      {/* 1 ЧАСТЬ: BENTO GRID */}
      <div className="aboutSection__container">
        
        {/* --- ЛЕВАЯ КОЛОНКА: Текст --- */}
        <motion.div 
            className="aboutSection__content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className="badge badge--accent" variants={itemVariants}>Обо мне</motion.span>
          
          <motion.h2 className="aboutSection__main-name" variants={itemVariants}>ЮЛИЯ ШКАРАНДА</motion.h2>
          <motion.p className="aboutSection__main-role" variants={itemVariants}>Практикующий психолог, логопед, заиколог</motion.p>
          
          <motion.p className="aboutSection__description" variants={itemVariants}>
            Работаю на стыке психологии и логопедии, что позволяет работать с причиной заикания, а не только с симптомами. Моя цель — помочь вам или вашему ребенку обрести свободную речь и уверенность в себе.
          </motion.p>

         <motion.ul className="aboutSection__stats-list" variants={itemVariants}>
            <li>Более 15 лет работы с семьями</li>
            <li>Более 15000 часов коррекционной работы</li>
            <li>Индивидуальный подход к каждой ситуации</li>
          </motion.ul>
          
          <motion.div variants={itemVariants} className="aboutSection__buttons">
             <button className="about-btn about-btn--diplomas" onClick={() => setIsDiplomaModalOpen(true)}>
                <Award size={20} />
                <span>Дипломы и сертификаты</span>
             </button>
          
            <div className="aboutSection__social-block">
                <p className="aboutSection__blog-title">блог ЗАИКАНИЕ ПРЕОДОЛИМО</p>
                <button className="about-btn about-btn--social" onClick={() => setIsSocialModalOpen(true)}>
                    <Users size={20} />
                    <span>Вступить в сообщество</span>
                </button>
            </div>
          </motion.div>
        </motion.div>

        {/* --- ПРАВАЯ КОЛОНКА: BENTO GRID --- */}
       <motion.div 
            className="aboutSection__gallery bento-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {bentoCards.map((card, index) => (
                <motion.div
                    key={card.id}
                    className={`bento-card bento-card--${card.type} bento-card--${index + 1}`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                >
                    {card.type === 'photo' ? (
                        <>
                            <img src={card.src} alt={card.alt} className="bento-card__img" />
                            <div className="bento-card__info">
                                <span className="bento-card__name">{card.name} <CheckCircle2 size={16} className="verified-icon" /></span>
                                <span className="bento-card__role">{card.role}</span>
                            </div>
                        </>
                    ) : (
                        <div className="bento-card__content">
                            <h3 className="bento-card__title">{card.title}</h3>
                            <p className="bento-card__text">{card.text}</p>
                        </div>
                    )}
                </motion.div>
            ))}
        </motion.div>
      </div>

      {/* 2 ЧАСТЬ: МАНИФЕСТ И ВИДЕО */}
      <div className="about-story-wrapper">
        
        <motion.div 
          className="about__intro"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
        >
          <div className="about__intro-text">
            <h2 className="section-title">Заикание — не то, что нужно «чинить»</h2>
            <p className="intro-lead">
              В моей работе заикание — не враг и не поломка. Это симптом, который показывает, где сейчас человеку слишком сложно. 
            </p>
            <div className="intro-principles">
              <div className="principle-item">
                <Heart className="principle-icon" />
                <span><strong>Нет давления</strong> и попыток переделать</span>
              </div>
              <div className="principle-item">
                <Shield className="principle-icon" />
                <span><strong>Нет позиции</strong> «я знаю лучше»</span>
              </div>
              <div className="principle-item">
                <Sparkles className="principle-icon" />
                <span><strong>Только бережность</strong> и движение в вашем темпе</span>
              </div>
            </div>
            <p className="intro-subtext">Использую логопедические методы только как дополнительные способы помощи...</p>
          </div>
          
          <div className="about__intro-video">
            <div className="video-wrapper">
              <iframe 
                src="https://vkvideo.ru/video_ext.php?oid=-209029056&id=456239228&hash=7a9c8b8b8b8b8b8b" 
                width="100%" 
                height="100%" 
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" 
                frameBorder="0" 
                allowFullScreen
                title="Видео-визитка Юлии"
              ></iframe>
            </div>
            <span className="video-caption">Посмотрите бесплатный видео-урок и познакомьтесь со мной поближе</span>
          </div>
        </motion.div>

        {/* БЛОК КОМУ ПОДОЙДЕТ */}
        <motion.div 
          className="about__method"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
        >
          <div className="method-grid">
            <div className="method-card fits-for">
              <h3 className="card-title">Кому подойдёт такой формат:</h3>
              <ul className="method-list">
                <li><CheckCircle2 className="icon-check" /> <span>Родителям, которые устали переживать и стыдиться своих детей</span></li>
                <li><CheckCircle2 className="icon-check" /> <span>Тем, кому надоели БАДы и дыхательные практики без результата</span></li>
                <li><CheckCircle2 className="icon-check" /> <span>Тем, кто устал жить в кабинетах логопедов и неврологов</span></li>
                <li><CheckCircle2 className="icon-check" /> <span>Взрослым, которые заикаются много лет и устали прятаться</span></li>
              </ul>
            </div>
            <div className="method-card not-fits-for">
              <h3 className="card-title">Кому НЕ подойдёт:</h3>
              <ul className="method-list">
                <li><XCircle className="icon-cross" /> <span>Тем, кто ищет «волшебную таблетку» и быстрый результат за день</span></li>
                <li><XCircle className="icon-cross" /> <span>Тем, кто хочет «исправить» ребёнка, не меняясь и не глядя на себя</span></li>
              </ul>
            </div>
          </div>
          
          <div className="method-results">
             <h3>Когда мы идем глубже, ребёнок выдыхает.</h3>
             <p>Уходит постоянный контроль, появляется чувство безопасности, снижается тревога. Речь постепенно становится свободнее.</p>
          </div>
        </motion.div>
      </div>

      {/* --- МОДАЛЬНОЕ ОКНО: СОЦСЕТИ --- */}
      <AnimatePresence>
        {isSocialModalOpen && (
            <ModalOverlay onClose={() => setIsSocialModalOpen(false)}>
                <h3 className="modal-title">Выберите удобную площадку</h3>
                <div className="modal-social-links">
                    <a href="https://t.me/julia_shkaranda" target="_blank" rel="noreferrer" className="social-link-card telegram">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="currentColor"/></svg>
                        <span>Telegram</span>
                    </a>
                    <a href="https://iimax.ru/zaikanie_preodolimo" target="_blank" rel="noreferrer" className="social-link-card website">
                        <svg width="32" height="32" viewBox="0 0 720 720" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z"/></svg>
                        <span>Max</span>
                    </a>
                </div>
            </ModalOverlay>
        )}
      </AnimatePresence>

      {/* --- МОДАЛЬНОЕ ОКНО: ДИПЛОМЫ (СЛАЙДЕР) --- */}
      <AnimatePresence>
        {isDiplomaModalOpen && (
            <ModalOverlay onClose={() => { setIsDiplomaModalOpen(false); setIsZoomed(false); }} wide>
                
                <div className="diploma-slider-header">
                  <h3 className="modal-title">Образование и квалификация</h3>
                  <p className="diploma-counter">{currentDiplomaIndex + 1} / {diplomas.length}</p>
                </div>

                <div className="diploma-slider-container">
                  <button className="diploma-nav-btn prev" onClick={prevDiploma}>
                    <ChevronLeft size={28} />
                  </button>

                  <div className="diploma-image-wrapper" onClick={() => setIsZoomed(true)}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentDiplomaIndex}
                        src={diplomas[currentDiplomaIndex]}
                        alt={`Диплом Юлии Шкаранда ${currentDiplomaIndex + 1}`}
                        className="diploma-active-image"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      />
                    </AnimatePresence>
                    <div className="diploma-zoom-hint">
                      <ZoomIn size={20} />
                      <span>Нажмите, чтобы увеличить</span>
                    </div>
                  </div>

                  <button className="diploma-nav-btn next" onClick={nextDiploma}>
                    <ChevronRight size={28} />
                  </button>
                </div>

                {/* Миниатюры (Dots) */}
                <div className="diploma-thumbnails">
                  {diplomas.map((_, idx) => (
                    <button 
                      key={idx} 
                      className={`diploma-thumb ${idx === currentDiplomaIndex ? 'active' : ''}`}
                      onClick={() => setCurrentDiplomaIndex(idx)}
                    />
                  ))}
                </div>

            </ModalOverlay>
        )}
      </AnimatePresence>

      {/* --- ПОЛНОЭКРАННЫЙ ПРОСМОТР ДИПЛОМА (ZOOM) --- */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            className="diploma-zoom-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <button className="diploma-zoom-close" onClick={() => setIsZoomed(false)}>
              <X size={32} />
            </button>
            <motion.img
              src={diplomas[currentDiplomaIndex]}
              alt="Диплом крупным планом"
              className="diploma-zoomed-image"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Чтобы клик по самой картинке не закрывал её
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Компонент обертки модального окна
function ModalOverlay({ children, onClose, wide = false }) {
    return (
        <motion.div className="about-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
            <motion.div className={`about-modal-content ${wide ? 'about-modal-content--wide' : ''}`} initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} onClick={(e) => e.stopPropagation()} transition={{ type: "spring", damping: 25, stiffness: 300 }}>
                <button className="about-modal-close" onClick={onClose}><X size={24} /></button>
                {children}
            </motion.div>
        </motion.div>
    );
}