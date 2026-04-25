// src/components/ResultsSection/ResultsSection.jsx
'use client';

import { motion } from 'framer-motion';
import './ResultSection.css';

// --- ДАННЫЕ (Добавили поле image для каждой картинки) ---
const resultsData = [
  {
    id: 1,
    number: "95%",
    text: "Родителей отмечают значительное снижение напряжения и тревоги у ребенка.",
    // ЗАМЕНИТЕ НА ВАШ ПУТЬ К ФОТО (например: "/photo_calm_child.jpg")
    image: "/IMG_2442.png" 
  },
  {
    id: 2,
    number: "9 из 10",
    text: "Клиентов перестают испытывать панический страх перед общением и публикой.",
    image: "/IMG_2443.png"
  },
  {
    id: 3,
    number: "~80%",
    text: "Снижение частоты и силы запинок. Речь становится плавной и естественной.",
    image: "/IMG_2444.png"
  },
  {
    id: 4,
    number: "100%",
    text: "Рост уверенности в себе.",
    image: "/IMG_2445.png"
  },
  {
    id: 5,
    number: "500+",
    text: "Учеников начали спокойно отвечать у доски, не боясь поднять руку.",
    image: "/IMG_2446.png"
  },
  {
    id: 6,
    number: "3x",
    text: "Меньше навязчивого контроля над каждым словом и звуком.",
    image: "/ChatGPT Image 25 апр. 2026 г., 23_55_21.png"
  }
];

// --- НАСТРОЙКИ АНИМАЦИИ (Точно как в Hero) ---

// Дирижер: управляет появлением дочерних элементов по очереди
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Задержка между появлением блоков
      delayChildren: 0.2,   // Начальная задержка
    }
  }
};

// Элемент: плавно выезжает снизу вверх
const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 0.8
    }
  }
};


export default function ResultsSection() {
  return (
    <section className="resultsSection">
      <div className="resultsSection__container">
        
        <div className="resultsSection__header">
          <h2 className="resultsSection__title">
            ВАШ РЕЗУЛЬТАТ<br /> СО МНОЙ
          </h2>
        </div>

        {/* ГЛАВНЫЙ КОНТЕЙНЕР С АНИМАЦИЕЙ */}
        {/* Используем whileInView, чтобы анимация стартовала при скролле */}
        <motion.div 
          className="results-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // once: true - анимация проиграется только один раз
          // amount: 0.2 - начнется, когда 20% блока появится на экране
          viewport={{ once: true, amount: 0.1 }}
        >
          {resultsData.map((item, index) => {
            // Определяем, четный это элемент или нечетный, для зигзага
            const isEven = index % 2 === 0;

            return (
              // Каждый блок - это motion.div с вариантом анимации
              <motion.div 
                key={item.id} 
                // Добавляем класс 'reversed' для нечетных элементов
                className={`result-pair ${!isEven ? 'result-pair--reversed' : ''}`}
                variants={itemVariants}
              >
                
                {/* БЛОК С КАРТИНКОЙ */}
                <div className="result-pair__image-wrapper">
                  {/* Заглушка, если картинка не найдена */}
                  <div className="image-placeholder" style={{background: `hsl(${index * 60}, 70%, 80%)`}}></div>
                  
                  <img 
                    src={item.image} 
                    alt={`Результат: ${item.text.substring(0, 20)}...`} 
                    className="result-pair__image"
                    // Простой способ скрыть битую картинку и показать цветную заглушку
                    onError={(e) => {
                      e.target.style.display = 'none'; 
                      e.target.previousSibling.style.display = 'block'; 
                    }}
                  />
                </div>

                {/* БЛОК С ТЕКСТОМ */}
                <div className="result-pair__content">
                  <div className="result-pair__number">{item.number}</div>
                  <p className="result-pair__text">{item.text}</p>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Финальная фраза */}
        <div className="resultsSection__quote">
          {"Чем раньше начать работу с заиканием, тем легче вернуть спокойную речь."}
        </div>

      </div>
    </section>
  );
}