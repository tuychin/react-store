/* 
Reducer - это функция, которая возвращает новый state
в зависимости от Action (действия)

Заменяет setState
Обновляет глобальный state в зависимости от actions
*/

import updateBookList from './book-list';
import updateShoppingCart from './shopping-cart';

const reducer = (state, action) => {

  return {
    bookList: updateBookList(state, action),
    shoppingCart: updateShoppingCart(state, action)
  }
}

export default reducer;

/*
Структура глобального state:

state = {
  bookList: {
    cartItems: [],
    orderTotal: 0
  }

  shoppingCart: {
    books: [],
    loading: true,
    error: null
  }
}

*/