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
FROM 'user';
SELECT *
FROM pet
  JOIN 'user' ON pet.user_id = 'user'.id;
CREATE TABLE IF NOT EXISTS pet (
  id SERIAL PRIMARY KEY,
  type pet_type NOT NULL,
  gender gender_type NOT NULL,
  country VARCHAR(255),
  city VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255),
  status status_type NOT NULL,
  like INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS pet (
  id SERIAL PRIMARY KEY,
  type pet_type NOT NULL,
  gender gender_type NOT NULL,
  country VARCHAR(255),
  city VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255),
  status status_type NOT NULL,
  "like" INTEGER DEFAULT 0
);