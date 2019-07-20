/*
Позволит передать сервис всем компонентам через context API
*/

import React from 'react';

const {
  Provider: BookstoreServiceProvider,
  Consumer: BookstoreServiceConsumer
} = React.createContext();

export {
  BookstoreServiceProvider,
  BookstoreServiceConsumer
}