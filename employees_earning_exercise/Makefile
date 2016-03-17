include ../../../docker.mk


SOLUTION:=`cat $(CURDIR)/exercise/solution.sql`

gen_solution_function:
	echo "CREATE OR REPLACE FUNCTION solution() RETURNS table(name varchar(10)) AS '$(SOLUTION)' LANGUAGE SQL;" > $(CURDIR)/solution.sql

