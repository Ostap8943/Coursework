# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

# Копіює лише файли, необхідні для інсталяції та запуску
COPY package.json yarn.lock ./

# Виконує інсталяцію залежностей для production
RUN yarn install --production

# Копіює лише файли, необхідні для запуску додатку
COPY src/ ./src/

# Вказує, що контейнер буде працювати на порту 3000
EXPOSE 3000

# Команда для запуску додатку
CMD ["node", "src/index.js"]
