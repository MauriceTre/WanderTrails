# Base Image for Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 5000
EXPOSE 5000

# Set environment variables
ENV PORT=5000

# Start the application
CMD ["npm", "start"]
