import React, { Component } from "react";
import { lread } from '../middleware/localStorage';
import IssueBook from './IssueBook';
import { launchModal } from '../utils/Modal';

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
                    <td>{book.available ? 'Yes' : 'No'}</td>
                    <td>{book.form}</td>
                    { book.available && lread('bkclbSid') ? 
                        <td>
                            <button onClick={(e) => {
                                e.preventDefault();
                                launchModal();
                                window
                                .ModalRef
                                .setState({ toLoad: <IssueBook bookId={book._id} /> });
                                }}
                                className="catalogue-issue-button"
                            >
                                Issue
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
                <th>Available</th>
                <th>Format</th>
                { lread('bkclbSid') ? <th>Issue</th> : null }
            </tr>
        </thead>
    );
};

class BooksDisplay extends Component {
    state = {
        displayHeader: 'free'
    }

    render() {
        const { books } = this.props;
        return (
            <div className="table-wrapper">
                <table className="fl-table">
                    <DisplayHead 
                    />
                    <DisplayBody 
                        books={ books }
                    />
                </table>
            </div>
        );
    }
}

export default BooksDisplay;