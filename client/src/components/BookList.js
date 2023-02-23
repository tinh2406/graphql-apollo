import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { getBooks } from '../graphql-client/queries'
import BookDetail from './BookDetail'
const BookList = ()=>{
    const {loading,data,error} = useQuery(getBooks)
    const [bookSelected, setBookSelected] = useState("")
    if(loading) return<p>Loading...</p>
    if(error) return <p>{JSON.stringify(error)}</p>
    return(
        <Row>
            <Col xs='8'>
                <Row>
                    {data.books.map(book=>(
                        <Col xs='4' className='my-2' key={book.id}>
                        <Card 
                            border='info' text='info' className='text-center shadow' 
                            style={{cursor:'pointer'}}
                            onClick={()=>{setBookSelected(book.id)}}
                            >
                            <Card.Body>
                                {book.name}
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </Col>
            <Col>
            <BookDetail bookId={bookSelected}/>
            </Col>
        </Row>
    )
}
export default BookList