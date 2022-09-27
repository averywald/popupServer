// Let DB = require('../../backend/database');

const DB = {
	users: [
		{
			username: 'avery1',
			password: '2b33r5pl3453!',
		},
		{
			username: 'administrator',
			password: 'please?',
		},
	],
}

export default class AuthService {
	constructor() {}

	// Todo: can add salt/hashes
	// todo: can hook up to mongoDB
	authenticateUser(username: string, password: string) {
		const results = DB.users.filter(
			(user) => user.username == username && user.password == password
		)

		if (results != undefined) {
			return Array.from(results).length == 1
		}

		return false
	}
}
