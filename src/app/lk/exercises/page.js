'use client';

import { useState, useEffect } from 'react';
import { Play, Mic, Square, Send, CheckCircle2, Volume2, Info, Camera, Video, User } from 'lucide-react';
import './exercises.css';

export default function ExercisesPage() {
    // Стейты для симуляции диктофона
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // Простой таймер для диктофона
    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    // Форматирование времени (например, 0:05)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleToggleRecord = () => {
        if (isRecording) {
            setIsRecording(false);
            setIsSaved(true); // "Сохраняем" запись
        } else {
            setIsSaved(false);
            setIsSent(false);
            setRecordingTime(0);
            setIsRecording(true);
        }
    };

    const handleSend = () => {
        setIsSent(true);
    };

    return (
        <main className="exercises-page">
            <div className="exercises-page__header">
                <h1 className="exercises-page__title">Упражнения</h1>
                <span className="exercises-page__badge">Неделя 2: Гласные</span>
            </div>

            <div className="exercises-page__info">
                <Info size={20} className="info-icon" />
                <p>Режим тишины снят. На этой неделе мы начинаем аккуратно запускать голос. Ваша задача — выполнять упражнения ежедневно.</p>
            </div>

            {/* КАРТОЧКА ЗАДАНИЯ */}
            <div className="exercise-card">
                <div className="exercise-card__header">
                    <h2>Задание 1: Плавная связка А-О-У</h2>
                    <span className="status-tag">Не выполнено</span>
                </div>

                <p className="exercise-card__desc">
                    Послушайте эталонное звучание. Затем нажмите на микрофон, сделайте правильный вдох и на плавном выдохе произнесите связку гласных. Тяните звук мягко, без толчков.
                </p>

                {/* ЭТАЛОННЫЙ ПЛЕЕР (Голос специалиста) */}
                <div className="audio-player reference-player">
                    <button className="play-btn">
                        <Play size={18} fill="currentColor" />
                    </button>
                    <div className="player-waveform">
                        {/* Имитация звуковой волны */}
                        <div className="wave-bar"></div><div className="wave-bar"></div>
                        <div className="wave-bar"></div><div className="wave-bar"></div>
                        <div className="wave-bar"></div><div className="wave-bar"></div>
                    </div>
                    <span className="player-time">0:06</span>
                    <Volume2 size={18} className="volume-icon" />
                </div>

                <hr className="exercise-divider" />

                {/* ЗОНА ЗАПИСИ (Диктофон ученика) */}
                <div className="record-section">
                    {!isSent ? (
                        <>
                            <h3 className="record-title">Ваша очередь</h3>

                            {!isSaved ? (
                                // СОСТОЯНИЕ 1 И 2: ГОТОВ К ЗАПИСИ ИЛИ ИДЕТ ЗАПИСЬ
                                <div className="record-controls">
                                    <button
                                        className={`mic-btn ${isRecording ? 'recording' : ''}`}
                                        onClick={handleToggleRecord}
                                    >
                                        {isRecording ? <Square size={24} fill="currentColor" /> : <Mic size={28} />}
                                    </button>
                                    <span className={`record-timer ${isRecording ? 'active' : ''}`}>
                                        {isRecording ? formatTime(recordingTime) : 'Нажмите для записи'}
                                    </span>
                                </div>
                            ) : (
                                // СОСТОЯНИЕ 3: ЗАПИСЬ ГОТОВА, МОЖНО ОТПРАВИТЬ
                                <div className="saved-record-container">
                                    <div className="audio-player student-player">
                                        <button className="play-btn">
                                            <Play size={18} fill="currentColor" />
                                        </button>
                                        <div className="player-track">
                                            <div className="player-progress"></div>
                                        </div>
                                        <span className="player-time">{formatTime(recordingTime)}</span>
                                    </div>

                                    <div className="saved-actions">
                                        <button className="action-btn retry-btn" onClick={handleToggleRecord}>
                                            Перезаписать
                                        </button>
                                        <button className="action-btn send-btn" onClick={handleSend}>
                                            <Send size={16} /> Отправить
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        // СОСТОЯНИЕ 4: ОТПРАВЛЕНО
                        <div className="success-state">
                            <CheckCircle2 size={40} className="success-icon" />
                            <h3>Аудио отправлено!</h3>
                            <p>Юлия проверит вашу запись и даст обратную связь в чате.</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="exercise-card">
                <div className="exercise-card__header">
                    <h2>Задание 2: Телесная опора (Цикл с рукой)</h2>
                    <span className="status-tag pending">К выполнению</span>
                </div>

                <p className="exercise-card__desc">
                    Это упражнение помогает синхронизировать дыхание и речь через моторику. Посмотрите видеоинструкцию от Юлии и потренируйте этот цикл перед зеркалом.
                </p>

                {/* ВИДЕОПЛЕЕР (Мокап) */}
                <div className="video-player-mockup">
                    <div className="video-player__overlay">
                        <button className="video-play-btn">
                            <Play size={32} fill="currentColor" />
                        </button>
                        <span className="video-duration">02:15</span>
                    </div>
                    {/* Здесь может быть картинка-превью видео */}
                </div>

                {/* ПОШАГОВЫЙ АЛГОРИТМ */}
                <div className="exercise-steps">
                    <div className="step-item">
                        <div className="step-number">1</div>
                        <div className="step-text">
                            <strong>Вдох:</strong> Медленно ведем большой палец вверх. Концентрируемся на плавном вдохе.
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-number">2</div>
                        <div className="step-text">
                            <strong>Речь:</strong> Плавно выпрямляем палец и синхронно с этим движением начинаем говорить.
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-number">3</div>
                        <div className="step-text">
                            <strong>Сброс:</strong> Полностью расслабляем кисть, опускаем руку и даем телу расслабиться.
                        </div>
                    </div>
                    <div className="step-item info-step">
                        <Info size={18} className="step-info-icon" />
                        <div className="step-text">
                            Если фраза длинная и нужно сказать что-то еще — начинаем весь цикл заново (палец вверх = новый вдох).
                        </div>
                    </div>
                </div>

                <button className="action-btn complete-btn">
                    <CheckCircle2 size={18} /> Отметить как пройденное
                </button>
            </div>
            <div className="exercise-card">
                <div className="exercise-card__header">
                    <h2>Задание 3: От слогов к словам</h2>
                    <span className="status-tag pending">К выполнению</span>
                </div>

                <p className="exercise-card__desc">
                    Теперь мы добавляем к гласным согласные звуки. Сохраняйте ту же плавность, что и в первом упражнении. Не толкайте согласную, мягко «въезжайте» в гласную.
                </p>

                <div className="exercise-steps">
                    <div className="step-item">
                        <div className="step-number">1</div>
                        <div className="step-text">
                            <strong>Слоги (Слияние):</strong> МММА-А-А, МММО-О-О, МММУ-У-У. Запишите аудио и проверьте, нет ли напряжения на звуке «М».
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-number">2</div>
                        <div className="step-text">
                            <strong>Слова:</strong> Плавно переходим от слога к слогу в простых словах: МА-МА, ВО-ДА, МО-ЛО-КО.
                        </div>
                    </div>
                </div>

                {/* Мини-диктофон для этого задания (упрощенный визуально) */}
                <div className="mini-record-box">
                    <button className="mini-mic-btn">
                        <Mic size={20} /> Записать чтение слов
                    </button>
                </div>
            </div>
            <div className="exercise-card">
                <div className="exercise-card__header">
                    <h2>Задание 4: Мысли вслух (Видео)</h2>
                    <span className="status-tag pending">К выполнению</span>
                </div>

                <p className="exercise-card__desc">
                    Мощнейшее упражнение для снятия страха речи. Включите камеру и просто рассуждайте вслух на любую тему (как прошел день, что планируете делать).
                    <strong>Главная цель:</strong> смотреть на себя в экран во время речи и не отводить взгляд, если случился ступор.
                </p>

                {/* ИНТЕРФЕЙС КАМЕРЫ */}
                <div className="camera-mockup">
                    <div className="camera-mockup__viewfinder">
                        {/* Имитация того, что человек видит себя */}
                        <User size={80} color="rgba(255,255,255,0.2)" strokeWidth={1} />
                        <div className="camera-focus-box"></div>
                    </div>

                    <div className="camera-mockup__controls">
                        <button className="camera-switch-btn" aria-label="Перевернуть камеру">
                            <Camera size={24} />
                        </button>
                        <button className="camera-record-btn" aria-label="Начать запись">
                            <div className="camera-record-inner"></div>
                        </button>
                        <button className="camera-gallery-btn" aria-label="Галерея">
                            <Video size={24} />
                        </button>
                    </div>
                </div>

                <div className="exercise-steps">
                    <div className="step-item info-step">
                        <Info size={18} className="step-info-icon" />
                        <div className="step-text">
                            Запись не нужно никуда отправлять (если не хотите). Упражнение предназначено исключительно для того, чтобы вы привыкли к своему образу и снизили градус напряжения.
                        </div>
                    </div>
                </div>

                <button className="action-btn complete-btn">
                    <CheckCircle2 size={18} /> Отметить как пройденное
                </button>
            </div>
        </main>
    );
}