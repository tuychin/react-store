/*
Обновляет часть глобального state
*/

//Функция добавляет, обновляет или удаляет элементы массива
const updateCartItems = (cartItems, item, idx) => {

  //Элемент удалится из массива при выполнении условия
  if (item.count === 0) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ]
  }
  
  //Элемент добавится в массив при выполнении условия
  if (idx === -1) {
    return [
      ...cartItems,
      item
    ];
  }

  //Существующий элемент обновится в массиве при выполнении условия
  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ]
}

//Функция обновляет элемент
const updateCartItem = (book, item = {}, quantity) => {

  const {
    id = book.id,
    title = book.title,
    count = 0,
    total = 0 } = item;

  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price
  }
}

//Функция обновляет список
const updateOrder = (state, bookId, quantity) => {
  const { bookList: { books }, shoppingCart: {cartItems, orderTotal, numItems} } = state;
  const book = books.find(({id}) => id === bookId);
  const itemIndex = cartItems.findIndex(({id}) => id === bookId);
  const item = cartItems[itemIndex];
  const newItem = updateCartItem(book, item, quantity);

  /* Изначально возвращает пустой массив,
  при каждом действии обновляет его */
  return {
    orderTotal: orderTotal + quantity * book.price,
    cartItems: updateCartItems(cartItems, newItem, itemIndex),
    numItems: numItems + quantity
  };
}

const updateShoppingCart = (state, action) => {

  if (state === undefined) {
    return {
      cartItems: [],
      orderTotal: 0,
      numItems: 0
    }
  }

  switch (action.type) {
    case 'BOOK_ADDED_TO_CART':
      return updateOrder(state, action.payload, 1);

    case 'BOOK_REMOVED_FROM_CART':
      return updateOrder(state, action.payload, -1);
      
    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload);
      return updateOrder(state, action.payload, - item.count);

    default:
      return state.shoppingCart;
  }
}

export default updateShoppingCart;