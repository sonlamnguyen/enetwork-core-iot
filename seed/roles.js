module.exports = [
	{
		name: 'Admin',
        code: 'admin',
		permissions:{
			GET: ['/users', '/users/:id']
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
