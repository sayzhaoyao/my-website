ARG NODE_IMAGE=mirror.gcr.io/library/node:22-alpine
FROM ${NODE_IMAGE} AS base

WORKDIR /opt/app
ENV PATH=/opt/app/node_modules/.bin:$PATH

COPY package*.json ./

FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS production
ENV NODE_ENV=production
RUN npm install
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npm run build && npm run start"]
