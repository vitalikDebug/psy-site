// src/components/ResultsSection/ResultsSection.jsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'; // ВАЖНО: Импортируем оптимизированный компонент Next.js
import './ResultSection.css';

const resultsData = [
  {
    id: 1,
    number: "95%",
    text: "Родителей отмечают значительное снижение напряжения и тревоги у ребенка.",
    image: "/parents.png" 
  },
  {
    id: 2,
    number: "9 из 10",
    text: "Клиентов перестают испытывать панический страх перед общением и публикой.",
    image: "/clientWin.png"
  },
  {
    id: 3,
    number: "~80%",
    text: "Снижение частоты и силы запинок. Речь становится плавной и естественной.",
    image: "/growthOfCon.png"
  },
  {
    id: 4,
    number: "100%",
    text: "Рост уверенности в себе.",
    image: "/growing.png"
  },
  {
    id: 5,
    number: "500+",
    text: "Учеников начали спокойно отвечать у доски, не боясь поднять руку.",
    image: "/startingTest.png"
  },
  {
    id: 6,
    number: "3x",
    text: "Меньше навязчивого контроля над каждым словом и звуком.",
    image: "/lessControll.png"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 20, duration: 0.8 }
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

        <motion.div 
          className="results-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {resultsData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={item.id} 
                className={`result-pair ${!isEven ? 'result-pair--reversed' : ''}`}
                variants={itemVariants}
              >
                
                {/* БЛОК С КАРТИНКОЙ */}
                <div 
                  className="result-pair__image-wrapper" 
                  // position: relative обязательно нужен для работы fill={true} у Next/Image
                  style={{ position: 'relative', overflow: 'hidden' }} 
                >
                  {/* Цветная заглушка, которая видна доли секунды, пока грузится картинка */}
                  <div 
                    className="image-placeholder" 
                    style={{ position: 'absolute', inset: 0, background: `hsl(${index * 60}, 70%, 90%)`, zIndex: 0 }}
                  ></div>
                  
                  {/* ИСПОЛЬЗУЕМ NEXT/IMAGE */}
                  <Image 
                    src={item.image} 
                    alt={`Результат: ${item.text.substring(0, 20)}...`} 
                    fill={true} // Картинка сама растянется по размеру контейнера wrapper
                    sizes="(max-width: 768px) 100vw, 50vw" // Подсказка браузеру для экономии трафика
                    className="result-pair__image"
                    style={{ objectFit: 'cover', zIndex: 1 }} // Чтобы картинка красиво заполняла блок и была поверх заглушки
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

        <div className="resultsSection__quote">
          {"Чем раньше начать работу с заиканием, тем легче вернуть спокойную речь."}
        </div>

      </div>
    </section>
  );
}