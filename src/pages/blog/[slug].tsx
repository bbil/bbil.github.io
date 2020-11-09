import React from 'react'
import matter from 'gray-matter'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import marked from 'marked'
import { ParsedUrlQuery } from 'querystring'

import Blog from '@app/blog'

interface PostProps {
    htmlString: string
    data: {
        title: string
        description: string
    }
}

const Post: React.FC<PostProps> = ({ htmlString, data }) => {
    return (
        <>
            <Head>
                <title>{data.title}</title>
                <meta title="description" content={data.description} />
            </Head>
            <div dangerouslySetInnerHTML={{ __html: htmlString }} />
        </>
    )
}

interface StaticQuery extends ParsedUrlQuery {
    slug: string
}

export const getStaticPaths: GetStaticPaths<StaticQuery> = async () => {
    const slugs = await Blog.getTitles()

    const paths = slugs.map<{ params: StaticQuery }>(slug => ({
        params: { slug },
    }))

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<
    PostProps,
    StaticQuery
> = async context => {
    const params = context?.params ?? null
    if (!params) {
        throw new Error('no params')
    }

    const details = await Blog.getDetails(params.slug, 'slug')

    return {
        props: {
            data: details.meta,
            htmlString: details.html,
        },
    }
}

export default Post
