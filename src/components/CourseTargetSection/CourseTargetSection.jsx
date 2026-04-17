// src/components/CourseTargetSection/CourseTargetSection.jsx
'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RotateCcw, MicOff, BatteryWarning } from 'lucide-react';
import './CourseTargetSection.css';

const targetCards = [
  {
    id: 1,
    icon: <AlertCircle size={28} />,
    title: 'Только началось',
    text: 'Вы недавно заметили первые запинки, находитесь в панике и не знаете, как правильно реагировать, чтобы не сделать хуже.',
  },
  {
    id: 2,
    icon: <RotateCcw size={28} />,
    title: 'Длится давно',
    text: 'Заикание то уходит, то возвращается. Вы перепробовали разных логопедов и методик, но устойчивого результата нет.',
  },
  {
    id: 3,
    icon: <MicOff size={28} />,
    title: 'Появился страх',
    text: 'Ребёнок начал стесняться говорить, избегает общения, замыкается в себе или боится отвечать на уроках в школе.',
  },
  {
    id: 4,
    icon: <BatteryWarning size={28} />,
    title: 'Вы устали',
    text: 'Вы постоянно контролируете речь ребёнка, подсказываете слова, боитесь его запинок и сами испытываете сильную тревогу.',
  }
];

// --- НАСТРОЙКИ АНИМАЦИЙ ---

// Анимация для заголовка
const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

// Анимация фоновой линии
const lineVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.2, ease: "easeOut" } 
  }
};

// Анимация контейнера с карточками (очередь появления)
const cardsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Задержка между появлением каждой карточки
      delayChildren: 0.3,    // Ждем, пока появится заголовок
    }
  }
};

// Анимация самой карточки
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

export default function CourseTargetSection() {
  return (
    <section id="target" className="targetSection">
      {/* Фоновая пунктирная линия */}
      <motion.div 
        className="targetSection__bg-line"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Запускаем, когда видно 20% блока
        variants={lineVariants}
      >
        <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path 
            d="M-100 450 C 300 500, 700 550, 1000 350 C 1200 200, 1000 50, 850 150 C 700 250, 850 400, 1500 400" 
            stroke="var(--color-accent)" 
            strokeWidth="3" 
            strokeDasharray="12 12" 
            strokeLinecap="round"
            opacity="0.3"
          />
        </svg>
      </motion.div>

      <div className="targetSection__container">
        
        {/* Заголовок и описание */}
        <motion.div 
          className="targetSection__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
        >
          <h2 className="targetSection__title">Для кого этот курс</h2>
          <p className="targetSection__subtitle">
            Программа создана для родителей, которые хотят помочь своему ребёнку зазвучать свободно, без давления и стресса.
          </p>
        </motion.div>
        
        {/* Карточки лесенкой */}
        <motion.div 
          className="targetSection__cards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardsContainerVariants}
        >
          {targetCards.map((card, index) => (
            <motion.div 
              key={card.id} 
              variants={cardVariants}
              className={`targetCard targetCard--step-${index + 1}`}
            >
              <div className="targetCard__icon-wrapper">
                {card.icon}
              </div>
              <h3 className="targetCard__title">{card.title}</h3>
              <p className="targetCard__text">{card.text}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}