exports.queryList = {
  // pets
  GET_PET_LIST_QUERY: `SELECT * FROM pet`,
  SAVE_PET_QUERY:
    "INSERT INTO pet(type, user_id, gender, country, city, description, Status,image_url)VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *;",
  UPDATE_PET_QUERY:
    "UPDATE pet SET  type=$1, user_id =$2, gender=$3, country=$4, city=$5, description=$6, status=$7,image_url = $8 WHERE id= $9 RETURNING * ;",
  DELETE_PET_QUERY: "DELETE FROM pet WHERE  id=$1 ",
  // solid
  GET_SOLID_LIST_QUERY: "SELECT * FROM solid",
  SAVE_SOLID_QUERY:
    "INSERT INTO public.solid(name,type, price,country,city,description,image_url,user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)RETURNING",
  UPDATE_SOLID_QUERY:
    "UPDATE public.solid SET name=$1, info=$2, image_url=$3, price=$4, user_id=$6, country=$7, city=$8 WHERE id=$9 RETURNING",
  DELETE_SOLID_QUERY: "DELETE FROM public.solid WHERE id=$1",
  // clinic
  GET_CLINIC_LIST_QUERY: "SELECT * FROM clinic;",
  SAVE_CLINIC_QUERY:
    "INSERT INTO public.clinic(name,phone,country,city,rating) VALUES ($1, $2, $3, $4, $5) RETURNING;",
  UPDATE_CLINIC_QUERY:
    "UPDATE public.clinic SET  name=$1,phone=$2,country=$3,city=$4,rating=$5, WHERE id =$6 RETURNING;",
  DELETE_CLINIC_QUERY: "DELETE FROM public.clinic WHERE id=$1;",

  GET_USER_QUERY: `SELECT * FROM "user";`,
  SAVE_USER_QUERY:
    'INSERT INTO "user"(name,email,password,password_confirm,country,city,phone,image_url,role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING name,email,city,phone;',
  UPDATE_USER_QUERY:
    'UPDATE "user" SET  name=$1, phone=$2,image_url=$3,email=$4, country=$5, city=$6 WHERE id=$7 RETURNING name,phone;',
}
exports.DDLQuery = {
  CREATE_pet_type: "CREATE TYPE pet_type AS ENUM ('dog', 'cat', 'other');",
  CREATE_gender_type: "CREATE TYPE gender_type AS ENUM ('male', 'female');  ",
  CREATE_role_type: "CREATE TYPE role_type AS ENUM ('user', 'admin');  ",
  CREATE_solid_type:
    "CREATE TYPE solid_type AS ENUM ('food', 'accessories');  ",
  CREATE_status_type:
    "CREATE TYPE status_type AS ENUM ('sale', 'adopt', 'lost', 'found');  ",
  SELECT_DB: "SELECT datname FROM pg_database WHERE datname = $1",
  CREATE_DB: "CREATE DATABASE pets_db",
  CREATE_USER_TABLE: `CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  password_confirm VARCHAR(255) NOT NULL,
  country VARCHAR(255) ,
  city VARCHAR(255) ,
  phone VARCHAR(255) ,
  image_url VARCHAR(255),
  role role_type DEFAULT 'user'
  );`,
  CREATE_PETS_TABLE: `CREATE TABLE IF NOT EXISTS pet (
  id SERIAL PRIMARY KEY,
  type pet_type NOT NULL,
  gender gender_type NOT NULL,
  country VARCHAR(255) ,
  city VARCHAR(255) ,
  description TEXT ,
  image_url VARCHAR(255) ,
  Status status_type NOT NULL,
  user_id INTEGER REFERENCES "user"(id)
  );`,
  CREATE_SOLID_TABLE: `CREATE TABLE IF NOT EXISTS solid (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type solid_type NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  country VARCHAR(255) ,
  city VARCHAR(255) ,
  description TEXT ,
  image_url VARCHAR(255) ,
  user_id INTEGER REFERENCES "user"(id)
);
`,
  CREATE_CLINKS_TABLE: `CREATE TABLE IF NOT EXISTS clinic (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) ,
  phone VARCHAR(255) ,
  country VARCHAR(255) ,
  city VARCHAR(255) ,
  rating INTEGER 
);
`,
  CREATE_User_Pet_TABLE: `CREATE TABLE IF NOT EXISTS User_Pet (
  user_id INTEGER REFERENCES "user"(id),
  pet_id INTEGER REFERENCES pet(id),
  PRIMARY KEY (user_id, pet_id)
);`,
  CREATE_User_Solid_TABLE: `CREATE TABLE IF NOT EXISTS User_Solid (
  user_id INTEGER REFERENCES "user"(id),
  Solid_ID INTEGER REFERENCES Solid(id),
  PRIMARY KEY (user_id, Solid_ID)
);
`,
}
