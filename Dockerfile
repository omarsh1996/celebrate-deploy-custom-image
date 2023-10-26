FROM node:14

RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    python3-pip

RUN pip3 install awscli

WORKDIR /workspace


COPY ./ /workspace

RUN npm install



ENV K8S_APP_SECRET1="Hello, World!"



ENTRYPOINT ["npm", "run", "deploy"]