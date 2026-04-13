// src/components/ProblemSection/ProblemSection.jsx
import './ProblemSection.css';

export default function ProblemSection() {
  return (
    <section className="problemSection">
      <div className="problemSection__container">
        
        <div className="problemGrid">
          
          {/* ЛЕВАЯ КОЛОНКА (ВЗРОСЛЫЕ) */}
          <div className="problemGrid__col problemGrid__col--left">
            <div className="problemCard">
              <div className="problemCard__header">
                <h3 className="problemCard__title">Для взрослых</h3>
                <span className="problemCard__tag">01</span>
              </div>
              <ul className="problemCard__list">
                <li>Заикаетесь с детства</li>
                <li>Сложно говорить по телефону</li>
                <li>Волнуетесь перед новым знакомством</li>
              </ul>
            </div>

            <div className="problemCard">
              <div className="problemCard__header">
                <h3 className="problemCard__title">Внутреннее состояние</h3>
                <span className="problemCard__tag">02</span>
              </div>
              <ul className="problemCard__list">
                <li>Избегаете публичных выступлений</li>
                <li>Мучительно контролируете каждое слово</li>
                <li>Запинки сильно усиливаются при стрессе</li>
              </ul>
            </div>
          </div>

          {/* ЦЕНТРАЛЬНЫЙ БЛОК (ЗАГОЛОВОК) */}
          <div className="problemGrid__center">
            {/* Декоративные круги вокруг текста */}
            <div className="circle-decoration circle-1"></div>
            <div className="circle-decoration circle-2"></div>
            
            <h2 className="problemGrid__title">
              ЭТО МОЖЕТ БЫТЬ<br/> ПРО ВАС
            </h2>
          </div>

          {/* ПРАВАЯ КОЛОНКА (ДЕТИ) */}
          <div className="problemGrid__col problemGrid__col--right">
            <div className="problemCard">
              <div className="problemCard__header">
                <h3 className="problemCard__title">Для ребёнка</h3>
                <span className="problemCard__tag">03</span>
              </div>
              <ul className="problemCard__list">
                <li>Начинает повторять первые звуки</li>
                <li>Перед словом появляются долгие паузы</li>
                <li>Сильно волнуется перед ответом</li>
              </ul>
            </div>

            <div className="problemCard">
              <div className="problemCard__header">
                <h3 className="problemCard__title">Поведение</h3>
                <span className="problemCard__tag">04</span>
              </div>
              <ul className="problemCard__list">
                <li>Запинки усиливаются при эмоциях</li>
                <li>Ребёнок старается говорить меньше</li>
                <li>Расстраивается и замыкается после речи</li>
              </ul>
            </div>
          </div>

        </div>

        {/* НИЖНИЙ ТЕКСТ ПО ЦЕНТРУ */}
        {/* <div className="problemSection__footer">
          <p className="problemSection__footer-text">
            Если вы узнали себя — это можно изменить.
          </p>
        </div> */}

      </div>
    </section>
  );
}