import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { SITE } from './src/config.ts'
import { remarkReadingTime } from './src/support/time.ts'

export default defineConfig({
    site: SITE.url,
    image: {},
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
    ],
    markdown: {
        remarkPlugins: [remarkReadingTime],
        shikiConfig: {
            themes: {
                light: 'material-theme-lighter',
                dark: 'one-dark-pro',
            },
            wrap: false,
        },
    },
    output: 'static',
    // experimental: {
    //     clientPrerender: true,
    //     directRenderScript: true,
    // },
})
