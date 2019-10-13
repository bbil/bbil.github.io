const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const createBlogPostPages = (posts, createPage) => {
    const BlogPostTemplate = path.resolve(`./src/templates/blog-post.tsx`);


    posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        console.log(previous);
        console.log(next);

        createPage({
            path: post.node.fields.slug,
            component: BlogPostTemplate,
            context: {
                slug: post.node.fields.slug,
                previous,
                next,
            },
        });
    });
};

/**
 * Query markdown for blog posts
 * @param {} graphql 
 */
const getBlogPosts = async graphql => {
    const result = await graphql(
        `
        {
            allMarkdownRemark(
                sort: {
                    fields: [frontmatter___date],
                    order: DESC
                }
                filter: {
                    fields: {
                        slug: { regex: "/blog/" }
                    }
                }
                limit: 1000
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            }
        }
        `
    );

    if (result.errors) {
        throw result.errors;
    }

    return result.data.allMarkdownRemark.edges
}



exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const blogPosts = await getBlogPosts(graphql);
    createBlogPostPages(blogPosts, createPage);
}

/**
 * Add slug to fields on markdown nodes
 *  
 * 
 *  
 * @param {Node} node 
 * @param {Function} getNode 
 * @param {Function} createNodeField 
 */
const onCreateMarkdownNode = (node, getNode, createNodeField) => {
    const value = createFilePath({ node, getNode });
    let prefix = '';

    const blog = /blog/;
    if (blog.test(node.fileAbsolutePath)) {
        prefix = 'blog'
    }

    const haha = /haha/;
    if (haha.test(node.fileAbsolutePath)) {
        prefix = 'haha'
    }
    
    createNodeField({
        node,
        name: `slug`,
        value: `/${prefix}${value}`
    });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
      onCreateMarkdownNode(node, getNode, createNodeField);
  }
}
