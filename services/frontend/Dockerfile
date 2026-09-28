# Builds the static export and serves it the same way GitHub Pages does: plain files, no Node runtime.
# NODE_VERSION must match the repo's .nvmrc (enforced by test/config/node-version.test.ts).
ARG NODE_VERSION=24.21.0
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
