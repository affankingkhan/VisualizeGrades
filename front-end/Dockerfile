# FROM node:alpine

# COPY package.json .
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]
FROM nginx:1.17
COPY build/ /usr/share/nginx/html
