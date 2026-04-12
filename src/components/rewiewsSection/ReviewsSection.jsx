// src/components/ReviewsSection/ReviewsSection.jsx
import './ReviewsSection.css';

// Данные для отзывов (взяты из твоего скрина)
const reviewsData = [
  {
    id: 1,
    text: 'Еще хочется поделиться самым важным. Юлия, с тех пор, как я начала следовать вашим советам, я уяснила для себя одну закономерность: что тревожная мама = тревожный ребенок, а тревожный ребенок — это прямой путь к проблемной речи, что мамина тревога в первую очередь передается ребенку...',
    author: 'Ольга',
    role: 'Мама пациента',
    // Для аватарок пока используем заглушки
    avatar: 'https://placehold.co/100x100/A57C9B/FFFFFF?text=О'
  },
  {
    id: 2,
    text: 'Юлия, добрый день! Мы написали отзывы и хотим поблагодарить Вас за бесценный труд, подход и за результат, который превзошёл наши ожидания! Раньше я считала свои заикания огромной проблемой, чувствовала себя неполноценной и думала, что у меня нет будущего. После курса с Юлией, я не только смогла получить чистую речь, но и изменить своё восприятие к заиканию. Теперь, даже если у меня проскакивает запинка, я не корю себя за это, а принимаю. Я хочу выразить огромную благодарность Юлии за то, что она помогла мне справиться с тем, что так долго мучило меня и стать более уверенной в себе.',
    author: 'Анна',
    role: 'Прошла курс терапии',
    avatar: 'https://placehold.co/100x100/EAE6DF/4A4A4A?text=А'
  },
  {
    id: 3,
    text: 'Юлия, добрый день! Хочу еще раз вас поблагодарить за нашу совместную работу, очень приятно замечать изменения в жизни, чувствовать, как происходят новые удивительные события, я открыла для себя слово «замедление», очень большой смысл для меня оно приобрело, замедление — как стиль жизни, обращать внимание на себя, не бежать, не торопиться, не беспокоиться о будущем, а быть в моменте.',
    author: 'Мария',
    role: 'Клиент',
    avatar: 'https://placehold.co/100x100/A57C9B/FFFFFF?text=М'
  },
  {
    id: 4,
    text: 'Да, он очень хочет. Вы знаете, он изменился и психологически. Он был колючий ёжик. Теперь он стал прям мамин сын, как-будто он давно этого хотел, но в силу обстоятельств не делал. Он стал делать сюрпризы, стал сам просить меня его учить готовить кушать. Он стал как раньше нежный и ранимый. Он очень старается, на самом деле.',
    author: 'Елена',
    role: 'Мама подростка',
    avatar: 'https://placehold.co/100x100/EAE6DF/4A4A4A?text=Е'
  }
];

export default function ReviewsSection() {
  return (
    <section className="reviewsSection" id='reviews'>
      <div className="reviewsSection__container">
        
        {/* Заголовок с плашкой, как на макете */}
        <div className="reviewsSection__header">
          {/* <span className="reviewsSection__badge">Отзывы</span> */}
          <h2 className="reviewsSection__title">
            ИСТОРИИ МОИХ <br /> КЛИЕНТОВ
          </h2>
        </div>

        {/* Сетка Masonry */}
        <div className="reviewsMasonry">
          {reviewsData.map((review) => (
            <div key={review.id} className="reviewCard">
              <p className="reviewCard__text">{review.text}</p>
              
              <div className="reviewCard__footer">
                <img src={review.avatar} alt={review.author} className="reviewCard__avatar" />
                <div className="reviewCard__author-info">
                  <span className="reviewCard__name">{review.author}</span>
                  <span className="reviewCard__role">{review.role}</span>
                </div>
                {/* Декоративная иконка (как на скрине справа внизу) */}
                <div className="reviewCard__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}