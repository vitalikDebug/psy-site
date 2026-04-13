// src/components/ServicesSection/ServicesSection.jsx
import Link from 'next/link';
import './ServicesSection.css';
import { useModal } from '@/context/ModalContext';

// Полные данные из твоего документа
const servicesData = [
  {
    id: 1,
    title: 'КОНСУЛЬТАЦИЯ (ПЕРВЫЙ ЭТАП)',
    suitableFor: [
      'Появились первые запинки',
      'Не понимаете, что делать',
      'Хотите понять причину',
      'Сомневаетесь в формате работы',
      'Нужна диагностика речи'
    ],
    includes: [
      'Разбор вашей ситуации',
      'Анализ речи',
      'Определение причины заикания',
      'Рекомендации и план работы',
      'Подбор формата'
    ],
    format: 'Онлайн, 60 минут',
    buttonText: 'Записаться на консультацию',
    // buttonLink: 'https://t.me/m/NXl4uiraZTE6', 
    isPrimary: true // Выделим первую карточку как входную точку
  },
  {
    id: 2,
    title: 'КУРС ДЛЯ РОДИТЕЛЕЙ “РЕЧЬ БЕЗ ЗАИКАНИЯ”',
    suitableFor: [
      'Ребёнок начал запинаться',
      'Появляются повторы звуков',
      'Ребёнок волнуется перед речью',
      'Не знаете как реагировать',
      'Боитесь закрепить заикание'
    ],
    includes: [
      'Почему возникает заикание',
      'Как правильно реагировать',
      'Что говорить ребёнку, а чего нельзя',
      'Как снизить страх речи',
      'Как помочь говорить спокойно'
    ],
    result: 'Снижается напряжение у ребёнка, уменьшаются запинки, родители понимают как действовать.',
    format: 'Онлайн. Подходит родителям детей любого возраста.',
    buttonText: 'Хочу на курс',
    // buttonLink: '#' 
  },
  {
    id: 3,
    title: 'МИНИ-ИНТЕНСИВ ДЛЯ ШКОЛЬНИКОВ',
    suitableFor: [
      'Лёгкое заикание',
      'Первые запинки',
      'Нужна мягкая коррекция',
      'Ребёнок волнуется перед речью'
    ],
    includes: [
      'Работа со страхом речи',
      'Снижение напряжения',
      'Работа с речью',
      'Рекомендации родителям'
    ],
    result: 'Уменьшаются запинки, ребёнок говорит спокойнее, снижается тревога.',
    format: '6–7 встреч (2 недели)',
    buttonText: 'Узнать подробнее',
    // buttonLink: 'https://t.me/m/NXl4uiraZTE6'
  },
  {
    id: 4,
    title: 'ИНТЕНСИВ ДЛЯ ШКОЛЬНИКОВ (ПОЛНЫЙ)',
    suitableFor: [
      'Заикание уже закрепилось',
      'Ребёнок боится говорить',
      'Запинки усиливаются',
      'Есть страх школы',
      'Ребёнок переживает'
    ],
    includes: [
      'Работа со страхом речи и напряжением',
      'Работа с уверенностью и дыханием',
      'Закрепление спокойной речи',
      'Сопровождение и рекомендации'
    ],
    result: 'Уменьшаются запинки, ребёнок говорит спокойнее, появляется уверенность.',
    format: '10–12 встреч (2 недели), каждый будний день',
    buttonText: 'Узнать подробнее',
    // buttonLink: 'https://t.me/m/NXl4uiraZTE6'
  },
  {
    id: 5,
    title: 'ИНТЕНСИВ ДЛЯ ВЗРОСЛЫХ',
    suitableFor: [
      'Заикание с детства',
      'Страх общения и выступлений',
      'Сложно говорить по телефону',
      'Напряжённая речь'
    ],
    includes: [
      'Работа со страхом речи',
      'Работа с напряжением',
      'Уверенность в общении',
      'Спокойная речь и закрепление результата'
    ],
    result: 'Уменьшаются запинки, появляется уверенность, легче говорить.',
    format: 'От 10 встреч, индивидуальная работа',
    buttonText: 'Узнать подробнее',
    // buttonLink: 'https://t.me/m/NXl4uiraZTE6'
  }
];

export default function ServicesSection() {
  const { openModal } = useModal();
  return (
    <section className="servicesSection" id='services'>
      <div className="servicesSection__container">
        
        <div className="servicesSection__header">
          <h2 className="servicesSection__title">ФОРМАТЫ РАБОТЫ</h2>
          <p className="servicesSection__subtitle">
            Вы можете выбрать формат в зависимости от ситуации, возраста и степени заикания.
          </p>
        </div>

        {/* Сетка карточек услуг */}
        <div className="servicesGrid">
          {servicesData.map((item) => (
            <div key={item.id} className={`serviceCard serviceCard--${item.type}`}>
              
              <div className="serviceCard__header">
                <h3 className="serviceCard__title">{item.title}</h3>
              </div>

              <div className="serviceCard__body">
                
                {/* Блок "Подойдет если" */}
                {item.suitableFor && (
                  <div className="serviceCard__block">
                    <h4 className="serviceCard__block-title">Подойдёт если</h4>
                    <ul className="serviceCard__list">
                      {item.suitableFor.map((items, i) => (
                        <li key={i}>{items}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Блок "Что входит/узнаете" */}
                {item.includes && (
                  <div className="serviceCard__block">
                    <h4 className="serviceCard__block-title">Что входит</h4>
                    <ul className="serviceCard__list">
                      {item.includes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Блок "Результат" (если есть) */}
                {item.result && (
                  <div className="serviceCard__block serviceCard__block--result">
                    <h4 className="serviceCard__block-title">Результат</h4>
                    <p className="serviceCard__text">{item.result}</p>
                  </div>
                )}
                
                {/* Формат */}
                <div className="serviceCard__format">
                   <span className="serviceCard__format-icon">🕒</span>
                   {item.format}
                </div>

              </div>

              <div className="serviceCard__footer">
              {item.buttonLink ? (
                  <Link href={item.buttonLink} className="serviceCard__btn">
                    {item.buttonText}
                  </Link>
                ) : (
                  // Если ссылки нет, рендерим кнопку, открывающую модалку
                  // И передаем ей заголовок этой карточки (item.title)
                 <button 
                    className="serviceCard__btn"
                    onClick={() => openModal(item.title)} 
                  >
                    {item.buttonText}
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}