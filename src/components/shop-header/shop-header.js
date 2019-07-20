import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import './shop-header.css';

const ShopHeader = ({ numItems, total }) => {
  return (
    <header className="shop-header row">
      <Link className="logo text-dark" to="/">ReStore</Link>
      <Link className="shopping-cart" to="/cart">
        <i className="cart-icon fa fa-shopping-cart" />
        {numItems} items (${total})
      </Link>
    </header>
  );
};

/* Получает state из redux store и возвращает значения из него,
которые должен получить компонент */
const mapStateToProps = ({ shoppingCart: {orderTotal, numItems} }) => {
  return {
    total: orderTotal,
    numItems
  };
}

//Connect интегрирует компонент с redux store
export default connect(mapStateToProps)(ShopHeader);