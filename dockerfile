FROM node:20-alpine

RUN apk add --no-cache libc6-compat
WORKDIR /app

# ARG NEXT_PUBLIC_BASE_URL

# ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL   \

COPY package.json package-lock.json* ./

RUN npm install

COPY . .


RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
