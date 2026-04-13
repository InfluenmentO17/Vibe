const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const rootDir = __dirname;
const port = Number(process.env.PORT || 8000);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function safeResolvePath(urlPathname) {
  const decoded = decodeURIComponent(urlPathname);
  const clean = decoded.replace(/\0/g, '');
  const joined = path.join(rootDir, clean);
  const resolved = path.resolve(joined);
  if (!resolved.startsWith(rootDir)) return null;
  return resolved;
}

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

const server = http.createServer((req, res) => {
  try {
    const requestUrl = new URL(req.url || '/', `http://${req.headers.host || '127.0.0.1'}`);
    const resolvedPath = safeResolvePath(requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname);

    if (!resolvedPath) {
      return send(res, 400, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Bad Request');
    }

    fs.stat(resolvedPath, (statErr, stats) => {
      if (statErr) {
        return send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not Found');
      }

      const filePath = stats.isDirectory() ? path.join(resolvedPath, 'index.html') : resolvedPath;
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
          return send(res, 500, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Internal Server Error');
        }
        send(res, 200, { 'Content-Type': contentType, 'Cache-Control': 'no-store' }, data);
      });
    });
  } catch {
    send(res, 500, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Internal Server Error');
  }
});

server.listen(port, '127.0.0.1', () => {
  process.stdout.write(`Serving ${rootDir} at http://127.0.0.1:${port}/\n`);
});

server.on('error', err => {
  process.stderr.write(String(err?.stack || err) + '\n');
  process.exitCode = 1;
});