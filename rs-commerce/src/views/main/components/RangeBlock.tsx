import { Heading, SubHeading } from 'components/heading';
import RangeItem from './RangeItem';
import style from '../style.module.css';
import { rangeItems } from './constants';

function RangeBlock() {
  return (
    <section className={`${style['range-block']} container`}>
      <Heading>Browse The Range</Heading>
      <SubHeading>Check out the variety of genres presented in our store</SubHeading>

      <div className={style['range-block-row']}>
        {rangeItems.map((item) => (
          <RangeItem key={item.text} image={item.image} text={item.text} />
        ))}
      </div>
    </section>
  );
}

export default RangeBlock;
