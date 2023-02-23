import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { Col, Row,Form, Button } from "react-bootstrap"
import { addSingleAuthor, addSingleBook } from "../graphql-client/mutations"
import { getAuthors, getBooks } from "../graphql-client/queries"

const Forms = ()=>{
    const {loading,data} = useQuery(getAuthors)
    const [addBook,bookMutation] = useMutation(addSingleBook)
    const [addAuthor,authorMutation] = useMutation(addSingleAuthor)
    const [newBook,setNewBook] = useState({
        name:"",
        genre:"",
        authorId:""
    })
    const [newAuthor,setNewAuthor] = useState({
        name:"",
        age:""
    })
    const onInputBookChange = event =>{
        setNewBook({
            ...newBook,
            [event.target.name]:event.target.value
        })
    }
    const onInputAuthorChange = event=>{
        setNewAuthor({
            ...newAuthor,
            [event.target.name]:event.target.value
        })
    }
    const onAddBookSubmit= event=>{
        event.preventDefault()
        addBook({
            variables:{
                ...newBook
            },
            refetchQueries:[{query:getBooks}]
        })
        setNewBook({
            name:"",
            genre:"",
            authorId:""
        })
        console.log(bookMutation)
    }
    const onAddAuthorSubmit=event=>{
        event.preventDefault()
        addAuthor({
            variables:{
                name:newAuthor.name,
                age:Number(newAuthor.age)
            },
            refetchQueries:[{query:getAuthors}]
        })
        setNewAuthor({
            name:"",
            age:""
        })
        console.log(authorMutation)
    }
    return (
        <Row className="my-3">
            <Col>
                <Form onSubmit={onAddBookSubmit}>
                    <Form.Group className="my-3">
                        <Form.Control type="text" placeholder="Book name" name="name" onChange={onInputBookChange} value={newBook.name}/>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control type="text" placeholder="Book genre" name="genre" onChange={onInputBookChange} value={newBook.genre}/>
                    </Form.Group>
                    <Form.Group className="my-3">
                        {loading?<p>Loading authors...</p>:
                        <Form.Control as="select" name="authorId" onChange={onInputBookChange} value={newBook.authorId}>
                            <option value="" disabled>Select author</option>
                            {data.authors.map(author=>(<option key={author.id} value={author.id}>{author.name}</option>))}
                        </Form.Control>}
                    </Form.Group>
                    <Button className="float-right" variant="info" type="submit">Add book</Button>
                </Form>
            </Col>
            <Col>
                <Form onSubmit={onAddAuthorSubmit}>
                    <Form.Group className="my-3 invisible">
                        <Form.Control/>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control type="text" placeholder="Author name" name="name" onChange={onInputAuthorChange} value={newAuthor.name}/>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control type="number" placeholder="Author age" name="age" onChange={onInputAuthorChange} value={newAuthor.age}/>
                    </Form.Group>
                    <Button className="float-right" variant="info" type="submit">Add author</Button>
                </Form>
            </Col>
        </Row>
    )
}
export default Forms