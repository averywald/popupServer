FROM debian:latest

RUN apt-get update
RUN apt upgrade -y
RUN apt install -y \
    systemctl \
    fish \
    sudo \
    curl \
    gzip \
    tar \
    wget \
    tree \
    tmux \
    vim \
    nginx \
    nodejs \
    qbittorrent-nox

# set up user
RUN cp /usr/bin/fish /bin/fish
RUN useradd qbit --shell /bin/fish
RUN echo "qbit:torrent!" | chpasswd
RUN usermod -aG sudo qbit

WORKDIR /home/qbit

COPY ./dotfiles/.vimrc ./.vimrc

RUN chgrp -R qbit /home/qbit && chown -R qbit /home/qbit

# mongoDB setup
RUN echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/6.0 main" \
    | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
RUN apt install -y mongodb-org

# TODO: create mongodb user cred DB
# TODO: add web portal auth user creds

# TODO: set up an nginx web server
# TODO: create a login portal to access qbittorrent web page 

# qbittorrent web ui runs on 8080
EXPOSE 8080
# run qbittorrent daemon
RUN qbittorrent-nox -d
ENTRYPOINT ["/bin/fish"]