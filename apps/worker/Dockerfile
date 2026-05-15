ARG NODE_IMAGE=node:22-alpine

FROM ${NODE_IMAGE} AS runtime
WORKDIR /opt/worker
COPY package.json ./
RUN npm install --omit=dev
COPY . .
CMD ["npm", "run", "import:tools", "--", "--dry-run"]
