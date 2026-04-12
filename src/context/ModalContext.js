// src/context/ModalContext.js
'use client';

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Здесь хранится название выбранной услуги
    const [selectedService, setSelectedService] = useState('');

    // Функция 1: Открыть модалку (и опционально запомнить услугу)
    // Если serviceName не передан, откроется с тем, что было выбрано ранее
    const openModal = (serviceName = null) => {
        if (serviceName) {
            setSelectedService(serviceName);
        }
        setIsModalOpen(true);
    };

    // Функция 2: Просто закрыть модалку (услуга ЗАПОМИНАЕТСЯ)
    const closeModal = () => {
        setIsModalOpen(false);
        // ВАЖНО: Мы НЕ сбрасываем selectedService здесь, чтобы в хедере осталась "1"
    };

    // Функция 3: Полностью очистить выбор (для сброса после отправки)
    const clearSelection = () => {
        setSelectedService('');
    };

    const value = {
        isModalOpen,
        selectedService,
        openModal,
        closeModal,
        clearSelection, // <-- Добавили новую функцию в экспорт
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}