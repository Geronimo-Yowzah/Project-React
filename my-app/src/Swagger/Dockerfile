FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3001
CMD ["node", "server.js"]
