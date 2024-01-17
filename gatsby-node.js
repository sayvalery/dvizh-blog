// gatsby-node.js
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allArticles: allFile(
        filter: {
          sourceInstanceName: { eq: "articles" }
          extension: { eq: "mdx" }
        }
      ) {
        edges {
          node {
            childMdx {
              body
              frontmatter {
                title
                description
                authors
                tags
                persons
                category
                companies
              }
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `)

  result.data.allArticles.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.childMdx.fields.slug}`,
      component: path.resolve(`./src/templates/article.js`),
      context: {
        article: node.childMdx, // pass childMdx as article
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = getNode(node.parent).relativeDirectory
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
