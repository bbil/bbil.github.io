import * as React from 'react'
import Link from 'next/link'

import { readDir } from '@app/utils/fs'
import Blog from '@app/blog'

interface HomeProps {
    slugs: string[]
}

const Home: React.FC<HomeProps> = ({ slugs }) => (
    <div>
        slugs:
        {slugs.map(slug => {
            return (
                <div key={slug}>
                    <Link href={'/blog/' + slug}>
                        <a>{'/blog/' + slug}</a>
                    </Link>
                </div>
            )
        })}
    </div>
)

export async function getStaticProps(): Promise<{ props: HomeProps }> {
    const slugs = await Blog.getTitles()

    return {
        props: {
            slugs
        }
    }
}

export default Home
