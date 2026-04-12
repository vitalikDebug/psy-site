// src/components/HeroSection/HeroSection.jsx
'use client';

import { useModal } from '@/context/ModalContext';
import './HeroSection.css';

export default function HeroSection() {
  const { openModal } = useModal();

  return (
    <section className="heroSection" id="hero">
      <div className="heroSection__container">
        
        <div className="heroSection__left">
          <span className="heroSection__subtitle">
            Психолог · логопед · заиколог
          </span>
          <h1 className="heroSection__title">
            ЗАПИНАЕТЕСЬ, ВОЛНУЕТЕСЬ, БОИТЕСЬ ГОВОРИТЬ?
          </h1>
          
          <ul className="heroSection__list">
            <li className="heroSection__list-item">
              Это можно изменить.
            </li>
            <li className="heroSection__list-item">
              Помогаю детям и взрослым избавиться от заикания и страха речи.
            </li>
          </ul>

          <div className="heroSection__cta-block">
            <p className="heroSection__cta-text">
              Юлия Шкаранда
            </p>
            {/* ИСПРАВЛЕНИЕ ЗДЕСЬ: */}
            {/* Убрали текст из скобок. Теперь вызываем просто openModal() */}
            <button onClick={() => openModal()} className="heroSection__btn">
              Записаться на консультацию
            </button>
          </div>
        </div>

        <div className="heroSection__right">
          <div className="heroSection__image-wrapper">
            <img 
              src="/photo_2025-11-28_14-58-13.jpg" 
              alt="Юлия Шкаранда портрет" 
              className="heroSection__img heroSection__img--main"
            />
            <img 
              src="/photo_2025-11-28_14-58-17.jpg" 
              alt="Юлия Шкаранда в работе" 
              className="heroSection__img heroSection__img--secondary"
            />
          </div>
        </div>

      </div>
    </section>
  );
}