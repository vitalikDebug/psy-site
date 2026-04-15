// src/components/HeroSection/HeroSection.jsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import './HeroSection.css';

// --- НАСТРОЙКИ АНИМАЦИИ ---
const leftColumnVariants = {
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

const rightColumnVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.4 }
  }
};

const photoVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: { 
    opacity: 1, scale: 1, y: 0, 
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

      <div className="heroSection__container">
        
        {/* --- ЛЕВАЯ КОЛОНКА (Контент) --- */}
        <motion.div 
          className="heroSection__content"
          variants={leftColumnVariants}
          initial="hidden"
          animate="visible"
        >
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

          {/* Блок статистики как на референсе */}
          <motion.div variants={itemVariants} className="heroSection__stats">
            <div className="stat-item">
              <span className="stat-number">15+ лет</span>
              <span className="stat-label">Практики</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Часов работы</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item stat-item--icon">
              <ShieldCheck size={28} className="stat-icon" />
              <span className="stat-label">Доказанный <br/> подход</span>
            </div>
          </motion.div>
        </motion.div>

        {/* --- ПРАВАЯ КОЛОНКА (Коллаж) --- */}
        <motion.div 
          className="heroSection__gallery"
          variants={rightColumnVariants}
          initial="hidden"
          animate="visible"
        >
    
          <motion.div variants={photoVariants} className="hero-gallery__item hero-gallery__item--1">
     
            <img src="/photo_2025-11-28_14-58-17.jpg" alt="Юлия Шкаранда" />
          </motion.div>

          {/* Фото 2 (Правое, вытянутое) */}
          <motion.div variants={photoVariants} className="hero-gallery__item hero-gallery__item--2">
            <img src="/photo_2025-11-28_14-58-30.jpg" alt="Процесс работы" />
          </motion.div>

          {/* Фото 3 (Нижнее левое) */}
          <motion.div variants={photoVariants} className="hero-gallery__item hero-gallery__item--3">
            <img src="/photo3.jpg" alt="Улыбка" />
          </motion.div>

          {/* Декоративные элементы коллажа (Летающие плашки) */}
          <motion.div variants={photoVariants} className="hero-gallery__deco hero-gallery__deco--pill">
            <div className="deco-circles">
              <span></span><span></span><span></span>
            </div>
          </motion.div>

          <motion.div variants={photoVariants} className="hero-gallery__deco hero-gallery__deco--circle">
            <Star size={24} fill="currentColor" />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}