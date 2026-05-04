import { NextRequest } from "next/server";

const API_URL = process.env.BUN_API_URL || "http://localhost:3004";

async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname.replace("/api/backend", "");
  const url = `${API_URL}${path}${req.nextUrl.search}`;

  const headers = new Headers();

  const contentType = req.headers.get("content-type");
  const cookie = req.headers.get("cookie");

  if (contentType) headers.set("content-type", contentType);
  if (cookie) headers.set("cookie", cookie);

  const body =
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : await req.text();

  const res = await fetch(url, {
    method: req.method,
    headers,
    body,
    cache: "no-store",
  });

  const responseHeaders = new Headers(res.headers);

  return new Response(res.body, {
    status: res.status,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
