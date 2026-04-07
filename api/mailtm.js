const MAILTM_BASE = "https://api.mail.tm";

function normalizePath(path) {
  let apiPath = path.replace(/^\/api\/mailtm/, "");
  if (!apiPath || apiPath === "") {
    apiPath = "/";
  }
  return apiPath;
}

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  };
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, getCorsHeaders());
    res.end();
    return;
  }

  const url = new URL(req.url, "http://localhost");
  const apiPath = normalizePath(url.pathname);
  const targetUrl = `${MAILTM_BASE}${apiPath}${url.search}`;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (req.headers.authorization) {
    headers.Authorization = req.headers.authorization;
  }

  let body;
  if (req.method !== "GET" && req.method !== "HEAD") {
    if (req.body && typeof req.body !== "string") {
      body = JSON.stringify(req.body);
    } else {
      body = req.body;
    }
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    if (apiPath === "/domains" || apiPath === "/domains/") {
      if (Array.isArray(data)) {
        data = { "hydra:member": data, "hydra:totalItems": data.length };
      } else if (!(data && typeof data === "object" && "hydra:member" in data)) {
        data = { "hydra:member": [], "hydra:totalItems": 0 };
      }
    }

    res.writeHead(response.status, {
      ...getCorsHeaders(),
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(data));
  } catch (err) {
    res.writeHead(502, {
      ...getCorsHeaders(),
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Failed to reach mail.tm",
        error: String(err),
      })
    );
  }
}
