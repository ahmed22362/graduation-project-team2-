exports.queryList = {
  GET_PET_LIST_QUERY:
    "SELECT pet_id, type, gender, info, status, user_id, price, imge_pet FROM public.animal",
  SAVE_PET_QUERY:
    "INSERT INTO public.animal(pet_id, info, user_id, price, imge_pet, gender, type, status, country, city)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
  UPDATE_PET_QUERY:
    "UPDATE public.animal SET  info=$1, user_id=$2, price=$3, imge_pet=$4, gender=$5, type=$6, status=$7, country=$8, city=$9 WHERE pet_id=$10",
  DELETE_PET_QUERY: "DELETE FROM public.animal WHERE  pet_id=$1 ",

  GET_SOLID_LIST_QUERY:
    "SELECT solid_id, name, info, solid_imge, price, is_food, user_id, country, city FROM public.solid",
  SAVE_SOLID_QUERY:
    "INSERT INTO public.solid(solid_id, name, info, solid_imge, price, is_food, user_id, country, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
  UPDATE_SOLID_QUERY:
    "UPDATE public.solid SET name=$1, info=$2, solid_imge=$3, price=$4, is_food=$5, user_id=$6, country=$7, city=$8 WHERE solid_id=$9",
  DELETE_SOLID_QUERY: "DELETE FROM public.solid WHERE solid_id=$1",

  GET_CLINIC_LIST_QUERY:
    "SELECT clinic_id, phone, e_mail, rating, clinic_imge, info, country, city, name FROM public.clinic;",
  SAVE_CLINIC_QUERY:
    "INSERT INTO public.clinic(clinic_id, phone, e_mail, rating, clinic_imge, info, country, city , name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9);",
  UPDATE_CLINIC_QUERY:
    "UPDATE public.clinic SET  phone=$1, e_mail=$2, rating=$3, clinic_imge=$4, info=$5, country=$6, city=$7, name=$8 WHERE clinic_id=$9;",
  DELETE_CLINIC_QUERY: "DELETE FROM public.clinic WHERE clinic_id=$1;",

  GET_USER_QUERY:
    'SELECT user_id, user_name, user_password, phone, imge_user, is_admin, e_mail, country, city, pet_id FROM public."user";',
  SAVE_USER_QUERY:
    'INSERT INTO public."user"(user_id, user_name, user_password, phone, imge_user, is_admin, e_mail, country, city, pet_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
  UPDATE_USER_QUERY:
    'UPDATE public."user" SET  user_name=$1, user_password=$2, phone=$3, imge_user=$4, is_admin=$5, e_mail=$6, country=$7, city=$8, pet_id=$9 WHERE user_id=$10;',
}
