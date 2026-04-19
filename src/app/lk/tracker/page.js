'use client';

import { useState, useEffect } from 'react';
import { Check, Flame, Trophy, CalendarDays, Clock } from 'lucide-react';
import './tracker.css';

// Исходный список заданий (мокап)
const initialTasks = [
    { id: 1, title: 'Дыхательная гимнастика (5 мин)', type: 'daily', completed: false },
    { id: 2, title: 'Пропевание гласных А-О-У', type: 'daily', completed: false },
    { id: 3, title: 'Чтение текста вслух (1 страница)', type: 'daily', completed: false },
    { id: 4, title: 'Практика с рукой (10 циклов)', type: 'daily', completed: false },
    { id: 5, title: 'Аудио-релаксация перед сном', type: 'regular', completed: false },
    { id: 6, title: 'Запись мыслей на видео (5 мин)', type: 'regular', completed: false },
];

export default function TrackerPage() {
    const [tasks, setTasks] = useState(initialTasks);
    const [progress, setProgress] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);

    // Высчитываем прогресс только для ежедневных заданий
    const dailyTasks = tasks.filter(t => t.type === 'daily');
    const regularTasks = tasks.filter(t => t.type === 'regular');

    useEffect(() => {
        const completedDaily = dailyTasks.filter(t => t.completed).length;
        const progressPercent = dailyTasks.length === 0 ? 0 : Math.round((completedDaily / dailyTasks.length) * 100);
        setProgress(progressPercent);

        // Если всё выполнено - показываем мини-поздравление
        if (progressPercent === 100 && completedDaily > 0) {
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000); // Скрываем через 3 сек
        }
    }, [tasks]);

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <main className="tracker-page">
            <div className="tracker-header">
                <div>
                    <h1 className="tracker-title">Трекер заданий</h1>
                    <p className="tracker-subtitle">Выполняйте задания каждый день, чтобы закрепить новый речевой навык.</p>
                </div>
                <div className="tracker-streak">
                    <Flame size={24} color="#f97316" className="streak-icon" />
                    <div className="streak-info">
                        <span className="streak-days">5 дней</span>
                        <span className="streak-label">подряд</span>
                    </div>
                </div>
            </div>

            {/* ВЕРХНИЙ ПРОГРЕСС-БАР */}
            <div className="progress-widget">
                <div className="progress-widget__header">
                    <div className="progress-info">
                        <Trophy size={20} className={progress === 100 ? 'trophy-gold' : 'trophy-gray'} />
                        <span className="progress-text">
                            {progress === 100 ? 'Все задания на сегодня выполнены! 🎉' : `Прогресс дня: выполнено ${dailyTasks.filter(t => t.completed).length} из ${dailyTasks.length}`}
                        </span>
                    </div>
                    <span className="progress-percent">{progress}%</span>
                </div>
                <div className="progress-bar-bg">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${progress}%`, backgroundColor: progress === 100 ? '#22c55e' : '#A078C4' }}
                    ></div>
                </div>
            </div>

            <div className="tracker-grid">
                {/* БЛОК: ЕЖЕДНЕВНЫЕ ЗАДАНИЯ */}
                <div className="task-section">
                    <div className="task-section__header">
                        <CalendarDays size={20} color="#A078C4" />
                        <h2>Ежедневные практики</h2>
                    </div>
                    <div className="task-list">
                        {dailyTasks.map(task => (
                            <label key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                                <div className="task-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                    />
                                    <div className="checkbox-custom">
                                        <Check size={14} className="check-icon" />
                                    </div>
                                </div>
                                <span className="task-title">{task.title}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* БЛОК: РЕГУЛЯРНЫЕ ЗАДАНИЯ */}
                <div className="task-section regular-section">
                    <div className="task-section__header">
                        <Clock size={20} color="#64748b" />
                        <h2>Раз в 2-3 дня</h2>
                    </div>
                    <div className="task-list">
                        {regularTasks.map(task => (
                            <label key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                                <div className="task-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                    />
                                    <div className="checkbox-custom regular-checkbox">
                                        <Check size={14} className="check-icon" />
                                    </div>
                                </div>
                                <span className="task-title">{task.title}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Попап празднования (появляется при 100%) */}
            {showCelebration && (
                <div className="celebration-toast">
                    Отличная работа! Вы стали на шаг ближе к свободной речи. 🚀
                </div>
            )}
        </main>
    );
}