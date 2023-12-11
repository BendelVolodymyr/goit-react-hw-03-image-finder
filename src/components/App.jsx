import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { getImages } from './SearchAPI/SearchAPI';
import SearchBar from './SearchBar/SearchBar';
import React, { Component } from 'react';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyOptions = {
  position: 'top-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

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
        isVisible: pages < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      console.log(`Error: ${error}`);
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
        <ImageGallery images={images} onClick={this.ToggleModal} />
        {isLoading && <Loader isLoading={isLoading} />}
        {isVisible && <Button onClick={this.onHandleLoadMore} />}
        {isEmpty && (
          <span className="info">Sorry. There are no images ... 😭</span>
        )}
      </>
    );
  }
}
