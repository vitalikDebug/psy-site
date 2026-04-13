// src/components/ConsequencesSection/ConsequencesSection.jsx
'use client';

import { motion } from 'framer-motion';
import './ConsequencesSection.css';

const consequencesData = [
  {
    id: 'stage-1',
    type: 'start', // Маленький блок начала
    step: '01',
    title: 'НАЧАЛО',
    text: 'Сначала это просто легкие запинки, на которые часто не обращают внимания.'
  },
  {
    id: 'stage-2',
    type: 'fear', // Маленький блок эмоций
    step: '02',
    title: 'ПОЯВЛЯЕТСЯ СТРАХ',
    text: 'Ребёнок или взрослый начинает замечать свои трудности и эмоционально на них реагировать.'
  },
  {
    id: 'stage-3',
    type: 'behavior', // Высокий блок с изменением поведения
    step: '03',
    title: 'ИЗМЕНЕНИЕ ПОВЕДЕНИЯ',
    // Текст до списка
    textPrefix: 'Чтобы избежать неудачи, человек начинает менять свое поведение:',
    // Список симптомов
    list: [
      'Избегать ответов и разговоров',
      'Говорить тише, «бубнить»',
      'Сильно переживать перед речью',
      'Расстраиваться и замыкаться в себе'
    ]
  },
  {
    id: 'stage-4',
    type: 'final', // Широкий блок итога
    step: '04',
    title: 'ИТОГ: ЗАИКАНИЕ ЗАКРЕПЛЯЕТСЯ',
    text: 'Со временем формируется стойкий страх говорить. Мозг привыкает к этому паттерну, и заикание становится хроническим.'
  }
];

export default function ConsequencesSection() {
  return (
    <section className="consequencesSection">
      <div className="consequencesSection__container">
        
        <h2 className="consequencesSection__title">
          ЧТО ПРОИСХОДИТ, ЕСЛИ <br/> НЕ РАБОТАТЬ С ЗАИКАНИЕМ
        </h2>

        {/* СЕТКА БЛОКОВ (аналог ApproachGrid) */}
        <div className="consequencesGrid">
          {consequencesData.map((item) => (
            <motion.div
              key={item.id}
              // Класс для расстановки в сетке и общие стили карточки
              className={`consequencesItem consequencesItem--${item.type}`}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Декоративный номер шага */}
              <span className="consequencesItem__step">{item.step}</span>
              
              <div className="consequencesItem__content">
                <h3 className="consequencesItem__title">{item.title}</h3>
                
                {/* Если есть список, рендерим его, иначе просто текст */}
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
        </div>

        {/* ВАЖНЫЙ ВЫВОД ВНИЗУ */}
        {/* <div className="consequencesSection__footer">
          <p className="consequencesSection__footer-text">
            Чем раньше начать, тем легче убрать страх речи.
          </p>
        </div> */}
      </div>
    </section>
  );
}