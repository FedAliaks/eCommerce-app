import benefit1 from 'assets/main/benefit-1.svg';
import benefit2 from 'assets/main/benefit-2.svg';
import benefit3 from 'assets/main/benefit-3.svg';
import romance from 'assets/main/romance.png';
import psychology from 'assets/main/psychology.png';
import thriller from 'assets/main/thriller.png';
import share1 from 'assets/main/share-1.png';
import share2 from 'assets/main/share-2.png';
import share3 from 'assets/main/share-3.png';
import share4 from 'assets/main/share-4.png';
import share5 from 'assets/main/share-5.png';
import share6 from 'assets/main/share-6.png';
import style from '../style.module.css';

export const rangeItems = [
  {
    image: romance,
    text: 'Romance',
  },
  {
    image: thriller,
    text: 'Thriller',
  },
  {
    image: psychology,
    text: 'Psychology',
  },
];

export const benefitsItems = [
  {
    image: benefit1,
    title: 'Order',
    text: 'easily find your favorite books',
  },
  {
    image: benefit2,
    title: 'Delivery',
    text: 'get your order full and fast',
  },
  {
    image: benefit3,
    title: 'Benefits',
    text: 'get special offers after each order',
  },
];

export const shareItems = [
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
