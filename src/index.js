/* Импорт библиотек */
import React from 'react'
import ReactDOM from 'react-dom';
//Доступ компонентов к redux store
import { Provider } from 'react-redux';
//Роутинг страниц
import { BrowserRouter as Router } from 'react-router-dom'

//Импорт кастомных файлов
import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import BookstoreService from './services/bookstore-service';
import { BookstoreServiceProvider } from './components/bookstore-service-context';

import store from './store';

//Инициализация сервиса работы с API
const bookstoreService = new BookstoreService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BookstoreServiceProvider value={bookstoreService}>
        <Router>
          <App />
        </Router>
      </BookstoreServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);