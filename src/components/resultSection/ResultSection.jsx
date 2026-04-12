// src/components/ResultsSection/ResultsSection.jsx
'use client';

import { motion } from 'framer-motion';
import './ResultSection.css';

// Новые данные: Цифра + Описание
const resultsData = [
  {
    id: 1,
    number: "95%",
    text: "Родителей отмечают значительное снижение напряжения и тревоги у ребенка."
  },
  {
    id: 2,
    number: "9 из 10",
    text: "Клиентов перестают испытывать панический страх перед общением и публикой."
  },
  {
    id: 3,
    number: "~80%",
    text: "Снижение частоты и силы запинок. Речь становится плавной и естественной."
  },
  {
    id: 4,
    number: "100%",
    text: "Рост уверенности в себе (по субъективной оценке взрослых и детей)."
  },
  {
    id: 5,
    number: "500+",
    text: "Учеников начали спокойно отвечать у доски, не боясь поднять руку."
  },
  {
    id: 6,
    number: "3x",
    text: "Меньше навязчивого контроля над каждым словом и звуком."
  }
];

export default function ResultsSection() {
  return (
    <section className="resultsSection">
      <div className="resultsSection__container">
        
        {/* Заголовок слева, как в других блоках */}
        <div className="resultsSection__header">
          <h2 className="resultsSection__title">
            ВАШ РЕЗУЛЬТАТ<br /> СО МНОЙ
          </h2>
        </div>

        {/* Сетка с цифрами */}
        <div className="resultsGrid">
          {resultsData.map((item) => (
            <motion.div 
              key={item.id} 
              className="resultsCard"
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
            >
              <div className="resultsCard__number">{item.number}</div>
              <p className="resultsCard__text">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Финальная фраза из документа */}
        <div className="resultsSection__quote">
          {"Чем раньше начать работу с заиканием, тем легче вернуть спокойную речь."}
        </div>

      </div>
    </section>
  );
}