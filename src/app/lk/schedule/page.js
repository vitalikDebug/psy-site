'use client';

import { Calendar as CalendarIcon, Clock, Video, Users, User, PlayCircle, ArrowRight } from 'lucide-react';
import './schedule.css';

// Мокап предстоящих встреч
const upcomingMeetings = [
    {
        id: 1,
        title: 'Индивидуальная консультация: Анализ первой недели',
        date: 'Завтра, 15:00',
        duration: '45 мин',
        type: 'individual', // 'individual' или 'group'
        status: 'soon', // 'soon' (скоро, кнопка активна) или 'wait'
        link: '#'
    },
    {
        id: 2,
        title: 'Групповой созвон: Ответы на вопросы',
        date: '24 апреля, 18:00',
        duration: '1.5 часа',
        type: 'group',
        status: 'wait',
        link: '#'
    }
];

// Мокап прошедших встреч
const pastMeetings = [
    {
        id: 3,
        title: 'Вводная встреча: Знакомство и правила курса',
        date: '10 апреля',
        duration: '60 мин',
    },
    {
        id: 4,
        title: 'Разбор техники квадратного дыхания',
        date: '14 апреля',
        duration: '45 мин',
    }
];

export default function SchedulePage() {
    return (
        <main className="schedule-page">
            <div className="schedule-header">
                <h1 className="schedule-title">Расписание</h1>
                <p className="schedule-subtitle">Ваши предстоящие созвоны и архив записей.</p>
            </div>

            <h2 className="section-title">Предстоящие встречи</h2>
            <div className="upcoming-grid">
                {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className={`meeting-card ${meeting.status === 'soon' ? 'highlighted' : ''}`}>

                        {/* Бейджик статуса/типа */}
                        <div className="meeting-card__badges">
                            <span className={`type-badge ${meeting.type}`}>
                                {meeting.type === 'individual' ? <User size={14} /> : <Users size={14} />}
                                {meeting.type === 'individual' ? 'Индивидуально' : 'В группе'}
                            </span>
                            {meeting.status === 'soon' && (
                                <span className="status-badge pulse-badge">Скоро</span>
                            )}
                        </div>

                        <h3 className="meeting-title">{meeting.title}</h3>

                        <div className="meeting-details">
                            <div className="detail-item">
                                <CalendarIcon size={16} className="detail-icon" />
                                <span>{meeting.date}</span>
                            </div>
                            <div className="detail-item">
                                <Clock size={16} className="detail-icon" />
                                <span>{meeting.duration}</span>
                            </div>
                        </div>

                        <div className="meeting-action">
                            {meeting.status === 'soon' ? (
                                <button className="join-btn active">
                                    <Video size={18} /> Подключиться к Zoom
                                </button>
                            ) : (
                                <button className="join-btn disabled" disabled>
                                    Ссылка появится за 15 мин
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <hr className="schedule-divider" />

            <h2 className="section-title">Прошедшие встречи и записи</h2>
            <div className="past-meetings-list">
                {pastMeetings.map((meeting) => (
                    <div key={meeting.id} className="past-meeting-item">
                        <div className="past-meeting-item__info">
                            <div className="past-date">{meeting.date}</div>
                            <h4 className="past-title">{meeting.title}</h4>
                        </div>
                        <button className="watch-btn">
                            <PlayCircle size={20} />
                            <span>Смотреть запись</span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Инфо-блок */}
            <div className="schedule-info-box">
                <div className="info-box-content">
                    <h3>Нужно перенести индивидуальную встречу?</h3>
                    <p>Пожалуйста, предупредите Юлию в чате минимум за 24 часа до начала.</p>
                </div>
                <button className="info-box-btn">
                    Написать в чат <ArrowRight size={16} />
                </button>
            </div>
        </main>
    );
}