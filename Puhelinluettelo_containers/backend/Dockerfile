FROM node:20

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3001

CMD ["npm", "start"]