# Default target: builds the static export and serves it the same way GitHub Pages does: plain files, no Node runtime.
# `dev` target: `next dev` with hot reload, used by the frontend-dev service in services/docker-compose.yml.
# NODE_VERSION must match the repo's .nvmrc (enforced by test/config/node-version.test.ts).
ARG NODE_VERSION=24.21.0
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY . .
RUN npm run build

# Dependencies only: the source code is bind-mounted at runtime. node_modules stays in the image (Alpine builds of the
# native packages) and .next is created here so the volumes mounted over them are owned by `node` (uid 1000).
FROM node:${NODE_VERSION}-alpine AS dev
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci && mkdir .next && chown -R node:node /app
USER node
EXPOSE 3000
CMD ["npx", "next", "dev", "--hostname", "0.0.0.0", "--port", "3000"]

FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
