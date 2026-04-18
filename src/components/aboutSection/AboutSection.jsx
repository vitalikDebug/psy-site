// src/components/AboutSection/AboutSection.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Award, X, CheckCircle2 } from 'lucide-react';
import { useModal } from '@/context/ModalContext'; // Подключаем модалку для записи
import './AboutSection.css';

// Твои данные для Bento
const bentoCards = [
  { id: 'photo-1', type: 'photo', src: "/photo_2025-11-28_14-57-46.jpg", alt: "Юлия Шкаранда", name: "Юлия Шкаранда", role: "Психолог, Логопед" },
  { id: 'text-1', type: 'text', title: "Комплексный подход", text: "Работа с корнем проблемы через психологию, а не просто маскировка речевых симптомов." },
  { id: 'photo-2', type: 'photo', src: "/photo_2025-11-28_14-57-43.jpg", alt: "Процесс работы", name: "Процесс", role: "Индивидуальные сессии" },
  { id: 'text-2', type: 'text', title: "Опыт и экспертиза", text: "Более 15 лет практики и 5000+ часов работы с детьми и взрослыми." },
  { id: 'photo-3', type: 'photo', src: "/photo_2025-11-28_14-57-44.jpg", alt: "Детали работы", name: "Результат", role: "Свободная речь" },
  { id: 'text-3', type: 'text', title: "Поддержка 24/7", text: "Сопровождение и ответы на вопросы в закрытом сообществе." }
];

const diplomas = [
  "/diplomas/diploma-1.jpg",
  "/diplomas/diploma-2.jpg",
  "/diplomas/diploma-3.jpg",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 20 } }
};

export default function AboutSection() {
  const { openModal } = useModal(); // Для кнопки в статье
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [isDiplomaModalOpen, setIsDiplomaModalOpen] = useState(false);

  return (
    <section className="aboutSection" id='about'>
      
      {/* 1 ЧАСТЬ: BENTO GRID (Факты и цифры) */}
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
            <li>Более 5000 часов коррекционной работы</li>
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

      {/* 2 ЧАСТЬ: ИСТОРИЯ И МЕТОД (Новый блок статьи) */}
      <motion.div 
        className="about-story-wrapper"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="about-story">
          <h3 className="about-story__title">Вы часто спрашиваете меня: <br/> на чём основан мой метод?</h3>
          
          <div className="about-story__text-grid">
            <div className="about-story__column">
              <p>С удовольствием рассказываю вам, из чего складывается та система работы, благодаря которой мои клиенты — дети, подростки и взрослые — преодолевают заикание, находят голос и уверенность.</p>
              <p>Мой путь начался с базового психологического образования. Я поступила на факультет психологии после школы. Интерес к психологии никогда не покидал меня.</p>
              <p>Позже в моей жизни было разное: работа в системе образования, работа с детьми с ОВЗ, с семьями, с тревогами и страхами...</p>
            </div>
            
            <div className="about-story__column">
              <p>...страхами, которые чаще всего не видны на поверхности, но живут глубоко внутри — <strong>в дыхании, в паузах, в застывших взглядах.</strong></p>
              <p>Я получила и дефектологическое образование, что дало мне возможность соединить внешнее с внутренним: речь как поведение и речь как проявление психики.</p>
              <p>Так и формировался мой метод — как <strong>сплав логопедии, глубинной психологии и внимательного отношения к телу</strong>, к эмоциям, к опыту.</p>
            </div>
          </div>

          <blockquote className="about-story__quote">
            «Сегодня я не делю заикание на "проблему речи" или "тревожность". Я вижу в каждом человеке историю. И помогаю раскрыться — быть собой ❤️»
          </blockquote>

          <div className="about-story__footer">
            <p>Если вам важен подход, где услышат не только слова, но и ваше состояние между ними — приглашаю в работу.</p>
            <button 
              className="about-btn about-btn--social" 
              style={{ maxWidth: '300px', margin: '0 auto' }}
              onClick={() => openModal('Консультация (Блок Обо мне)')}
            >
              Записаться на консультацию
            </button>
          </div>

        </div>
      </motion.div>

      {/* --- МОДАЛЬНЫЕ ОКНА (Твои старые модалки) --- */}
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

      <AnimatePresence>
        {isDiplomaModalOpen && (
            <ModalOverlay onClose={() => setIsDiplomaModalOpen(false)} wide>
                <h3 className="modal-title" style={{marginBottom: '30px'}}>Образование и квалификация</h3>
                <div className="diplomas-grid">
                    {diplomas.map((src, index) => (
                        <div key={index} className="diploma-item">
                            <div style={{width:'100%', height:'250px', background: '#eee', display:'flex', alignItems:'center', justifyContent:'center', color: '#999'}}>Диплом {index+1}</div>
                        </div>
                    ))}
                </div>
            </ModalOverlay>
        )}
      </AnimatePresence>
    </section>
  );
}

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