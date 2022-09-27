FROM mongo:latest
COPY ./init.ms .
# assume you are in mongo bin directory
# RUN mongod
# -f /etc/mongo.conf
RUN mongosh < ./init.ms
