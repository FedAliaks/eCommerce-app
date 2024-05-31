import style from '../style.module.css';

function DescriptionText({ description }: { description: string }) {
  return (
    <div className={style['description__content']}>
      <div className={style['description__content-title']}>Description</div>
      <div className={style['description__content-text']}>{description}</div>
    </div>
  );
}

export default DescriptionText;
