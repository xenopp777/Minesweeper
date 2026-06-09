import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import bundleCss from "vite-plugin-bundle-css";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  base: "./",
  build: {
    cssCodeSplit: true,
  },
  plugins: [
    bundleCss({
      name: "bundle.css",
      fileName: "bundle.css",
      include: ["./src/css/styles.css"],
      mode: "import",
    }),
  ],
  server: {
    open: "/index.html",
  },
};
