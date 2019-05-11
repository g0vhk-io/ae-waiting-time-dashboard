FROM node:9-alpine

EXPOSE 8080

WORKDIR /app
COPY . /app

RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*

RUN yarn install --pure-lockfile && \
    yarn build && \
    yarn install --production --pure-lockfile

ENV NODE_ENV production

CMD ["yarn", "start"]