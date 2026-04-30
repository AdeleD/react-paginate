import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.js'],
    include: ['__tests__/**/*-test.{js,jsx}'],
    exclude: ['__tests__/setup*.js'],
    globals: true,
  },
});
