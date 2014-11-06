# Primer

Front-end development workflow and automated best practices.

## Features

- Effortless dependencies installation via Bower
- Real-time browser updates at every file change
- Code minimization and image optimization for /dist version
- LESS CSS pre-processor with autoprefixer support

## Setup

	git clone https://github.com/pwnjack/primer

	cd primer

	npm install

## Usage

Install default libraries (Bootstrap + jQuery + Modernizr)

	bower install

Install additional libraries

	bower install --save <package-name>

Start to develop

	gulp

When you are done, build for production

	gulp build

## Additional commands

If you add dependencies later on, run this command to inject references in your HTML

	gulp inject

To restart the webserver when it stops (after injection or in case of syntax errors)

	gulp serve

## Workflow

Simply work on the /app folder while previewing it in your favorite browser, when ready to deploy your app use the build command and inside the /dist folder you'll find your fully optimized webapp ready to be published.