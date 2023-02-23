import { gql } from "@apollo/client";

export const addSingleBook = gql`
    mutation addSBook($name: String, $genre: String, $authorId: ID!){
        createBook(name: $name,genre: $genre,authorId: $authorId) {
            id
            name
        }
    }
`
export const addSingleAuthor = gql`
    mutation addAuthor($name: String, $age: Int){
        createAuthor(name: $name,age: $age) {
            id
            name
        }
    }
`