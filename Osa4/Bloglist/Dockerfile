# Use Node.js 20
FROM node:20

# Set working directory
WORKDIR /app

# Copy backend files
COPY package*.json ./
RUN npm install

COPY . .

# Expose the port your app uses locally
EXPOSE 3003

# Start the backend server
CMD ["node", "index.js"]
