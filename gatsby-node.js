// gatsby-node.js
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allArticles: allFile(filter: { sourceInstanceName: { eq: "articles" } }) {
        edges {
          node {
            childMdx {
              frontmatter {
                title
                description
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
      path: node.childMdx.fields.slug, // access slug correctly
      component: path.resolve(`./src/templates/article.js`),
      context: {
        // данные, которые вы хотите передать в шаблон
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
