import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
export const login = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional()
    }),
    handler: async ({email, password, remember_me},{cookies}) => {
        if (remember_me) {
            cookies.set('email', email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                path: '/'
            })
        }else{
            cookies.delete('email',{
                path: '/'
            })
        }
        try {
            const user = await signInWithEmailAndPassword(firebase.auth, email, password)
        } catch (error) {
            const firebaseError = error as AuthError;
            console.log(firebaseError);
            
            if (firebaseError.code === 'auth/invalid-credential') {
                throw new Error('El correo no esta registrado');
            }
            throw new Error('Error al iniciar sesion');
        }
    }
})