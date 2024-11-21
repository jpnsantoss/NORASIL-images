import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { promises as fs } from "fs";
import { Hono } from "hono";
import path from "path";
import buildsRouter from "./routes/builds";
import imagesRouter from "./routes/images";
import uploadRouter from "./routes/upload";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Serve static files from the 'uploads' directory
app.use("/uploads/*", serveStatic({ root: "./" }));

// Serve static files from the 'images' directory
app.use("/images/*", serveStatic({ root: "./" }));

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
