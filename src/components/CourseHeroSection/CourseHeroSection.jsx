// src/components/CourseHeroSection/CourseHeroSection.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Timer, ArrowRight } from 'lucide-react';
import './CourseHeroSection.css'; // Подключаем стили именно этого блока

export default function CourseHeroSection() {
  // --- ЛОГИКА ТАЙМЕРА (30 минут) ---
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  // --- АНИМАЦИИ ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
  };

  return (
    <section className="courseHero">
      <motion.div 
        className="courseHero__container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="courseHero__left">
          <motion.h1 variants={itemVariants} className="courseHero__title">
            РЕБЁНОК ЗАИКАЕТСЯ? <br/>
            <span className="courseHero__title-accent">НАЧНИТЕ С СЕБЯ.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="courseHero__subtitle">
            Курс для родителей, которые хотят помочь ребёнку говорить спокойно без давления, контроля и медикаментов. Работаем с причиной заикания и состоянием ребёнка, а не только с речью.
          </motion.p>

          <motion.div variants={itemVariants} className="courseHero__results">
            <h3 className="courseHero__results-title">После курса вы:</h3>
            <ul className="courseHero__list">
              <li><CheckCircle2 size={20} className="list-icon"/> поймёте, почему ребёнок начал заикаться</li>
              <li><CheckCircle2 size={20} className="list-icon"/> перестанете усиливать запинки тревогой</li>
              <li><CheckCircle2 size={20} className="list-icon"/> научитесь правильно реагировать на речь</li>
              <li><CheckCircle2 size={20} className="list-icon"/> снизите напряжение в общении</li>
              <li><CheckCircle2 size={20} className="list-icon"/> поможете ребёнку говорить спокойнее</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="courseHero__cta-box">
            <div className="cta-box__timer">
              <Timer size={18} className="timer-icon" />
              <span>Предложение истекает через:</span>
              <div className="timer-countdown">
                {minutes}:{seconds}
              </div>
            </div>
            
            <div className="cta-box__bottom">
              <div className="cta-box__price">
                <span className="price-old">5000 ₽</span>
                <span className="price-new">3000 ₽</span>
              </div>
              <button className="cta-box__btn">
                Купить курс <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <motion.div variants={itemVariants} className="courseHero__right">
          <div className="course-accordion">
            <div className="accordion-item accordion-item--1">
              <img src="/moment.png" alt="Забота" />
              <div className="accordion-label">Забота и поддержка</div>
            </div>
            <div className="accordion-item accordion-item--2">
              <img src="/listen.png" alt="Внимание" />
              <div className="accordion-label">Внимание</div>
            </div>
            <div className="accordion-item accordion-item--3">
              <img src="/growthOfCon.png" alt="Общение" />
              <div className="accordion-label">Общение</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}