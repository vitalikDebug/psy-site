// src/components/ContactModal/ContactModal.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Baby, ArrowRight, CheckCircle2, ChevronDown, MessageSquare, CreditCard } from 'lucide-react';
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
  const [flow, setFlow] = useState('selection'); 
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [consents, setConsents] = useState({ pd: false, mailing: false, oferta: false });
  const [showConsentError, setShowConsentError] = useState(false);

  const [formData, setFormData] = useState({
    type: 'child', 
    name: '',
    lastName: '',
    email: '',
    telegram: '',
    age: '',
    phone: '',
    city: '',
    course: '',
    problemText: '',
    selectedTags: []
  });

  useEffect(() => {
    if (isOpen) {
      if (initialService && initialService.includes('Курс')) {
        setFlow('payment');
      } else {
        setFlow('selection');
      }
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
    if (step === 1) {
      setDirection(-1);
      setFlow('selection');
    } else {
      setDirection(-1);
      setStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFlow('selection');
      setStep(1);
      setFormData({
        type: 'child', name: '', lastName: '', email: '', telegram: '', age: '', phone: '', city: '', course: '', problemText: '', selectedTags: []
      });
      setConsents({ pd: false, mailing: false, oferta: false });
      setShowConsentError(false);
      setIsSubmitting(false);
    }, 300);
  };

  const handleFeedbackSubmit = async () => {
    if (!consents.pd || !consents.oferta) {
      setShowConsentError(true); return;
    }
    setShowConsentError(false);
    setIsSubmitting(true);
    
    try {
      const payload = { ...formData, intent: 'feedback', consents };
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setDirection(1);
        setStep(4);
      } else {
        alert('Ошибка при отправке заявки.');
      }
    } catch (error) {
      alert('Ошибка сети.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinuePayment = async () => {
    if (!consents.pd || !consents.oferta) {
      setShowConsentError(true); return;
    }
    setShowConsentError(false);
    setIsSubmitting(true);

    try {
      const payload = { ...formData, intent: 'payment_attempt', consents };
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      setDirection(1);
      setStep(2);
    } catch (error) {
      setDirection(1);
      setStep(2); 
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

  const progressPercent = flow === 'feedback' && step <= 3 ? ((step - 1) / 2) * 100 : 100;

  return (
    <div className="contactModal__overlay" onClick={handleClose}>
      <motion.div 
        className={`contactModal__card ${isDropdownOpen ? 'dropdown-open' : ''}`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }} 
        dragElastic={{ top: 0, bottom: 0.5 }} 
        onDragEnd={(e, info) => {
          if (info.offset.y > 100 || info.velocity.y > 400) handleClose();
        }}
      >
        <button className="contactModal__close" onClick={handleClose}>
          <X size={20} />
        </button>

        {flow === 'feedback' && step <= 3 && (
          <div className="contactModal__progress-container">
            <div className="contactModal__progress-header">
              <span className="contactModal__step-text">Шаг {step} из 3</span>
            </div>
            <div className="contactModal__progress-bar">
              <div className="contactModal__progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        )}

        <div className="contactModal__body">
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* =========================================
                ЭКРАН ВЫБОРА ДЕЙСТВИЯ
            ========================================= */}
            {flow === 'selection' && (
              <motion.div key="selection" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="contactModal__step">
                <h2 className="contactModal__title">Чем я могу вам помочь?</h2>
                <p className="contactModal__subtitle">Выберите нужное действие, чтобы продолжить.</p>

                <div className="contactModal__type-selector" style={{ flexDirection: 'column', gap: '16px' }}>
                  <button 
                    className="contactModal__type-btn" 
                    onClick={() => { setFlow('payment'); setStep(1); setDirection(1); }}
                    style={{ padding: '24px', borderColor: '#A078C4', backgroundColor: 'rgba(160, 120, 196, 0.05)' }}
                  >
                    <CreditCard size={32} color="#A078C4" />
                    <span style={{ fontSize: '18px', color: '#1e293b' }}>Купить курс</span>
                  </button>

                  <button 
                    className="contactModal__type-btn" 
                    onClick={() => { setFlow('feedback'); setStep(1); setDirection(1); }}
                    style={{ padding: '24px' }}
                  >
                    <MessageSquare size={32} />
                    <span style={{ fontSize: '18px' }}>Задать вопрос / Обратная связь</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* =========================================
                ВЕТКА 1: ОПЛАТА КУРСА
            ========================================= */}
            {flow === 'payment' && step === 1 && (
              <motion.div key="pay-step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="contactModal__step">
                <h2 className="contactModal__title">Оформление</h2>
                <p className="contactModal__subtitle">Выберите формат и заполните данные для доступа.</p>

                <div className="contactModal__input-group" style={{ zIndex: 11, position: 'relative' }}>
                  <label>Что вы хотите приобрести?</label>
                  <div className="contactModal__custom-select">
                    <div className={`contactModal__select-header ${isDropdownOpen ? 'open' : ''}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <span className={formData.course ? 'selected' : 'placeholder'}>
                        {formData.course || 'Выберите тариф или формат...'}
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

                <div className="contactModal__grid-inputs">
                  <div className="contactModal__input-group">
                    <label>Имя</label>
                    <input type="text" placeholder="Иван" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="contactModal__input-group">
                    <label>Фамилия</label>
                    <input type="text" placeholder="Иванов" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                </div>

                <div className="contactModal__input-group">
                  <label>Почта (Сюда придет доступ)</label>
                  <input type="email" placeholder="example@mail.ru" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>

                <div className="contactModal__grid-inputs">
                  <div className="contactModal__input-group">
                    <label>Номер телефона</label>
                    <input type="tel" placeholder="+7 (999) 000-00-00" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="contactModal__input-group">
                    <label>Телеграм</label>
                    <input type="text" placeholder="@username" value={formData.telegram} onChange={(e) => setFormData({...formData, telegram: e.target.value})} />
                  </div>
                </div>

                <div className="contactModal__consents" style={{ marginTop: '10px', paddingTop: '10px' }}>
                  <label className={`contactModal__checkbox-label ${showConsentError && !consents.pd ? 'error' : ''}`}>
                    <input type="checkbox" checked={consents.pd} onChange={(e) => { setConsents({...consents, pd: e.target.checked}); if(e.target.checked) setShowConsentError(false); }} />
                    <span className="contactModal__checkbox-text">Я согласен(а) с <a href="/docs/2.-Политика-ОПД-ИП-ШКАРАНДА-Ю.pdf" target="_blank">Политикой обработки данных</a></span>
                  </label>
                  <label className={`contactModal__checkbox-label ${showConsentError && !consents.oferta ? 'error' : ''}`}>
                    <input type="checkbox" checked={consents.oferta} onChange={(e) => { setConsents({...consents, oferta: e.target.checked}); if(e.target.checked) setShowConsentError(false); }} />
                    <span className="contactModal__checkbox-text">Я согласен(а) с условиями <a href="/docs/1.-Оферта-ИП-ШКАРАНДА-Ю.pdf" target="_blank">Оферты</a></span>
                  </label>
                </div>

                <div className="contactModal__footer two-cols">
                  <button className="contactModal__btn-back" onClick={handlePrev}>Назад</button>
                  <button 
                    className="contactModal__btn-next" 
                    onClick={handleContinuePayment} 
                    disabled={!formData.course || !formData.name || !formData.email || !formData.phone || isSubmitting}
                  >
                    {isSubmitting ? 'Загрузка...' : 'Продолжить'} <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {flow === 'payment' && step === 2 && (
              <motion.div key="pay-step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="contactModal__step" style={{ textAlign: 'center' }}>
                <h2 className="contactModal__title">Оплата курса</h2>
                <p className="contactModal__subtitle">Оплатите удобным способом через безопасную систему ЮKassa.</p>

                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', margin: '20px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  
                  {/* НАСТОЯЩИЙ QR-КОД */}
                  <div style={{ width: '180px', height: '180px', backgroundColor: '#ffffff', borderRadius: '16px', padding: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginBottom: '16px' }}>
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://yookassa.ru/my/i/ahx1Ca_6aboC/l')}`} 
                      alt="QR код для оплаты" 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                  </div>
                  
                  <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>2 400 ₽</h3>

                  {/* КНОПКА ДЛЯ ТЕЛЕФОНОВ */}
                  <a 
                    href="https://yookassa.ru/my/i/ahx1Ca_6aboC/l" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="contactModal__btn-next" 
                    style={{ width: '100%', textDecoration: 'none', justifyContent: 'center', backgroundColor: '#1e293b', color: '#ffffff' }}
                  >
                    Оплатить картой или СБП
                  </a>
                </div>

                <div className="contactModal__footer two-cols">
                  <button className="contactModal__btn-back" onClick={handlePrev}>Назад</button>
                  <button 
                    className="contactModal__btn-next" 
                    onClick={() => {setDirection(1); setStep(3);}}
                  >
                    Я оплатил(а)
                  </button>
                </div>
              </motion.div>
            )}

            {/* ВОТ ЭТОТ ШАГ СЛУЧАЙНО БЫЛ УДАЛЕН. ВЕРНУЛ ЕГО! */}
            {flow === 'payment' && step === 3 && (
              <motion.div key="pay-step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="contactModal__step success-step">
                <div className="contactModal__success-icon">
                  <CheckCircle2 size={60} strokeWidth={1.5} />
                </div>
                <h2 className="contactModal__title">Спасибо за оплату!</h2>
                <div className="contactModal__subtitle" style={{textAlign: 'center', lineHeight: '1.6', fontSize: '15px'}}>
                  <p>Добрый день! Спасибо за оплату курса.</p>
                  <p style={{ marginTop: '12px' }}>В течение 12 часов с вами свяжется менеджер и откроет доступ к курсу.</p>
                  <p style={{ marginTop: '12px', padding: '16px', background: '#f8fafc', borderRadius: '16px' }}>
                    Если хотите получить доступ быстрее — напишите нам в Телеграм <br/>
                    <a href="https://t.me/julia_logopsiholog" target="_blank" rel="noreferrer" style={{color: '#A078C4', fontWeight: 'bold'}}>@julia_logopsiholog</a> 
                    <br/>или в МАКС<br/>
                    <a href="https://iimax.ru/julia_logopsiholog" target="_blank" rel="noreferrer" style={{color: '#A078C4', fontWeight: 'bold'}}>https://iimax.ru</a>
                  </p>
                </div>
                <div className="contactModal__footer">
                  <button className="contactModal__btn-next full-width" onClick={handleClose}>Понятно, спасибо</button>
                </div>
              </motion.div>
            )}

            {/* =========================================
                ВЕТКА 2: ОБРАТНАЯ СВЯЗЬ
            ========================================= */}
            {flow === 'feedback' && step === 1 && (
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

                <div className="contactModal__footer two-cols">
                  <button className="contactModal__btn-back" onClick={handlePrev}>Назад</button>
                  <button className="contactModal__btn-next" onClick={handleNext} disabled={!formData.name.trim()}>
                    Далее <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {flow === 'feedback' && step === 2 && (
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

                <div className="contactModal__input-group" style={{ zIndex: 10, position: 'relative' }}>
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

            {flow === 'feedback' && step === 3 && (
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

                <div className="contactModal__consents">
                  <label className={`contactModal__checkbox-label ${showConsentError && !consents.pd ? 'error' : ''}`}>
                    <input type="checkbox" checked={consents.pd} onChange={(e) => { setConsents({...consents, pd: e.target.checked}); if (e.target.checked) setShowConsentError(false); }} />
                    <span className="contactModal__checkbox-text">Я ознакомлен(а) и согласен(а) с <a href="/docs/2.-Политика-ОПД-ИП-ШКАРАНДА-Ю.pdf" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>Политикой обработки ПД</a></span>
                  </label>
                  <label className={`contactModal__checkbox-label ${showConsentError && !consents.oferta ? 'error' : ''}`}>
                    <input type="checkbox" checked={consents.oferta} onChange={(e) => { setConsents({...consents, oferta: e.target.checked}); if (e.target.checked) setShowConsentError(false); }} />
                    <span className="contactModal__checkbox-text">Я ознакомлен(а) и согласен(а) с условиями <a href="/docs/1.-Оферта-ИП-ШКАРАНДА-Ю.pdf" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>Публичной оферты</a></span>
                  </label>
                  {showConsentError && <div className="contactModal__consent-error-msg">Необходимо ваше согласие с обязательными пунктами</div>}
                </div>

                <div className="contactModal__footer two-cols">
                  <button className="contactModal__btn-back" onClick={handlePrev} disabled={isSubmitting}>Назад</button>
                  <button className={`contactModal__btn-submit ${(!consents.pd || !consents.oferta) ? 'btn-disabled' : ''}`} onClick={handleFeedbackSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
                  </button>
                </div>
              </motion.div>
            )}

            {flow === 'feedback' && step === 4 && (
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