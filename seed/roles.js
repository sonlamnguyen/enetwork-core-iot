module.exports = [
	{
		name: 'Admin',
        code: 'admin',
		permissions:{
			GET: [	'/users', '/users/:id', 
					'/roles', '/roles/:id', 
					'/device-users','/device-users/:id', 
					'/devices', '/devices/:id',
					'/report/input/:id', '/report/output/:id'
				],
			POST: [
				'/users', '/roles', '/device-users', '/devices'
			],
			PUT: [
				'/users/:id', '/roles/:id'
			],
			DELETE: [
				'/users/:id', '/roles/:id'
			]
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
