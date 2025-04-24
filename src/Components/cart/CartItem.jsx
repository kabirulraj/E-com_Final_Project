import styled from "styled-components";
import { PropTypes } from "prop-types";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { image } from "../../api/endPoints/endPoints";
import { useDispatch } from "react-redux";
import { Dec, Inc, remove } from "../../redux/slices/cartSlice";

const CartTableRowWrapper = styled.tr`
  .cart-tbl {
    &-prod {
      grid-template-columns: 80px auto;
      column-gap: 12px;

      @media (max-width: ${breakpoints.xl}) {
        grid-template-columns: 60px auto;
      }
    }

    &-qty {
      .qty-inc-btn,
      .qty-dec-btn {
        width: 24px;
        height: 24px;
        border: 1px solid ${defaultTheme.color_platinum};
        border-radius: 2px;

        &:hover {
          border-color: ${defaultTheme.color_sea_green};
          background-color: ${defaultTheme.color_sea_green};
          color: ${defaultTheme.color_white};
        }
      }

      .qty-value {
        width: 40px;
        height: 24px;
      }
    }
  }

  .cart-prod-info {
    p {
      margin-right: 8px;
      span {
        margin-right: 4px;
      }
    }
  }

  .cart-prod-img {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 8px;

    @media (max-width: ${breakpoints.xl}) {
      width: 60px;
      height: 60px;
    }
  }
`;

const CartItem = ({ cartItem }) => {
  
  const dispatch= useDispatch()

  const handleInc=(id)=>{
    dispatch(Inc(id))
  }

  const handleDec=(id)=>{
    dispatch(Dec(id))
  }

  const handleDelete =(id)=>{
    dispatch(remove(id))
  }

  return (
    <CartTableRowWrapper key={cartItem._id}>
      <td>
        <div className="cart-tbl-prod grid">
          <div className="cart-prod-img">
            <img src={image(cartItem.image)} className="object-fit-cover" alt="" />
          </div>
          <div className="cart-prod-info">
            <h4 className="text-base">{cartItem.title}</h4>
            
          </div>
        </div>
      </td>
      <td>
        <span className="text-lg font-bold text-outerspace">
          ${cartItem.description}
        </span>
      </td>
      <td>
        <div className="cart-tbl-qty flex items-center">
          <button className="qty-dec-btn" 
          onClick={() => handleDec(cartItem._id)}
          disabled={cartItem.qty <= 1}>
            <i className="bi bi-dash-lg"></i>
          </button>
          <span className="qty-value inline-flex items-center justify-center font-medium text-outerspace">
            {cartItem.qty}
          </span>
          <button className="qty-inc-btn" onClick={() => handleInc(cartItem._id)}>
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </td>
      <td>
        <span className="cart-tbl-shipping uppercase text-silver font-bold">
          Free
        </span>
      </td>
      <td>
        <span className="text-lg font-bold text-outerspace">
          ${cartItem.description * cartItem.qty}
        </span>
      </td>
      <td>
        <div className="cart-tbl-actions flex justify-center">
          <button className="tbl-del-action text-red"  onClick={() => handleDelete(cartItem._id)}>
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </td>
    </CartTableRowWrapper>
  );
};

export default CartItem;

CartItem.propTypes = {
  cartItem: PropTypes.object,
};
