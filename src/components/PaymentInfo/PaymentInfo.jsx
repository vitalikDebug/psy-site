// src/components/PaymentInfo/PaymentInfo.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Receipt, Wallet, ArrowRight, CreditCard, Smartphone, Globe, X, MessageCircle } from 'lucide-react';
import './PaymentInfo.css';
import { useModal } from '@/context/ModalContext'; // Для открытия формы заявки
import PaymentModal from '../PaymentModal/PaymentModal'; // Подключаем твою модалку оплаты

export default function PaymentInfo() {
  const { openModal } = useModal();
  
  // Состояния для модалки оплаты и всплывающего уведомления
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [showHesitationToast, setShowHesitationToast] = useState(false);

  // Обработчик закрытия окна оплаты
  const handleClosePayment = () => {
    setIsPaymentModalOpen(false);
    
    // Как только клиент закрыл окно оплаты, через секунду показываем ему уведомление
    setTimeout(() => {
      setShowHesitationToast(true);
    }, 800);

    // Автоматически прячем уведомление через 15 секунд, чтобы не бесило
    setTimeout(() => {
      setShowHesitationToast(false);
    }, 15000);
  };

  return (
    <section className="paymentInfo" id="payment">
      <div className="paymentInfo__container">
        
        <div className="paymentInfo__header">
          <h2 className="paymentInfo__title">Официально и безопасно</h2>
          <p className="paymentInfo__subtitle">Прозрачные условия оплаты курса из любой точки мира</p>
        </div>

        <div className="paymentInfo__bento">
          
          <motion.div className="bento-card bento-card--wide" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bento-card__content">
              <div className="bento-card__icon-wrapper yellow">
                <Globe size={20} />
              </div>
              <h3 className="bento-card__title">Оплата из любой точки мира</h3>
              <p className="bento-card__text">
                Оплачивайте курс безопасно и без комиссии. Мы принимаем карты любых банков РФ, а также зарубежные карты через защищенный платежный шлюз. Ваши данные надежно зашифрованы по стандартам банков.
              </p>
            </div>
            <div className="bento-card__visual">
              <div className="mock-ui">
                <div className="mock-ui__header">
                  <span className="mock-ui__dot"></span>
                  <span className="mock-ui__dot"></span>
                  <span className="mock-ui__dot"></span>
                </div>
                <div className="mock-ui__body">
                  <div className="mock-ui__line w-70"></div>
                  <div className="mock-ui__line w-40"></div>
                  <div className="mock-ui__skeleton-card">
                    <CreditCard size={24} color="#cbd5e1" />
                    <span className="mock-ui__price">от 3 000 ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="bento-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="bento-card__icon-wrapper blue">
              <Receipt size={20} />
            </div>
            <h3 className="bento-card__title">Мгновенный чек</h3>
            <p className="bento-card__text">
              Сразу после оплаты вы получите официальный фискальный чек на email. Я работаю как ИП с соблюдением 152-ФЗ.
            </p>
          </motion.div>

          <motion.div className="bento-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="bento-card__icon-wrapper green">
              <Wallet size={20} />
            </div>
            <h3 className="bento-card__title">Без переплат</h3>
            <p className="bento-card__text">
              Доступна оплата частями через сервис «Долями» или беспроцентная рассрочка от банков-партнеров.
            </p>
          </motion.div>

          {/* ТЕМНАЯ КАРТОЧКА */}
          <motion.div className="bento-card bento-card--dark" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h3 className="bento-card__title dark-title">Начать обучение</h3>
            <p className="bento-card__text dark-text">
              Выберите подходящий формат работы и перейдите к безопасной оплате.
            </p>
            {/* КНОПКА ОТКРЫВАЕТ PAYMENT MODAL */}
            <button 
              className="bento-card__btn" 
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Перейти к оплате <ArrowRight size={18} />
            </button>
          </motion.div>

        </div>

        <div className="paymentInfo__brands">
          <p className="brands-title">Поддерживаемые способы оплаты</p>
          <div className="brands-grid">
            <div className="brand-item"><CreditCard size={18} /> Visa / Mastercard</div>
            <div className="brand-item"><CreditCard size={18} /> МИР</div>
            <div className="brand-item"><Smartphone size={18} /> СБП</div>
            <div className="brand-item"><Wallet size={18} /> Долями</div>
            <div className="brand-item"><ShieldCheck size={18} /> Рассрочка 0%</div>
          </div>
        </div>

      </div>

      {/* Рендерим модалку оплаты (если открыта) */}
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={handleClosePayment} 
        tariffName="Курс для родителей" 
        price="от 3 000" 
      />

      {/* ВСПЛЫВАЮЩЕЕ УВЕДОМЛЕНИЕ ПРИ ЗАКРЫТИИ ОПЛАТЫ */}
      <AnimatePresence>
        {showHesitationToast && (
          <motion.div 
            className="hesitation-toast"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            <button className="hesitation-toast__close" onClick={() => setShowHesitationToast(false)}>
              <X size={16} />
            </button>
            <div className="hesitation-toast__icon">
              <MessageCircle size={24} />
            </div>
            <div className="hesitation-toast__content">
              <h4>Остались сомнения?</h4>
              <p>Оставьте заявку, я свяжусь с вами и отвечу на все вопросы без навязывания.</p>
              <button 
                className="hesitation-toast__btn"
                onClick={() => {
                  setShowHesitationToast(false); // Прячем тост
                  openModal('Вопрос перед оплатой'); // Открываем ContactModal
                }}
              >
                Задать вопрос
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}