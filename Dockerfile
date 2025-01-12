# Backend Stage
FROM node:14 as backend

WORKDIR /usr/src/app

# Copy and install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy the backend code
COPY backend/ ./backend/

# Frontend Stage
FROM node:14 as frontend

WORKDIR /usr/src/app

# Copy and install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy the frontend code
COPY frontend/ ./frontend/

# Expose both frontend and backend ports
EXPOSE 3000
EXPOSE 8080

# Command to run both (you would need a process manager like PM2 or docker-compose to run both together)
CMD ["sh", "-c", "cd backend && npm start & cd frontend && npm start"]
