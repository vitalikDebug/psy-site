'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Wind, FileText, Play, Square, FileAudio } from 'lucide-react';
import './library.css';

const libraryMaterials = [
    {
        id: 1,
        title: 'Памятка: Что делать, если случился ступор?',
        type: 'pdf',
        icon: FileText,
        color: '#3b82f6',
        bg: '#eff6ff',
        readTime: '3 мин'
    },
    {
        id: 2,
        title: 'Техники расслабления шеи и плечевого пояса',
        type: 'audio',
        icon: FileAudio,
        color: '#10b981',
        bg: '#ecfdf5',
        readTime: '10 мин'
    },
    {
        id: 3,
        title: 'Как правильно объяснить близким про режим тишины',
        type: 'article',
        icon: BookOpen,
        color: '#f59e0b',
        bg: '#fffbeb',
        readTime: '5 мин'
    }
];

export default function LibraryPage() {
    const [isBreathing, setIsBreathing] = useState(false);
    const [breathPhase, setBreathPhase] = useState('Готовы?'); // Вдох, Выдох

    // Логика переключения текста дыхания (Вдох - 4 сек, Выдох - 4 сек)
    useEffect(() => {
        let interval;
        if (isBreathing) {
            setBreathPhase('Вдох...');
            let isExhale = false;

            interval = setInterval(() => {
                isExhale = !isExhale;
                setBreathPhase(isExhale ? 'Выдох...' : 'Вдох...');
            }, 4000); // Смена фазы каждые 4 секунды
        } else {
            setBreathPhase('Дыхательная гимнастика');
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isBreathing]);

    return (
        <main className="library-page">
            <div className="library-page__header">
                <h1 className="library-page__title">База знаний</h1>
                <p className="library-page__subtitle">Полезные материалы и практики, которые всегда под рукой.</p>
            </div>

            {/* ИНТЕРАКТИВНЫЙ ТРЕКЕР ДЫХАНИЯ */}
            <div className="breathing-widget">
                <div className="breathing-widget__info">
                    <Wind size={24} color="#A078C4" />
                    <h2>Успокаивающее дыхание</h2>
                    <p>Эта практика поможет снять телесное напряжение и успокоить нервную систему перед важным разговором.</p>

                    <button
                        className={`breathing-btn ${isBreathing ? 'active' : ''}`}
                        onClick={() => setIsBreathing(!isBreathing)}
                    >
                        {isBreathing ? (
                            <><Square size={16} fill="currentColor" /> Остановить</>
                        ) : (
                            <><Play size={16} fill="currentColor" /> Начать практику</>
                        )}
                    </button>
                </div>

                <div className="breathing-widget__visual">
                    <div className={`breathing-circle ${isBreathing ? 'animate' : ''}`}>
                        <span className="breathing-text">{breathPhase}</span>
                    </div>
                </div>
            </div>

            <hr className="library-divider" />

            {/* СЕТКА МАТЕРИАЛОВ */}
            <h2 className="library-section-title">Материалы курса</h2>
            <div className="library-grid">
                {libraryMaterials.map((item) => (
                    <div key={item.id} className="library-card">
                        <div className="library-card__icon" style={{ backgroundColor: item.bg, color: item.color }}>
                            <item.icon size={24} />
                        </div>
                        <h3 className="library-card__title">{item.title}</h3>

                        <div className="library-card__footer">
                            <span className="library-card__tag">
                                {item.type === 'pdf' ? 'PDF Памятка' : item.type === 'audio' ? 'Аудио' : 'Статья'}
                            </span>
                            <span className="library-card__time">{item.readTime}</span>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}