import { useQuery } from "@apollo/client"
import { Card } from "react-bootstrap"
import { getBook } from "../graphql-client/queries"

const BookDetail = ({bookId})=>{
    const {loading,error,data} = useQuery(getBook,{
        variables:{
            bookId
        },
        skip:bookId===""
    })
    if(loading) return<p>Loading...</p>
    if(error) return<p>{JSON.stringify(error)}</p>
    const book = bookId!==""?data.book:null
    return(
        <Card>
            <Card.Body>
                {book==null?(<Card.Text>Please select a book</Card.Text>):
                <>
                    <Card.Title>
                        {book.name}
                    </Card.Title>
                    <Card.Subtitle>{book.genre}</Card.Subtitle>
                        <p>{book.author.name}</p>
                        <p>{book.author.age}</p>
                        <p>All books by this author</p>
                        <ul>
                            {book.author.books.map(book=>(
                                <li key={book.id}>
                                {book.name}
                                </li>
                            ))}
                        </ul>
                </>}
            </Card.Body>
        </Card>
    )
}
export default BookDetail