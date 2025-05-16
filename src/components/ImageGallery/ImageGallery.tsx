import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

type Images = {
  id: string;
  webformatURL: string;
  tags: string;
  largeImageURL: string;
};

interface ImageGalleryProps {
  images: Images[];
  onClick: (e?: React.MouseEvent<HTMLImageElement | HTMLDivElement>) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClick }) => {
  if (images.length > 0) {
    const resultImages = images.map(
      ({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          modal={largeImageURL}
          onClick={onClick}
        />
      )
    );
    return <ul className="gallery">{resultImages}</ul>;
  }
  return null;
};

export default ImageGallery;
