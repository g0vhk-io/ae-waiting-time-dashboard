FROM node:9-alpine as base

RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*


#
#       -- Dependencies --
#
FROM base AS dependencies

# set the tmp as workdir
WORKDIR /tmp

# Install app dependencies
COPY package.json .

# install node packages, and use this stage as a cache
RUN yarn install --pure-lockfile --production && mv node_modules node_modules_prod
RUN yarn install --pure-lockfile

#
#       -- Build --
#
FROM dependencies AS build

WORKDIR /tmp
COPY . .
COPY --from=dependencies /tmp/node_modules .
RUN yarn build

#
#       -- Release --
#

FROM node:9-alpine

EXPOSE 8080

WORKDIR /app
COPY . .
COPY --from=build /tmp/dist ./dist
COPY --from=dependencies /tmp/node_modules_prod ./node_modules
ENV NODE_ENV production

CMD ["yarn", "start"]