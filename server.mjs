// Production server: serves the built client files and hands every other request to the SSR app.
// Run with `npm start`. Reads PORT (default 3000) and HOST (default 0.0.0.0).
import { createServer } from "node:http";
import { execFileSync } from "node:child_process";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Readable } from "node:stream";

const root = fileURLToPath(new URL(".", import.meta.url));
const clientDir = resolve(root, "dist", "client");
const serverEntry = resolve(root, "dist", "server", "server.js");
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";

// If the host only runs `npm start`, build once first so the dev server is never what gets served.
if (!existsSync(serverEntry)) {
  console.log("No production build found, running `vite build` first...");
  execFileSync(process.execPath, [join(root, "node_modules", "vite", "bin", "vite.js"), "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" },
  });
}

const app = (await import(pathToFileURL(serverEntry).href)).default;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json",
};

// Returns true when the request was answered from dist/client.
async function serveStatic(req, res, pathname) {
  if (req.method !== "GET" && req.method !== "HEAD") return false;

  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return false;
  }
  const filePath = normalize(join(clientDir, decoded));
  if (filePath !== clientDir && !filePath.startsWith(clientDir + sep)) return false;

  let info;
  try {
    info = await stat(filePath);
  } catch {
    return false;
  }
  if (!info.isFile()) return false;

  const etag = `W/"${info.size}-${Math.floor(info.mtimeMs)}"`;
  const headers = {
    "content-type": mimeTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream",
    "accept-ranges": "bytes",
    etag,
    "last-modified": info.mtime.toUTCString(),
    // Vite fingerprints everything under /assets/, so it can be cached forever.
    "cache-control": decoded.startsWith("/assets/")
      ? "public, max-age=31536000, immutable"
      : "public, max-age=3600",
  };

  if (req.headers["if-none-match"] === etag) {
    res.writeHead(304, headers);
    res.end();
    return true;
  }

  // Byte ranges are required for <video> playback in Safari/iOS.
  let start = 0;
  let end = info.size - 1;
  let status = 200;
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? "");
  if (range && (range[1] || range[2])) {
    if (range[1]) {
      start = Number(range[1]);
      if (range[2]) end = Math.min(Number(range[2]), end);
    } else {
      start = Math.max(info.size - Number(range[2]), 0);
    }
    if (start > end || start >= info.size) {
      res.writeHead(416, { "content-range": `bytes */${info.size}` });
      res.end();
      return true;
    }
    status = 206;
    headers["content-range"] = `bytes ${start}-${end}/${info.size}`;
  }
  headers["content-length"] = end - start + 1;

  res.writeHead(status, headers);
  if (req.method === "HEAD") {
    res.end();
  } else {
    createReadStream(filePath, { start, end }).pipe(res);
  }
  return true;
}

async function handleApp(req, res, url) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) value.forEach((v) => headers.append(name, v));
    else if (value !== undefined) headers.set(name, value);
  }
  const init = { method: req.method, headers };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = Readable.toWeb(req);
    init.duplex = "half";
  }

  const response = await app.fetch(new Request(url, init), {}, {});

  const out = {};
  response.headers.forEach((value, name) => {
    if (name !== "set-cookie") out[name] = value;
  });
  const cookies = response.headers.getSetCookie?.() ?? [];
  if (cookies.length) out["set-cookie"] = cookies;

  res.writeHead(response.status, out);
  if (!response.body || req.method === "HEAD") res.end();
  else Readable.fromWeb(response.body).pipe(res);
}

const server = createServer(async (req, res) => {
  try {
    // Behind a proxy (e.g. Cloudflare) the public scheme and host arrive in x-forwarded-* headers.
    const proto = String(req.headers["x-forwarded-proto"] ?? "http").split(",")[0].trim();
    const hostHeader = String(req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost")
      .split(",")[0]
      .trim();
    const url = new URL(req.url ?? "/", `${proto}://${hostHeader}`);

    if (await serveStatic(req, res, url.pathname)) return;
    await handleApp(req, res, url);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
});

server.listen(port, host, () => {
  console.log(`Bhadwamata Agarbatti listening on http://${host}:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
