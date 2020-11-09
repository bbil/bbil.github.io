import matter from 'gray-matter'
import marked from 'marked'

import { readDir, readFile } from '@app/utils/fs'

export async function getBlogTitles(): Promise<string[]> {
    const files = await readDir('posts')
    return files.map(filename => filename.replace('.md', ''))
}

export async function getBlogDetails(
    query: string,
    queryBy: QueryBy = 'filename'
): Promise<BlogData> {
    let finalQuery = query
    if (queryBy == 'slug') {
        finalQuery = `${finalQuery}.md`
    }

    const markdownWithMetadata = await readFile('posts', finalQuery)

    const parsedMarkdown = matter(markdownWithMetadata)
    const html = marked(parsedMarkdown.content)

    return {
        html,
        // contents of gray matter metadata is not type-checked, convention only
        meta: parsedMarkdown.data as { title: string; description: string }
    }
}

type QueryBy = 'slug' | 'filename'

export interface BlogData {
    html: string
    meta: {
        title: string
        description: string
    }
}
