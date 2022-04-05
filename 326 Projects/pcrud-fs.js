import * as http from 'http';
import * as url from 'url';
import { readFile, writeFile, access } from 'fs/promises';
import { constants } from 'fs';
import { inherits } from 'util';

const counters = {};

const headerFields = { 'Content-Type': 'text/html' };

async function init() {
  try {
    // Check if the file exists.
    await access(fileName, constants.R_OK | constants.W_OK);
  } catch (err) {
    // File does not exist. Create it.
    await writeFile(fileName, '{}');
  }
}

function counterExists(name) {
  return name in counters;
}

const JSONfile = 'counter.json';

async function reload(filename) {
    try {
      // READ IN COUNTER FROM THE FILE - YOU CODE GOES HERE
        const data = await readFile(fileName, 'utf8');
        counters = JSON.parse(data);
    } catch (err) {
      counters = {};
    }
  }

function createCounter(response, name) {
  if (name === undefined) {
    // 400 - Bad Request
    response.writeHead(400, headerFields);
    response.write('<h1>Counter Name Required</h1>');
    response.end();
  } else {
    counters[name] = 0;
    response.writeHead(200, headerFields);
    response.write(`<h1>Counter ${name} Created</h1>`);
    response.end();
  }
}

function readCounter(response, name) {
  try {
    const data = await readFile(fileName, 'utf8');
    const counters = JSON.parse(data);
    return counters[name];
  } catch (err) {
    console.error('Error reading from file: ', err);
    return undefined;
  }
}

function updateCounter(response, name) {
  if (counterExists(name)) {
    response.writeHead(200, headerFields);
    counters[name] += 1;
    response.write(`<h1>Counter ${name} Updated</h1>`);
    response.end();
  } else {
    // 404 - Not Found
    response.writeHead(404, headerFields);
    response.write(`<h1>Counter ${name} Not Found</h1>`);
    response.end();
  }
}

function deleteCounter(response, name) {
  if (counterExists(name)) {
    response.writeHead(200, headerFields);
    delete counters[name];
    response.write(`<h1>Counter ${name} Deleted</h1>`);
    response.end();
  } else {
    // 404 - Not Found
    response.writeHead(404, headerFields);
    response.write(`<h1>Counter ${name} Not Found</h1>`);
    response.end();
  }
}

function dumpCounters(response) {
  response.writeHead(200, headerFields);
  response.write('<h1>Counters</h1>');
  response.write('<ul>');
  for (const [key, value] of Object.entries(counters)) {
    response.write(`<li>${key} = ${value}</li>`);
  }
  response.write('</ul>');
  response.end();
}

async function basicServer(request, response) {
  const options = url.parse(request.url, true).query;

  if (request.url.startsWith('/create')) {
    createCounter(response, options.name);
  } else if (request.url.startsWith('/read')) {
    readCounter(response, options.name);
  } else if (request.url.startsWith('/update')) {
    updateCounter(response, options.name);
  } else if (request.url.startsWith('/delete')) {
    deleteCounter(response, options.name);
  } else {
    dumpCounters(response);
  }
}

init();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

// Start the server on port 8080.
http.createServer(basicServer).listen(8080, () => {
  console.log('Server started on port 8080');
});


