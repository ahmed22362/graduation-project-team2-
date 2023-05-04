SELECT *
FROM pg_catalog.pg_tables
SELECT datname
FROM pg_database
WHERE datname = 'pets'
SELECT *
FROM "User"
ALTER TABLE clink
    RENAME TO clinic;