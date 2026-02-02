import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        //  Ignore eval warnings from react-jvectormap & lottie-web
        if (warning.code === "EVAL") return;

        // show all other warnings normally
        warn(warning);
      },
    },
  },
});
