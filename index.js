const childProcess = require('child_process');
const {spawn} = childProcess;
const http = require('http');
const fs = require('fs');
const pac = require('./pac.js');

const proxyPort = 6969;
const proxyHost = '0.0.0.0';
const urls = ['http://coccoc.com*', 'https://coccoc.com*'];
const hosts = ['coccoc.com'];
const pacHost = '207.148.120.244';
const pacPort = 7777;

const pacContent = pac(urls, hosts, proxyHost, proxyPort);
console.log(pacContent)

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/x-ns-proxy-autoconfig');
	res.setHeader('Extension', 'pac');
	res.end(pacContent);
});

server.on('request', (req, res) => {
	console.log(req.connection.remoteAddress, 'is connecting');
});

server.listen(pacPort, pacHost, () => {
	console.log(`PAC Server is running at http://${pacHost}:${pacPort}`);
});

