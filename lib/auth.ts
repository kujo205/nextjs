import {hash,compare} from 'bcryptjs';


export async function encryptPassword(password:string){
    return await hash(password,12);
}


export async function verifyPassword(password:string,hashPassword:string){
    const isValid=await compare(password,hashPassword);
    return isValid;
}

 