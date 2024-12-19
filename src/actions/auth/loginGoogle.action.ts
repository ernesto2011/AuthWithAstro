import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";

export const loginWithGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async (credentials) => {
        const credential = GoogleAuthProvider.credentialFromResult(credentials);
        if (!credential) {
            throw new Error('Error al iniciar sesion con google');
        }
        await signInWithCredential(firebase.auth, credential)
        return {
            ok: true,
            message: 'Sesion iniciada correctamente'
        }
    }
})