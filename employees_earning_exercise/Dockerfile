FROM hexlet/hexlet-javascript

ENV PG_VERSION=9.3
ENV DB_USER=docker
ENV DB_NAME=docker
ENV DB_TABLE=docker_table

RUN npm i -g pg-promise

RUN apt-get update && apt-get install -y postgresql-${PG_VERSION} postgresql-contrib-${PG_VERSION}

ADD pg_hba.conf /etc/postgresql/${PG_VERSION}/main/pg_hba.conf
RUN chown postgres:postgres /etc/postgresql/${PG_VERSION}/main/pg_hba.conf

ADD postgresql_init /tmp/postgresql_init

USER postgres

RUN service postgresql start && \
                    psql -c "CREATE USER ${DB_USER} WITH LOGIN;"  && \
                    psql -c "CREATE DATABASE ${DB_NAME} WITH OWNER ${DB_USER};" && \
                    psql -U ${DB_USER} ${DB_NAME} < /tmp/postgresql_init/db.dump && \
                    psql -f /tmp/postgresql_init/solution_func.sql ${DB_NAME} && \
                    psql -c "REVOKE SELECT ON pg_proc FROM ${DB_USER};" ${DB_NAME} && \
                    psql -c "REVOKE SELECT ON pg_proc FROM public;" ${DB_NAME} && \
                    psql -c "REVOKE EXECUTE ON FUNCTION solution() FROM ${DB_USER};" ${DB_NAME} && \
                    psql -c "REVOKE EXECUTE ON FUNCTION solution() FROM public;" ${DB_NAME} ;

USER root

RUN rm -rf /tmp/postgresql_init
