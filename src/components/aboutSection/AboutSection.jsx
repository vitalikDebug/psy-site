// src/components/AboutSection/AboutSection.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Award, X, ExternalLink, Send } from 'lucide-react'; // Добавили иконки
import './AboutSection.css';

// Данные фотографий
const photos = [
  { id: 1, src: "/photo_2025-11-28_14-57-46.jpg", alt: "Юлия Шкаранда портрет" },
  { id: 2, src: "/photo_2025-11-28_14-57-43.jpg", alt: "Процесс работы" },
  { id: 3, src: "/photo_2025-11-28_14-57-44.jpg", alt: "Детали" },
  // Добавьте больше фото, если есть, эффект стопки будет лучше
];

// ЗАГЛУШКИ ДЛЯ ДИПЛОМОВ (Замените на реальные пути)
const diplomas = [
    "/diplomas/diploma-1.jpg",
    "/diplomas/diploma-2.jpg",
    "/diplomas/diploma-3.jpg",
    // ...
];


// --- ВАРИАНТЫ АНИМАЦИИ ---

// 1. Для появления текста (как в Hero)
const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.15 }
    }
};
const textItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
};

// 2. Для перелистывания фото ("эффект книги")
const photoVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
        rotate: direction > 0 ? 20 : -20,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { delay: 0.2 } // Небольшая задержка перед появлением нового
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000, // Улетает в противоположную сторону
        opacity: 0,
        scale: 0.95,
        rotate: direction < 0 ? 20 : -20,
        transition: { duration: 0.5, ease: "easeInOut" }
    })
};


export default function AboutSection() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [direction, setDirection] = useState(0); // Направление листания
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [isDiplomaModalOpen, setIsDiplomaModalOpen] = useState(false);

  // Функция для перелистывания фото
  const paginate = (newDirection) => {
    setDirection(newDirection);
    setActivePhotoIndex((prevIndex) => (prevIndex + newDirection + photos.length) % photos.length);
  };

  // Индекс следующего фото (для подложки)
  const nextPhotoIndex = (activePhotoIndex + 1) % photos.length;


  return (
    <section className="aboutSection" id='about'>
      <div className="aboutSection__container">
        
        {/* --- ЛЕВАЯ КОЛОНКА: Текст с анимацией --- */}
        <motion.div 
            className="aboutSection__content"
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className="badge badge--accent" variants={textItemVariants}>Обо мне</motion.span>
          
          <motion.h2 className="aboutSection__main-name" variants={textItemVariants}>ЮЛИЯ ШКАРАНДА</motion.h2>
          <motion.p className="aboutSection__main-role" variants={textItemVariants}>Практикующий психолог, логопед, заиколог</motion.p>
          
          <motion.p className="aboutSection__description" variants={textItemVariants}>
            Работаю на стыке психологии и логопедии, что позволяет работать с причиной заикания, а не только с симптомами.
          </motion.p>

          <motion.ul className="aboutSection__stats-list" variants={textItemVariants}>
            <li>Более 15 лет работы с семьями</li>
            <li>Более 5000 часов коррекционной работы</li>
            <li>Индивидуальный подход к каждой ситуации</li>
          </motion.ul>
          
          {/* Кнопка Дипломы */}
          <motion.div variants={textItemVariants}>
             <button className="about-btn about-btn--diplomas" onClick={() => setIsDiplomaModalOpen(true)}>
                <Award size={20} />
                <span>Дипломы и сертификаты</span>
             </button>
          </motion.div>


          <motion.div className="aboutSection__social-block" variants={textItemVariants}>
            <p className="aboutSection__blog-title">Веду блог ЗАИКАНИЕ ПРЕОДОЛИМО</p>
            
            {/* Новая единая кнопка "Сообщество" */}
            <button className="about-btn about-btn--social" onClick={() => setIsSocialModalOpen(true)}>
                <Users size={20} />
                <span>Вступить в сообщество</span>
            </button>
          </motion.div>
        </motion.div>


        {/* --- ПРАВАЯ КОЛОНКА: Фото-галерея "Книга" --- */}
        <div className="aboutSection__gallery">
            <div className="photo-stack-container" onClick={() => paginate(1)}>
                
                {/* Подложка (следующее фото, выглядывает снизу) */}
                <div className="photo-stack__underlay">
                    <img 
                        src={photos[nextPhotoIndex].src} 
                        alt="" 
                        className="photo-stack__img"
                    />
                </div>

                {/* Активное фото с анимацией перелистывания */}
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={activePhotoIndex}
                        className="photo-stack__active-card"
                        custom={direction}
                        variants={photoVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x" // Можно даже потянуть мышкой/пальцем!
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1); // Свайп влево -> след фото
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1); // Свайп вправо -> пред фото
                            }
                        }}
                    >
                        <img 
                            src={photos[activePhotoIndex].src} 
                            alt={photos[activePhotoIndex].alt} 
                            className="photo-stack__img"
                        />
                         <div className="photo-stack__hint">Нажмите, чтобы листать</div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

      </div>


      {/* --- МОДАЛЬНОЕ ОКНО: СООБЩЕСТВО --- */}
     <AnimatePresence>
        {isSocialModalOpen && (
            <ModalOverlay onClose={() => setIsSocialModalOpen(false)}>
                <h3 className="modal-title">Выберите удобную площадку</h3>
                <div className="modal-social-links">
                    
                    {/* Ссылка на Telegram */}
                    <a href="https://t.me/julia_shkaranda" target="_blank" rel="noreferrer" className="social-link-card telegram">
                        {/* Твой SVG для Telegram */}
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="currentColor"/>
                        </svg>
                        <span>Telegram</span>
                    </a>
                    
                    {/* Ссылка на Max */}
                    <a href="https://iimax.ru/zaikanie_preodolimo" target="_blank" rel="noreferrer" className="social-link-card website">
                        {/* Твой SVG для Max */}
                        <svg width="32" height="32" viewBox="0 0 720 720" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z"/>
                        </svg>
                        <span>Max</span>
                    </a>
                </div>
            </ModalOverlay>
        )}
      </AnimatePresence>


      {/* --- МОДАЛЬНОЕ ОКНО: ДИПЛОМЫ --- */}
      <AnimatePresence>
        {isDiplomaModalOpen && (
            <ModalOverlay onClose={() => setIsDiplomaModalOpen(false)} wide>
                <h3 className="modal-title" style={{marginBottom: '30px'}}>Образование и квалификация</h3>
                <div className="diplomas-grid">
                    {diplomas.map((src, index) => (
                        <div key={index} className="diploma-item">
                            {/* Используйте заглушку, пока нет реальных фото */}
                            <div style={{width:'100%', height:'250px', background: '#eee', display:'flex', alignItems:'center', justifyContent:'center', color: '#999'}}>Диплом {index+1}</div>
                            {/* <img src={src} alt={`Диплом ${index + 1}`} loading="lazy" /> */}
                        </div>
                    ))}
                </div>
            </ModalOverlay>
        )}
      </AnimatePresence>
    </section>
  );
}

// Вспомогательный компонент для модалок (локальный)
function ModalOverlay({ children, onClose, wide = false }) {
    return (
        <motion.div 
            className="about-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div 
                className={`about-modal-content ${wide ? 'about-modal-content--wide' : ''}`}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                onClick={(e) => e.stopPropagation()} // Чтобы клик по контенту не закрывал модалку
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                <button className="about-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>
                {children}
            </motion.div>
        </motion.div>
    );
}

// Хелперы для свайпа
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};