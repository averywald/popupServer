import 'reflect-metadata'
import dotenv from 'dotenv'
import application from './application'
import * as http from 'http'

dotenv.config() // init process.ev

const PORT = process.env.NODE_LOCAL_PORT || 3000

const server = http.createServer(application.instance)

server.listen(PORT, () => {
	console.log(`Server is listening on :${PORT}`)
})
