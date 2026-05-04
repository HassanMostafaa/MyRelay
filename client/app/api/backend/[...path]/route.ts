import { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004";

async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname.replace("/api/backend", "");
  const url = `${API_URL}${path}${req.nextUrl.search}`;

  const body =
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : await req.text();

  const res = await fetch(url, {
    method: req.method,
    headers: req.headers,
    body,
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
