# grunt-node-startup

> Generates a unix startup file for your node application.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-node-startup --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-node-startup');
```

## What this thing do

This is a very simple plugin with one task that generate a startup script for some UNIX environment.
It uses a shell template, which completed with your defined values makes a working script that you can use like this:

```shell
myapp start
myapp stop
myapp restart
myapp status
```

Basically it starts your Node.js app, stores the PID in a file and your log in another.
If your app crashes, the process stops, but the PID file stays. To relaunch your app, you can use
the `--force` option to delete the PID file.

## The "node_startup" task, the only one

### Overview
In your project's Gruntfile, add a section named `node_startup` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  node_startup: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.vars
Type: `Object`
Default value: `{
    CONFIG_DIR: ''{{Working directory}}/conf',
    PORT: 3000,
    NODE_ENV: 'production',
}`

An object with all the env vars you want to define before starting your Node.js app

#### options.app_dir
Type: `String`
Default value: `{{Working directory}}`

The location of your Node.js app on startup.

#### options.pid_dir
Type: `String`
Default value: `{{Working directory}}/pid`

The directory where the pid file will be saved.

#### options.pid_file
Type: `String`
Default value: `{{Your app name}}.pid`

The name of the PID file.

#### options.log_dir
Type: `String`
Default value: `{{Working directory}}/log`

The directory where the log file will be saved.

#### options.log_file
Type: `String`
Default value: `{{Your app name}}.log`

The name of the log file.


#### options.shebang
Type: `String`
Default value: `/bin/sh`

The shebang defining which shell will be used to start the script.


### Usage Examples

#### Custom Options
In this example, we change the location of the log file and set the port to 4000. We choose to put the satrup script in the 'dist' folder.

```js
grunt.initConfig({
  node_startup: {
    options: {
      log_dir: "/var/log/myapp",
      vars: {
          PORT: 4000
      }
    },
    files: [
        {dest: 'startup'}
    ],
  },
});
```

## Thanks chovy
I used chovy's node-startup script as template for this grunt plugin. You can see the original script here [chovy/node-startup](https://github.com/chovy/node-startup)

## LICENSE
This is not rocket science, do whatever you want with it, I don't care.
