import { MetadataKeys } from '../metadata.keys'
import { Middleware } from '../../types/middleware.type'

const Use = (path: string | RegExp): MethodDecorator => (target, propertyKey) => {
    const controllerClass = target.constructor

    const middlewares: Middleware[] =
        Reflect.hasMetadata(MetadataKeys.MIDDLEWARE, controllerClass)
            ? Reflect.getMetadata(MetadataKeys.MIDDLEWARE, controllerClass)
            : []

    middlewares.push({ path: path, handlerName: propertyKey })

    Reflect.defineMetadata(MetadataKeys.MIDDLEWARE, middlewares, controllerClass)
}

export default Use