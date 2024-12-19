import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected']
// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(({url, request}, next) => {

    return next();
});
