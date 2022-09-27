export type Middleware = {
    path: string | RegExp
    handlerName: string | symbol
}