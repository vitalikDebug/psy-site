// src/components/FAQSection/FAQSection.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react'; // Используем иконку стрелки вместо линий
import './FAQSection.css';

// Данные вопросов
const faqData = [
  {
    id: 1,
    question: "Сколько нужно времени, чтобы убрать заикание?",
    answer: "Всё зависит от ситуации, возраста и степени напряжения. Первые изменения часто появляются уже в процессе работы."
  },
  {
    id: 2,
    question: "В каком возрасте можно начинать?",
    answer: "Работаю с дошкольниками, школьниками, подростками и взрослыми. Помощь возможна в любом возрасте."
  },
  {
    id: 3,
    question: "Это логопедическая работа?",
    answer: "Нет. Работа строится не только со звуками, а с причиной заикания — страхом речи и напряжением."
  },
  {
    id: 4,
    question: "Можно ли онлайн?",
    answer: "Да. Работа проходит онлайн. Формат подходит детям и взрослым."
  },
  {
    id: 5,
    question: "Нужно ли выполнять упражнения?",
    answer: "Нет жёстких упражнений. Работа проходит мягко через изменение состояния и речи."
  },
  {
    id: 6,
    question: "Если заикание только началось?",
    answer: "Это самый благоприятный период для работы. Чем раньше начать, тем быстрее результат."
  },
  {
    id: 7,
    question: "Если ребёнок стесняется?",
    answer: "Работа проходит мягко. Ребёнок постепенно начинает говорить спокойнее, без давления и стресса."
  },
  {
    id: 8,
    question: "Нужно ли проходить обследования?",
    answer: "Обычно нет. На первой консультации мы определяем необходимость дополнительных обследований."
  }
];

// --- НАСТРОЙКИ АНИМАЦИИ ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faqSection" id='faq'>
      <div className="faqSection__container">
        
        {/* ЛЕВАЯ КОЛОНКА: ЗАГОЛОВОК */}
        <motion.div 
            className="faqSection__left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
          <span className="faqSection__badge">Частые вопросы</span>
          <h2 className="faqSection__title">Ответы на ваши вопросы</h2>
          <p className="faqSection__desc">
            Здесь собраны ответы на вопросы, которые чаще всего задают родители и взрослые клиенты перед началом работы.
          </p>
        </motion.div>

        {/* ПРАВАЯ КОЛОНКА: СПИСОК */}
        <motion.div 
            className="faqSection__right"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <motion.div 
                key={item.id} 
                className={`faqItem ${isOpen ? 'faqItem--open' : ''}`}
                variants={itemVariants}
              >
                {/* Заголовок вопроса */}
                <div 
                    className="faqItem__header"
                    onClick={() => toggleFAQ(item.id)}
                >
                  <h3 className="faqItem__question">{item.question}</h3>
                  <button className={`faqItem__toggle-btn ${isOpen ? 'open' : ''}`} aria-label="Открыть ответ">
                    <ChevronDown size={24} />
                  </button>
                </div>

                {/* Выпадающий ответ */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faqItem__answer-wrapper"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="faqItem__answer">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}