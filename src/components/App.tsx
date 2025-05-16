import React, { Component } from 'react';
import { getImages, PixabayImage } from './SearchAPI/SearchAPI';
import SearchBar from './SearchBar/SearchBar';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

interface AppState {
  searchName: string;
  page: number;
  isLoading: boolean;
  images: PixabayImage[];
  isVisible: boolean;
  isEmpty: boolean;
  totalHits: number;
  showModal: boolean;
  modalSrc: string;
  modalAlt: string;
}

export class App extends Component<{}, AppState> {
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
    modalAlt: '',
  };

  componentDidUpdate(_: {}, prevState: AppState) {
    const { searchName, page } = this.state;
    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.getSearch(searchName, page);
    }
  }

  onHandleFormSubmit = (search: string): void => {
    this.setState({
      searchName: search,
      page: 1,
      images: [],
      isEmpty: false,
      totalHits: 0,
    });
  };

  onHandleLoadMore = () => {
    this.setState(
      (prevState): Pick<AppState, 'page'> => ({ page: prevState.page + 1 })
    );
  };

  ToggleModal = (e?: React.MouseEvent<HTMLImageElement | HTMLDivElement>) => {
    if (!e) {
      this.setState(({ showModal }) => ({ showModal: !showModal }));
      return;
    }

    const target = e.target as HTMLElement;

    if (target.tagName === 'IMG') {
      const img = target as HTMLImageElement;

      this.setState({
        showModal: true,
        modalSrc: img.src,
        modalAlt: img.alt,
      });
    } else if (target.tagName === 'DIV') {
      this.setState({ showModal: false });
    }
  };

  getSearch = async (searchName: string, pages: number) => {
    if (!searchName) return;
    this.setState({ isLoading: true });

    try {
      const { totalHits, hits } = await getImages(searchName, pages);
      if (hits.length === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isVisible: prevState.page < Math.ceil(totalHits / 12),
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
        <SearchBar onSubmit={this.onHandleFormSubmit} isLoading={isLoading} />
        {showModal && (
          <Modal onClose={this.ToggleModal} src={modalSrc} alt={modalAlt} />
        )}
        <ImageGallery images={images} onClick={this.ToggleModal} />
        {isVisible && <Button onClick={this.onHandleLoadMore} />}
        {isEmpty && (
          <div className="no-results">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="no-results__icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width="64"
              height="64"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 14l2-2 4 4m1 4H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v7a2 2 0 01-2 2z"
              />
            </svg>
            <p className="no-results__text">
              Oops! No images found for your search. 😕
              <br />
              Try adjusting your keywords or check the spelling.
            </p>
          </div>
        )}
      </>
    );
  }
}
