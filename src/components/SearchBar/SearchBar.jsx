import React, { Component } from 'react';

class SearchBar extends Component {
  state = {
    searchName: '',
  };

  handleInputChange = event => {
    this.setState({ searchName: event.currentTarget.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className="SearchBar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
