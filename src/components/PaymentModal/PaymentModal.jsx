'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Globe, Wallet, ShieldCheck, ArrowRight } from 'lucide-react';
import './PaymentModal.css';

export default function PaymentModal({ isOpen, onClose, tariffName, price }) {
  if (!isOpen) return null;

  // Имитация отправки на платежный шлюз
  const handlePayment = (method) => {
    console.log(`Инициация оплаты тарифа: ${tariffName}, Метод: ${method}`);
    alert(`Здесь будет переход на страницу оплаты (${method}) для тарифа "${tariffName}" за ${price} ₽`);
    // В реальности здесь будет fetch-запрос к твоему API (например, /api/yookassa), 
    // который вернет URL для оплаты, и ты сделаешь window.location.href = url;
  };

  return (
    <div className="paymentModal__overlay" onClick={onClose}>
      <motion.div 
        className="paymentModal__card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="paymentModal__close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="paymentModal__header">
          <div className="paymentModal__security-badge">
            <ShieldCheck size={16} /> Безопасная оплата
          </div>
          <h2 className="paymentModal__title">Оформление заказа</h2>
          <div className="paymentModal__order-info">
            <span className="paymentModal__tariff">{tariffName}</span>
            <span className="paymentModal__price">{price} ₽</span>
          </div>
        </div>

        <div className="paymentModal__body">
          <p className="paymentModal__subtitle">Выберите удобный способ оплаты:</p>

          <div className="paymentModal__methods">
            
            {/* Оплата картой РФ */}
            <button className="paymentModal__method-btn" onClick={() => handlePayment('Карта РФ')}>
              <div className="paymentModal__method-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                <CreditCard size={24} />
              </div>
              <div className="paymentModal__method-text">
                <span className="paymentModal__method-title">Картой банка РФ</span>
                <span className="paymentModal__method-desc">Visa, Mastercard, МИР, СБП</span>
              </div>
              <ArrowRight size={20} className="paymentModal__method-arrow" />
            </button>

            {/* Рассрочка */}
            <button className="paymentModal__method-btn" onClick={() => handlePayment('Долями / Рассрочка')}>
              <div className="paymentModal__method-icon" style={{ background: '#fef08a', color: '#ca8a04' }}>
                <Wallet size={24} />
              </div>
              <div className="paymentModal__method-text">
                <span className="paymentModal__method-title">Долями или Рассрочка</span>
                <span className="paymentModal__method-desc">Без переплат, от банка Тинькофф</span>
              </div>
              <ArrowRight size={20} className="paymentModal__method-arrow" />
            </button>

            {/* Иностранные карты */}
            <button className="paymentModal__method-btn" onClick={() => handlePayment('Карта Мира')}>
              <div className="paymentModal__method-icon" style={{ background: '#fce7f3', color: '#db2777' }}>
                <Globe size={24} />
              </div>
              <div className="paymentModal__method-text">
                <span className="paymentModal__method-title">Зарубежной картой</span>
                <span className="paymentModal__method-desc">Оплата из любой точки мира</span>
              </div>
              <ArrowRight size={20} className="paymentModal__method-arrow" />
            </button>

          </div>

          <p className="paymentModal__terms">
            Нажимая на кнопку оплаты, вы соглашаетесь с условиями <a href="/docs/1.-Оферта-ИП-ШКАРАНДА-Ю.pdf" target="_blank">Оферты</a> и <a href="/docs/2.-Политика-ОПД-ИП-ШКАРАНДА-Ю.pdf" target="_blank">Политикой конфиденциальности</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}