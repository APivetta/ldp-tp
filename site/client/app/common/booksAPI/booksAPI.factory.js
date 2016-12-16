import config from './config.json';

const booksAPI = ($resource) => {
  /*
  	/api/books					GET			Lista todos los libros segun filtros
  	/api/books					POST		Crea un nuevo libro
  	/api/books					DELETE		Borra todos los libros
  	/api/books/:isbn			GET			Trae un libro
  	/api/books/:isbn			PUT			Actualiza un libro
  	/api/books/:isbn			DELETE		Borra un libro
  */
  const actions = {
    getAll: { method: 'GET', url: config.baseUrl, isArray:true },
    create: { method: 'POST', url: config.baseUrl },
    deleteAll: { method: 'DELETE', url: config.baseUrl},
    get: { method: 'GET', url: config.baseUrl + config.parameters },
    update: { method: 'PUT', url: config.baseUrl + config.parameters },
    delete: { method: 'DELETE', url: config.baseUrl + config.parameters }
  }

  return $resource(config.baseUrl, {}, actions, {});
}

export default ['$resource', booksAPI];
