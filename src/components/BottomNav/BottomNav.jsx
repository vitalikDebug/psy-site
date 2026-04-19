'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Mic, MessageCircle, Calendar, ClipboardList } from 'lucide-react';
import './BottomNav.css';

// Для телефона названия лучше сделать короче, чтобы они поместились в ряд
const navItems = [
  { name: 'Путь', icon: Map, href: '/lk' },
  { name: 'Трекер', icon: ClipboardList, href: '/lk/tracker' },
  { name: 'Практика', icon: Mic, href: '/lk/exercises' },
  { name: 'Встречи', icon: Calendar, href: '/lk/schedule' },
  { name: 'Чат', icon: MessageCircle, href: '/lk/chat' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`bottom-nav__item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={24} className="bottom-nav__icon" />
            <span className="bottom-nav__label">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}