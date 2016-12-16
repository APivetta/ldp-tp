import QueryBooksModule from './queryBooks'
import QueryBooksController from './queryBooks.controller';
import QueryBooksComponent from './queryBooks.component';
import QueryBooksTemplate from './queryBooks.html';

describe('QueryBooks', () => {
  let $rootScope, makeController;

  beforeEach(window.module(QueryBooksModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new QueryBooksController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(QueryBooksTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = QueryBooksComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(QueryBooksTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(QueryBooksController);
      });
  });
});
