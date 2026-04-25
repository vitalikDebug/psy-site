// src/components/CauseSection/CauseSection.jsx
'use client';

import { motion } from 'framer-motion';
import './CauseSection.css';

// --- НАСТРОЙКИ АНИМАЦИИ ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Задержка между вылетом блоков
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function CauseSection() {
  return (
    <section className="causeSection" id="cause">
      <div className="causeSection__container">
        
        <h2 className="causeSection__title">
          ПОЧЕМУ ВОЗНИКАЕТ <br /> ЗАИКАНИЕ
        </h2>

        {/* Главный контейнер с анимацией при скролле */}
        <motion.div 
          className="causeGrid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          
          {/* Главная мысль (Широкий блок сверху) */}
          <motion.div className="causeItem causeItem--intro" variants={itemVariants}>
            <h3 className="causeItem__title">Это не проблема звуков</h3>
            <p className="causeItem__text">
              Заикание — это реакция нервной системы на напряжение. Когда человек начинает фиксировать внимание на речи, усиливается контроль, появляется страх ошибиться, и именно это напряжение начинает мешать свободному и естественному потоку речи
            </p>
          </motion.div>

          {/* Шаг 1 */}
          <motion.div className="causeItem causeItem--step" variants={itemVariants}>
            <div className="causeItem__step-num">01</div>
            <h3 className="causeItem__title">Напряжение</h3>
            <p className="causeItem__text">
              Возникает волнение перед общением, звонком или сложной ситуацией. Тело напрягается, связки зажимаются.
            </p>
          </motion.div>

          {/* Шаг 2 */}
          <motion.div className="causeItem causeItem--step" variants={itemVariants}>
            <div className="causeItem__step-num">02</div>
            <h3 className="causeItem__title">Запинка</h3>
            <p className="causeItem__text">
              Из-за спазма мышц речевого аппарата происходит сбой. Слово «застревает», нарушается плавность дыхания.
            </p>
          </motion.div>

          {/* Шаг 3 */}
          <motion.div className="causeItem causeItem--step" variants={itemVariants}>
            <div className="causeItem__step-num">03</div>
            <h3 className="causeItem__title">Страх</h3>
            <p className="causeItem__text">
              Мозг моментально фиксирует неудачу. Формируется стойкий страх перед конкретными словами, звуками или людьми.
            </p>
          </motion.div>

          {/* Шаг 4 */}
          <motion.div className="causeItem causeItem--step" variants={itemVariants}>
            <div className="causeItem__step-num">04</div>
            <h3 className="causeItem__title">Контроль</h3>
            <p className="causeItem__text">
              Попытка сказать «идеально правильно» и избежать запинки приводит к колоссальному стрессу и... новому напряжению.
            </p>
          </motion.div>

          {/* Итог (Широкий блок снизу) */}
          <motion.div className="causeItem causeItem--outro" variants={itemVariants}>
             <h3 className="causeItem__title">Круг замыкается</h3>
             <p className="causeItem__text">
              Одно цепляется за другое, усиливая симптом с каждым разом. Именно поэтому так важно работать с первопричиной — страхом и напряжением, а не только механически тренировать речь.
             </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}