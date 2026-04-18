// src/components/Footer/Footer.jsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext'; // Импортируем модалку
import './Footer.css';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

export default function Footer() {
  const { openModal } = useModal(); // Достаем функцию открытия модалки

  return (
    <footer className="footer" id="contacts">
      
      {/* =========================================
          БЛОК CTA (Градиентная карточка сверху)
      ========================================= */}
      <motion.div 
        className="footer__cta-wrapper"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="footer__cta-card" variants={itemVariants}>
          <h2 className="footer__cta-title">Не знаете, с чего начать?</h2>
          <p className="footer__cta-text">
            Запишитесь на консультацию. Я разберу вашу ситуацию и подскажу формат работы, который подойдет именно вам.
          </p>
          <button onClick={() => openModal('Консультация (из подвала)')} className="footer__cta-btn">
            Записаться на консультацию
          </button>
        </motion.div>
      </motion.div>

      {/* =========================================
          ОСНОВНОЙ ФУТЕР (Белый фон, темный текст)
      ========================================= */}
      <motion.div 
        className="footer__main"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="footer__grid">
          
          {/* Левая часть: Колонки меню */}
          <div className="footer__columns">
            <motion.div className="footerCol" variants={itemVariants}>
              <h4 className="footerCol__title">Контакты</h4>
              <p className="footerCol__text">Онлайн-консультации<br/>и ведение по всему миру.</p>
              <a href="mailto:example@mail.ru" className="footerCol__link">example@mail.ru</a>
            </motion.div>

            <motion.div className="footerCol" variants={itemVariants}>
              <h4 className="footerCol__title">Соцсети</h4>
              <ul className="footerCol__list">
                <li><a href="https://t.me/julia_shkaranda" target="_blank" rel="noreferrer">Telegram <ArrowUpRight size={14}/></a></li>
                <li><a href="#" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14}/></a></li>
                <li><a href="#" target="_blank" rel="noreferrer">ВКонтакте <ArrowUpRight size={14}/></a></li>
                <li><a href="https://iimax.ru/zaikanie_preodolimo" target="_blank" rel="noreferrer">МАКС <ArrowUpRight size={14}/></a></li>
              </ul>
            </motion.div>

            <motion.div className="footerCol" variants={itemVariants}>
              <h4 className="footerCol__title">Навигация</h4>
              <ul className="footerCol__list">
                <li><Link href="/#about">Обо мне</Link></li>
                <li><Link href="/#approach">Подход</Link></li>
                <li><Link href="/course">Курс для родителей</Link></li>
                <li><Link href="/#reviews">Отзывы</Link></li>
              </ul>
            </motion.div>
          </div>

          {/* Правая часть: Логотип в отдельном блоке */}
          <motion.div className="footer__logo-block" variants={itemVariants}>
            <img src="/logo.png" alt="Логотип Юлия Шкаранда" className="footer__logo-img" />
            <p className="footer__logo-desc">Психолог · логопед · заиколог</p>
          </motion.div>

        </div>

        {/* Самый низ - Юридическая информация */}
        <motion.div className="footer__bottom" variants={itemVariants}>
          <div className="footer__legal-info">
            <span>ИП Юлия Шкаранда</span>
            <span>ОГРН: 321392600030851</span>
            <span>ИНН: 390705830870</span>
          </div>
          <div className="footer__legal-links">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Оферта</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </motion.div>
      </motion.div>

    </footer>
  );
}