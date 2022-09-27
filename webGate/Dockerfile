FROM node:latest

WORKDIR /apps/webGate
COPY ./package.json .
RUN npm install
COPY ./dist ./dist
# ignore prestart npm run hook
CMD npm start --ignore-scripts
