import { Heading, SubHeading } from 'components/heading';
import style from '../style.module.css';
import { shareItems } from './constants';

function ShareBlock() {
  return (
    <section className={style['share-block']}>
      <div className="container">
        <SubHeading>Share your book journey with</SubHeading>
        <Heading>#HurricaneBookstore</Heading>
      </div>
      <div className={style['share-block-images']}>
        {shareItems.map((item) => (
          <img key={item.alt} src={item.image} alt={item.alt} className={item.className} />
        ))}
      </div>
    </section>
  );
}

export default ShareBlock;
