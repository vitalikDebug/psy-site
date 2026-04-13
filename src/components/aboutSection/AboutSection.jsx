// src/components/AboutSection/AboutSection.jsx
import './AboutSection.css';

export default function AboutSection() {
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: Пазл из фотографий */}
        <div className="aboutSection__puzzle">
          {/* Фото 1: Высокое (слева) */}
          <div className="puzzle-item puzzle-item--tall">
            <img src="/photo_2025-11-28_14-57-57.jpg" alt="Юлия Шкаранда портрет" />
          </div>
          
          {/* Фото 2: Квадратное (справа сверху) */}
          <div className="puzzle-item puzzle-item--top-right">
             {/* Замени на другое фото */}
            <img src="/photo_2025-11-28_14-58-21.jpg" alt="Процесс работы" />
          </div>
          
          {/* Фото 3: Квадратное (справа снизу) */}
          <div className="puzzle-item puzzle-item--bottom-right">
             {/* Замени на третье фото */}
            <img src="/photo_2025-11-28_14-58-25.jpg" alt="Детали" />
          </div>
        </div>

      </div>
    </section>
  );
}