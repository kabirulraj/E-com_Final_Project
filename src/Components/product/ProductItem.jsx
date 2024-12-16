import { PropTypes } from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { commonCardStyles } from "../../styles/card";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { image } from "../../api/endPoints/endPoints";
import { useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useProductDeleteQuery } from "../../hooks/react_query/Product-query";
import { wishListToCart } from "../../redux/slices/wishListSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductCardWrapper = styled(Link)`
  ${commonCardStyles}
  @media(max-width: ${breakpoints.sm}) {
    padding-left: 0;
    padding-right: 0;
  }

  .product-img {
    height: 393px;
    position: relative;

    @media (max-width: ${breakpoints.sm}) {
      height: 320px;
    }
  }

  .product-wishlist-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 100%;

    &:hover {
      background-color: ${defaultTheme.color_yellow};
      color: ${defaultTheme.color_white};
    }
  }
`;

const ProductItem = ({ product }) => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { mutate } = useProductDeleteQuery()

  const handleDeleteProduct = (id) => {
    mutate({ id })
  }

  const handleUpdateProduct = (id) => {
    navigate(`/productDetails/${id}`)
 }
  
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    navigate('/cart');
  };

  const handleAddtoWishList = (item)=>{
    dispatch(wishListToCart(item));
    navigate('/wishlist');
  }

  return (
    <div>
    <ProductCardWrapper key={product.id}>
      <div className="product-img">
        <img className="object-fit-cover" src={image(product.image)} />
        <button
          type="button"
          className="product-wishlist-icon flex items-center justify-center bg-white"
          onClick={()=>handleAddtoWishList(product)}
        >
          <i className="bi bi-heart"></i>
        </button>

      </div>
      <div className="product-info">
        <p className="font-bold">{product.title}</p>
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-gray">xyz</span>
          <span className="text-outerspace font-bold">${product.description}</span>
        </div>
        
      </div>
    </ProductCardWrapper>
    <div  style={{ display: 'flex', justifyContent: 'space-around' }}>
    <IconButton color="primary" onClick={() => handleAddToCart(product)}>
    <ShoppingBagIcon/>
        </IconButton>

        <IconButton aria-label="edit" color="secondary" onClick={() => handleUpdateProduct(product._id)}>
        <i class="bi bi-pencil-square"></i>
        </IconButton>

        <IconButton aria-label="delete" color="error"  onClick={() => handleDeleteProduct(product._id)}>
        <i class="bi bi-trash3"></i>
        </IconButton>
        </div>


    </div>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.object,
};
