module.exports = {
      plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
            require('cssnano')({
                  preset: [
                        'default',
                        {
                              normalizeWhitespace: false,
                        },
                  ],
            }),
            require('@fullhuman/postcss-purgecss')({
                  content: ['src/**/*.html'],
                  defaultExtractor: (content) =>
                        content.match(/[\w-/:]+(?<!:)/g) || [],
            }),
      ],
};
