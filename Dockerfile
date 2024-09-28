FROM node:22.7-slim AS builder

WORKDIR /

COPY package*.json ./

RUN npm ci --production --silent --no-optional

COPY . .

RUN npm run build



FROM nginx:latest AS runner

WORKDIR /

COPY --from=builder /build /usr/share/nginx/html

COPY /nginx/default.conf /etc/nginx/conf.d

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
