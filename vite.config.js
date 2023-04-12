// vite.config.js

import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    // Load and parse the .env file
    const env = dotenv.config().parsed;

    // Extract the environment variables and expose them to the application
    const exposedEnv = Object.keys(env).reduce((acc, key) => {
        acc[`import.meta.env.${key}`] = JSON.stringify(env[key]);
        return acc;
    }, {});

    return {
        plugins: [react()],
        root: 'src',
        define: exposedEnv,
        build: {
            outDir: 'dist', // specify the output directory for the built assets
        },
    };
});
