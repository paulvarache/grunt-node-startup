/*
 * grunt-node-startup
 * paulvarache.ninja
 *
 * Copyright (c) 2014 Paul Varache
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('node_startup', 'Generates a unix startup file for your node application.', function() {

        //Merge default options with custom ones
        var pkg = grunt.config.get('pkg') || {
            main: "appR.js",
            name: "app"
        };
        var node_app = pkg.main || "app.js",
            node_name = pkg.name || "app";

        var app_dir = process.cwd(),
            pid_dir = app_dir + "/pid",
            pid_file = node_name + ".pid",
            log_dir = app_dir + "/log",
            log_file = node_name + ".log",
            node_exec = "$(which node)";
        var options = this.options({
                node_app: node_app,
                app_dir: app_dir,
                pid_dir: pid_dir,
                pid_file: pid_file,
                log_dir: log_dir,
                log_file: log_file,
                shebang: "/bin/sh",
                vars: {
                    CONFIG_DIR: app_dir,
                    PORT: 3000,
                    NODE_ENV: "production",
                }
        });

        _.extend(options, this.options());

        //Reads the startup sh template file
        var data = grunt.file.read('template/node-app');
        var re = null;
        grunt.log.subhead("Generating startup script...");
        // for each options, replace by the value in the file
        for (var key in options) {
            if (key !== 'vars') {
                grunt.log.writeln(key + " set to " + options[key]);
                re = new RegExp("{{"+key+"}}", 'g');
                data = data.replace(re, options[key]);
            }
        }
        //Generates a string with the env vars and put it in the right place
        var vars_str = "";
        grunt.log.subhead("Configuring env vars...");
        for (var key in options.vars) {
            grunt.log.writeln(key + " = " + options.vars[key]);
            vars_str += key + "=" + "\"" + options.vars[key] + "\" ";
        }
        data = data.replace("[[vars]]", vars_str);

        //Gets the dest folder and writes the generated file
        var dest = this.files[0] ? this.files[0].orig.dest : null;
        if (dest) {
            grunt.file.write(dest + "/" + node_name, data);
        } else {
            grunt.log.error("No destination folder in options");
            return false;
        }
    });
};
