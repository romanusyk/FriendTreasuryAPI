FROM postgres
COPY init.sql.noexec /docker-entrypoint-initdb.d/
COPY init.sh /docker-entrypoint-initdb.d/
ARG USERNAME
ARG PASSWORD
ENV USERNAME "$USERNAME"
ENV PASSWORD "$PASSWORD"
RUN export USERNAME
RUN export PASSWORD