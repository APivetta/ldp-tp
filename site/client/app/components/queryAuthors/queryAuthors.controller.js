class QueryAuthorsController {
  constructor($scope, $mdToast, authorsAPI) {
    this.scope = $scope;
    this.mdToast = $mdToast;
    this.API = authorsAPI;
    this.form = {}
    this.searching = true;
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

  search() {
    if (!this.scope.authorsForm.$invalid) {
      if (this.form.publisher) {
        this.API.get({ publisher: this.form.publisher }, data => {
          this.authors = data;
          this.searching = false;
        }, error => {
          console.log(error);
          this.errorToast(error.message);
        });
      } else {
        this.API.getAll({}, data => {
          this.authors = data;
          this.searching = false;
        }, error => {
          console.log(error);
          this.errorToast(error.message);
        });
      }
    };
  }

}

export default ['$scope', '$mdToast', 'authorsAPI', QueryAuthorsController];
