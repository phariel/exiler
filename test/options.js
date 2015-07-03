var options = {
	templateFolder: "test/template",
	publicFolder: "test/public",
	publicUrl: "/asset",
	route: {
		index: {
			ex_data: function (resolve) {
				resolve({title: "I'm index."});
			}
		},
		pageAction: {
			ex_data: {
				pageData: "I'm the page"
			},
			ex_template: "page.ejs"
		},
		ex_param_id: {
			ex_data: function (resolve, param) {
				resolve({
					id: param.id
				});
			},
			ex_template: "id.ejs",
			ex_param_secondId: {
				ex_data: function (resolve, param) {
					resolve({
						id: param.id,
						secondId: param.secondId
					});
				},
				ex_template: "id.ejs"
			}
		}
	}
};

module.exports = options;