// vite.config.ts
import { defineConfig } from "file:///C:/Dev/diceapp/node_modules/vite/dist/node/index.js";
import analog from "file:///C:/Dev/diceapp/node_modules/@analogjs/platform/src/index.js";
var vite_config_default = defineConfig(({ mode }) => ({
  publicDir: "src/assets",
  build: {
    target: ["es2020"]
  },
  resolve: {
    mainFields: ["module"]
  },
  plugins: [analog()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test.ts"],
    include: ["**/*.spec.ts"],
    reporters: ["default"]
  },
  define: {
    "import.meta.vitest": mode !== "production"
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxEZXZcXFxcZGljZWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcRGV2XFxcXGRpY2VhcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L0Rldi9kaWNlYXBwL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBhbmFsb2cgZnJvbSAnQGFuYWxvZ2pzL3BsYXRmb3JtJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHB1YmxpY0RpcjogJ3NyYy9hc3NldHMnLFxuICBidWlsZDoge1xuICAgIHRhcmdldDogWydlczIwMjAnXSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIG1haW5GaWVsZHM6IFsnbW9kdWxlJ10sXG4gIH0sXG4gIHBsdWdpbnM6IFthbmFsb2coKV0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIHNldHVwRmlsZXM6IFsnc3JjL3Rlc3QudHMnXSxcbiAgICBpbmNsdWRlOiBbJyoqLyouc3BlYy50cyddLFxuICAgIHJlcG9ydGVyczogWydkZWZhdWx0J10sXG4gIH0sXG4gIGRlZmluZToge1xuICAgICdpbXBvcnQubWV0YS52aXRlc3QnOiBtb2RlICE9PSAncHJvZHVjdGlvbicsXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxZQUFZO0FBR25CLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLElBQ0wsUUFBUSxDQUFDLFFBQVE7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsWUFBWSxDQUFDLFFBQVE7QUFBQSxFQUN2QjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE9BQU8sQ0FBQztBQUFBLEVBQ2xCLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVksQ0FBQyxhQUFhO0FBQUEsSUFDMUIsU0FBUyxDQUFDLGNBQWM7QUFBQSxJQUN4QixXQUFXLENBQUMsU0FBUztBQUFBLEVBQ3ZCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixzQkFBc0IsU0FBUztBQUFBLEVBQ2pDO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
