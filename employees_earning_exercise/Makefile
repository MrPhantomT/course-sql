include ../../../docker.mk

SOLUTION:=$(shell sed -n '/^-- BEGIN*$$/,/^-- END*$$/{/^-- BEGIN*$$/b;/^-- END*$$/b;p}' $(CURDIR)/exercise/solution.sql)

build: gen_function

gen_function:
	rm -f $(CURDIR)/postgresql_init/solution_func.sql
	echo "CREATE OR REPLACE FUNCTION solution() RETURNS table(Name varchar(10)) AS '$(SOLUTION)' LANGUAGE SQL" >> $(CURDIR)/postgresql_init/solution_func.sql
