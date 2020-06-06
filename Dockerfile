FROM node:12-alpine AS build
WORKDIR /usr/src/app
COPY ./ .
RUN ["npm", "ci"]
RUN ["npm", "run", "build"]

FROM node:12-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/package-lock.json .
COPY --from=build /usr/src/app/server.js .
COPY --from=build /usr/src/app/public/ .
RUN ["npm", "ci", "--only=production"]

EXPOSE 3223
CMD ["node", "server.js"]