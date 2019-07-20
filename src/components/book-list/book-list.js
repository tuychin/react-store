import React, { Component } from 'react';
//Интегрирует компонент с redux store
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';
import BookListItem from '../book-list-item';
import Loader from '../loader';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

/* Считается хорошей практикой делить компоненты на задачи:
Часть которая отвечает только за отображение (Презентационные компоненты) */
const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className="book-list row">
      {
        books.map((book) => {
          return (
            <li className="book-item card col-md-5" key={book.id}>
              <BookListItem book={book}
              onAddedToCart={() => onAddedToCart(book.id)} />
            </li>
          )
        })
      }
    </ul>
  );
}

/* Часть которая отвечает за логику (Компоненты-контейнеры)
В некоторых случаях, для компонентов-контейнеров0 создаётся отдельный файл
в папке components/containers */
class BookListContainer extends Component {

  componentDidMount() {
    //Вызов функции получения и обработки данных сервиса
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Loader />
    }

    if (error) {
      return <ErrorIndicator />
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />
  }
}

/* Получает state из redux store и возвращает значения из него,
которые должен получить компонент */
const mapStateToProps = ({ bookList: {books, loading, error} }) => {
  return { books, loading, error };
}

//Передаёт функции в props компонента для обновления state в redux store
const mapDispatchToProps = (dispatch, ownProps) => {
  
  //ownProps позволяет получить свойства компонентов стоящих выше по иерархии
  //в этом случае из withBookstoreService
  const { bookstoreService } = ownProps;

  return {
    //Возвращает функцию получения и обработки данных сервиса
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    
    onAddedToCart: (id) => dispatch(bookAddedToCart(id))
  }
}

export default compose(
  //withBookstoreService позволяет компоненту получить данные сервиса
  withBookstoreService(),
  //Connect интегрирует компонент с redux store
  connect(mapStateToProps, mapDispatchToProps)
  )(BookListContainer);