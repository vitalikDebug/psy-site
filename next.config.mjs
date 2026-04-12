// next.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';

// Эти две строки нужны для корректной работы путей в новых версиях Node.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    // 1. Указываем Sass, где искать файлы (в папке src/styles)
    includePaths: [path.join(__dirname, 'src', 'styles')],

    // 2. ВАЖНО: Используем современный синтаксис @use.
    // Эта строка будет автоматически добавлена в начало каждого SCSS файла.
    // "as *" означает "использовать переменные напрямую", без префикса.
    prependData: `@use "variables" as *;`
  },
};

export default nextConfig;