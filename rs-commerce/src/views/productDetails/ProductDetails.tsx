import { useParams } from 'react-router-dom';
import { Breadcrumbs } from './components';

function ProductDetails() {
  const { id } = useParams();

  return (
    <>
      <Breadcrumbs productName={id as string} />
      ProductDetails
    </>
  );
}

export default ProductDetails;
