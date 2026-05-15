ARG NODE_IMAGE=mirror.gcr.io/library/node:22-alpine
FROM ${NODE_IMAGE} AS base

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

WORKDIR /opt/app
ENV PATH=/opt/app/node_modules/.bin:$PATH

COPY package*.json ./

FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 1337
CMD ["npm", "run", "develop"]

FROM base AS production
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY . .
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]
