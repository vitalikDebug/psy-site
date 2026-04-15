// src/components/ApproachSection/ApproachSection.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ApproachSection.css';

const approachData = [
  {
    id: "approach-1",
    type: "wide",
    title: "РАБОТАЮ С ПРИЧИНОЙ, А НЕ ТОЛЬКО С РЕЧЬЮ",
    shortText: "Заикание — это верхушка айсберга. Мы ищем и устраняем корень проблемы — внутреннее напряжение и страх.",
    description: "Механические упражнения дают временный эффект, если не убрать причину, запускающую спазм. Мы работаем с тем, что происходит ДО того, как вы начали говорить."
  },
  {
    id: "approach-2",
    type: "narrow-1",
    title: "НА СТЫКЕ ПСИХОЛОГИИ И ЛОГОПЕДИИ",
    shortText: "Комплексный взгляд на проблему для устойчивого результата.",
    description: "Я использую знания из обеих областей. Как логопед, я понимаю механику речи, а как психолог — помогаю перенастроить нервную систему и реакции."
  },
  {
    id: "approach-3",
    type: "narrow-2",
    title: "РАБОТА СО СТРАХОМ РЕЧИ И НАПРЯЖЕНИЕМ",
    shortText: "Убираем главный блокирующий фактор — страх.",
    description: "Именно страх ожидания запинки создает колоссальное напряжение, которое и не дает сказать слово свободно. Снижая тревогу, мы освобождаем речь."
  },
  {
    id: "approach-4",
    type: "photo",
    title: "ИНДИВИДУАЛЬНЫЙ ПОДХОД К КАЖДОМУ",
    shortText: "Нет универсальных решений. Программа строится под вашу ситуацию, возраст и степень заикания.",
    description: "Я учитываю ваш темперамент, историю возникновения заикания и текущий образ жизни, чтобы подобрать инструменты, которые сработают именно у вас."
  },
  {
    id: "approach-5",
    type: "stacked-1",
    title: "ОНЛАЙН ФОРМАТ ИЗ ЛЮБОЙ ТОЧКИ МИРА",
    shortText: "Эффективная работа в комфортной для вас обстановке.",
    description: "Современные методики позволяют проводить полноценную диагностику и терапию дистанционно, не теряя в качестве."
  },
  {
    id: "approach-6",
    type: "stacked-2",
    title: "ПОДДЕРЖКА РОДИТЕЛЕЙ В ПРОЦЕССЕ",
    shortText: "Обучаю, как создать терапевтическую среду дома.",
    description: "Родители — главные ко-терапевты для ребенка. Я даю четкие инструкции, как реагировать и помогать, чтобы закрепить результат."
  }
];

// --- НАСТРОЙКИ АНИМАЦИИ ПРИ СКРОЛЛЕ ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Быстрое появление карточек друг за другом
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function ApproachSection() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedItem = selectedId ? approachData.find(item => item.id === selectedId) : null;

  return (
    <section className="approachSection" id='approach'>
      <div className="approachSection__container">
        
        <motion.h2 
          className="approachSection__title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          ПОЧЕМУ ВЫБИРАЮТ <br/> ЭТУ РАБОТУ
        </motion.h2>

        {/* СЕТКА БЛОКОВ С АНИМАЦИЕЙ ПОЯВЛЕНИЯ */}
        <motion.div 
          className="approachGrid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {approachData.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              layoutId={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`approachItem approachItem--${item.type}`}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              style={{ borderRadius: "24px" }} // Скруглили углы для современного вида
            >
              
              <motion.div
                className="approachItem__inner-wrapper"
                animate={{ opacity: selectedId === item.id ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
              >
                {item.type === 'photo' && (
                  <div className="approachItem__photo-bg">
                    <img src="/photo_2025-11-28_14-58-13.jpg" alt="Юлия Шкаранда" />
                    <div className="approachItem__photo-overlay"></div>
                  </div>
                )}

                <div className="approachItem__content">
                  <h3 className="approachItem__title">{item.title}</h3>
                  <p className="approachItem__text">{item.shortText}</p>
                </div>
                
                <div className="approachItem__dot"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* МОДАЛЬНОЕ ОКНО */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div 
            className="modalOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              className="modalCard"
              layoutId={selectedId}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{ borderRadius: "30px" }} 
            >
              <motion.button 
                className="modalCloseBtn" 
                onClick={() => setSelectedId(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
              
              <motion.h3 
                className="modalCard__title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
      
                {selectedItem.title}
              </motion.h3>
              
              <motion.p 
                className="modalCard__description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {selectedItem.description}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}