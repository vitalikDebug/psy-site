// src/components/Header/Header.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, Menu, X, Users, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion'; // ИМПОРТИРУЕМ FRAMER MOTION
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

  const isCoursePage = pathname === '/course';

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* --- HEADER (ОСТРОВОК) С АНИМАЦИЕЙ --- */}
      {/* Используем motion.header для выезда сверху */}
      <motion.header 
        className={`header ${isCoursePage ? 'header--course-mode' : ''}`}
        initial={{ y: -100, x: "-50%", opacity: 0 }} // Начинает выше экрана
        animate={{ y: 0, x: "-50%", opacity: 1 }}    // Плавно опускается на место
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      >
        <div className="header__container">
          
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

          <div className="header__right">
            {isCoursePage ? (
              /* Кнопка НАЗАД (теперь такая же широкая) */
              <Link href="/" className="header__back-btn" aria-label="На главную">
                <ArrowLeft size={18} className="header__course-icon-mob" />
                <span className="course-text-desk">Назад на главную</span>
                <span className="course-text-mob">Назад</span>
              </Link>
            ) : (
              /* Кнопка КУРС */
              <Link href="/course" className="header__course-btn">
                <Users size={18} className="header__course-icon-mob" />
                <span className="course-text-desk">Курс для родителей</span>
                <span className="course-text-mob">Курс</span>
              </Link>
            )}

            <button className="header__burger-btn" onClick={toggleMenu} aria-label="Меню">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.header>

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