import { Request, Response } from 'express'
import Controller from '../utils/decorators/controller.decorator'
import { Get, Post } from '../utils/decorators/handlers.decorator'

import BaseController from './base.controller'

@Controller('/home')
export default class HomeController extends BaseController {
	constructor(publicDirPath: string) {
		super(publicDirPath, '/home')
	}

  @Get('/')
	public getHomeRoot(req: Request, res: Response): void {
		res.sendFile(this.staticFile('welcome.html'))
	}
}
