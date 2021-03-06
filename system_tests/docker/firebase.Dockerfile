FROM node

RUN apt update && \
    apt install -y default-jre

RUN npm install -g firebase-tools

RUN groupadd -r firebase && useradd -r -m -g firebase -d /firebase firebase
RUN chown -R firebase /firebase

WORKDIR /firebase
USER firebase
