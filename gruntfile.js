/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		qunit: {
			files: ["Tests/test-runner.html"]
		}
	});

	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-clear");

	// Default task.
	grunt.registerTask("default", ["test"]);
	grunt.registerTask("test", ["qunit"]);
};