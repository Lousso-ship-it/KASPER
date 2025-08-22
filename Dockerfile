FROM node:20-alpine
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4173

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Expose port and start the app
EXPOSE $PORT
CMD ["npm", "run", "preview"]
