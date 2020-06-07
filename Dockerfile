FROM node:12-alpine AS build
WORKDIR /usr/src/app
COPY ./ .
RUN ["npm", "ci"]
RUN ["npm", "run", "build"]


FROM zenika/alpine-chrome:with-node
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true \
    PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser \
    NODE_ENV production

WORKDIR /usr/src/app
COPY --from=build --chown=chrome /usr/src/app/package.json .
COPY --from=build --chown=chrome /usr/src/app/package-lock.json .
COPY --from=build --chown=chrome /usr/src/app/server.js .
COPY --from=build --chown=chrome /usr/src/app/public/ ./public

RUN ["npm", "ci", "--only=production"]

ENTRYPOINT ["tini", "--"]
EXPOSE 3223
CMD ["node", "server.js"]