interface ImageGalleryItemProps {
  src: string;
  alt: string;
  onClick: (e?: React.MouseEvent<HTMLImageElement | HTMLDivElement>) => void;
  modal: string;
}

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  src,
  alt,
  onClick,
  modal,
}) => {
  return (
    <li className="gallery__item">
      <img
        className="gallery__image"
        src={src}
        alt={alt}
        onClick={onClick}
        data-href={modal}
      />
    </li>
  );
};

export default ImageGalleryItem;
