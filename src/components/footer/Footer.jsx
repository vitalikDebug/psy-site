// src/components/Footer/Footer.jsx
'use client';

import { motion } from 'framer-motion';
import './Footer.css';

// --- НАСТРОЙКИ АНИМАЦИИ ПРИ СКРОЛЛЕ ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Задержка между вылетом колонок
      delayChildren: 0.1,    // Небольшая пауза перед началом анимации
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

const dividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { 
    scaleX: 1, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function Footer() {
  return (
    <footer className="footer" id='contacts'>
      {/* Главный анимированный контейнер */}
      <motion.div 
        className="footer__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Анимация начнется, когда видно 20% футера
      >
        
        {/* Верхняя часть футера (Колонки) */}
        <div className="footer__top">
          
          {/* Колонка 1: Логотип/Имя */}
          <motion.div className="footer__col footer__col--brand" variants={itemVariants}>
            <h3 className="footer__logo">Юлия Шкаранда</h3>
            <p className="footer__slogan">Психолог · логопед · заиколог</p>
          </motion.div>

          {/* Колонка 2: Навигация (пример) */}
          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Меню</h4>
            <ul className="footer__list">
              <li><a href="#about">Обо мне</a></li>
              <li><a href="#services">Форматы работы</a></li>
              <li><a href="#reviews">Отзывы</a></li>
              <li><a href="#faq">Частые вопросы</a></li>
            </ul>
          </motion.div>

          {/* Колонка 3: Контакты и соцсети */}
          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Связь</h4>
            <ul className="footer__list">
              <li><a href="mailto:example@mail.ru">example@mail.ru</a></li>
              <li><a href="https://t.me/julia_shkaranda" target="_blank" rel="noreferrer">Telegram (Блог)</a></li>
              <li><a href="https://t.me/m/NXl4uiraZTE6" target="_blank" rel="noreferrer">Telegram (Запись)</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">ВКонтакте</a></li>
              <li><a href="https://iimax.ru/zaikanie_preodolimo" target="_blank" rel="noreferrer">МАКС</a></li>
            </ul>
          </motion.div>

        </div>

        {/* Анимированная разделительная линия (растягивается от центра) */}
        <motion.div 
          className="footer__divider" 
          variants={dividerVariants}
          style={{ originX: 0.5 }} // Точка трансформации в центре
        />

        {/* Нижняя часть (Юридическая инфа) */}
        <motion.div className="footer__bottom" variants={itemVariants}>
          <div className="footer__legal-text">
            <p>ИП Юлия Шкаранда</p>
            <p>ОГРН: 321392600030851</p>
            <p>ИНН: 390705830870</p>
          </div>
          
          <div className="footer__legal-links">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Публичная оферта</a>
            <a href="#">Согласие на обработку данных</a>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
}