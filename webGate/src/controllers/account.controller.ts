import { Request, Response } from 'express'
import mongoose from 'mongoose'

import Controller from '../utils/decorators/controller.decorator'
import Use from '../utils/decorators/use.decorator'
import { Get, Post } from '../utils/decorators/handlers.decorator'

import BaseController from './base.controller'

@Controller('/account')
export default class AccountController extends BaseController {

	private readonly connectionString: string = 
		'mongodb://localhost:27017/webgate'

	constructor(publicDirPath: string) {
		super(publicDirPath, '/account')
		mongoose.connect(this.connectionString)
	}

	/**
	 * 
	 * @param req express request obj
	 * @param res express response obj
	 * @param next next route handler function to execute
	 * 
	 * @todo check for session cookies
	 */
	@Use(/(?!(login))/) // match any route that doesn't contain 'login'
	public authMiddleware(req: Request, res: Response, next: Function): void {
		if (req.path === '/login') {
			next()
		} else {
			res.status(401).redirect(this._basePath + '/login')
		}
	}

	@Get('/login')
	public index(req: Request, res: Response, next: Function): void {	
		// console.log(this.staticFile('login.html'))
		res.sendFile(this.staticFile('login.html'))
	}

	@Post('/login')
	public login(req: Request, res: Response): void {
		const { username, password } = req.body // Get POST payload params

		const model = mongoose.model('User', 
			new mongoose.Schema({
				name: String,
				pass: String
			}))

		let result = model.findOne({ name: 'averywald' }, (err: Error, result: {}) => {
				// if (err) {
				// 	console.error(err)
				// }
				try {
					if (result) {
						res.cookie('logged-in', true) // set cookie for authenticated user
						res.status(200).redirect('/home') // Send user off
					}
					else {
						res.status(401).redirect(this._basePath + '/login')
					}
				}
				catch (err) {
					console.error(err)
				}
		})		
	}

	@Get('/logout')
	public logout(req: Request, res: Response): void {
		// if ()
		res.clearCookie('logged-in') // Remove auth cookie
		res.status(200).redirect(this._basePath + '/login')
	}
}
