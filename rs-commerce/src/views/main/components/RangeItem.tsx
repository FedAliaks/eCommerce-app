import style from '../style.module.css';

type RangeItemProps = {
  image: string;
  text: string;
};

function RangeItem({ image, text }: RangeItemProps) {
  return (
    <div className={style['range-item']}>
      <img src={image} alt={text} />
      <p>{text}</p>
    </div>
  );
}

export default RangeItem;
