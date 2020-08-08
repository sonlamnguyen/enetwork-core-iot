module.exports = [
	{
		name: 'User',
		data: {
			GET: ['/users', '/users/:id'],
			POST: ['/users'],
			PUT: ['/users/:id']
		}
	},
	{
		name: 'Role',
		data: {
			GET: ['/roles', '/roles/:id'],
			POST: ['/roles'],
			PUT: ['/roles/:id']
		}
	},
	{
		name: 'Devices',
		data: {
			GET: ['/devices', '/devices/:id'],
			POST: ['/devices'],
			PUT: ['/devices/:id']
		}
	},
];
