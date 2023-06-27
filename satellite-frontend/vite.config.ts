import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig((config) => {
  process.env = { ...process.env, ...loadEnv(config.mode, process.cwd()) };

  return {
    cacheDir: '.vite',
    server: {
      proxy: {
        '^/api/.*': {
          target: process.env['VITE_SERVER_URL'],
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [tsconfigPaths(), react()],
  };
});
