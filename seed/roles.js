module.exports = [
	{
		name: 'Admin',
        code: 'admin',
		permissions:{
			GET: ['/users', '/users/:id', '/roles', '/roles/:id'],
			POST: ['/users'],
			PUT: ['/users/:id'],
			DELETE: ['/users/:id']
		},
		status: true
	},
	{
		name: 'Editor',
        code: 'editor',
		permissions: {
			GET: ['/users', '/users/:id']
		},
		status: true
	}
];
