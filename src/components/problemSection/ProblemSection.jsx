// src/components/ProblemSection/ProblemSection.jsx
'use client';

import { motion } from 'framer-motion';
import './ProblemSection.css';

// --- НАСТРОЙКИ АНИМАЦИИ ---
// Дирижер: управляет появлением всех элементов внутри себя
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Задержка между вылетом каждой карточки
      delayChildren: 0.1,    // Небольшая пауза перед началом
    }
  }
};

// Отдельный элемент (карточка или текст): выезжает снизу
const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20,
      duration: 0.6
    }
  }
};

export default function ProblemSection() {
  return (
    <section className="problemSection">
      <div className="problemSection__container">
        
        {/* ГЛАВНЫЙ КОНТЕЙНЕР (Срабатывает, когда попадает в поле зрения) */}
        <motion.div 
          className="problemGrid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // once: true - проиграется 1 раз
        >
          
          {/* --- ЛЕВАЯ КОЛОНКА (РОДИТЕЛИ И ВЗРОСЛЫЕ) --- */}
          <div className="problemGrid__col problemGrid__col--left">
            <motion.div className="problemCard" variants={itemVariants}>
              <div className="problemCard__header">
                <h3 className="problemCard__title">Для родителей</h3>
                <span className="problemCard__tag">01</span>
              </div>
              <ul className="problemCard__list">
                <li>Вы не знаете, как правильно реагировать</li>
                <li>Боитесь сделать хуже</li>
                <li>Замечаете напряжение в речи</li>
              </ul>
            </motion.div>

            <motion.div className="problemCard" variants={itemVariants}>
              <div className="problemCard__header">
                <h3 className="problemCard__title">Или для взрослых:</h3>
                <span className="problemCard__tag">02</span>
              </div>
              <ul className="problemCard__list">
                <li>Заикаетесь с детства</li>
                <li>Сложно говорить по телефону</li>
                <li>Волнуетесь перед знакомством</li>
                <li>Избегаете публичных выступлений</li>
                <li>Контролируете каждое слово</li>
                <li>Запинки усиливаются при стрессе</li>
              </ul>
            </motion.div>
          </div>

          {/* --- ЦЕНТРАЛЬНЫЙ БЛОК (ЗАГОЛОВОК) --- */}
          {/* Он тоже появляется плавно, вместе с карточками */}
          <motion.div className="problemGrid__center" variants={itemVariants}>
            <div className="circle-decoration circle-1"></div>
            <div className="circle-decoration circle-2"></div>
            
            <h2 className="problemGrid__title">
              ЭТО МОЖЕТ БЫТЬ <br/> ПРО ВАС ИЛИ <br/> ВАШЕГО РЕБЁНКА
            </h2>
          </motion.div>

          {/* --- ПРАВАЯ КОЛОНКА (ДЕТИ) --- */}
          <div className="problemGrid__col problemGrid__col--right">
            <motion.div className="problemCard" variants={itemVariants}>
              <div className="problemCard__header">
                <h3 className="problemCard__title">Речь ребёнка</h3>
                <span className="problemCard__tag">03</span>
              </div>
              <ul className="problemCard__list">
                <li>Начинает повторять первые звуки</li>
                <li>Перед словом появляются паузы</li>
                <li>Ребёнок волнуется перед ответом</li>
                <li>Запинки усиливаются при эмоциях</li>
              </ul>
            </motion.div>

            <motion.div className="problemCard" variants={itemVariants}>
              <div className="problemCard__header">
                <h3 className="problemCard__title">Поведение</h3>
                <span className="problemCard__tag">04</span>
              </div>
              <ul className="problemCard__list">
                <li>Старается говорить меньше</li>
                <li>Избегает разговоров</li>
                <li>Расстраивается после речи</li>
              </ul>
            </motion.div>
          </div>

        </motion.div>

        {/* НИЖНИЙ ТЕКСТ (ФУТЕР) */}
        {/* Появляется самым последним с небольшой задержкой */}
        <motion.div 
          className="problemSection__footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="problemSection__footer-text">
            Если вы узнали себя — это можно изменить.
          </p>
        </motion.div>

      </div>
    </section>
  );
}