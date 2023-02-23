import { gql } from "@apollo/client";

export const getBooks = gql`
    query Books {
        books{
            id
            name
            genre
            author {
                name
            }
        }
}
`
export const getBook = gql`
    query Book($bookId: ID!){
        book(id: $bookId) {
            id
            name
            genre
            author {
                id
                name
                age
                books{
                    id
                    name
                }
            }
        }
}
`
export const getAuthors = gql`
    query authors{
        authors {
            id
            name
        }
    }
`
