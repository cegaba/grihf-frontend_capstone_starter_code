# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# --- Build the React Frontend ---

# Copy frontend package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the project files (src, public, server, etc.)
COPY . .

# Run the frontend production build script
# This creates the 'build' folder and moves it into '/app/server/'
RUN npm run build


# --- Setup and Run the Node.js Backend ---

# Change the working directory to the server folder
WORKDIR /app/server

# Install backend dependencies
RUN npm install

# The server runs on port 8181
EXPOSE 8181

# Command to run the backend server
CMD ["node", "index.js"]