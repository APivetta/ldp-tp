class ModifyBooksController {
  constructor($scope, $mdToast, booksAPI, $state) {
    this.state = $state;
    this.scope = $scope;
    this.mdToast = $mdToast;
    this.API = booksAPI;
    this.searching = true;
    this.creating = false;
    this.form = {};
  }

  errorToast(text) {
    const toast = {
      template: `<md-toast class="md-capsule">
          <div class="md-toast-content">
            <i class="material-icons">report_problem</i> 
            <span>${text}</span>
          </div>
        </md-toast>`,
      toastClass: 'error-toast'
    }
    this.mdToast.show(toast);
  }

  successToast(text) {
    const toast = {
      template: `<md-toast class="md-capsule">
          <div class="md-toast-content">
            <i class="material-icons">done</i> 
            <span>${text}</span>
          </div>
        </md-toast>`,
      toastClass: 'success-toast'
    }
    this.mdToast.show(toast);
  }

  showCreate() {
    this.searching = false;
    this.creating = true;
  }

  create() {
    if (!this.scope.booksForm.$invalid) {
      const postData = {
        ISBN: this.form.isbn,
        title: this.form.title,
        authors: String(this.form.authors).split(/\s*,\s*/),
        pageCount: this.form.pageCount,
        year: this.form.year,
        publisher: this.form.publisher,
        genre: this.form.genre
      }
      this.API.create({}, postData, response => {
        this.successToast('Libro Creado');
        this.state.reload();
      }, error => {
        this.errorToast(error.data.message);
        this.state.reload();
      });
    };
  }

  modify() {
    if (!this.scope.booksForm.$invalid) {
      const postData = {
        title: this.form.title,
        authors: String(this.form.authors).split(/\s*,\s*/),
        pageCount: this.form.pageCount,
        year: this.form.year,
        publisher: this.form.publisher,
        genre: this.form.genre
      }
      this.API.update({ isbn: this.form.isbn }, postData, response => {
        this.successToast('Libro Actualizado');
        this.state.reload();
      }, error => {
        this.errorToast(error.message);
        this.state.reload();
      });
    };
  }

  deleteAll() {
    this.API.deleteAll({}, {}, response => {
      this.successToast('Todos los libros fueron borrados');
    }, error => {
      this.errorToast(error.message);
    });
  }

  deleteOne() {
    this.API.delete({ isbn: this.form.isbn }, {}, response => {
      this.successToast('El libro ' + this.form.title + ' fue eliminado');
      this.state.reload();
    }, error => {
      this.errorToast(error.message);
      this.state.reload();
    });
  }

  pick() {
    if (!this.scope.pickBook.$invalid) {
      this.API.get({ isbn: this.form.isbn }, data => {
        if (!data.ISBN) {
          this.errorToast('EL libro buscado no existe');
        } else {
          Object.assign(this.form, data);
          this.searching = false;
        }
      }, error => {
        console.log(error);
        this.errorToast(error.message);
      });
    };
  }
}

export default ['$scope', '$mdToast', 'booksAPI', '$state', ModifyBooksController];
