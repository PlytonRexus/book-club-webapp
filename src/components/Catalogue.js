import React, { Component } from 'react';
import '../css/Catalogue.css';
import SearchBar from './SearchBar';
import { lread } from '../middleware/localStorage';
import IssueBook from './IssueBook';
import { launchModal } from '../utils/Modal';

const catalogueURL = 'https://frigid-fox.herokuapp.com/v1/books';

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
                    { lread('bkclbSid') ? 
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

class Display extends Component {
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

class Catalogue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {},
            filtered: null
        }
        this.componentDidMount.bind(this);
    }

    filterSearch = (query) => {
        if (query === '') {
            return this.fetchBooks();
        }
        var regex = new RegExp(`${query}`, 'gi');
        var results = this.state.results.books;
        var filtered = results.filter((book, ind) => {
            if (regex.test(book.title)) {
                return true;
            } else if (regex.test(book.author)) {
                return true;
            } else if (regex.test(book.edition)) {
                return true;
            } else if (regex.test(book.price)) {
                return true;
            } else if (regex.test(book.year_written)) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({filtered: filtered});
    }

    fetchBooks = async () => {
        var response = await fetch(
            catalogueURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            var obj = await response.json();
            this.setState({
                results: obj
            });
        }
        else console.log('HTTP-Error: ' + response.status);
    }

    componentDidMount = () => {
        this.fetchBooks();
    }

    render = () => {
        const { authState } = this.props;
        return (
            <div>
                <header>
                    <h1 className="page-header">
                        Catalogue
                        <SearchBar 
                            placeholder="Book, Author, Price, Edition, Year, Availability..." 
                            filterSearch={this.filterSearch} 
                        />
                    </h1>
                </header>
                <Display 
                    books={this.state.filtered || this.state.results.books} 
                    authState={authState} 
                />
            </div>
        );
    }
}

export default Catalogue;