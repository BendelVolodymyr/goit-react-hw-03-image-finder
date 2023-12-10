import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { getImages } from './SearchAPI/SearchAPI';
import SearchBar from './SearchBar/SearchBar';
import React, { Component } from 'react';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    searchName: '',
    page: 1,
    isLoading: false,
    images: [],
    isVisible: false,
    isEmpty: false,
    totalHits: 0,
    showModal: false,
    modalSrc: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName, pages } = this.state;
    if (prevState.searchName !== searchName || prevState.pages !== pages) {
      this.getSearch(searchName, pages);
    }
  }

  onHandleFormSubmit = search => {
    this.setState({
      searchName: search,
      pages: 1,
      images: [],
      isEmpty: false,
      totalHits: 0,
    });
  };

  onHandleLoadMore = () => {
    this.setState(prevState => ({ pages: prevState.pages + 1 }));
  };

  ToggleModal = e => {
    const control = e === undefined;

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    if (!control) {
      if (e.target.localName === 'img') {
        this.setState({
          modalSrc: e.target.attributes.href.nodeValue,
          modalAlt: e.target.attributes.alt.nodeValue,
        });
      }
    }
  };

  getSearch = async (searchName, page) => {
    if (!searchName) return;
    this.setState({ isLoading: true });

    try {
      const { totalHits, hits } = await getImages(searchName, page);
      if (hits.length === 0) {
        this.setState({ isEmpty: true });
      }
      const { pages } = this.state;
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isVisible: pages < Math.floor(totalHits / hits.length),
      }));
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      isLoading,
      images,
      isVisible,
      isEmpty,
      showModal,
      modalSrc,
      modalAlt,
    } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.onHandleFormSubmit} />
        {showModal && (
          <Modal onClose={this.ToggleModal} src={modalSrc} alt={modalAlt} />
        )}
        <ImageGallery>
          {images.length > 0 &&
            images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                src={webformatURL}
                alt={tags}
                modal={largeImageURL}
                onClick={this.ToggleModal}
              />
            ))}
        </ImageGallery>
        {isLoading && <Loader isLoading={isLoading} />}
        {isVisible && <Button onClick={this.onHandleLoadMore} />}
        {isEmpty && (
          <span className="info">Sorry. There are no images ... 😭</span>
        )}
      </>
    );
  }
}
