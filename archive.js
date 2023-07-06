#!/usr/bin/env node
const fs = require('fs');
const archiver = require('archiver');
const output = fs.createWriteStream('./RELEASE.zip');
const archive = archiver('zip', {
    gzip: true,
    zlib: { level: 9 } // Sets the compression level.
});

archive.on('error', function(err) {
    throw err;
});

// pipe archive data to the output file
archive.pipe(output);

// append files
archive.file('./README.md', {name: 'README.md'});
archive.directory('./dist/mail-viewer', 'server');
archive.file('./package.json', {name: 'server/package.json'});

//
archive.finalize().then(() => {
    console.log('Archive completed');
});
