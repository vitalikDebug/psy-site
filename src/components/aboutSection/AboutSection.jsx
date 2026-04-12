// src/components/AboutSection/AboutSection.jsx
import './AboutSection.css';

export default function AboutSection() {
  return (
    <section className="aboutSection" id='about'>
      <div className="aboutSection__container">
        
        {/* Верхняя часть (Заголовки и регалии) */}
        <div className="aboutSection__top">
          
          {/* Левая колонка */}
          <div className="aboutSection__top-left">
            <span className="badge">Обо мне</span>
            <h2 className="aboutSection__title">
              Работаю на стыке психологии и логопедии, что позволяет работать с причиной заикания.
            </h2>
          </div>

          {/* Правая колонка */}
          <div className="aboutSection__top-right">
            <h3 className="aboutSection__name">Юлия Шкаранда</h3>
            <p className="aboutSection__role">Практикующий психолог, логопед, заиколог.</p>
            <p className="aboutSection__stats">
              Более 15 лет работы с семьями. <br />
              Более 5000 часов коррекционной работы.
            </p>
            <a href="https://t.me/julia_shkaranda" target="_blank" rel="noreferrer" className="aboutSection__outline-btn">
              Мой Telegram-блог
            </a>
          </div>

        </div>

        {/* Нижняя часть (Фотография и наезжающая карточка) */}
        <div className="aboutSection__bottom">
          {/* Фото на фоне */}
          <img 
            src="/photo_2025-11-28_14-57-57.jpg" // Укажи нужное фото
            alt="Юлия Шкаранда за работой" 
            className="aboutSection__image" 
          />
          
          {/* Плавающая белая карточка (как на макете) */}
          <div className="aboutSection__floating-card">
            <p>
              Работаю с детьми и взрослыми. Индивидуальный подход к каждой ситуации. 
              Моя цель — создать безопасное и доверительное пространство, в котором вы 
              сможете обрести уверенность и свободу речи.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}