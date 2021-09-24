FROM node:15.8.0
WORKDIR /usr/front
EXPOSE 8080
COPY package.json /usr/front/package.json
COPY yarn.lock yarn.lock
RUN yarn install
COPY . /user/front
CMD ["bash"]