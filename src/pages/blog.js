import React from "react"
import { Container, Card, Row, Col, Badge, Stack } from "react-bootstrap"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/Layout.js"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allArticles: allFile(filter: { sourceInstanceName: { eq: "articles" }, extension: { eq: "mdx" } }) {
        edges {
          node {
            childMdx {
              frontmatter {
                title
                description
                authors
                tags
              }
              fields {
                slug
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
  const persons = data.allPersons.edges.map(edge => edge.node.childMdx)

  return (
    <Layout>
      <Container>
        <Row>
          {articles.map((article, index) => (
            <Col lg={4} key={index}>
              <Card className="h-100">
                <a href={article.fields.slug}>
                  <Card.Img
                    variant="top"
                    src={`https://source.unsplash.com/random/400x200?real-estate/${index}`}
                  />
                  <Card.Body>
                    <Card.Title>{article.frontmatter.title}</Card.Title>
                    <Card.Text>{article.frontmatter.description}</Card.Text>
                    <Card.Text>{article.frontmatter.authors}</Card.Text>
                    <Stack direction="horizontal" gap={2}>
                      {article.frontmatter.tags &&
                        article.frontmatter.tags.map((tag, index) => (
                          <Badge key={index} bg="secondary">
                            <a href="#" className="text-white">
                              {tag}
                            </a>
                          </Badge>
                        ))}
                    </Stack>
                  </Card.Body>
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  )
}

export default BlogPage
