import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { uploader } from 'astro-uploader'
import { SITE } from './src/config.ts'
import { remarkReadingTime } from './src/support/plugins.ts'

export default defineConfig({
    site: SITE.url,
    image: {
        // If you prefer not to optimize images during the BUILD,
        // you can open this comment, It will greatly reduce the build time.
        // service: passthroughImageService(),
    },
    integrations: [
        mdx(),
        sitemap(),
        tailwind(),
        react(),
        (await import('@playform/compress')).default({
            CSS: true,
            HTML: true,
            Image: false,
            JavaScript: true,
            SVG: true,
            Logger: 2,
        }),
        // upload `assets` folder to S3 after build
        uploader({
            paths: ['assets'],
            endpoint: process.env.S3_ENDPOINT,
            bucket: process.env.S3_BUCKET,
            accessKey: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            root: 'gblog',
        }),
    ],
    markdown: {
        remarkPlugins: [remarkReadingTime],
        shikiConfig: {
            theme: 'github-light',
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
            wrap: false,
        },
    },
    devToolbar: {
        enabled: false,
    },
    prefetch: true,
    output: 'static',
    build: {
        assets: 'assets',
        assetsPrefix: 'https://images.godruoyi.com/gblog',
    },
})
