class QueryBooksController {
  constructor($scope, $mdToast, booksAPI) {
    this.scope = $scope;
    this.mdToast = $mdToast;
    this.API = booksAPI;
    this.form = {
      exactTitle: true,
      exactAuthor: true
    }
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

  formQuery() {
    let query = {};

    if (this.form.title && this.form.exactTitle) { query.title = this.form.title; }
    if (this.form.title && !this.form.exactTitle) { query.titlePattern = this.form.title; }
    if (this.form.author && this.form.exactAuthor) { query.authors = this.form.author; }
    if (this.form.author && !this.form.exactAuthor) { query.authorsPattern = this.form.author; }
    if (this.form.isbn) { query.ISBN = this.form.isbn; }
    if (this.form.genre) { query.genre = this.form.genre; }
    if (this.form.publisher) { query.publisher = this.form.publisher; }
    if (this.form.year) { query.year = this.form.year; }
    if (this.form.pageCount) { query.pageCount = this.form.pageCount; }

    //rango de años
    if (!this.form.year) {
      if (this.form.yearFrom) { query.yearFrom = this.form.yearFrom; }
      if (this.form.yearTo) { query.yearTo = this.form.yearTo; }
    }

    return query;
  }

  search() {
    if (!this.scope.booksForm.$invalid) {
      const params = {}
      console.log(params);
      this.API.getAll(params, data => {
        console.log(data);
      }, error => {
        console.log(error);
        this.errorToast(error.message);
      });
    };
  }
}

export default ['$scope', '$mdToast', 'booksAPI', QueryBooksController];
