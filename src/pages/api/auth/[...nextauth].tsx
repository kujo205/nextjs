
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from "next-auth/next"; 
import { connectToDb } from "../../../../lib/db";
import { verifyPassword } from '../../../../lib/auth';
export default NextAuth({
    // object used to configure NextAuth's behaviour 
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            // @ts-ignore
            authorize: async (credentials,req) => {
            
                const db = await connectToDb();
                const user = await db?.collection('users').findOne({email:credentials?.email})
 
                if(!user){
                    // no user with the entered email
                    throw new Error('No user found!');
                }
 
                // found a user with that email address, check for password
                const isValid = await verifyPassword(credentials?.password as string, user.password);
 
                if(!isValid){
                    throw new Error('Invalid password! Try again!');
                } 
                // return object that is encoded for JWT token
                return { email: user.email};
            }
 
        },
        )
    ]
 
});