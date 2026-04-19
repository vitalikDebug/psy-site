// src/app/lk/layout.js
import Sidebar from '@/components/Sidebar/Sidebar';
import BottomNav from '@/components/BottomNav/BottomNav'; // <-- Импортируем
import './lk-global.css';

export default function LkLayout({ children }) {
    return (
        <div className="lk-layout__wrapper">
            <div className="lk-layout__container">
                {/* На ПК показывается Sidebar, а на мобилках он скрывается через CSS */}
                <Sidebar />

                <div className="lk-layout__content">
                    {children}
                </div>
            </div>

            {/* Нижняя панель (показывается только на мобилках) */}
            <BottomNav />
        </div>
    );
}