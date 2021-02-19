FROM node as builder

COPY package.json package-lock.json ./

RUN npm install 

COPY . .

RUN npm run build


FROM node

WORKDIR /app

COPY --from=builder package.json package-lock.json ./

RUN npm install 

COPY --from=builder dist .

RUN groupadd -r app && useradd -r -g app app
USER app

EXPOSE 5000

CMD [ "node", "app.js" ]
