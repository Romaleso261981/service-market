import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e85d04',
          hover: '#d35400',
          light: '#fff5ef',
        },
        accent: '#198754',
      },
    },
  },
  plugins: [],
};

export default config;
