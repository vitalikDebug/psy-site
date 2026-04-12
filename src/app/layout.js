// src/app/layout.js
import Header from '@/components/Header/Header';
import './global.scss';
// Импортируем наш новый провайдер
import { ModalProvider } from '@/context/ModalContext';

import { Playfair_Display, Inter, Caveat } from 'next/font/google';

// ... (шрифты и метаданные оставляем без изменений) ...
const playfair = Playfair_Display({ subsets: ['cyrillic', 'latin'], weight: ['400', '600', '700'], variable: '--font-playfair', display: 'swap', });
const inter = Inter({ subsets: ['cyrillic', 'latin'], weight: ['400', '500', '600'], variable: '--font-inter', display: 'swap', });
const caveat = Caveat({ subsets: ['cyrillic', 'latin'], weight: ['400', '500', '600'], variable: '--font-caveat', display: 'swap', });

export const metadata = {
  title: 'Психолог Юлия Шкаранда',
  description: 'Центр коррекции заикания',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${playfair.variable} ${inter.variable} ${caveat.variable}`}>
        {/* ОБОРАЧИВАЕМ ВСЁ В ModalProvider */}
        <ModalProvider>
          {/* Теперь Header не нужны никакие пропсы, он сам возьмет что нужно из контекста */}
          <Header />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}