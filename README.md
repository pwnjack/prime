# Primer

Front-end workflow for automated best practices.

## Features

- Effortless dependencies installation via Bower
- Updates every change in real-time in your browser
- Minimization and optimization for /dist version
- LESS CSS pre-processor and autoprefixer support

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

When finished, build for production

	gulp build

## Commands

If you add dependencies later on, run this command to inject them

	gulp inject

To restart the webserver then, or in case of syntax errors

	gulp serve
