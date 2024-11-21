import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import imagesRouter from "./routes/images.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Serve static files from the 'uploads' directory
app.use("/uploads/*", serveStatic({ root: "./" }));

app.route("/images", imagesRouter);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
