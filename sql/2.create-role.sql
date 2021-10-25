CREATE ROLE server WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'server';

GRANT CONNECT ON DATABASE server TO supertest;