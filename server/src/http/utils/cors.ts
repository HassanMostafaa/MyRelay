// src/http/utils/withCors.ts
const allowedOrigins = ["http://localhost:3000", "https://yourdomain.com"];

export const cors =
  (handler: (req: Request) => Response | Promise<Response>) =>
  async (req: Request) => {
    const res = await handler(req);
    const headers = new Headers(res.headers);
    const origin = req.headers.get("origin");

    if (origin && allowedOrigins.includes(origin)) {
      headers.set("Access-Control-Allow-Origin", origin);
    }

    headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    );
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return new Response(res.body, {
      status: res.status,
      headers,
    });
  };
