import { RotatingLines } from 'react-loader-spinner';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <div className="loader__box">
      <RotatingLines
        strokeWidth="5"
        animationDuration="0.75"
        width="30"
        strokeColor="#fff176"
        visible={isLoading}
      />
    </div>
  );
};

export default Loader;
