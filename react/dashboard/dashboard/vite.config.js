import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react()
    ],
    build: {
        outDir: 'build',
        assetsDir: 'static',
        rollupOptions: {
            treeshake: {
                // Fixes an issue where backendConfiguration.staticSite if-blocks would get removed
                correctVarValueBeforeDeclaration: true
            }
        }
    },
    server: {
        host: 'localhost',
        port: 3000,
        open: true,
        proxy: {
            "/v1": {target: packageJson.proxy},
            "/docs/swagger.json": {target: packageJson.proxy}
        }
    }
});