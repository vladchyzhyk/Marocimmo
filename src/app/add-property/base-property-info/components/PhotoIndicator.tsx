import classNames from 'classnames';

type PhotoIndicatorProps = {
  index: number;
};

const PhotoIndicator = ({ index }: PhotoIndicatorProps) => {
  return (
    <div
      className={classNames(
        'bg-[var(--accent-green)] text-white py-1 shadow-lg transition-all duration-200 ease-in-out',
        index === 0 ? 'rounded-r-lg px-4' : 'px-3 rounded-lg',
      )}
    >
      <span className="body-md !font-medium">{index === 0 ? 'Main Photo' : `${index + 1}`}</span>
    </div>
  );
};

export default PhotoIndicator;
