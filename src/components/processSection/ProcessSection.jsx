// src/components/ProcessSection/ProcessSection.jsx
import './ProcessSection.css';

const processData = [
  // ... (Твои данные для списка остаются без изменений)
  {
    number: '01',
    title: 'ВНИМАТЕЛЬНО СЛУШАЮ',
    description: 'Всё начинается с вашей истории. Я не просто слушаю слова, я обращаю внимание на дыхание, паузы, интонации и скрытые эмоции, чтобы понять истинную картину вашего состояния.'
  },
  {
    number: '02',
    title: 'ИССЛЕДУЮ ПРИЧИНЫ И ИНТЕРПРЕТИРУЮ',
    description: 'Понимаю, как и в каких ситуациях возникает напряжение. Эти наблюдения ложатся в основу индивидуального плана: мы находим триггеры, мысли и страхи, которые запускают механизм заикания.'
  },
  {
    number: '03',
    title: 'СНИМАЮ ФИЗИЧЕСКОЕ НАПРЯЖЕНИЕ',
    description: 'Обучаю техникам глубокой релаксации. Вы научитесь физически расслаблять речевой аппарат, шею и тело, чтобы звук рождался свободно и без лишних мышечных усилий.'
  },
  {
    number: '04',
    title: 'ОБЪЯСНЯЮ ЧЕСТНО И ПОНЯТНО',
    description: 'Вы легко ориентируетесь в процессе терапии и точно понимаете, почему мы делаем то или иное упражнение. Никакой магии — только прозрачная и научно обоснованная работа.'
  },
  {
    number: '05',
    title: 'РАБОТАЮ С МЫШЛЕНИЕМ',
    description: 'Меняем отношение к речи и к себе говорящему. Мы поэтапно снимаем страх ошибки, убираем «ожидание заикания» и возвращаем веру в собственный голос.'
  },
  {
    number: '06',
    title: 'ФОРМИРУЮ НОВУЮ ПРИВЫЧКУ',
    description: 'Шаг за шагом мы выстраиваем новый паттерн речи. Это создание комфортного ритма и темпа, который станет для вас совершенно естественным.'
  },
  {
    number: '07',
    title: 'ПЕРЕНОШУ НАВЫК В ЖИЗНЬ',
    description: [
      'Отработка звонков по телефону без ступора',
      'Уверенное и спокойное общение с незнакомыми людьми',
      'Подготовка к публичным выступлениям или важным диалогам на работе',
      'Интеграция новых речевых привычек в вашу повседневную рутину'
    ]
  }
];

export default function ProcessSection() {
  return (
    <section className="processSection">
      <div className="processSection__container">
        
        <h2 className="processSection__title">
          КАК МЫ ДОБИВАЕМСЯ <br/> РЕЗУЛЬТАТА С КЛИЕНТАМИ
        </h2>

        <div className="processList">
          {processData.map((item, index) => (
            <div key={index} className="processItem">
              <div className="processItem__left">
                <span className="processItem__number">{item.number}</span>
                <h3 className="processItem__title">{item.title}</h3>
              </div>
              <div className="processItem__right">
                {Array.isArray(item.description) ? (
                  <ul className="processItem__list">
                    {item.description.map((listItem, i) => (
                      <li key={i}>{listItem}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="processItem__text">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* НОВЫЙ БЛОК: Итоговый результат с фото */}
        <div className="processResult">
          {/* Левая часть: Выступающее фото */}
          <div className="processResult__image-wrapper">
            {/* Не забудь поменять путь на нужную тебе фотографию */}
            <img src="/photo_2025-11-28_14-58-34.jpg" alt="Юлия Шкаранда" className="processResult__img" />
          </div>
          
          {/* Правая часть: Большой текст */}
          <div className="processResult__content">
            <p className="processResult__text">
              РЕЗУЛЬТАТОМ СТАНОВИТСЯ СВОБОДНАЯ РЕЧЬ, <br/>
              {/* Спан для изменения оттенка текста */}
              <span className="processResult__highlight">КОТОРАЯ ЗВУЧИТ УВЕРЕННО, ЕСТЕСТВЕННО И СПОКОЙНО,</span> <br/>
              РАСКРЫВАЯ ВАШ ИСТИННЫЙ ПОТЕНЦИАЛ В ОБЩЕНИИ
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}