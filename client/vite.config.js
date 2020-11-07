import path from 'path'

export default {
  outDir: path.resolve(__dirname, '../out/client/'),
  rollupOutputOptions: {
    entryFileNames: `[name].js`,
    chunkFileNames: `[name].js`,
    assetFileNames: `[name].[ext]`,
  },
  cssPreprocessOptions: {
    less: {
      javascriptEnabled: true,
    },
  },
  alias: {
    '/@/': path.resolve(__dirname, './src/'),
  },
}
