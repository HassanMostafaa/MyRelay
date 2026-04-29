const allowedOrigins = ["http://localhost:3000", "https://yourdomain.com"];

export const cors =
  (handler: (req: Request) => Response | Promise<Response>) =>
  async (req: Request) => {
    const origin = req.headers.get("origin");

    const corsHeaders = new Headers();

    if (origin && allowedOrigins.includes(origin)) {
      corsHeaders.set("Access-Control-Allow-Origin", origin);
      corsHeaders.set("Access-Control-Allow-Credentials", "true");
    }

    corsHeaders.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    );

    corsHeaders.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const res = await handler(req);
    const headers = new Headers(res.headers);

    corsHeaders.forEach((value, key) => {
      headers.set(key, value);
    });

    return new Response(res.body, {
      status: res.status,
      headers,
    });
  };
