import style from './style.module.css';

type SubHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

function SubHeading({ children, className = '' }: SubHeadingProps): JSX.Element {
  return <h3 className={`${style['h3']} ${className}`}>{children}</h3>;
}

export default SubHeading;
