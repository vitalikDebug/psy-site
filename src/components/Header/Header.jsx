// src/components/Header/Header.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Импортируем иконки. Замени 'Users' на другую, если есть более подходящая иконка "родителя"
import { CalendarDays, Menu, X, Users } from 'lucide-react';
import './Header.css';

const navLinks = [
  { name: 'Обо мне', href: '/#about' },
  { name: 'Подход', href: '/#approach' },
  { name: 'Отзывы', href: '/#reviews' },
  { name: 'Контакты', href: '/#contacts' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Блокируем прокрутку страницы при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Очистка при размонтировании
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header__container">
        
        {/* --- ЛЕВАЯ ЧАСТЬ (Кнопка Записи) --- */}
        <div className="header__left">
          <button className="header__booking-btn" aria-label="Записаться">
            <CalendarDays size={20} />
            <span>Запись</span>
            {/* Бейдж (если нужен) */}
            {/* <div className="header__booking-badge">1</div> */}
          </button>
        </div>

        {/* --- ЦЕНТРАЛЬНАЯ ЧАСТЬ (Навигация Десктоп) --- */}
        <nav className="header__nav-desktop">
          <ul className="header__list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className={`header__link ${pathname === link.href ? 'header__link--active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* --- ПРАВАЯ ЧАСТЬ (Кнопка Курса и Бургер) --- */}
        <div className="header__right">
          {/* Адаптивная кнопка курса (без пузырьков) */}
          <Link href="/course" className="header__course-btn">
            {/* Иконка видна только на мобильных (через CSS) */}
            <Users size={18} className="header__course-icon-mob" />
            
            {/* Текст меняется через CSS media queries */}
            <span className="course-text-desk">Курс для родителей</span>
            <span className="course-text-mob">Курс</span>
          </Link>

          {/* Кнопка Бургер-меню (видна только на планшетах/мобильных) */}
          <button className="header__burger-btn" onClick={toggleMenu} aria-label="Меню">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- МОБИЛЬНОЕ МЕНЮ (Оверлей) --- */}
      <div className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <div className="header__mobile-menu-container">
          <ul className="header__mobile-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className={`header__mobile-link ${pathname === link.href ? 'header__mobile-link--active' : ''}`}
                  onClick={closeMenu} // Закрываем меню при клике
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </header>
  );
}