# MailViewer

This project intends to provide a simple mail viewer for eml files. Install a LTS version 24+ of node-js

## Setup

`npm install -g @angular/cli npm-check-updates` To install the basic global requirements.

## Configuration

Execute `cp src/assets/demo.config.json src/assets/config.json` to link to the local dev server on port 3000. Your backend interface may look different so you can use the replacement token {mailId} in the api configuration option as seen in demo2 json file.

## Development server

First of all install the dependencies `npm i`. To start the server mok run `npm run server` run `npm run start` afterward in a different tab. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Access demo app

Navigate to the viewer part `http://localhost:4201/?mailId=demo` this will load the demo email from the demo server.
