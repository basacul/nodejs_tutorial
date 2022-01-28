# Readme
Udemy course "The Complete Node.js Developer Course" on goorm.io: ubuntu 18.04 and node v16.13.2.

## Section 1 Introduction

### Environment

Running on macOS Big Sur with node v16.13.0 LTS and using visual studio code v1.62.2.

And running node instance on goorm.io.

## Section 2 Basic Information

### The v8 Javascript Engine

The engine runs on chrome and node, but both may have different attributes and commands based on their context. Here an snippet view

| Node | Chrome |  
| ---- | :------: |  
| global | window |
| process | document |

> process.exit() kills the current node session in the terminal.

### NPM

At npmhs.com you can find tons of packages to help you build and create.

## Sections 3, 4 and 5: Notes App

The node module system is necessary to work with the file system with synchronous and asynchronous approaches. The folder ./notes_app includes code from this section.

[Documentation on file system](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html)

### Require

You can define variables and functions in one file. "module.exports" helps you export definitions in one to another by stating "require" in the desired file.
````
// utils.js
...
module.exports = ...
...
// app.js
require('.../utils.js');
````
Via "npm init" you generate a package.json file, where you need to apply double quotes for the variables.

By the way, so far, node does not support the ES6 syntax "import something from 'something'", if the instructor is correct.