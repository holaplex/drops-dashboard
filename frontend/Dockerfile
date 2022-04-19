FROM node:17

WORKDIR /frontend

COPY package.json yarn.lock ./

RUN ["yarn", "install"]

ENV PATH /usr/node_modules/.bin:$PATH

COPY . .

EXPOSE 5000

COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]