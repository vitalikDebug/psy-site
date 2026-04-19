'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Info } from 'lucide-react';
import './chat.css';

// Начальные данные (мокап переписки)
const initialMessages = [
    {
        id: 1,
        sender: 'specialist',
        text: 'Здравствуйте, Иван! Рада приветствовать вас на курсе. Как прошел ваш первый день в режиме тишины? Были ли сильные позывы заговорить?',
        time: '10:30'
    },
    {
        id: 2,
        sender: 'user',
        text: 'Добрый день, Юлия! Спасибо. Честно говоря, было непривычно. Жена забылась и задала вопрос, я чуть не ответил вслух, но вовремя остановился и написал в телефон.',
        time: '11:15'
    },
    {
        id: 3,
        sender: 'specialist',
        text: 'Это абсолютно нормальная реакция для первого дня! Мозг по привычке запускает старый паттерн. Отличная работа, что успели переключить внимание. Продолжайте наблюдать за телом — есть ли напряжение в шее или груди в такие моменты?',
        time: '11:20'
    }
];

export default function ChatPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState('');

    // Реф для автоматического скролла вниз
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Скроллим при каждом новом сообщении

    const handleSendMessage = (e) => {
        e.preventDefault(); // Чтобы страница не перезагружалась при сабмите формы
        if (!inputValue.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: inputValue.trim(),
            time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputValue('');

        // Имитация ответа от Юлии (просто для интерактива)
        setTimeout(() => {
            const reply = {
                id: messages.length + 2,
                sender: 'specialist',
                text: 'Приняла ваше сообщение! Отвечу в течение пары часов. ✨',
                time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, reply]);
        }, 1500);
    };

    return (
        <main className="chat-page">
            {/* Шапка чата */}
            <div className="chat-header">
                <div className="chat-header__info">
                    <div className="chat-avatar">ЮШ</div>
                    <div>
                        <h2 className="chat-name">Юлия Шкаранда</h2>
                        <span className="chat-status">Заиколог • онлайн</span>
                    </div>
                </div>
            </div>

            {/* Инфо-плашка */}
            <div className="chat-notice">
                <Info size={16} className="notice-icon" />
                <span>На первой неделе связь происходит только текстом. Отвечаю с 10:00 до 19:00.</span>
            </div>

            {/* Окно сообщений */}
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-wrapper ${msg.sender === 'user' ? 'is-user' : 'is-specialist'}`}>
                        <div className="message-bubble">
                            <p className="message-text">{msg.text}</p>
                            <span className="message-time">{msg.time}</span>
                        </div>
                    </div>
                ))}
                {/* Невидимый элемент, к которому мы скроллим */}
                <div ref={messagesEndRef} />
            </div>

            {/* Поле ввода */}
            <form className="chat-input-area" onSubmit={handleSendMessage}>
                <button type="button" className="attach-btn" aria-label="Прикрепить файл">
                    <Paperclip size={20} />
                </button>
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Напишите сообщение..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    type="submit"
                    className={`send-btn ${inputValue.trim() ? 'active' : ''}`}
                    disabled={!inputValue.trim()}
                    aria-label="Отправить"
                >
                    <Send size={18} />
                </button>
            </form>
        </main>
    );
}