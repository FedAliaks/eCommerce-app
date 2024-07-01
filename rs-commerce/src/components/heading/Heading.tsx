import style from './style.module.css';

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

function Heading({ children, className = '' }: HeadingProps) {
  return <h2 className={`${style['h2']} ${className}`}>{children}</h2>;
}

export default Heading;
