import style from './style.module.css';

type BenefitItemProps = {
  className?: string;
  title: string;
  text: string;
  image: string;
};

function BenefitItem({ className, title, text, image }: BenefitItemProps) {
  return (
    <div className={`${style['benefit-item']} ${className}`}>
      <img src={image} alt={title} />
      <div className={style['benefit-item-text']}>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

BenefitItem.defaultProps = {
  className: '',
};
export default BenefitItem;
