// src/components/Footer/Footer.jsx
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id='contacts'>
      <div className="footer__container">
        
        {/* Верхняя часть футера (Колонки) */}
        <div className="footer__top">
          
          {/* Колонка 1: Логотип/Имя */}
          <div className="footer__col footer__col--brand">
            <h3 className="footer__logo">Юлия Шкаранда</h3>
            <p className="footer__slogan">Психолог · логопед · заиколог</p>
          </div>

          {/* Колонка 2: Навигация (пример) */}
          <div className="footer__col">
            <h4 className="footer__col-title">Меню</h4>
            <ul className="footer__list">
              <li><a href="#">Обо мне</a></li>
              <li><a href="#">Форматы работы</a></li>
              <li><a href="#">Отзывы</a></li>
              <li><a href="#">Частые вопросы</a></li>
            </ul>
          </div>

          {/* Колонка 3: Контакты и соцсети */}
          <div className="footer__col">
            <h4 className="footer__col-title">Связь</h4>
            <ul className="footer__list">
              <li><a href="mailto:example@mail.ru">example@mail.ru</a></li>
              <li><a href="https://t.me/julia_shkaranda" target="_blank" rel="noreferrer">Telegram (Блог)</a></li>
              <li><a href="https://t.me/m/NXl4uiraZTE6" target="_blank" rel="noreferrer">Telegram (Запись)</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">ВКонтакте</a></li>
              <li><a href="https://iimax.ru/zaikanie_preodolimo" target="_blank" rel="noreferrer">МАКС</a></li>
            </ul>
          </div>

        </div>

        {/* Разделительная линия */}
        <div className="footer__divider"></div>

        {/* Нижняя часть (Юридическая инфа) */}
        <div className="footer__bottom">
          <div className="footer__legal-text">
            <p>ИП Юлия Шкаранда</p>
            <p>ОГРН: 321392600030851</p>
            <p>ИНН: 390705830870</p>
          </div>
          
          <div className="footer__legal-links">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Публичная оферта</a>
            <a href="#">Согласие на обработку данных</a>
          </div>
        </div>

      </div>
    </footer>
  );
}