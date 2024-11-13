# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# 필요한 파일들만 복사 (Dockerfile 경로에 맞춰 상대 경로 수정)
COPY FrontEnd/1sBefore/package*.json ./
COPY FrontEnd/1sBefore/next.config.ts ./

# 종속성 설치
RUN npm install --frozen-lockfile

# 소스 파일 복사 및 빌드
COPY FrontEnd/1sBefore .
RUN npm run build

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app

# 빌드된 아티팩트와 종속성만 복사
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# 포트 노출
EXPOSE 3000

# 애플리케이션 시작
CMD ["npm", "start"]
