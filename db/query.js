exports.queryList = {
  GET_PET_LIST_QUERY: `SELECT * FROM Pet`,
  SAVE_PET_QUERY:
    "INSERT INTO Pet(Type, User_ID, Gender, Country, City, Description, Status)VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
  UPDATE_PET_QUERY:
    "UPDATE Pet SET  info=$1, user_id=$2, price=$3, imge_pet=$4, gender=$5, type=$6, status=$7, country=$8, city=$9 WHERE pet_id=$10",
  DELETE_PET_QUERY: "DELETE FROM Pet WHERE  pet_id=$1 ",

  GET_SOLID_LIST_QUERY: "SELECT * FROM solid",
  SAVE_SOLID_QUERY:
    "INSERT INTO public.solid(solid_id, name, info, solid_imge, price, is_food, user_id, country, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
  UPDATE_SOLID_QUERY:
    "UPDATE public.solid SET name=$1, info=$2, solid_imge=$3, price=$4, is_food=$5, user_id=$6, country=$7, city=$8 WHERE solid_id=$9",
  DELETE_SOLID_QUERY: "DELETE FROM public.solid WHERE solid_id=$1",

  GET_CLINIC_LIST_QUERY: "SELECT * FROM clinic;",
  SAVE_CLINIC_QUERY:
    "INSERT INTO public.clinic(clinic_id, phone, e_mail, rating, clinic_imge, info, country, city , name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9);",
  UPDATE_CLINIC_QUERY:
    "UPDATE public.clinic SET  phone=$1, e_mail=$2, rating=$3, clinic_imge=$4, info=$5, country=$6, city=$7, name=$8 WHERE clinic_id=$9;",
  DELETE_CLINIC_QUERY: "DELETE FROM public.clinic WHERE clinic_id=$1;",

  GET_USER_QUERY: `SELECT * FROM "User";`,
  SAVE_USER_QUERY:
    'INSERT INTO "User"(user_id, user_name, user_password, phone, imge_user, is_admin, e_mail, country, city, pet_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
  UPDATE_USER_QUERY:
    'UPDATE "User" SET  user_name=$1, user_password=$2, phone=$3, imge_user=$4, is_admin=$5, e_mail=$6, country=$7, city=$8, pet_id=$9 WHERE user_id=$10;',
}
exports.DDLQuery = {
  CREATE_pet_type: "CREATE TYPE pet_type AS ENUM ('dog', 'cat', 'other');",
  CREATE_gender_type: "CREATE TYPE gender_type AS ENUM ('male', 'female');  ",
  CREATE_role_type: "CREATE TYPE role_type AS ENUM ('user', 'admin');  ",
  CREATE_solid_type: "CREATE TYPE solid_type AS ENUM ('food', 'toy');  ",
  CREATE_gender_type:
    "CREATE TYPE status_type AS ENUM ('sale', 'adopt', 'lost', 'found');  ",
  SELECT_DB: "SELECT datname FROM pg_database WHERE datname = $1",
  CREATE_DB: "CREATE DATABASE pets_db",
  CREATE_USER_TABLE: `CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Password_confirm VARCHAR(255) NOT NULL,
  Country VARCHAR(255) ,
  City VARCHAR(255) ,
  Phone VARCHAR(255) ,
  Image_URL VARCHAR(255),
  Role role_type NOT NULL DEFAULT 'user'
  );`,
  CREATE_PETS_TABLE: `CREATE TABLE IF NOT EXISTS pet (
  id SERIAL PRIMARY KEY,
  Type pet_type NOT NULL,
  Gender gender_type NOT NULL,
  Country VARCHAR(255) NOT NULL,
  City VARCHAR(255) NOT NULL,
  Description TEXT NOT NULL,
  Image_URL VARCHAR(255) NOT NULL,
  Status status_type NOT NULL,
  User_ID INTEGER REFERENCES "User"(id)
  );`,
  CREATE_SOLID_TABLE: `CREATE TABLE IF NOT EXISTS solid (
  id SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Type solid_type NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  Country VARCHAR(255) NOT NULL,
  City VARCHAR(255) NOT NULL,
  Description TEXT NOT NULL,
  Image_URL VARCHAR(255) NOT NULL,
  User_ID INTEGER REFERENCES "User"(id)
);
`,
  CREATE_CLINKS_TABLE: `CREATE TABLE IF NOT EXISTS clinic (
  id SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Phone VARCHAR(255) NOT NULL,
  Country VARCHAR(255) NOT NULL,
  City VARCHAR(255) NOT NULL,
  Rating INTEGER NOT NULL
);
`,
  CREATE_User_Pet_TABLE: `CREATE TABLE IF NOT EXISTS User_Pet (
  User_ID INTEGER REFERENCES "User"(id),
  Pet_ID INTEGER REFERENCES Pet(id),
  PRIMARY KEY (User_ID, Pet_ID)
);`,
  CREATE_User_Solid_TABLE: `CREATE TABLE IF NOT EXISTS User_Solid (
  User_ID INTEGER REFERENCES "User"(id),
  Solid_ID INTEGER REFERENCES Solid(id),
  PRIMARY KEY (User_ID, Solid_ID)
);
`,
}
