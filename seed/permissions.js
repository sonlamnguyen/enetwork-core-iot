module.exports = [
	{
		name: 'User',
		data: {
			GET: ['/users', '/users/:id'],
			POST: ['/users'],
			PUT: ['/users/:id']
		}
	},
];
