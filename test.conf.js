exports.config = {
	browserName: 'chrome',
	browserVersion: '104.0',
	"Mocha:Options": {
		project: "selenium-web-sale",
        name: [
			"./testcases/user/Search.js",
			"./testcase/user/MyAccount.js"
		],
		visual: true,
		platformName: "Windows 11",
		timezone: "UTC+07:00",
		w3c: true,
		plugin: "node_js-mocha",
		retries: 1,
		timeout: '600000',
		ui: 'bdd',
	}
};