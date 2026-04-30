import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const ITEMS = Array.from({ length: 200 }, (_, i) => ({
  username: `user-${i}`,
  comment: `This is the comment #${i}`,
}));

function getPaginatedItems(items, offset, limit) {
  return items.slice(offset, offset + limit);
}

function commentsHandler(req, res) {
  const query = new URLSearchParams(
    req.url.includes('?') ? req.url.slice(req.url.indexOf('?') + 1) : ''
  );
  const offset = query.has('offset') ? parseInt(query.get('offset')) : 0;
  const limit = query.has('limit') ? parseInt(query.get('limit')) : 10;
  const nextOffset = offset + limit;
  const previousOffset = offset - limit < 1 ? 0 : offset - limit;

  const meta = {
    limit: limit,
    next: `?limit=${limit}&offset=${nextOffset}`,
    offset: query.get('offset'),
    previous: `?limit=${limit}&offset=${previousOffset}`,
    total_count: ITEMS.length,
  };

  const json = {
    meta: meta,
    comments: getPaginatedItems(ITEMS, offset, limit),
  };

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(json));
}

const commentsPlugin = {
  name: 'comments-api',
  configureServer(server) {
    server.middlewares.use('/comments', commentsHandler);
  },
};

export default defineConfig({
  plugins: [react(), commentsPlugin],
  root: 'demo',
  base: '/',
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'demo', 'js', 'demo.jsx'),
      output: {
        entryFileNames: 'demo.js',
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  resolve: {
    alias: {
      'react-paginate': path.resolve(__dirname, '..', 'react_components'),
    },
  },
  server: {
    port: 3000,
  },
});
