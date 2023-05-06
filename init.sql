SELECT *
FROM pg_catalog.pg_tables
SELECT datname
FROM pg_database
WHERE datname = 'pets'
SELECT *
FROM "User"
ALTER TABLE clink
  RENAME TO clinic;
SELECT column_name
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'User';
SELECT *
FROM "user"