// src/app/course/page.jsx
'use client';

import { Play } from 'lucide-react'; // Импортируем иконку Play
import './CoursePage.css';
import { useModal } from '@/context/ModalContext';

export default function CoursePage() {
  const { openModal } = useModal();

  // Данные курса (в будущем можно вынести в отдельный файл)
  const courseData = {
    title: 'КУРС ДЛЯ РОДИТЕЛЕЙ “РЕЧЬ БЕЗ ЗАИКАНИЯ”',
    suitableFor: [
      'Ребёнок начал запинаться или повторять звуки',
      'Появляются повторы звуков в начале слова',
      'Ребёнок волнуется перед началом речи',
      'Вы не знаете, как правильно реагировать на запинки',
      'Боитесь закрепить заикание неправильными действиями'
    ],
    includes: [
      { title: 'Природа заикания', desc: 'Почему возникает заикание и что на него влияет.' },
      { title: 'Правильная реакция', desc: 'Как реагировать родителям, чтобы не усугубить ситуацию.' },
      { title: 'Речевые табу', desc: 'Что категорически нельзя говорить ребёнку.' },
      { title: 'Работа со страхом', desc: 'Как снизить страх речи и напряжение у ребёнка.' },
      { title: 'Техники спокойной речи', desc: 'Практические приёмы помощи ребёнку в моменте.' }
    ],
    result: 'Снижается напряжение у ребёнка, уменьшаются запинки. Вы обретаете уверенность, понимаете причины происходящего и точно знаете, как действовать в любой ситуации, чтобы помочь своему ребёнку говорить свободно.',
    format: 'Онлайн-формат. Подходит родителям детей любого возраста. Доступ к материалам навсегда.'
  };

  const handleOpenModal = () => openModal(`Заявка на курс: ${courseData.title}`);

  return (
    <main className="course-page">
      
      {/* --- 1. HERO SECTION (ЗАГЛАВНЫЙ БЛОК) --- */}
      <section className="course-hero">
        <div className="course-hero__container">
          <div className="course-hero__content">
            <span className="course-badge">Курс для родителей</span>
            <h1 className="course-hero__title">
              Помогите ребёнку <br />
              <span className="highlight-text">говорить свободно</span>
            </h1>
            <p className="course-hero__subtitle">
              Практические методики для снятия эмоционального напряжения и коррекции речи у детей. Узнайте, как ваша реакция может изменить всё.
            </p>
            <button className="course-btn" onClick={handleOpenModal}>
              Хочу на курс
            </button>
          </div>
          <div className="course-hero__image-wrapper">
            {/* Не забудь добавить свою картинку в папку public */}
             <img 
              src="/photo_2026-04-06_12-47-47.jpg" 
              alt="Счастливая мама и ребенок" 
              className="course-hero__image" 
            />
          </div>
        </div>
      </section>


      {/* --- 2. VIDEO SECTION (ВИДЕО-ПРИГЛАШЕНИЕ) --- */}
      <section className="course-section course-video-section">
        <div className="course-container">
          <h2 className="course-section__title">О курсе от автора</h2>
          <p className="course-section__subtitle">
            Юлия Шкаранда о том, почему этот курс необходим каждому родителю, столкнувшемуся с запинками у ребенка.
          </p>
          
          {/* Заглушка для видео. Потом заменишь на реальный плеер (YouTube/Vimeo) */}
          <div className="video-placeholder">
            {/* Используй свою обложку для видео */}
            {/* <img src="/video-cover.jpg" alt="Обложка видео" className="video-cover" /> */}
            <div className="video-play-button">
               <Play size={32} fill="currentColor" />
            </div>
          </div>
        </div>
      </section>


      {/* --- 3. SUITABLE FOR (КОГДА НУЖЕН КУРС) --- */}
      <section className="course-section course-suitable">
        <div className="course-container">
          <h2 className="course-section__title">Когда этот курс необходим?</h2>
          <p className="course-section__subtitle">Если вы замечаете у своего ребёнка следующие признаки:</p>
          
          <div className="suitable-grid">
            {courseData.suitableFor.map((item, index) => (
              <div key={index} className="suitable-card">
                <div className="suitable-card__icon">?</div>
                <p className="suitable-card__text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* --- 4. INCLUDES (ПРОГРАММА КУРСА) --- */}
      <section className="course-section course-includes">
        <div className="course-container">
          <h2 className="course-section__title">Что вы узнаете на курсе</h2>
          <p className="course-section__subtitle">Программа построена от понимания причин к практическим действиям.</p>

          <div className="includes-list">
            {courseData.includes.map((item, index) => (
              <div key={index} className="includes-item">
                <div className="includes-item__number">Модуль {index + 1}</div>
                <h3 className="includes-item__title">{item.title}</h3>
                <p className="includes-item__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* --- 5. RESULT & FORMAT (РЕЗУЛЬТАТ И ФОРМАТ) --- */}
      <section className="course-section course-final">
        <div className="course-final__container">
          <div className="final-block final-block--result">
            <h2 className="final-block__title">Результат после курса</h2>
            <p className="final-block__text">{courseData.result}</p>
          </div>
          
          <div className="final-block final-block--format">
            <h3 className="final-block__subtitle">Формат обучения</h3>
            <p className="final-block__text">{courseData.format}</p>
          </div>

          <button className="course-btn course-btn--large" onClick={handleOpenModal}>
            Записаться на курс
          </button>
        </div>
      </section>

    </main>
  );
}