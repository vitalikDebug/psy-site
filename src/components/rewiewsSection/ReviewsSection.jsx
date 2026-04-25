// src/components/ReviewsSection/ReviewsSection.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react'; 
import './ReviewsSection.css';

const reviewsData = [
  {
    id: 1,
    text: 'Еще хочется поделиться самым важным. Юлия, с тех пор, как я начала следовать вашим советам, я уяснила для себя одну закономерность: что тревожная мама = тревожный ребенок, а тревожный ребенок — это прямой путь к проблемной речи. Мамина тревога в первую очередь передается ребенку, и пока мы сами не успокоимся, результата не будет. Спасибо за этот инсайт!',
    author: 'Ольга',
    role: 'Мама пациента',
    emoji: '👩🏼'
  },
  {
    id: 2,
    text: 'Юлия, добрый день! Мы написали отзывы и хотим поблагодарить Вас за бесценный труд, подход и за результат, который превзошёл наши ожидания! Раньше я считала свои заикания огромной проблемой, чувствовала себя неполноценной и думала, что у меня нет будущего. После курса с Юлией, я не только смогла получить чистую речь, но и изменить своё восприятие к заиканию.',
    author: 'Анна',
    role: 'Прошла курс терапии',
    emoji: '👩🏻'
  },
  {
    id: 3,
    text: 'Здравствуйте. Я не знаю даже какими словами описать, какую благодарность испытываю за то, какую работу вы со мной проделали. Наши занятия полностью изменили не просто мою жизнь. А то, как я в целом на нее смотрю... Когда после интенсива я понял, что могу теперь свободно говорить, я испытал наверное самые яркие эмоции в своей жизни.',
    author: 'Артем Самойлов',
    role: 'Прошел интенсив',
    emoji: '👨🏻'
  },
  {
    id: 4,
    text: 'Да, он очень хочет. Вы знаете, он изменился и психологически. Он был колючий ёжик. Теперь он стал прям мамин сын, как-будто он давно этого хотел, но в силу обстоятельств не делал. Он стал делать сюрпризы, стал сам просить меня его учить готовить кушать. Он стал как раньше нежный и ранимый.',
    author: 'Елена',
    role: 'Мама подростка',
    emoji: '👱🏻‍♀️'
  },
  {
    id: 5,
    text: 'Юлия, хотела бы ещё раз выразить благодарность за Ваш труд! Потому что речь Феди сейчас - это ни что иное, как чудо)) Трудно поверить, но действительно за две-три недели у него прекратилось заикание, которое мучало несколько лет... Как будто мозг перезагрузился и начал работать по-новому без сбоев.',
    author: 'Мама Феди',
    role: 'Мама пациента',
    emoji: '👩🏽'
  },
  {
    id: 6,
    text: 'Огромное спасибо Вам за интенсив! Какой у Вас внимательный и чуткий подход к каждому ребенку! Я уже вижу большие изменения в своем сыне! Уверена: дальше - больше! Будем обязательно следовать рекомендациям и все выполнять ❤️',
    author: 'Оля',
    role: 'Мама пациента',
    emoji: '👩🏼‍🦱'
  },
  {
    id: 7,
    text: 'Юлия, спасибо Вам огромное. Очень рады, что попали на интенсив, речь у сына стала намного лучше. И как человек, который сам заикается 36 лет, могу подтвердить - само не проходит!!!',
    author: 'Анна Лозовская',
    role: 'Мама пациента',
    emoji: '👩🏻‍🦰'
  },
  {
    id: 8,
    text: 'Юлия, добрый день! Хочу еще раз вас поблагодарить за нашу совместную работу, очень приятно замечать изменения в жизни, чувствовать, как происходят новые удивительные события, я открыла для себя слово «замедление», очень большой смысл для меня оно приобрело...',
    author: 'Мария',
    role: 'Клиент',
    emoji: '👩'
  }
];

const getAuraColor = (id) => {
  const colors = ['#fde047', '#fda4af', '#7dd3fc', '#d8b4fe'];
  return colors[id % colors.length];
};

const sliderVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50 
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50, 
    transition: { duration: 0.3, ease: "easeIn" }
  })
};

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); 
  const [selectedReview, setSelectedReview] = useState(null);

  const visibleReviews = reviewsData.slice(currentIndex, currentIndex + 2);
  
  const hasNext = currentIndex + 2 < reviewsData.length;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      setDirection(1);
      setCurrentIndex(prev => prev + 2);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 2);
    }
  };

  useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedReview]);

  return (
    <section className="reviewsSection" id="reviews">
      <div className="reviewsSection__container">
        
        <div className="reviewsSection__header">
          <h2 className="reviewsSection__title">Истории моих клиентов</h2>
          
          <div className="reviewsSection__nav">
            <button 
              className="reviewsSection__nav-btn" 
              onClick={handlePrev} 
              disabled={!hasPrev}
              aria-label="Предыдущие отзывы"
            >
              <ArrowLeft size={24} />
            </button>
            <button 
              className="reviewsSection__nav-btn" 
              onClick={handleNext} 
              disabled={!hasNext}
              aria-label="Следующие отзывы"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <div className="reviewsSection__slider-wrapper">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={currentIndex}
              className="reviewsGrid"
              custom={direction}
              variants={sliderVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {visibleReviews.map((review) => (
                <div 
                  key={review.id} 
                  className="reviewCard"
                  style={{ '--aura-color': getAuraColor(review.id) }}
                  onClick={() => setSelectedReview(review)}
                >
                  <div className="reviewCard__content">
                    <p className="reviewCard__text">«{review.text}»</p>
                    <span className="reviewCard__read-more">Читать полностью</span>
                  </div>
                  
                  <div className="reviewCard__author">
                    <div className="reviewCard__emoji">{review.emoji}</div>
                    <div className="reviewCard__author-info">
                      <span className="reviewCard__name">{review.author}</span>
                      <span className="reviewCard__role">{review.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* НОВЫЙ БЛОК: ССЫЛКА НА ВСЕ ОТЗЫВЫ */}
        <motion.div 
          className="reviewsSection__footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a 
            href="https://t.me/+SUnACUvkFpYzZjYy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="reviewsSection__tg-link"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="currentColor"/>
            </svg>
            Читать больше отзывов в Telegram
          </a>
        </motion.div>

      </div>

      {/* МОДАЛЬНОЕ ОКНО ДЛЯ ПОЛНОГО ОТЗЫВА */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div 
            className="reviewModal__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReview(null)}
          >
            <motion.div 
              className="reviewModal__card"
              style={{ '--aura-color': getAuraColor(selectedReview.id) }}
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="reviewModal__close" onClick={() => setSelectedReview(null)}>
                <X size={24} />
              </button>

              <div className="reviewModal__scroll-area">
                <p className="reviewModal__text">«{selectedReview.text}»</p>
                
                <div className="reviewCard__author reviewModal__author">
                  <div className="reviewCard__emoji">{selectedReview.emoji}</div>
                  <div className="reviewCard__author-info">
                    <span className="reviewCard__name">{selectedReview.author}</span>
                    <span className="reviewCard__role">{selectedReview.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}