// src/components/Header/Header.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, Menu, X, Users, ArrowLeft, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

import { useModal } from '@/context/ModalContext';

const mainNavLinks = [
  { name: 'Обо мне', href: '/#about' },
  { name: 'Подход', href: '/#approach' },
  { name: 'Отзывы', href: '/#reviews' },
  { name: 'Контакты', href: '/#contacts' },
];

const courseNavLinks = [
  { name: 'Для кого', href: '#target' },
  { name: 'Программа', href: '#modules' },
  { name: 'Тарифы', href: '#pricing' },
  { name: 'Автор', href: '#author' },
];

const fadeVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2, ease: 'easeIn' } }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal, selectedService } = useModal();

  const isCoursePage = pathname === '/course';
  const isLkPage = pathname.startsWith('/lk');

  const activeNavLinks = isCoursePage ? courseNavLinks : mainNavLinks;

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
      {/* РАЗДЕЛЯЕМ ЛОГИКУ:
        Если мы в Личном Кабинете, рендерим полностью прозрачную шапку.
        Если на сайте - рендерим привычный белый островок.
      */}

      {isLkPage ? (
        /* --- МАКЕТ ДЛЯ ЛИЧНОГО КАБИНЕТА (БЕЗ ГЛАВНОГО ОСТРОВКА) --- */
        <motion.header 
          className="header-lk" /* Используем отдельный класс без белого фона */
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="header-lk__layout">
            
            {/* Левый мини-островок с аватаром */}
            <div className="header__lk-island">
              <div className="header__lk-avatar">
                <User size={20} />
              </div>
              <span className="header__lk-name">V L</span>
            </div>
            
            {/* Правая кнопка */}
            <Link href="/" className="header__lk-back-btn" aria-label="На сайт">
              <ArrowLeft size={18} />
              <span className="course-text-desk">Вернуться на сайт</span>
              <span className="course-text-mob">На сайт</span>
            </Link>

          </div>
        </motion.header>

      ) : (
        /* --- ОБЫЧНЫЙ МАКЕТ ДЛЯ САЙТА (С БЕЛЫМ ОСТРОВКОМ) --- */
        <motion.header 
          className={`header ${isCoursePage ? 'header--course-mode' : ''}`}
          initial={{ y: -100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
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
              <AnimatePresence mode="wait">
                <motion.ul 
                  key={isCoursePage ? 'course-nav' : 'main-nav'}
                  className="header__list"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {activeNavLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className={`header__link ${pathname === link.href ? 'header__link--active' : ''}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </nav>

            <div className="header__right">
              <AnimatePresence mode="wait">
               <motion.div 
                  key={isCoursePage ? 'course-btn' : 'main-btn'}
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  {isCoursePage ? (
                    <Link href="/" className="header__back-btn" aria-label="На главную">
                      <ArrowLeft size={18} className="header__course-icon-mob" />
                      <span className="course-text-desk">Назад на главную</span>
                      <span className="course-text-mob">Назад</span>
                    </Link>
                  ) : (
                    <Link href="/course" className="header__course-btn">
                      <Users size={18} className="header__course-icon-mob" />
                      <span className="course-text-desk">Курс для родителей</span>
                      <span className="course-text-mob">Курс</span>
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>

             

              <button className="header__burger-btn" onClick={toggleMenu} aria-label="Меню">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* ПЛАВАЮЩАЯ КНОПКА ПРОФИЛЯ НА ОСНОВНОМ САЙТЕ */}
          <Link href="/lk" className="header__floating-profile" aria-label="Личный кабинет">
            <User size={20} />
          </Link>
        </motion.header>
      )}

      {/* МОБИЛЬНОЕ МЕНЮ (Не рендерим в ЛК) */}
      {!isLkPage && (
        <div className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu--open' : ''}`}>
          <div className="header__mobile-menu-container">
            <AnimatePresence mode="wait">
              <motion.ul 
                key={isCoursePage ? 'course-mob' : 'main-mob'}
                className="header__mobile-list"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {activeNavLinks.map((link) => (
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
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}