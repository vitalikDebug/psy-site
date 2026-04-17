// src/components/CourseVideoSection/CourseVideoSection.jsx
'use client';

import { motion } from 'framer-motion';
import { Lightbulb, ShieldCheck, HeartPulse } from 'lucide-react';
import './CourseVideoSection.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

export default function CourseVideoSection() {
  return (
    <section className="courseVideoSection">
      <motion.div 
        className="courseVideoSection__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        {/* =========================================
            ЛЕВАЯ КОЛОНКА: ТЕКСТ И ТАЙМЛАЙН
        ========================================= */}
        <div className="courseVideo__left">
          <motion.h2 variants={itemVariants} className="courseVideo__title">
            Навыки, которые изменят <br/> вашу жизнь и речь ребёнка
          </motion.h2>
          
          <motion.p variants={itemVariants} className="courseVideo__subtitle">
            Современный подход диктует свои правила. Чтобы помочь ребёнку, не нужно заставлять его делать скучные упражнения — нужно изменить среду.
          </motion.p>

          <motion.div variants={itemVariants} className="courseVideo__timeline">
            
            {/* Пункт 1 */}
            <div className="timeline-item">
              <div className="timeline-icon-wrapper">
                <div className="timeline-icon"><Lightbulb size={20} /></div>
                {/* Вертикальная линия соединитель */}
                <div className="timeline-line"></div>
              </div>
              <div className="timeline-content">
                <h4 className="timeline-title">Осознанность</h4>
                <p className="timeline-text">Вы поймете истинные механизмы запинок и перестанете винить себя или ребёнка.</p>
              </div>
            </div>

            {/* Пункт 2 */}
            <div className="timeline-item">
              <div className="timeline-icon-wrapper">
                <div className="timeline-icon"><ShieldCheck size={20} /></div>
                <div className="timeline-line"></div>
              </div>
              <div className="timeline-content">
                <h4 className="timeline-title">Правильная реакция</h4>
                <p className="timeline-text">Научитесь реагировать на ступоры так, чтобы снимать напряжение, а не усиливать его.</p>
              </div>
            </div>

            {/* Пункт 3 (Последний, без линии вниз) */}
            <div className="timeline-item">
              <div className="timeline-icon-wrapper">
                <div className="timeline-icon"><HeartPulse size={20} /></div>
              </div>
              <div className="timeline-content">
                <h4 className="timeline-title">Спокойствие</h4>
                <p className="timeline-text">Снизите общий уровень тревоги в семье, что является главным фундаментом свободной речи.</p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* =========================================
            ПРАВАЯ КОЛОНКА: ВИДЕО И ПЛАШКА
        ========================================= */}
        <motion.div variants={itemVariants} className="courseVideo__right">
          
          {/* Парящая плашка статистики (как на референсе) */}
          <div className="courseVideo__floating-badge">
            <div className="badge-stat">
              <span className="badge-number">10</span>
              <span className="badge-label">МОДУЛЕЙ<br/>В КУРСЕ</span>
            </div>
            <div className="badge-divider"></div>
            <div className="badge-stat">
              <span className="badge-number">100%</span>
              <span className="badge-label">ПРАКТИКИ<br/>И ПОЛЬЗЫ</span>
            </div>
          </div>

          {/* Контейнер видео */}
          <div className="courseVideo__player-wrapper">
            {/* Замени src и poster на свои файлы */}
            <video 
              className="courseVideo__player"
              controls 
              poster="/class.jpg" 
              src="/video/intro.mp4" 
            />
          </div>

        </motion.div>

      </motion.div>
    </section>
  );
}