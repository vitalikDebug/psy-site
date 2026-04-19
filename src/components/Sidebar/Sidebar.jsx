'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Mic, MessageCircle, BookOpen, LogOut, Calendar, ClipboardList } from 'lucide-react';
import './Sidebar.css';

const menuItems = [
  { name: 'Мой путь', icon: Map, href: '/lk' },
  { name: 'Трекер заданий', icon: ClipboardList, href: '/lk/tracker' }, // НОВОЕ
  { name: 'Упражнения', icon: Mic, href: '/lk/exercises' },
  { name: 'Расписание', icon: Calendar, href: '/lk/schedule' }, // НОВОЕ
  { name: 'Связь с Юлией', icon: MessageCircle, href: '/lk/chat' },
  { name: 'Библиотека', icon: BookOpen, href: '/lk/library' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Отслеживаем скролл, чтобы увеличивать сайдбар
  useEffect(() => {
    const handleScroll = () => {
      // Если проскроллили больше 60px вниз — меняем стейт
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Проверяем позицию сразу при загрузке страницы
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside className={`lk-sidebar ${isScrolled ? 'lk-sidebar--scrolled' : ''}`}>
      <div className="lk-sidebar__menu">
        <span className="lk-sidebar__label">Меню обучения</span>
        <nav className="lk-sidebar__nav">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`lk-sidebar__link ${isActive ? 'active' : ''}`}
              >
                <item.icon size={20} className="lk-sidebar__icon" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="lk-sidebar__footer">
        <button className="lk-sidebar__logout">
          <LogOut size={18} />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
}