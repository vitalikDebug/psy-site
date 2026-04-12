// next.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Получаем точный путь к папке, где лежит этот файл конфигурации.
// path.dirname(fileURLToPath(import.meta.url)) работает надежно и на Windows, и на Linux (Vercel).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    // 2. Указываем Sass, где искать файлы (в папке src/styles)
    includePaths: [path.join(__dirname, 'src', 'styles')],

    // 3. ВАЖНО: Используем современный синтаксис @use без полного пути.
    // Sass будет искать файл "_variables.scss" в папке, указанной в includePaths выше.
    prependData: `@use "_variables.scss" as *;`
  },
};

export default nextConfig;