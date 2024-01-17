import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { useStaticQuery, graphql, Link } from "gatsby"

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
    <Container>
      {articles.map((article, index) => (
        <Card key={index} lg={6}>
          <Card.Body>
            <Card.Title>{article.frontmatter.title}</Card.Title>
            <Card.Text>{article.frontmatter.description}</Card.Text>
            <Card.Text>{article.frontmatter.authors}</Card.Text>
            
            <Link to={article.frontmatter.slug}>Читать далее</Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  )

  //   return (
  //     <div>
  //       {articles.map((articleы, index) => (
  //         <ArticleTemplate key={index} article={articles} />
  //       ))}
  //     </div>
  //   )

  //   const persons = data.allPersons.edges.map(edge => ({
  //     name: edge.node.childMdx.frontmatter.name,
  //     slug: edge.node.childMdx.fields.slug,
  //   }))

//   const articlesWithAuthors = articles.map(article => {
//     const authors = article.authors.map(authorSlug => {
//       const author = persons.find(person => person.slug === authorSlug)
//       return author ? author.name : "Unknown"
//     })
//     return { ...article, author: authors.join(", ") }
//   })

}

export default BlogPage
