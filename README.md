# Primer

Front-end workflow for automated best practices.

## Setup

	git clone https://github.com/pwnjack/primer

	cd primer

	npm install

## Usage

Install default libraries (Bootstrap + jQuery)

	bower install

Install additional libraries

	bower install --save <package-name>

Start to develop

	gulp

When finished, build for production

	gulp build

Restart webserver if it hangs

	gulp serve

## What it does

- Effortless dependencies installation via Bower
- Updates every change in real-time in your browser
- Minimization and optimization for /dist version
- LESS CSS pre-processor and autoprefixer support