import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import buildsRouter from "./routes/builds.ts";
import imagesRouter from "./routes/images.ts";
import uploadRouter from "./routes/upload.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Serve static files from the 'uploads' directory
app.use("/uploads/*", serveStatic({ root: "./" }));

// Use regex router for better performance
app.route("/images", uploadRouter);
app.route("/images", buildsRouter);
app.route("/images", imagesRouter);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
