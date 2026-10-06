module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ignore source map warnings for MediaPipe
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        {
          module: /node_modules\/@mediapipe\/tasks-vision/,
          message: /Failed to parse source map/,
        },
        {
          message: /postcss-calc:: Lexical error[\s\S]*infinity \* 1px/i,
        },
      ];

      // Avoid postcss-calc lexical errors from third-party generated CSS.
      // This keeps minification enabled while disabling only calc reduction.
      if (webpackConfig.optimization?.minimizer) {
        webpackConfig.optimization.minimizer.forEach((plugin) => {
          if (plugin?.constructor?.name === "CssMinimizerPlugin") {
            plugin.options = plugin.options || {};
            plugin.options.minimizerOptions = plugin.options.minimizerOptions || {};
            plugin.options.minimizerOptions.preset = [
              "default",
              { calc: false },
            ];
          }
        });
      }

      // Remove CRA's ESLint webpack plugin to prevent duplicate-react plugin conflicts
      if (Array.isArray(webpackConfig.plugins)) {
        webpackConfig.plugins = webpackConfig.plugins.filter(
          (plugin) => plugin?.constructor?.name !== "ESLintWebpackPlugin"
        );
      }
      
      return webpackConfig;
    },
  },
};
