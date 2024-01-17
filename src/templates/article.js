import React from "react"
import { Container } from "react-bootstrap"
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react'
import Layout from '../components/Layout.js' // Путь до вашего компонента Layout

const ArticleTemplate = ({ pageContext: { article } }) => {
    const { title, description, authors, tags, persons, category, companies } = article.frontmatter
    const { body } = article // получаем body напрямую из article
    console.log(body)

    return (
        <Layout>
            <Container> 
                <h1>{title}</h1>
                <p>{description}</p>
                <p>Авторы: {authors.join(', ')}</p>
                <h2>Теги</h2>
                <p>{tags.join(', ')}</p>
                <h2>Люди</h2>
                <p>{persons.join(', ')}</p>
                <h2>Категории</h2>
                <p>{category.join(', ')}</p>
                <h2>Компании</h2>
                <p>{companies.join(', ')}</p>
                <MDXProvider>{body}</MDXProvider>
            </Container>
        </Layout>
    )
}

export default ArticleTemplate