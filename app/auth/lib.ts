import { v4 as uuidv4 } from 'uuid';
import { parseCookies, setCookie } from 'nookies';
import { FormEvent } from "react";
 

export const getToken = () => {
    const {token : tokenData} = parseCookies();
  
    return tokenData;
};

