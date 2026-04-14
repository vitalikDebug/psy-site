// src/components/AboutSection/AboutSection.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import './AboutSection.css';

export default function AboutSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  // Данные фотографий (вынесли в массив для удобства)
  const photos = [
    { src: "/photo_2025-11-28_14-57-57.jpg", alt: "Юлия Шкаранда портрет", className: "puzzle-item--tall" },
    { src: "/photo_2025-11-28_14-58-21.jpg", alt: "Процесс работы", className: "puzzle-item--top-right" },
    { src: "/photo_2025-11-28_14-58-25.jpg", alt: "Детали", className: "puzzle-item--bottom-right" }
  ];

  // Функция для отслеживания скролла и обновления активной точки
  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const width = sliderRef.current.offsetWidth;
      // Вычисляем индекс слайда (округляем до ближайшего целого)
      const index = Math.round(scrollLeft / width);
      setActiveSlide(index);
    }
  };

  // Добавляем слушатель события скролла
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll, { passive: true });
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="aboutSection" id='about'>
      <div className="aboutSection__container">
        
        {/* ЛЕВАЯ КОЛОНКА: Текст, статистика, соцсети */}
        <div className="aboutSection__content">
          <span className="badge">Обо мне</span>
          
          <h2 className="aboutSection__main-name">ЮЛИЯ ШКАРАНДА</h2>
          <p className="aboutSection__main-role">Практикующий психолог, логопед, заиколог</p>
          
          <p className="aboutSection__description">
            Работаю на стыке психологии и логопедии, что позволяет работать с причиной заикания.
          </p>

          <ul className="aboutSection__stats-list">
            <li>Более 15 лет работы с семьями</li>
            <li>Более 5000 часов коррекционной работы</li>
            <li>Работаю с детьми и взрослыми</li>
            <li>Индивидуальный подход к каждой ситуации</li>
          </ul>

          <div className="aboutSection__social-block">
            <p className="aboutSection__blog-title">Веду блог ЗАИКАНИЕ ПРЕОДОЛИМО</p>
            
            <div className="aboutSection__social-icons">
              {/* Telegram Icon */}
              <a href="https://t.me/julia_shkaranda" target="_blank" rel="noreferrer" className="social-icon-link telegram" aria-label="Telegram канал">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                  <path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.2-.822 1.23-.696.065-1.226-.46-1.904-.906-1.061-.695-1.656-1.123-2.679-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.119.098.152.228.166.321.016.109.035.465.025.762z"/>
                </svg>
              </a>
              
              {/* External Link Icon */}
              <a href="https://iimax.ru/zaikanie_preodolimo" target="_blank" rel="noreferrer" className="social-icon-link link-external" aria-label="Ссылка на материалы">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720"><path fill="currentColor" d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z"/></svg>

              </a>
            </div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: Пазл / Слайдер */}
        <div className="aboutSection__puzzle-container">
          {/* Обертка для слайдера (нужна для скролла) */}
          <div className="puzzle-slider-wrapper" ref={sliderRef}>
            <div className="aboutSection__puzzle">
              {photos.map((photo, index) => (
                <div key={index} className={`puzzle-item ${photo.className}`}>
                  <img src={photo.src} alt={photo.alt} />
                </div>
              ))}
            </div>
          </div>

          {/* Индикаторы слайдов (видны только на мобильных) */}
          <div className="slider-dots">
            {photos.map((_, index) => (
              <div 
                key={index} 
                className={`slider-dot ${index === activeSlide ? 'slider-dot--active' : ''}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}