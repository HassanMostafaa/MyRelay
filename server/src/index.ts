import { routes } from "./http/routes";
const server = Bun.serve({
  port: process.env.PORT || 3004,
  routes,
});

console.log(`Listening on ${server.port}, Health check: ${server.url}health`);
