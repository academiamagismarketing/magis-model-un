export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Otimizações de CSS para produção
    ...(process.env.NODE_ENV === 'production' ? {
      'cssnano': {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          colormin: true,
          minifyFontValues: true,
          minifySelectors: true,
        }]
      }
    } : {}),
  },
}
