// src/components/ConsequencesSection/ConsequencesSection.jsx
'use client';

import { motion } from 'framer-motion';
import './ConsequencesSection.css';

const consequencesData = [
  {
    id: 'stage-1',
    type: 'start', 
    step: '01',
    title: 'НАЧАЛО',
    text: 'Сначала это просто легкие запинки, на которые часто не обращают внимания.'
  },
  {
    id: 'stage-2',
    type: 'fear', 
    step: '02',
    title: 'ПОЯВЛЯЕТСЯ СТРАХ',
    text: 'Ребёнок или взрослый начинает замечать свои трудности и эмоционально на них реагировать.'
  },
  {
    id: 'stage-3',
    type: 'behavior', 
    step: '03',
    title: 'ИЗМЕНЕНИЕ ПОВЕДЕНИЯ',
    textPrefix: 'Чтобы избежать неудачи, человек начинает менять свое поведение:',
    list: [
      'Избегать ответов и разговоров',
      'Говорить тише, «бубнить»',
      'Сильно переживать перед речью',
      'Расстраиваться и замыкаться в себе'
    ]
  },
  {
    id: 'stage-4',
    type: 'final', 
    step: '04',
    title: 'ИТОГ: ЗАИКАНИЕ ЗАКРЕПЛЯЕТСЯ',
    text: 'Со временем формируется стойкий страх говорить. Мозг привыкает к этому паттерну, и заикание становится хроническим.'
  }
];

// --- НАСТРОЙКИ АНИМАЦИИ ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function ConsequencesSection() {
  return (
    <section className="consequencesSection">
      <div className="consequencesSection__container">
        
        <h2 className="consequencesSection__title">
          ЧТО ПРОИСХОДИТ, ЕСЛИ <br/> НЕ РАБОТАТЬ С ЗАИКАНИЕМ
        </h2>

        {/* СЕТКА БЛОКОВ С АНИМАЦИЕЙ */}
        <motion.div 
          className="consequencesGrid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {consequencesData.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`consequencesItem consequencesItem--${item.type}`}
            >
              {/* Декоративный номер шага */}
              <span className="consequencesItem__step">{item.step}</span>
              
              <div className="consequencesItem__content">
                <h3 className="consequencesItem__title">{item.title}</h3>
                
                {item.list ? (
                  <>
                    <p className="consequencesItem__text">{item.textPrefix}</p>
                    <ul className="consequencesItem__list">
                      {item.list.map((li, index) => (
                        <li key={index}>{li}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="consequencesItem__text">{item.text}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}