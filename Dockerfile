FROM node:12-slim AS build
WORKDIR /usr/src/app
COPY ./ .
RUN ["npm", "ci"]
RUN ["npm", "run", "build"]

FROM node:12-slim
RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-stable \
     && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/package-lock.json .
COPY --from=build /usr/src/app/server.js .
COPY --from=build /usr/src/app/public/ .
RUN ["npm", "ci", "--only=production"]

EXPOSE 3223
CMD ["node", "server.js"]