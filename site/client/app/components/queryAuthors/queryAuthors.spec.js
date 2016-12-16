import QueryAuthorsModule from './queryAuthors'
import QueryAuthorsController from './queryAuthors.controller';
import QueryAuthorsComponent from './queryAuthors.component';
import QueryAuthorsTemplate from './queryAuthors.html';

describe('QueryAuthors', () => {
  let $rootScope, makeController;

  beforeEach(window.module(QueryAuthorsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new QueryAuthorsController();
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
      expect(QueryAuthorsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = QueryAuthorsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(QueryAuthorsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(QueryAuthorsController);
      });
  });
});
