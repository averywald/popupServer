import { MetadataKeys } from '../metadata.keys'
import { Methods } from '../../models/enums/methods.enum'
import { Router } from '../../types/router.type'

/**
 * 
 * @param method the HTTP request method to associate with
 * 		the 
 * @returns the complete decorator symbol
 */
const methodDecoratorFactory = (method: Methods) =>
	/**
	 * 
	 * @param path the route path passed as decorator arg
	 */
  	(path: string): MethodDecorator =>
		/**
		 * 
		 * @param target the class containing the decorator
		 * @param propertyKey the name of the method annotated by decorator
		 */
  		(target, propertyKey) => {
  			const controllerClass = target.constructor

  			const routers: Router[] = 
				Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
					? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
					: []

  			routers.push({
  				method,
  				path,
  				handlerName: propertyKey,
  			})

			// associate
  			Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass)
  		}

export const Get = methodDecoratorFactory(Methods.GET)
export const Post = methodDecoratorFactory(Methods.POST)
// define future HTTP route decorators below
