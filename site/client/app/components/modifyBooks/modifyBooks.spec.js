import ModifyBooksModule from './modifyBooks'
import ModifyBooksController from './modifyBooks.controller';
import ModifyBooksComponent from './modifyBooks.component';
import ModifyBooksTemplate from './modifyBooks.html';

describe('ModifyBooks', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ModifyBooksModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ModifyBooksController();
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
      expect(ModifyBooksTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ModifyBooksComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ModifyBooksTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ModifyBooksController);
      });
  });
});
