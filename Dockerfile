FROM node:8-alpine

EXPOSE 8080

WORKDIR /app
COPY . /app

RUN yarn install --pure-lockfile && \
    yarn build && \
    yarn install --production --pure-lockfile

ENV NODE_ENV production

CMD ["yarn", "start"]