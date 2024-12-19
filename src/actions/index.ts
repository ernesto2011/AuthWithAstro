import { login } from "./auth/login.action";
import { loginWithGoogle } from "./auth/loginGoogle.action";
import { logOut } from "./auth/logOut.action";
import { registerUser } from "./auth/register.action";

export const server = {
    //actions
    registerUser,
    logOut,
    login,
    loginWithGoogle,
}