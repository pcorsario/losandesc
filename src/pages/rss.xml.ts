import rss, { type RSSFeedItem } from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import RSSRender from '@components/support/RSSRender.astro'
import { transform, walk } from 'ultrahtml'
import sanitize from 'ultrahtml/transformers/sanitize'
import { SITE } from '../config.ts'

// see https://github.com/delucis/astro-blog-full-text-rss/blob/latest/src/pages/rss.xml.ts
// get more context
export async function GET() {
    const container = await AstroContainer.create({
        renderers: [
            { name: '@astrojs/mdx', serverEntrypoint: 'astro/jsx/server.js' },
        ],
    })

    const posts: CollectionEntry<'posts'>[] = (await getCollection('posts')).sort(
        (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    )

    const feedItems: RSSFeedItem[] = []
    for (const { data, slug, collection } of posts) {
        const rawContent = await container.renderToString(RSSRender, {
            params: { collection, slug },
        })
        const content = await transform(rawContent, [
            async (node) => {
                await walk(node, (node) => {
                    if (node.name === 'a' && node.attributes.href?.startsWith('/')) {
                        node.attributes.href = SITE.url + node.attributes.href
                    }
                    if (node.name === 'img' && node.attributes.src?.startsWith('/')) {
                        node.attributes.src = SITE.url + node.attributes.src
                    }
                })
                return node
            },
            sanitize({ dropElements: ['script', 'style'] }),
        ])
        feedItems.push({ ...data, link: `/posts/${slug}/`, content })
    }

    return rss({
        title: SITE.title,
        description: SITE.description,
        site: SITE.url,
        items: feedItems,
    })
}
