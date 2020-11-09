import * as React from 'react'
import Link from 'next/link'

import { readDir } from '@app/utils/fs'

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
    const files = await readDir('posts')

    return {
        props: {
            slugs: files.map(filename => filename.replace('.md', '')),
        },
    }
}

export default Home
