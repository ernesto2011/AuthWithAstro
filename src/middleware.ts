import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ['/protected']
const publicRoutes = ['/login', '/register']
// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(({url, request, locals, redirect}, next) => {
    const isLoggedIn = !!firebase.auth.currentUser;
    const user = firebase.auth.currentUser;
    locals.isLoggedIn = isLoggedIn;
    if(user){
        locals.user = {
            avatar: user.photoURL ?? '',
            name: user.displayName!,
            email: user.email!,
            emailVerified: user.emailVerified
        }
    }
    if(!isLoggedIn && privateRoutes.includes(url.pathname)){
        return redirect('/')
    }
    if(isLoggedIn && publicRoutes.includes(url.pathname)){
        return redirect('/')
    }
    return next();
});
