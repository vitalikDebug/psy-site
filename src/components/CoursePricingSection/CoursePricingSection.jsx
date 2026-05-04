// src/components/CoursePricingSection/CoursePricingSection.jsx
'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import './CoursePricingSection.css';
import { useModal } from '@/context/ModalContext'; // <-- ИМПОРТ КОНТЕКСТА

// Анимация для появления блока при скролле
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

export default function CoursePricingSection() {
  const { openModal } = useModal(); // <-- ДОСТАЕМ ФУНКЦИЮ ОТКРЫТИЯ МОДАЛКИ

  return (
    <section id="pricing" className="pricingSection">
      <motion.div 
        className="pricingSection__container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="pricingSection__header">
          <h2 className="pricingSection__title">Тарифы и участие</h2>
          <p className="pricingSection__subtitle">Выберите формат, который подходит именно вашей семье</p>
        </div>

        <div className="pricingGrid">
          
          {/* ТАРИФ 1: СВЕТЛЫЙ (Базовый) */}
          <motion.div variants={cardVariants} className="priceCard priceCard--light">
            <div className="priceCard__header">
              <span className="priceCard__name">Самостоятельный</span>
              <span className="priceCard__tag priceCard__tag--light">Базовый доступ</span>
            </div>
            
            <h3 className="priceCard__catchphrase">
              Для тех, кто готов <br/>двигаться в своём темпе.
            </h3>
            
            <div className="priceCard__price-block">
              <div className="priceCard__price">3 000 ₽</div>
              {/* ДОБАВЛЯЕМ onClick */}
              <button 
                className="priceCard__btn priceCard__btn--dark"
                onClick={() => openModal('Курс: Самостоятельный тариф')}
              >
                Выбрать <ArrowRight size={18} />
              </button>
            </div>

            <ul className="priceCard__features">
              <li><Check size={16} /> Доступ ко всем 10 модулям</li>
              <li><Check size={16} /> Доступ к материалам на 3 месяца</li>
              <li><Check size={16} /> Самостоятельное изучение</li>
              <li className="disabled"><Check size={16} /> Без проверки заданий</li>
            </ul>
          </motion.div>

          {/* ТАРИФ 2: ТЕМНЫЙ (С поддержкой) */}
          <motion.div variants={cardVariants} className="priceCard priceCard--dark">
            <div className="priceCard__header">
              <span className="priceCard__name">С поддержкой</span>
              <span className="priceCard__tag priceCard__tag--dark">Ограниченно мест</span>
            </div>
            
            <h3 className="priceCard__catchphrase">
              С моей личной обратной <br/>связью и разбором.
            </h3>
            
            <div className="priceCard__price-block">
              <div className="priceCard__price">7 000 ₽</div>
              {/* ДОБАВЛЯЕМ onClick */}
              <button 
                className="priceCard__btn priceCard__btn--light"
                onClick={() => openModal('Курс: Тариф С поддержкой')}
              >
                Выбрать <ArrowRight size={18} />
              </button>
            </div>

            <ul className="priceCard__features">
              <li><Check size={16} /> Всё из базового тарифа</li>
              <li><Check size={16} /> Доступ к материалам на 6 месяцев</li>
              <li><Check size={16} /> Проверка домашних заданий</li>
              <li><Check size={16} /> Закрытый чат участников</li>
            </ul>
          </motion.div>

          {/* ТАРИФ 3: ШИРОКИЙ (VIP / Личное ведение) */}
          <motion.div variants={cardVariants} className="priceCard priceCard--wide">
            <div className="priceCard__wide-content">
              <div>
                <div className="priceCard__header">
                  <span className="priceCard__name">Личное ведение</span>
                  <span className="priceCard__tag priceCard__tag--accent">2 места в месяц</span>
                </div>
                <h3 className="priceCard__catchphrase">
                  Максимальное погружение <br/>и индивидуальный маршрут.
                </h3>
              </div>
              
              <div className="priceCard__price-block priceCard__price-block--wide">
                <div className="priceCard__price">13 000 ₽</div>
                {/* ДОБАВЛЯЕМ onClick */}
                <button 
                  className="priceCard__btn priceCard__btn--accent"
                  onClick={() => openModal('Курс: Личное ведение (VIP)')}
                >
                  Записаться <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <ul className="priceCard__features priceCard__features--wide">
              <li><Check size={16} /> Полный доступ к курсу</li>
              <li><Check size={16} /> 2 личные онлайн-консультации</li>
              <li><Check size={16} /> Индивидуальный план работы</li>
              <li><Check size={16} /> Связь в личном мессенджере</li>
            </ul>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}