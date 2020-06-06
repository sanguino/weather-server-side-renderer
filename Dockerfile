FROM node:12-alpine AS build
WORKDIR /usr/src/app
COPY ./ .
RUN ["npm", "ci"]
RUN ["npm", "run", "build"]

FROM node:12-alpine
WORKDIR /usr/src/app
COPY --from=base ./public .
COPY --from=base ./server.js .
RUN ["npm", "ci", "--only=production"]

EXPOSE 3223
CMD ["node", "server.js"]