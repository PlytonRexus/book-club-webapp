import React, { Component } from "react";
import { lread } from '../middleware/localStorage';
import IssueBook from './IssueBook';
import { launchModal, closeModal } from '../utils/Modal';
import Loader from "./Loader";
import { addToReadBook, deleteToReadBook } from "../utils/User";

const DisplayBody = (props) => {
    var body;

    if (props.books) {
        body = props.books.map((book, index) => {
            return (
                <tr key={index}>
                    <td>
                        <a 
                            href={`book?id=${book._id}`} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="catalogue-book-title"
                        >
                            {book.title}
                        </a>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.price}</td>
                    <td>{book.edition}</td>
                    <td>{book.year_written}</td>
                    {/* <td>{book.available ? 'Yes' : 'No'}</td> */}
                    <td>{book.form}</td>
                    { lread('bkclbSid') ? book.available ? 
                        <td>
                            <button onClick={(e) => {
                                    e.preventDefault();
                                    launchModal();
                                    window
                                    .ModalRef
                                    .setState({ 
                                        toLoad: <IssueBook 
                                            bookId={book._id} 
                                            changeStateValues={props.changeStateValues} 
                                            justIssued={props.justIssued}
                                        /> 
                                    });
                                }}
                                className="catalogue-issue-button"
                            >
                                Issue
                            </button>
                        </td> : <td>Unavailable</td> : null
                    }
                    { lread('bkclbSid') ? !props.toRead.includes(book._id) ? 
                        <td>
                            <button onClick={async (e) => {
                                    e.preventDefault();
                                    launchModal();
                                    window
                                    .ModalRef
                                    .setState({ toLoad: <Loader /> });
                                    const toRead = await addToReadBook([book._id]);
                                    console.log(toRead);
                                    props.changeStateValues('toRead', toRead);
                                    closeModal();
                                }}
                                className="catalogue-issue-button"
                            >
                                Add
                            </button>
                        </td> : 
                        <td>
                            <button onClick={async (e) => {
                                    e.preventDefault();
                                    launchModal();
                                    window
                                    .ModalRef
                                    .setState({ toLoad: <Loader /> });
                                    const toRead = await deleteToReadBook(book._id);
                                    console.log(toRead);
                                    props.changeStateValues('toRead', toRead);
                                    closeModal();
                                }}
                                style={{
                                    backgroundColor: "red"
                                }}
                                className="catalogue-issue-button"
                            >
                                Remove
                            </button>
                        </td> : null
                    }
                </tr>
            );
        });
    }
    
    return <tbody>{body}</tbody>
};

const DisplayHead = (props) => {
    return (
        <thead className="catalogue-header">
            <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Price</th>
                <th>Edition</th>
                <th>Year Written</th>
                {/* <th>Available</th> */}
                <th>Format</th>
                { lread('bkclbSid') ? <th>Issue</th> : null }
                { lread('bkclbSid') ? <th>Want To Read</th> : null }
            </tr>
        </thead>
    );
};

class BooksDisplay extends Component {
    state = {
        displayHeader: 'free',
        justIssued: 0,
        toRead: lread('bkclbSread') ? lread('bkclbSread').split(',') : []
    }

    changeStateValues = (what, toWhat) => {
        this.setState({ [what]: toWhat });
    }

    render() {
        const { books } = this.props;
        const { justIssued, toRead } = this.state;
        return (
            <div className="table-wrapper">
                <table className="fl-table">
                    <DisplayHead />
                    <DisplayBody 
                        books={books}
                        toRead={toRead}
                        changeStateValues={this.changeStateValues}
                        justIssued={justIssued}
                    />
                </table>
            </div>
        );
    }
}

export default BooksDisplay;