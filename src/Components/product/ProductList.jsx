import styled from "styled-components";
import { PropTypes } from "prop-types";
import { breakpoints } from "../../styles/themes/default";
import { useProductListQuery } from "../../hooks/react_query/Product-query";
import ProductItem from "./ProductItem";

const ProductListWrapper = styled.div`
  column-gap: 20px;
  row-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

  @media (max-width: ${breakpoints.sm}) {
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const ProductList = () => {
    
    const {data,isLoading,isFetching} = useProductListQuery()

    if(isLoading) return <h3>Loading..</h3>
    
  return (
    <ProductListWrapper className="grid">
      {data?.data?.map((product) => {
        
        return <ProductItem key={product.id} product={product} />;
      })}
    </ProductListWrapper>
  );
};

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.array,
};
