import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { createUserWithEmailAndPassword, type AuthError } from "firebase/auth";

export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional()
    }),
    handler: async ({name, email, password, remember_me}, {cookies}) => {
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
            const user = await createUserWithEmailAndPassword(firebase.auth, email, password);

        } catch (error) {
          const firebaseError = error as AuthError;
          if (firebaseError.code === 'auth/email-already-in-use') {
            throw new Error("el correo ya esta en uso");
            
          }
          throw new Error('Error al crear el usuario');
          
        }
        return {
            ok: true,
            message: 'Usuario creado correctamente'
        }
    }
})