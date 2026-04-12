// src/components/Header/Header.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GooeyButton from '../GooeyButton/GooeyButton';
// 1. Импортируем хук и достаем selectedService
import { useModal } from '@/context/ModalContext';
import './Header.scss';

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  // 2. Достаем не только openModal, но и selectedService
  const { openModal, selectedService } = useModal();

  const navLinks = [
    { name: 'Главная', href: '#hero', id: 'hero' },
    { name: 'Обо мне', href: '#about', id: 'about' },
    { name: 'Форматы работы', href: '#services', id: 'services' },
    { name: 'Подход', href: '#approach', id: 'approach' },
    { name: 'Отзывы', href: '#reviews', id: 'reviews' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Контакты', href: '#contacts', id: 'contacts' },
  ];

  // ... (useEffect для скролла остается без изменений) ...
  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0.6 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, options);
    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });
    return () => {
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <header className="header">
      <div className="header__container">
        
        <div className="header__left">
           {/* Кнопка вызывает модалку. Если услуга уже выбрана, она откроется с ней. */}
           <button className="header__booking-btn" onClick={() => openModal()}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
             <span>Запись</span>

             {/* 3. УСЛОВНЫЙ РЕНДЕРИНГ: Если есть выбранная услуга, показываем бейдж */}
             {selectedService && (
                <span className="header__booking-badge">1</span>
             )}
           </button>
        </div>

        <nav className="header__nav">
          <ul className="header__list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="header__item">
                  <Link 
                    href={link.href}
                    className={`header__link ${isActive ? 'header__link--active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <GooeyButton href="/course" className="header__btn--gooey">
             Курс для родителей
          </GooeyButton>
        </nav>
      </div>
    </header>
  );
}