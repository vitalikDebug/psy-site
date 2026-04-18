// src/components/ReviewsSection/ReviewsSection.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react'; // Добавили стрелочки
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

// Анимация слайдера, которая учитывает направление (вперед/назад)
const sliderVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50 // Выезжает справа, если вперед. Слева, если назад.
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50, // Уезжает влево, если вперед. Вправо, если назад.
    transition: { duration: 0.3, ease: "easeIn" }
  })
};

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = вперед, -1 = назад
  const [selectedReview, setSelectedReview] = useState(null);

  const visibleReviews = reviewsData.slice(currentIndex, currentIndex + 2);
  
  // Управление кнопками
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
          
          {/* СТРЕЛОЧКИ НАВИГАЦИИ (выводим справа от заголовка или под ним) */}
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
          {/* custom={direction} передает направление в sliderVariants */}
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
                    {/* ЭМОДЗИ ВМЕСТО АВАТАРКИ */}
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