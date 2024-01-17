// src/templates/article.js
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Container } from "react-bootstrap"

const ArticleTemplate = ({ article }) => {
//   const { title, description, authors } = article.frontmatter
  const data = useStaticQuery(graphql`
    query {
      allArticles: allFile(filter: { sourceInstanceName: { eq: "articles" } }) {
        edges {
          node {
            childMdx {
              frontmatter {
                title
                description
                authors
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Container>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </Container>
  )
}

export default ArticleTemplate
