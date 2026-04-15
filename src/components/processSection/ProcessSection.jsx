// src/components/ProcessSection/ProcessSection.jsx
'use client';

import { motion } from 'framer-motion';
import './ProcessSection.css';

const processData = [
  {
    number: '01',
    title: 'ВНИМАТЕЛЬНО СЛУШАЮ',
    description: 'Всё начинается с вашей истории. Я не просто слушаю слова, я обращаю внимание на дыхание, паузы, интонации и скрытые эмоции, чтобы понять истинную картину вашего состояния.'
  },
  {
    number: '02',
    title: 'ИССЛЕДУЮ ПРИЧИНЫ И ИНТЕРПРЕТИРУЮ',
    description: 'Понимаю, как и в каких ситуациях возникает напряжение. Эти наблюдения ложатся в основу индивидуального плана: мы находим триггеры, мысли и страхи, которые запускают механизм заикания.'
  },
  {
    number: '03',
    title: 'СНИМАЮ ФИЗИЧЕСКОЕ НАПРЯЖЕНИЕ',
    description: 'Обучаю техникам глубокой релаксации. Вы научитесь физически расслаблять речевой аппарат, шею и тело, чтобы звук рождался свободно и без лишних мышечных усилий.'
  },
  {
    number: '04',
    title: 'ОБЪЯСНЯЮ ЧЕСТНО И ПОНЯТНО',
    description: 'Вы легко ориентируетесь в процессе терапии и точно понимаете, почему мы делаем то или иное упражнение. Никакой магии — только прозрачная и научно обоснованная работа.'
  },
  {
    number: '05',
    title: 'РАБОТАЮ С МЫШЛЕНИЕМ',
    description: 'Меняем отношение к речи и к себе говорящему. Мы поэтапно снимаем страх ошибки, убираем «ожидание заикания» и возвращаем веру в собственный голос.'
  },
  {
    number: '06',
    title: 'ФОРМИРУЮ НОВУЮ ПРИВЫЧКУ',
    description: 'Шаг за шагом мы выстраиваем новый паттерн речи. Это создание комфортного ритма и темпа, который станет для вас совершенно естественным.'
  },
  {
    number: '07',
    title: 'ПЕРЕНОШУ НАВЫК В ЖИЗНЬ',
    description: [
      'Отработка звонков по телефону без ступора',
      'Уверенное и спокойное общение с незнакомыми людьми',
      'Подготовка к публичным выступлениям или важным диалогам на работе',
      'Интеграция новых речевых привычек в вашу повседневную рутину'
    ]
  }
];

// --- НАСТРОЙКИ АНИМАЦИИ ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.6 }
  }
};


export default function ProcessSection() {
  return (
    <section className="processSection">
      <div className="processSection__container">
        
        <h2 className="processSection__title">
          КАК МЫ ДОБИВАЕМСЯ <br/> РЕЗУЛЬТАТА С КЛИЕНТАМИ
        </h2>

        {/* Анимированный контейнер для списка */}
        <motion.div 
          className="processList"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {processData.map((item, index) => (
            <motion.div key={index} className="processItem" variants={itemVariants}>
              <div className="processItem__left">
                <span className="processItem__number">{item.number}</span>
                <h3 className="processItem__title">{item.title}</h3>
              </div>
              <div className="processItem__right">
                {Array.isArray(item.description) ? (
                  <ul className="processItem__list">
                    {item.description.map((listItem, i) => (
                      <li key={i}>{listItem}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="processItem__text">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Анимированный контейнер для результата */}
        <motion.div 
          className="processResult"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="processResult__image-wrapper">
            <img src="/photo_2025-11-28_14-58-34.jpg" alt="Юлия Шкаранда" className="processResult__img" />
          </div>
          
          <div className="processResult__content">
            <p className="processResult__text">
              РЕЗУЛЬТАТОМ СТАНОВИТСЯ СВОБОДНАЯ РЕЧЬ, <br/>
              <span className="processResult__highlight">КОТОРАЯ ЗВУЧИТ УВЕРЕННО, ЕСТЕСТВЕННО И СПОКОЙНО,</span> <br/>
              РАСКРЫВАЯ ВАШ ИСТИННЫЙ ПОТЕНЦИАЛ В ОБЩЕНИИ
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}