import config from './config.json';

const authorsAPI = ($resource) => {
  /*
    /api/authors              GET     Lista todos los autores
    /api/authors/:publisher   GET     Lista todos los autores de una editorial
  */
  const actions = {
    getAll: { method: 'GET', url: config.baseUrl },
    get: { method: 'GET', url: config.baseUrl + config.parameters }
  }

  return $resource(config.baseUrl, {}, actions, {});
}

export default ['$resource', authorsAPI];
