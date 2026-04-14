// src/components/Header/Header.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, Menu, X, Users, ArrowLeft } from 'lucide-react';
import './Header.css';

import { useModal } from '@/context/ModalContext';

const navLinks = [
  { name: 'Обо мне', href: '/#about' },
  { name: 'Подход', href: '/#approach' },
  { name: 'Отзывы', href: '/#reviews' },
  { name: 'Контакты', href: '/#contacts' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal, selectedService } = useModal();

  // Определяем, находимся ли мы на странице курса
  const isCoursePage = pathname === '/course';

  // Блокируем прокрутку страницы при открытом мобильном меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      // Если меню закрыто (или компонент размонтируется), возвращаем скролл
      document.body.style.overflow = 'unset';
    }
    
    // Функция очистки при размонтировании компонента или изменении isMenuOpen
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* --- HEADER (ОСТРОВОК) --- */}
      <header className={`header ${isCoursePage ? 'header--course-mode' : ''}`}>
        <div className="header__container">
          
          {/* --- ЛЕВАЯ ЧАСТЬ (Запись) --- */}
          <div className="header__left">
            <button 
              className="header__booking-btn" 
              aria-label="Записаться"
              onClick={() => openModal()} 
            >
              <CalendarDays size={20} className="header__booking-icon" />
              <span>Запись</span>
              {selectedService && (
                 <div className="header__booking-badge">1</div>
              )}
            </button>
          </div>

          {/* --- ЦЕНТРАЛЬНАЯ ЧАСТЬ (Навигация) --- */}
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

          {/* --- ПРАВАЯ ЧАСТЬ (Курс/Назад и Бургер) --- */}
          <div className="header__right">
            
            {isCoursePage ? (
              <Link href="/" className="header__back-btn" aria-label="На главную">
                <ArrowLeft size={22} />
              </Link>
            ) : (
              <Link href="/course" className="header__course-btn">
                <Users size={18} className="header__course-icon-mob" />
                <span className="course-text-desk">Курс для родителей</span>
                <span className="course-text-mob">Курс</span>
              </Link>
            )}

            {/* Бургер-меню */}
            <button className="header__burger-btn" onClick={toggleMenu} aria-label="Меню">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- МОБИЛЬНОЕ МЕНЮ (Вынесено наружу) --- */}
      <div className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <div className="header__mobile-menu-container">
          <ul className="header__mobile-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className={`header__mobile-link ${pathname === link.href ? 'header__mobile-link--active' : ''}`}
                  onClick={closeMenu} 
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}