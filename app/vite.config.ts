import path from "path"
import react from "@vitejs/plugin-react"


import {defineConfig} from "vite"


const staticPlugin = () => {
    return {
        name: 'html-transform',
        transformIndexHtml(html) {
            return html.replace(
                /="\/assets\//g,
                `="/static/assets/`,
            )
        },
    }
}

export default defineConfig({
    plugins: [react(), staticPlugin()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: './dist/',
        emptyOutDir: true, // also necessary
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo): string => {
                    const extType = assetInfo.name?.split('.').pop()?.toLowerCase();
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
                        return `static/assets/img/[name]-[hash][extname]`;
                    }
                    return `static/assets/${extType}/[name]-[hash][extname]`;
                },
                chunkFileNames: 'static/assets/js/[name]-[hash].js',
                entryFileNames: 'static/assets/js/[name]-[hash].js',
            },
        },
    }
})
