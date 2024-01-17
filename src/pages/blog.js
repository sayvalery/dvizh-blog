import React from "react"
import { Container, Row, Col, Card, Link } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"
import ArticleTemplate from "../templates/article.js"

const BlogPage = () => {
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
      allPersons: allFile(filter: { sourceInstanceName: { eq: "persons" } }) {
        edges {
          node {
            childMdx {
              frontmatter {
                name
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
  const articles = data.allArticles.edges.map(edge => edge.node.childMdx)

  console.log(articles)
  return (
    <div>
      {articles.map((articles, index) => (
        <ArticleTemplate key={index} article={articles} />
      ))}
    </div>
  )

  const persons = data.allPersons.edges.map(edge => ({
    name: edge.node.childMdx.frontmatter.name,
    slug: edge.node.childMdx.fields.slug,
  }))

  const articlesWithAuthors = articles.map(article => {
    const authors = article.authors.map(authorSlug => {
      const author = persons.find(person => person.slug === authorSlug)
      return author ? author.name : "Unknown"
    })
    return { ...article, author: authors.join(", ") }
  })

  return (
    <Container>
      <Row>
        {articlesWithAuthors.map((article, index) => (
          <Col key={index} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <Link to={article.slug}>{article.title}</Link>{" "}
                </Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Card.Text>Автор: {article.author}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ArticleTemplate
