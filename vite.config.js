import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

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
    };
});
