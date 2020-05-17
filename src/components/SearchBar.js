import React, { Component } from 'react';
import '../css/SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ query : value, });

        e.preventDefault();
        var query = this.state.query;
        this.props.filterSearch(query);
    }

    runSearch = (e) => {
        e.preventDefault();
        var query = this.state.query;
        this.props.filterSearch(query);
    }

    render = () => {
        return (
            <div className="search-wrapper">
                <input 
                    type="text" 
                    name="search" 
                    placeholder={this.props.placeholder}
                    className="search-bar"
                    id="search-bar"
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default SearchBar;