// src/components/ContactModal/ContactModal.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// 1. Импортируем хук, чтобы получить функцию очистки
import { useModal } from '@/context/ModalContext';
import './ContactModal.css';

// Пропсы приходят из page.js
export default function ContactModal({ isOpen, onClose, initialService = '' }) {
  // 2. Достаем функцию полной очистки выбора
  const { clearSelection } = useModal();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Блокировка скролла
  useEffect(() => {
    if (isOpen) {
       document.body.style.overflow = 'hidden';
    } else {
       document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Сброс полей формы при закрытии (но НЕ услуги)
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setPhone('');
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Отправка заявки:', { name, phone, service: initialService }); 

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // ВАЖНО: После успешной отправки полностью очищаем выбор,
      // чтобы пропал индикатор в хедере.
      clearSelection(); 

      setTimeout(() => { onClose(); }, 3000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    // ... (весь JSX код модального окна остается без изменений) ...
    <motion.div 
      className="modalOverlay"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}
    >
      <motion.div 
        className="contactModal"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="contactModal__close" onClick={onClose}>✕</button>

        {isSuccess ? (
          <div className="contactModal__success">
            <div className="success-icon">✓</div>
            <h3>Спасибо за заявку!</h3>
            <p>Я свяжусь с вами в ближайшее время.</p>
          </div>
        ) : (
          <>
            <h2 className="contactModal__title">
              {initialService ? 'Запись на услугу' : 'Запись на консультацию'}
            </h2>
            <p className="contactModal__subtitle">
              Оставьте свои контакты, и я свяжусь с вами для уточнения деталей.
            </p>

            <form className="contactForm" onSubmit={handleSubmit}>
              
              {initialService && (
                 <div className="contactForm__field contactForm__field--service">
                   <label>Выбранная услуга</label>
                   <input 
                     type="text" 
                     value={initialService} 
                     readOnly 
                     className="contactForm__input--readonly"
                   />
                 </div>
              )}

              <div className="contactForm__field">
                <label htmlFor="name">Ваше имя</label>
                <input 
                  type="text" id="name" value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться" required 
                />
              </div>

              <div className="contactForm__field">
                <label htmlFor="phone">Номер телефона (или Telegram)</label>
                <input 
                  type="tel" id="phone" value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00" required 
                />
              </div>
              
              <button type="submit" className={`contactForm__btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </button>
              
              <p className="contactForm__policy">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
              </p>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}