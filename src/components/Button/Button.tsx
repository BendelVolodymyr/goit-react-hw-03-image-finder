interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button type="button" className="button-Load" onClick={onClick}>
      <span className="button-load__text">Load more</span>
    </button>
  );
};

export default Button;
