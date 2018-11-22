(function () {
	angular
		.module('core')
		.constant('appCONSTANTS', {
			// 'API_URL': 'http://localhost:32569/api/', 
			'API_URL': 'http://touristaegy.com/api/',
			'defaultLanguage': 'en',
			'supportedLanguage': {
				'en': { 'key': 'en', 'value': 'english' },
				'ar': { 'key': 'ar', 'value': 'arabic' }
			},
			'UserType': [
				{ id: 0, text: "Employee" },
				{ id: 1, text: "Manager" }
			],
			'Status': [
				{ id: 0, text: "New" },
				{ id: 1, text: "Seen" },
				{ id: 2, text: "Confirmed" },
				{ id: 3, text: "Rejected" }
			]
			, 'FrontServer_URL': 'http://localhost:32569/'
		})
		.constant('messageTypeEnum', {
			success: 0,
			warning: 1,
			error: 2
		}).constant('userRolesEnum', {
			GlobalAdmin: "GlobalAdmin"
		});
}());