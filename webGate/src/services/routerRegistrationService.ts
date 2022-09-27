// import express from 'express'
// import type { Application as ExpressApp, Handler } from 'express'
// import { MetadataKeys } from './utils/metadata.keys'
// import type { IRouter } from './utils/decorators/handlers.decorator'
// import type { IMiddleware } from './utils/decorators/use.decorator'
// import { controllers } from './controllers'

class RouterRegistrationService {

    // public registerRouters(instance: ExpressApp): void {
	// 	controllers.forEach(controllerClass => {
	// 		console.info('\n' + controllerClass.name) // section out tables by controller

	// 		const exRouter = express.Router() // init a router to have handlers bound to
	// 		// get set of controller methods
	// 		const controllerInstance: Record<string, Handler> = 
	// 			new controllerClass(this._staticPath) as any

	// 		// get the router's root endpoint from @Controller decorator
	// 		const basePath: string = Reflect.getMetadata(
	// 			MetadataKeys.BASE_PATH,
	// 			controllerClass
	// 		)

	// 		// get route handler methods associated with an HTTP request decorator
	// 		const routers: IRouter[] = Reflect.getMetadata(
	// 			MetadataKeys.ROUTERS,
	// 			controllerClass
	// 		)
	// 		// get middleware handlers from @Use decorator
	// 		const middlewares: IMiddleware[] = Reflect.getMetadata(
	// 			MetadataKeys.MIDDLEWARE,
	// 			controllerClass
	// 		)

	// 		// hold middleware handler metadata for console table
	// 		let middlewareTableInfo: Array<{ path: string | RegExp, middleware: string }> = []
	// 		/*
	// 			middlewares are optional for a controller, 
	// 			so don't include decorators that don't exist
	// 		*/
	// 		if (middlewares) {
	// 			middlewares.forEach(({ path, handlerName }) => {
	// 				exRouter.all(path, controllerInstance[String(handlerName)]
	// 					.bind(controllerInstance))
	// 				middlewareTableInfo.push({ path: path, middleware: String(handlerName) })
	// 			})

	// 			console.table(middlewareTableInfo)
	// 		}

	// 		// hold handler metadata for API endpoints
	// 		let info: Array<{ api: string, handler: string }> = []
	// 		routers.forEach(({ method, path, handlerName }) => {
	// 			exRouter[method](
	// 				path,
	// 				controllerInstance[String(handlerName)].bind(controllerInstance)
	// 			)

	// 			info.push({
	// 				api: `${method.toLocaleUpperCase()} ${basePath + path}`,
	// 				handler: `${controllerClass.name}.${String(handlerName)}`,
	// 			})
	// 		})

	// 		instance.use(basePath, exRouter) // attach router to express app
	// 		console.table(info)
	// 	})
	// }
}

export default new RouterRegistrationService()
