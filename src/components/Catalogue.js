import React, { Component } from 'react';
import '../css/Catalogue.css';
import SearchBar from './SearchBar';
import BooksDisplay from "./BooksDisplay";

const catalogueURL = 'https://frigid-fox.herokuapp.com/v1/books';

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
            return this.setState({
                results: this.state.all
            });
        }
        var regex = new RegExp(query, 'i');
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
                results: obj,
                all: obj
            });
        }
        else console.log('HTTP-Error: ' + response.status);
    }

    componentDidMount = () => {
        this.fetchBooks();
        document.title = "Catalogue";
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
                <BooksDisplay 
                    books={this.state.filtered || this.state.results.books} 
                    authState={authState} 
                />
            </div>
        );
    }
}

export default Catalogue;