// src/components/ContactModal/ContactModal.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Baby, ArrowRight, ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';
import './ContactModal.css';

const courseOptions = [
  'Консультация',
  'Курс для родителей',
  'Мини-интенсив',
  'Полный интенсив',
  'Для взрослых'
];

const problemTags = [
  'Запинки начались недавно',
  'Заикание с детства',
  'Страх публичных выступлений',
  'Ступор при звонках',
  'Телесные зажимы',
  'Ребенок избегает общения',
  'Волнение перед школой'
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0
  })
};

export default function ContactModal({ isOpen, onClose, initialService }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Состояние для юридических галочек
  const [consents, setConsents] = useState({
    pd: false,      // Персональные данные (обязательно)
    mailing: false, // Рассылка (необязательно)
    oferta: false   // Оферта (обязательно)
  });
  const [showConsentError, setShowConsentError] = useState(false); // Для красной подсветки

  const [formData, setFormData] = useState({
    type: 'child', 
    name: '',
    age: '',
    phone: '',
    city: '',
    course: '',
    problemText: '',
    selectedTags: []
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setDirection(1);
      setFormData(prev => ({
        ...prev,
        course: initialService || '',
        type: initialService === 'Для взрослых' ? 'adult' : 'child'
      }));
    }
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const handleNext = () => {
    setDirection(1);
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setFormData({
        type: 'child', name: '', age: '', phone: '', city: '', course: '', problemText: '', selectedTags: []
      });
      // Сбрасываем галочки при закрытии
      setConsents({ pd: false, mailing: false, oferta: false });
      setShowConsentError(false);
      setIsSubmitting(false);
    }, 300);
  };

  const handleSubmit = async () => {
    // 1. Проверяем обязательные чекбоксы
    if (!consents.pd || !consents.oferta) {
      setShowConsentError(true);
      return; // Прерываем отправку
    }
    
    // Если всё ок, убираем ошибку и начинаем отправку
    setShowConsentError(false);
    setIsSubmitting(true);
    
    try {
      // Собираем данные формы + согласия, чтобы они тоже ушли на сервер (для истории)
      const payload = {
        ...formData,
        consents
      };

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setDirection(1);
        setStep(4);
      } else {
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Произошла ошибка сети. Проверьте подключение к интернету.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tag) => {
    setFormData(prev => {
      const tags = prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag];
      return { ...prev, selectedTags: tags };
    });
  };

  const progressPercent = step <= 3 ? ((step - 1) / 2) * 100 : 100;

  return (
    <div className="contactModal__overlay" onClick={handleClose}>
      <motion.div 
        className={`contactModal__card ${isDropdownOpen ? 'dropdown-open' : ''}`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="contactModal__close" onClick={handleClose}>
          <X size={20} />
        </button>

        {step <= 3 && (
          <div className="contactModal__progress-container">
            <div className="contactModal__progress-header">
              <span className="contactModal__step-text">Шаг {step} из 3</span>
            </div>
            <div className="contactModal__progress-bar">
              <div 
                className="contactModal__progress-fill" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="contactModal__body">
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* ШАГ 1 */}
            {step === 1 && (
              <motion.div key="step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="contactModal__step">
                <h2 className="contactModal__title">Давайте познакомимся</h2>
                <p className="contactModal__subtitle">Расскажите, для кого вы ищете помощь, чтобы мы подобрали правильный подход.</p>

                <div className="contactModal__type-selector">
                  <button className={`contactModal__type-btn ${formData.type === 'child' ? 'active' : ''}`} onClick={() => setFormData({...formData, type: 'child'})}>
                    <Baby size={24} />
                    <span>Ребёнок</span>
                  </button>
                  <button className={`contactModal__type-btn ${formData.type === 'adult' ? 'active' : ''}`} onClick={() => setFormData({...formData, type: 'adult'})}>
                    <User size={24} />
                    <span>Взрослый</span>
                  </button>
                </div>

                <div className="contactModal__input-group">
                  <label>Как к вам обращаться?</label>
                  <input type="text" placeholder="Ваше имя" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="contactModal__footer">
                  <button className="contactModal__btn-next full-width" onClick={handleNext} disabled={!formData.name.trim()}>
                    Далее <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ШАГ 2 */}
            {step === 2 && (
              <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="contactModal__step">
                <h2 className="contactModal__title">Детали и контакты</h2>
                <p className="contactModal__subtitle">Оставьте данные для связи и выберите интересующий формат.</p>

                <div className="contactModal__grid-inputs">
                  <div className="contactModal__input-group">
                    <label>Возраст ({formData.type === 'child' ? 'ребёнка' : 'ваш'})</label>
                    <input type="text" placeholder="Например, 5 лет" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
                  </div>
                  <div className="contactModal__input-group">
                    <label>Ваш город / Часовой пояс</label>
                    <input type="text" placeholder="Например, Москва" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  </div>
                </div>

                <div className="contactModal__input-group">
                  <label>Телефон или Telegram</label>
                  <input type="text" placeholder="+7 (999) 000-00-00 или @username" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>

                <div className="contactModal__input-group" style={{ zIndex: 10 }}>
                  <label>Выбранный формат</label>
                  <div className="contactModal__custom-select">
                    <div className={`contactModal__select-header ${isDropdownOpen ? 'open' : ''}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <span className={formData.course ? 'selected' : 'placeholder'}>
                        {formData.course || 'Выберите формат работы...'}
                      </span>
                      <ChevronDown size={18} className="contactModal__select-icon" />
                    </div>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.ul className="contactModal__select-dropdown" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                          {courseOptions.map(opt => (
                            <li key={opt} className={`contactModal__select-option ${formData.course === opt ? 'active' : ''}`} onClick={() => { setFormData({...formData, course: opt}); setIsDropdownOpen(false); }}>
                              {opt}
                              {formData.course === opt && <CheckCircle2 size={16} className="contactModal__select-check" />}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div> 
                </div>

                <div className="contactModal__footer two-cols">
                  <button className="contactModal__btn-back" onClick={handlePrev}>Назад</button>
                  <button className="contactModal__btn-next" onClick={handleNext} disabled={!formData.phone.trim()}>
                    Далее <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ШАГ 3 (ФИНАЛ С ГАЛОЧКАМИ) */}
            {step === 3 && (
              <motion.div key="step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="contactModal__step">
                <h2 className="contactModal__title">Что вас беспокоит?</h2>
                <p className="contactModal__subtitle">Выберите подходящие варианты или опишите ситуацию своими словами.</p>

                <div className="contactModal__tags-cloud">
                  {problemTags.map(tag => (
                    <button key={tag} className={`contactModal__tag ${formData.selectedTags.includes(tag) ? 'active' : ''}`} onClick={() => toggleTag(tag)}>
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="contactModal__input-group" style={{ marginTop: '20px' }}>
                  <label>Дополнительные комментарии (необязательно)</label>
                  <textarea placeholder="Например, запинки появляются только когда ребенок волнуется..." value={formData.problemText} onChange={(e) => setFormData({...formData, problemText: e.target.value})} rows={3}></textarea>
                </div>

                {/* 152-ФЗ БЛОК СОГЛАСИЙ */}
                <div className="contactModal__consents">
                  
                  {/* Чекбокс 1: ОПД (Обязательный) */}
                  <label className={`contactModal__checkbox-label ${showConsentError && !consents.pd ? 'error' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={consents.pd} 
                      onChange={(e) => {
                        setConsents({...consents, pd: e.target.checked});
                        if (e.target.checked) setShowConsentError(false); // убираем ошибку, если исправил
                      }} 
                    />
                    <span className="contactModal__checkbox-text">
                      Я ознакомлен(а) и согласен(а) с <a href="/docs/2.-Политика-ОПД-ИП-ШКАРАНДА-Ю.pdf" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>Политикой обработки персональных данных</a>
                    </span>
                  </label>

                  {/* Чекбокс 2: Оферта (Обязательный) */}
                  <label className={`contactModal__checkbox-label ${showConsentError && !consents.oferta ? 'error' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={consents.oferta} 
                      onChange={(e) => {
                        setConsents({...consents, oferta: e.target.checked});
                        if (e.target.checked) setShowConsentError(false);
                      }} 
                    />
                    <span className="contactModal__checkbox-text">
                      Я ознакомлен(а) и согласен(а) с условиями <a href="/docs/1.-Оферта-ИП-ШКАРАНДА-Ю.pdf" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>Публичной оферты</a>
                    </span>
                  </label>

                  {/* Чекбокс 3: Рассылка (Необязательный) */}
                  <label className="contactModal__checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={consents.mailing} 
                      onChange={(e) => setConsents({...consents, mailing: e.target.checked})} 
                    />
                    <span className="contactModal__checkbox-text">
                      Я согласен(а) получать информационные сообщения и материалы от ИП Шкаранда Ю.В.
                    </span>
                  </label>

                  {/* Сообщение об ошибке */}
                  {showConsentError && (
                    <div className="contactModal__consent-error-msg">
                      Необходимо ваше согласие с обязательными пунктами (подсвечены красным)
                    </div>
                  )}
                </div>

                <div className="contactModal__footer two-cols">
                  <button className="contactModal__btn-back" onClick={handlePrev} disabled={isSubmitting}>
                    Назад
                  </button>
                  <button 
                    className={`contactModal__btn-submit ${(!consents.pd || !consents.oferta) ? 'btn-disabled' : ''}`} 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ШАГ 4: УСПЕХ */}
            {step === 4 && (
              <motion.div key="step4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="contactModal__step success-step">
                <div className="contactModal__success-icon">
                  <CheckCircle2 size={60} strokeWidth={1.5} />
                </div>
                <h2 className="contactModal__title">Заявка отправлена!</h2>
                <p className="contactModal__subtitle" style={{textAlign: 'center'}}>
                  Спасибо, {formData.name}! Я получила вашу заявку и свяжусь с вами по указанным контактам в ближайшее время.
                </p>
                <div className="contactModal__footer">
                  <button className="contactModal__btn-next full-width" onClick={handleClose}>Закрыть окно</button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}