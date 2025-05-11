FROM node:20-alpine AS builder


WORKDIR /app


COPY package.json package-lock.json* ./


RUN npm ci


COPY . .


ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL


RUN npm run build