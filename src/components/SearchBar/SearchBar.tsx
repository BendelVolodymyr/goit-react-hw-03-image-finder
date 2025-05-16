import React, { Component } from 'react';
import Loader from '../Loader/Loader';

interface SearchBarState {
  searchName: string;
}

interface SearchBarProps {
  onSubmit: (searchName: string) => void;
  isLoading: boolean;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state = {
    searchName: '',
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchName: e.currentTarget.value });
  };
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.state.searchName.trim()) return alert('Can not be empty');
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className="search__bar">
        <Loader isLoading={this.props.isLoading} />
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
