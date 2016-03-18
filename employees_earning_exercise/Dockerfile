FROM hexlet/hexlet-javascript

RUN apt-install postgresql-9.3 postgresql-client
RUN npm i -g pg-promise

COPY init.sql /root/init.sql
COPY exercise/solution.sql /root/solution.sql

RUN sed -i -e '1iCREATE OR REPLACE FUNCTION solution() RETURNS table(name varchar(10)) AS $$' /root/solution.sql  &&  \
      echo '$$ LANGUAGE SQL;' >> /root/solution.sql;

RUN /etc/init.d/postgresql start && \
      sudo -u postgres createuser nobody -d -l && \
      sudo -u postgres createdb -O nobody nobody && \
      sudo -u nobody psql nobody < /root/init.sql && \
      sudo -u postgres psql nobody -c "REVOKE SELECT ON pg_proc FROM public;" && \
      sudo -u postgres psql nobody -c "REVOKE SELECT ON pg_proc FROM nobody;" && \
      sudo -u postgres psql nobody < /root/solution.sql;

