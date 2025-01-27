const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/widget.js"],
  outfile: "dist/orma-feedback-widget.js",
  minify: true,
  bundle: true,
  format: "iife", 
  globalName: "FeedbackWidget",
}).catch(() => process.exit(1));