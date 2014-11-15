# Primer

Manage frontend dependencies and deployment with no effort.

## Features

- Dependencies installation via bower including html injection
- Real-time browser updates at every file save
- Code and image minimization for <code>/dist</code> version
- LessCSS syntax support automagically vendor prefixed

## Setup

Download this git and install it's dev dependencies:

	git clone https://github.com/pwnjack/primer

	cd primer

	npm install
	
Install default packages (Bootstrap + jQuery + Modernizr):

	bower install

## Usage

Install your own packages:

	bower install --save <package-name>

Start to develop your project:

	gulp

When you are done, build for production:

	gulp build

## More commands

If you add more dependencies later on, run this command to inject their reference tags in your HTML

	gulp inject

Restart the live-preview webserver (In case of post-injection or syntax errors in your code)

	gulp serve

## Workflow

Simply work on the /app folder while previewing it in your favorite browser, when ready to deploy your app just use the <coed>gulp build</code> command and you'll find your production-optimized webapp into the /dist folder, ready to be published.
