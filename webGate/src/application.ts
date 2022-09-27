import path from 'path'
import cookieParser from 'cookie-parser'
import type { Application as ExpressApp, Request, Response, Handler } from 'express'
import express from 'express'
import logger from 'morgan'

import { MetadataKeys } from './utils/metadata.keys'
import type { Router } from './types/router.type'
import type { Middleware } from './types/middleware.type'
import { controllers } from './controllers'

// import RouterRegistrationService from './services/routerRegistrationService'

class Application {
	private readonly _instance: ExpressApp
	private readonly _staticPath: string = path.resolve(__dirname + '/public')

	get instance(): ExpressApp {
		return this._instance
	}

	constructor() {
		// Set the root directory for serving static assets
		this._instance = express()
		this._instance.use(express.json())
		this._instance.use(cookieParser())
		this._instance.use(logger('dev')) // request console logger middleware 
		this._instance.use(express.static(this._staticPath)) // Serve static files

		// this._instance.use('*', (req: Request, res: Response, next: Function) => {
		// 	// req.path === '/account/login'

		// 	if (req.cookies['logged-in'] === true) {
		// 		res.status(200).redirect(req.url)
		// 	}
		// 	else {
		// 		if (/(login)/.test(req.path)) {
		// 			next()
		// 		}
		// 		else {
		// 			res.status(200).redirect('/account/login')
		// 		}
		// 	}
		// })

		this.registerRouters()
	}

	private registerRouters(): void {
		controllers.forEach(controllerClass => {
			console.info('\n' + controllerClass.name) // section out tables by controller

			const exRouter = express.Router() // init a router to have handlers bound to
			// get set of controller methods
			const controllerInstance: Record<string, Handler> = 
				new controllerClass(this._staticPath) as any

			// get the router's root endpoint from @Controller decorator
			const basePath: string = Reflect.getMetadata(
				MetadataKeys.BASE_PATH,
				controllerClass
			)

			// get route handler methods associated with an HTTP request decorator
			const routers: Router[] = Reflect.getMetadata(
				MetadataKeys.ROUTERS,
				controllerClass
			)
			// get middleware handlers from @Use decorator
			const middlewares: Middleware[] = Reflect.getMetadata(
				MetadataKeys.MIDDLEWARE,
				controllerClass
			)

			// hold middleware handler metadata for console table
			let middlewareTableInfo: Array<{ path: string | RegExp, middleware: string }> = []
			/*
				middlewares are optional for a controller, 
				so don't include decorators that don't exist
			*/
			if (middlewares) {
				middlewares.forEach(({ path, handlerName }) => {
					exRouter.all(path, controllerInstance[String(handlerName)]
						.bind(controllerInstance))
					middlewareTableInfo.push({ path: path, middleware: String(handlerName) })
				})

				console.table(middlewareTableInfo)
			}

			// hold handler metadata for API endpoints
			let info: Array<{ api: string, handler: string }> = []
			routers.forEach(({ method, path, handlerName }) => {
				exRouter[method](
					path,
					controllerInstance[String(handlerName)].bind(controllerInstance)
				)

				info.push({
					api: `${method.toLocaleUpperCase()} ${basePath + path}`,
					handler: `${controllerClass.name}.${String(handlerName)}`,
				})
			})

			this._instance.use(basePath, exRouter) // attach router to express app
			console.table(info)
		})
	}
}

export default new Application()
