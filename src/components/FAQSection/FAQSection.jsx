// src/components/FAQSection/FAQSection.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQSection.css';

// Все вопросы из документа
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

export default function FAQSection() {
  // Храним ID открытого вопроса (если null, то все закрыты)
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faqSection" id='faq'>
      <div className="faqSection__container">
        
        {/* Заголовок как на макете */}
        <div className="faqSection__header">
          <span className="faqSection__subtitle">ЧАСТЫЕ ВОПРОСЫ</span>
          <h2 className="faqSection__title">Ответы на ваши вопросы</h2>
        </div>

        {/* Список вопросов */}
        <div className="faqList">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div 
                key={item.id} 
                className={`faqItem ${isOpen ? 'faqItem--open' : ''}`}
                onClick={() => toggleFAQ(item.id)}
              >
                {/* Верхняя часть: Вопрос и кнопка */}
                <div className="faqItem__top">
                  <h3 className="faqItem__question">{item.question}</h3>
                  <button className="faqItem__toggle-btn" aria-label="Toggle question">
                    {/* Иконка меняется в зависимости от состояния */}
                    {isOpen ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    )}
                  </button>
                </div>

                {/* Выпадающий ответ (анимируется через Framer Motion) */}
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
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}