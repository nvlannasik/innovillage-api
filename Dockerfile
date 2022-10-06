FROM node:14.14
WORKDIR /app
COPY . .
RUN npm install --force
EXPOSE 3000
CMD ["node", "app.js"]