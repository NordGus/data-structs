FROM node:lts

WORKDIR /usr/src/app
COPY . .
RUN npm install yarn
RUN yarn install

CMD [ "yarn", "start" ]