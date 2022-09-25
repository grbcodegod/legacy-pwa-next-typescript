module.exports = {
  images: {
    loader: 'imgix',
    path: '/'
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/home': { page: '/' },
      '/register': { page: '/register' }
    }
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true
  },
  experimental: {
    forceSwcTransforms: true
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  eslint: {
    dirs: [], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
}
