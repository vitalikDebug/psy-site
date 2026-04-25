// src/components/HeroSection/HeroSection.jsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Star } from 'lucide-react'; 
import { useModal } from '@/context/ModalContext';
import './HeroSection.css';

// --- НАСТРОЙКИ АНИМАЦИИ ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 20 } 
  }
};

const photoVariants = {
  hidden: { opacity: 0, scale: 0.9, x: 20 },
  visible: { 
    opacity: 1, scale: 1, x: 0, 
    transition: { type: "spring", stiffness: 70, damping: 15 } 
  }
};

export default function HeroSection() {
  const { openModal } = useModal();

  return (
    <section className="heroSection">
      {/* Декоративный фон (мягкие свечения) */}
      <div className="heroSection__bg-glow heroSection__bg-glow--left"></div>
      <div className="heroSection__bg-glow heroSection__bg-glow--right"></div>

      <motion.div 
        className="heroSection__container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* =========================================
            ВЕРХНЯЯ ЧАСТЬ: Текст и Фото
        ========================================= */}
        <div className="heroTop">
          
          {/* Левая колонка: Текст */}
          <div className="heroTop__left">
            <motion.div variants={itemVariants} className="heroSection__badge">
              <Sparkles size={16} />
              <span>Психолог • Логопед • Заиколог</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="heroSection__title">
              Свободная речь <br /> без страха <br /> и напряжения
            </motion.h1>

            <motion.p variants={itemVariants} className="heroSection__subtitle">
              Помогаю детям и взрослым избавиться от заикания через глубокую работу с причиной, а не только с симптомами. Верните себе радость общения.
            </motion.p>

            <motion.div variants={itemVariants} className="heroSection__actions">
              <button className="hero-btn hero-btn--primary" onClick={() => openModal('Консультация')}>
                Начать работу
              </button>
              <Link href="#services" className="hero-btn hero-btn--outline">
                Форматы работы
              </Link>
            </motion.div>
          </div>

          {/* Правая колонка: Большое фото с плашкой */}
          <motion.div variants={photoVariants} className="heroTop__right">
            <div className="hero-main-photo">
              {/* ЗАМЕНИ на свою лучшую вертикальную фотографию */}
              <img src="/photo_2025-11-28_14-58-13.jpg" alt="Юлия Шкаранда" />
              
              {/* Парящая плашка поверх фото */}
              <div className="hero-floating-card">
                <div className="floating-card-icon">
                  <ShieldCheck size={24} />
                </div>
                <div className="floating-card-text">
                  <span className="floating-card-title">Доказанный</span>
                  <span className="floating-card-sub">научный подход</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* =========================================
            НИЖНЯЯ ЧАСТЬ: Карточки статистики
        ========================================= */}
        <motion.div variants={containerVariants} className="heroBottom">
          
          {/* Карточка 1: Темная (Клиенты) */}
          <motion.div variants={itemVariants} className="statCard statCard--dark">
            <div className="statCard__avatars">
              {/* Имитация лиц клиентов (пересекающиеся кружки) */}
              <div className="avatar-circle avatar-1"></div>
              <div className="avatar-circle avatar-2"></div>
              <div className="avatar-circle avatar-3"></div>
              <div className="avatar-circle avatar-4"></div>
            </div>
            <div className="statCard__info">
              <span className="statCard__number">1000+</span>
              <span className="statCard__label">Счастливых клиентов<br/>и успешных результатов</span>
            </div>
          </motion.div>

          {/* Карточка 2: Светлая (Часы) */}
          <motion.div variants={itemVariants} className="statCard statCard--light">
            <span className="statCard__number statCard__number--accent">15000+</span>
            <span className="statCard__label">Часов работы</span>
          </motion.div>

          {/* Карточка 3: Лавандовая (Опыт) */}
          <motion.div variants={itemVariants} className="statCard statCard--gradient">
            <Star size={28} className="statCard__icon-top" />
            <div className="statCard__info-bottom">
              <span className="statCard__number">15+</span>
              <span className="statCard__label">Лет успешной<br/>практики</span>
            </div>
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
}