/*
Actions Creator создаёт объекты action (действия)
Упрощает код
*/

const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  }
}

const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  }
}

const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  }
}

const bookAddedToCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId
  }
}

const bookRemovedFromCart = (bookId) => {
  return {
    type: 'BOOK_REMOVED_FROM_CART',
    payload: bookId
  }
}

const allBooksRemovedFromCart = (bookId) => {
  return {
    type: 'ALL_BOOKS_REMOVED_FROM_CART',
    payload: bookId
  }
}

//Получение и обработка данных сервиса
const fetchBooks = (bookstoreService, dispatch) => () => {
  //Отображает loader, пока не появятся данные
  dispatch(booksRequested());
  //Получает данные из сервиса
  bookstoreService.getBooks()
    //Передаёт данные в redux store
    .then((data) => dispatch(booksLoaded(data)))
    //Отображает ошибку, если сервис не работает
    .catch((err) => dispatch(booksError(err)));
}

export {
  fetchBooks,
  bookAddedToCart,
  bookRemovedFromCart,
  allBooksRemovedFromCart
}