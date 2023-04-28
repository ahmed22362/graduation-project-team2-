exports.queryList={

    GET_PET_LIST_QUARY:'SELECT pet_id, type, gender, info, status, user_id, price, imge_pet FROM public.animal',
    SAVE_PET_QUARY:'INSERT INTO public.animal(pet_id, info, user_id, price, imge_pet, gender, type, status, country, city)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
    UPDATE_PET_QUARY:'UPDATE public.animal SET  info=$1, user_id=$2, price=$3, imge_pet=$4, gender=$5, type=$6, status=$7, country=$8, city=$9 WHERE pet_id=$10',
    DELETE_PET_QUARY:'DELETE FROM public.animal WHERE  pet_id=$1 ',


    GET_SOLID_LIST_QUARY:'SELECT solid_id, name, info, solid_imge, price, is_food, user_id, country, city FROM public.solid',
    SAVE_SOLID_QUARY:'INSERT INTO public.solid(solid_id, name, info, solid_imge, price, is_food, user_id, country, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    UPDATE_SOLID_QUARY:'UPDATE public.solid SET name=$1, info=$2, solid_imge=$3, price=$4, is_food=$5, user_id=$6, country=$7, city=$8 WHERE solid_id=$9',
    DELETE_SOLID_QUARY:'DELETE FROM public.solid WHERE solid_id=$1',


    GET_CLINIC_LIST_QUARY:'SELECT clinic_id, phone, e_mail, rating, clinic_imge, info, country, city, name FROM public.clinic;',
    SAVE_CLINIC_QUARY:'INSERT INTO public.clinic(clinic_id, phone, e_mail, rating, clinic_imge, info, country, city , name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9);',
    UPDATE_CLINIC_QUARY:'UPDATE public.clinic SET  phone=$1, e_mail=$2, rating=$3, clinic_imge=$4, info=$5, country=$6, city=$7,, name=$8 WHERE clinic_id=$9;',
    DELETE_CLINIC_QUARY:'DELETE FROM public.clinic WHERE clinic_id=$1;'



}