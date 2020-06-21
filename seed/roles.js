module.exports = [
	{
		name: 'Admin',
        code: 'admin',
		permissions:{
			GET: ['/users', '/users/:id', '/roles', '/roles/:id'],
			POST: ['/users', '/roles'],
			PUT: ['/users/:id', '/roles/:id'],
			DELETE: ['/users/:id', '/roles/:id']
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
