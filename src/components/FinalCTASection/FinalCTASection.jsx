// src/components/FinalCTASection/FinalCTASection.jsx
'use client'; // Обязательно!

// 1. Импортируем хук
import { useModal } from '@/context/ModalContext';
import './FinalCTASection.scss';

// 2. Убираем пропсы
export default function FinalCTASection() {
  // 3. Достаем функцию
  const { openModal } = useModal();

  return (
    <section className="finalCTASection">
      <div className="finalCTASection__container">
        <div className="finalCTASection__content">
          <h2 className="finalCTASection__title">
            НЕ ЗНАЕТЕ С ЧЕГО НАЧАТЬ?
          </h2>
          <p className="finalCTASection__text">
            Запишитесь на консультацию. Я разберу вашу ситуацию и подскажу формат работы, который подойдет именно вам.
          </p>
          
          {/* Кнопка использует функцию из контекста */}
          <button onClick={() => openModal('Консультация (из подвала)')} className="finalCTASection__btn">
            ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
          </button>
        </div>
      </div>
    </section>
  );
}