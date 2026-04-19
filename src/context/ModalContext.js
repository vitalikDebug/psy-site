// src/context/ModalContext.js
'use client';

import { createContext, useContext, useState } from 'react';
// ИМПОРТИРУЕМ МОДАЛКУ СЮДА (проверь, правильный ли путь)
import ContactModal from '@/components/ContactModal/ContactModal';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');

    const openModal = (serviceName = null) => {
        if (serviceName) {
            setSelectedService(serviceName);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const clearSelection = () => {
        setSelectedService('');
    };

    const value = {
        isModalOpen,
        selectedService,
        openModal,
        closeModal,
        clearSelection,
    };

    return (
        <ModalContext.Provider value={value}>
            {/* Здесь рендерятся все твои страницы (Главная, Курс, Блог) */}
            {children}

            {/* А модалка теперь висит глобально над всем сайтом! */}
            <ContactModal
                isOpen={isModalOpen}
                onClose={closeModal}
                initialService={selectedService}
            />
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