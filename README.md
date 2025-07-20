# Split Bill App

Современное, отзывчивое веб-приложение для разделения счетов между друзьями. Позволяет легко добавлять позиции, назначать людей и рассчитывать, кто сколько должен заплатить.

## Основные функции

- Удобный пользовательский интерфейс с поддержкой темной и светлой темы
- Динамическое управление счетами
- Гибкое назначение людей на позиции счета
- Умное распределение затрат
- Интерактивная сводка с раскрывающимися карточками
- Модальные окна для аутентификации, выбора темы, валюты и управления списком друзей

## Технологический стек

- **Frontend**: React, TypeScript, Tailwind CSS
- **Framework**: Vite
- **UI компоненты**: Custom components с Lucide React иконками
- **Управление состоянием**: React Context API, React Hooks
- **Backend**: Express.js (REST API)
- **Архитектура**: Монорепозиторий с разделением на клиентскую и серверную части

## Установка и запуск

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск клиентской части (режим разработки)
npm run dev

# Запуск серверной части
npm run server

# Запуск всего проекта одновременно
npm run dev:all
```

### Docker

#### Разработка с Docker

```bash
# Запуск в режиме разработки (из корня проекта)
npm run docker:dev

# Или напрямую
docker-compose -f docker/docker-compose.yml --profile dev up --build

# Остановка
npm run docker:dev:down
# или
docker-compose -f docker/docker-compose.yml --profile dev down
```

#### Продакшн с Docker

```bash
# Запуск в продакшн режиме (из корня проекта)
npm run docker:prod

# Или напрямую
docker-compose -f docker/docker-compose.yml --profile prod up --build -d

# Остановка
npm run docker:prod:down
# или
docker-compose -f docker/docker-compose.yml --profile prod down

# Просмотр логов
npm run docker:logs
```

#### Доступные порты

- **Разработка**: 
  - Frontend: http://localhost:5173 (Vite dev server)
  - Backend API: http://localhost:5000
- **Продакшн**:
  - Express сервер (frontend + API): http://localhost:5000
  - Nginx (все запросы): http://localhost:80

# Запуск клиента и сервера одновременно
```bash
npm run dev:all
```

# Сборка для продакшена
```bash
npm run build
```

## Структура проекта

```
src/
├── client/            # Клиентская часть (React + TypeScript)
│   ├── api/           # API клиент и сервисы
│   ├── components/    # React компоненты
│   │   └── modals/    # Модальные окна
│   ├── contexts/      # React контексты
│   └── types/         # TypeScript типы
└── server/            # Серверная часть (Express + TypeScript)
    └── routes/        # API маршруты
```

## Руководство по использованию

1. Добавьте людей, которые участвуют в разделении счета
2. Добавьте позиции счета с названием и ценой
3. Назначьте людей на каждую позицию
4. Просмотрите итоговую сумму для каждого человека в разделе сводки

## Оптимизации производительности

- Использование useCallback и useMemo для оптимизации рендеринга
- Мемоизация вычислений для расчета сумм
- Оптимизированные стили с Tailwind CSS
- Ленивая загрузка модальных окон

## Лицензия

MIT
