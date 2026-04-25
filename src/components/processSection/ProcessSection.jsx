// src/components/ProcessSection/ProcessSection.jsx
'use client';

import { motion } from 'framer-motion';
import { Ear, Search, Wind, Brain, Repeat, Rocket } from 'lucide-react';
import './ProcessSection.css';

const processData = [
  {
    number: '1',
    title: 'Внимательно слушаю',
    description: 'Всё начинается с вашей истории. Я обращаю внимание на дыхание, паузы, интонации и скрытые эмоции, чтобы понять истинную картину.',
    icon: Ear,
    color: '#A078C4' // Фирменный лавандовый
  },
  {
    number: '2',
    title: 'Исследую причины',
    description: 'Понимаю, как и в каких ситуациях возникает напряжение. Мы находим триггеры, мысли и страхи, запускающие механизм заикания.',
    icon: Search,
    color: '#8FA0D6' // Мягкий синий
  },
  {
    number: '3',
    title: 'Снимаю напряжение',
    description: 'Помогаю сформировать навык расслабления — учиться слышать своё тело, замечать напряжение и постепенно его отпускать. Убрать Вы научитесь физически расслаблять речевой аппарат, шею и тело..',
    icon: Wind,
    color: '#78B9C4' // Мягкий бирюзовый
  },
  {
    number: '4',
    title: 'Работаю с мышлением',
    description: ' Меняем отношение к восприятию себя и своей речи',
    icon: Brain,
    color: '#6B9AC4' // Глубокий голубой
  },
  {
    number: '5',
    title: 'Новая привычка',
    description: 'Шаг за шагом мы выстраиваем новый паттерн речи. Это создание комфортного ритма и темпа, который станет естественным.',
    icon: Repeat,
    color: '#B088C4' // Розовато-фиолетовый
  },
  {
    number: '6',
    title: 'Перенос в жизнь',
    description: 'Формирование навыков коммуникации в реальной жизни.',
    icon: Rocket,
    color: '#8C52FF' // Яркий акцентный фиолетовый
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

// Анимация для выезда справа налево
const variantsRight = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

// Анимация для выезда слева направо
const variantsLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function ProcessSection() {
  return (
    <section className="processSection" id="process">
      <div className="processSection__container">
        
        <div className="processSection__header">
          <h2 className="processSection__title">КАК МЫ ДОБИВАЕМСЯ <br/> РЕЗУЛЬТАТА</h2>
          <p className="processSection__subtitle">
            Прозрачный и понятный процесс работы на пути к свободной речи.
          </p>
        </div>

        {/* --- ЧЕКЛИСТ --- */}
        <motion.div 
          className="processChecklist"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {processData.map((item, index) => {
            // Чередуем выравнивание: нечетные справа, четные слева
            const isRightAligned = index % 2 === 0;

            return (
              <motion.div 
                key={index} 
                className={`processRow ${isRightAligned ? 'processRow--right' : 'processRow--left'}`}
                variants={isRightAligned ? variantsRight : variantsLeft}
              >
                {/* БЕЛАЯ КАРТОЧКА С КОНТЕНТОМ */}
                <div className="processCard">
                  <div className="processCard__icon" style={{ color: item.color }}>
                    <item.icon size={36} strokeWidth={1.5} />
                  </div>
                  <div className="processCard__text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>

                {/* ЦВЕТНАЯ ПЛАШКА С ЦИФРОЙ */}
                <div className="processNumber" style={{ backgroundColor: item.color }}>
                  {item.number}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}