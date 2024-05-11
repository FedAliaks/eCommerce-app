import { Heading, SubHeading } from 'components/heading';
import share1 from 'assets/main/share-1.png';
import share2 from 'assets/main/share-2.png';
import share3 from 'assets/main/share-3.png';
import share4 from 'assets/main/share-4.png';
import share5 from 'assets/main/share-5.png';
import share6 from 'assets/main/share-6.png';
import style from '../style.module.css';

const shareItems = [
  {
    image: share1,
    alt: 'girl read',
    className: style['share-block-image-1'],
  },
  {
    image: share2,
    alt: 'bookshelves',
    className: style['share-block-image-2'],
  },
  {
    image: share3,
    alt: 'book',
    className: style['share-block-image-3'],
  },
  {
    image: share4,
    alt: 'girl reading',
    className: style['share-block-image-4'],
  },
  {
    image: share5,
    alt: 'book with coffee',
    className: style['share-block-image-5'],
  },
  {
    image: share6,
    alt: 'books',
    className: style['share-block-image-6'],
  },
];

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
