import React, { Component } from "react";
import { fetchBook } from "../utils/Book";
import '../css/Book.css';

const bookURL = 'https://frigid-fox.herokuapp.com/v1/books';

const BookDetailsBody = props => {
    const body = Object.keys(props.book).map((property) => {
        if (property === 'cover') return null;
        return (
            <tr key={ property }>
                <th key={ property }>{ property }</th>
                <td>
                    <textarea disabled={true}>
                        { JSON.stringify(props.book[property]) }
                    </textarea>
                </td>
            </tr>
        );
    });
    return (
        <tbody>
            {body}
            <button className="edit-button"> Edit </button>
            <button className="save-button"> Save </button>
        </tbody>
    );
};

const BookDetails = (props) => {
    return (
        <div className="book-details">
            <div className="book-cover-wrapper">
                <img 
                    src={ props.book.cover ? props.book.cover.medium : null } 
                    alt="This book's cover." 
                    className="book-cover" 
                />
            </div>
            <div className="book-details-form-wrapper">
                <form className="book-details-form">
                    <div className="book-table-wrapper">
                        <table className="book-table">
                            <BookDetailsBody book={props.book} />
                        </table>
                    </div>
                </form>
            </div>
        </div>
    );
}

class Book extends Component {
    constructor(props) {
        super(props);
        var params = {};
        window.location.search.replace('?', '').split('&').forEach((val, ind) => {
            params[val.split('=')[0]] = val.split('=')[1];
        });
        this.state = {
            id: params.id
        }
    }

    componentDidMount = async () => {
        var fetchedBook = await fetchBook(bookURL, this.state.id);
        if (fetchedBook) {
            this.setState({ book: fetchedBook });
        }
    }

    render = () => {
        return (
        <div className="Book">
            <div className="book-overlay">
                <div className="book-overlay-text"></div>
            </div>
            { this.state.book ? <BookDetails book={this.state.book}/> : null }
        </div>
        );
        
    }
}

export default Book;