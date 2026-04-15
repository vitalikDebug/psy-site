// src/components/ReviewsSection/ReviewsSection.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import './ReviewsSection.css';

// Обновленные данные с отзывами со скриншотов
const reviewsData = [
  {
    id: 1,
    text: 'Еще хочется поделиться самым важным. Юлия, с тех пор, как я начала следовать вашим советам, я уяснила для себя одну закономерность: что тревожная мама = тревожный ребенок, а тревожный ребенок — это прямой путь к проблемной речи, что мамина тревога в первую очередь передается ребенку...',
    author: 'Ольга',
    role: 'Мама пациента',
    avatar: 'https://placehold.co/100x100/A57C9B/FFFFFF?text=О'
  },
  {
    id: 2,
    text: 'Юлия, добрый день! Мы написали отзывы и хотим поблагодарить Вас за бесценный труд, подход и за результат, который превзошёл наши ожидания! Раньше я считала свои заикания огромной проблемой, чувствовала себя неполноценной и думала, что у меня нет будущего. После курса с Юлией, я не только смогла получить чистую речь, но и изменить своё восприятие к заиканию...',
    author: 'Анна',
    role: 'Прошла курс терапии',
    avatar: 'https://placehold.co/100x100/EAE6DF/4A4A4A?text=А'
  },
  {
    id: 3,
    text: 'Здравствуйте. Я не знаю даже какими словами описать, какую благодарность испытываю за то, какую работу вы со мной проделали. Наши занятия полностью изменили не просто мою жизнь. А то, как я в целом на нее смотрю... Когда после интенсива я понял, что могу теперь свободно говорить, я испытал наверное самые яркие эмоции в своей жизни.',
    author: 'Артем Самойлов',
    role: 'Прошел интенсив',
    avatar: 'https://placehold.co/100x100/A57C9B/FFFFFF?text=АС'
  },
  {
    id: 4,
    text: 'Да, он очень хочет. Вы знаете, он изменился и психологически. Он был колючий ёжик. Теперь он стал прям мамин сын, как-будто он давно этого хотел, но в силу обстоятельств не делал. Он стал делать сюрпризы, стал сам просить меня его учить готовить кушать. Он стал как раньше нежный и ранимый.',
    author: 'Елена',
    role: 'Мама подростка',
    avatar: 'https://placehold.co/100x100/EAE6DF/4A4A4A?text=Е'
  },
  {
    id: 5,
    text: 'Юлия, хотела бы ещё раз выразить благодарность за Ваш труд! Потому что речь Феди сейчас- это ни что иное, как чудо)) Трудно поверить, но действительно за две-три недели у него прекратилось заикание, которое мучало несколько лет... Как будто мозг перезагрузился и начал работать по-новому без сбоев.',
    author: 'Мама Феди',
    role: 'Мама пациента',
    avatar: 'https://placehold.co/100x100/A57C9B/FFFFFF?text=М'
  },
  {
    id: 6,
    text: 'Огромное спасибо Вам за интенсив! 🙏 Какой у Вас внимательный и чуткий подход к каждому ребенку! Я уже вижу большие изменения в своем сыне! Уверена: дальше - больше! 🙏❤️ будем обязательно следовать рекомендациям и все выполнять ❤️',
    author: 'Оля',
    role: 'Мама пациента',
    avatar: 'https://placehold.co/100x100/EAE6DF/4A4A4A?text=О'
  },
  {
    id: 7,
    text: 'Юлия, спасибо Вам огромное. Очень рады, что попали на интенсив, речь у сына стала намного лучше 🤗 И как человек, который сам заикается 36 лет, могу подтвердить- само не проходит!!!',
    author: 'Анна Лозовская',
    role: 'Мама пациента',
    avatar: 'https://placehold.co/100x100/A57C9B/FFFFFF?text=АЛ'
  },
  {
    id: 8,
    text: 'Юлия, добрый день! Хочу еще раз вас поблагодарить за нашу совместную работу, очень приятно замечать изменения в жизни, чувствовать, как происходят новые удивительные события, я открыла для себя слово «замедление», очень большой смысл для меня оно приобрело...',
    author: 'Мария',
    role: 'Клиент',
    avatar: 'https://placehold.co/100x100/EAE6DF/4A4A4A?text=М'
  }
];

// Настройки анимации для контейнера (дирижер)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Задержка между появлением карточек
      delayChildren: 0.1,
    }
  }
};

// Настройки анимации для каждой карточки
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 }
  }
};

export default function ReviewsSection() {
  const [showAll, setShowAll] = useState(false); // Состояние: показывать все или нет

  // Вычисляем, какие отзывы показывать
  const displayedReviews = showAll ? reviewsData : reviewsData.slice(0, 4);

  return (
    <section className="reviewsSection" id='reviews'>
      <div className="reviewsSection__container">
        
        <div className="reviewsSection__header">
          <h2 className="reviewsSection__title">
            ИСТОРИИ МОИХ <br /> КЛИЕНТОВ
          </h2>
        </div>

        {/* Сетка Masonry с анимацией появления */}
        <motion.div 
          className="reviewsMasonry"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          // key нужен, чтобы при изменении showAll анимация срабатывала для новых элементов
          key={showAll ? 'all' : 'some'} 
        >
          {displayedReviews.map((review) => (
            <motion.div 
              key={review.id} 
              className="reviewCard"
              variants={itemVariants}
            >
              <p className="reviewCard__text">{review.text}</p>
              
              <div className="reviewCard__footer">
                <img src={review.avatar} alt={review.author} className="reviewCard__avatar" />
                <div className="reviewCard__author-info">
                  <span className="reviewCard__name">{review.author}</span>
                  <span className="reviewCard__role">{review.role}</span>
                </div>
                {/* Декоративная иконка (цитата) */}
                <div className="reviewCard__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Кнопка "Показать еще" */}
        {!showAll && (
          <motion.div 
            className="reviewsSection__actions"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button 
              className="reviewsSection__more-btn"
              onClick={() => setShowAll(true)}
            >
              Смотреть все отзывы
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}