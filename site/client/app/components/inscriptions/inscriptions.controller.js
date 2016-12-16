class InscriptionsController {
  constructor($scope, $state, $stateParams, $mdToast, championshipsFactory, inscriptionsAPI) {
    this.scope = $scope;
    this.state = $state;
    this.mdToast = $mdToast;
    this.API = inscriptionsAPI;
    this.championship = championshipsFactory.get($stateParams.championshipId) || {};
    this.boatClasses = [{
      name: 'Laser',
      crew: 1
    }, {
      name: 'Optimist',
      crew: 1
    }, {
      name: '29er',
      crew: 2
    }]

    this.patterns = {
      boatNumber: '^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ]{1,15}$', //alfanumerico de 15 
      name: '^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,40}$', //Alfa de 40 con espacios
    }

    this.validateChampionship();
    this.resetForm();
  }

  validateChampionship() {
    if (this.championship.id === undefined) {
      //rechaza inscribirse a campeonatos inexistentes
      this.errorToast('El campeonato no existe.');
      this.state.go('app.championships');
    } else if (!this.championship.enabled) {
      //rechaza inscribirse a campeonatos no habilitados
      this.errorToast('Aún no está habilitada la inscripción a este campeonato.');
      this.state.go('app.championships');
    }
  }

  resetForm() {
    this.form = {};
    this.form.championship = this.championship.name;
    if (this.scope.inscription) {
      this.scope.inscription.$setPristine();
      this.scope.inscription.$setUntouched();
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

  save() {
    if (!this.scope.inscription.$invalid) {
      const params = {
        IdCampeonato: this.form.championship,
        Nombre: this.form.firstName,
        Apellido: this.form.lastName,
        ClaseBarco: this.form.boatClass,
        NumeroVela: this.form.boatNumber
      }
      console.log(params);
      this.API.save(params, data => {
        this.successToast('Inscripción realizada.');
        this.state.go('app.home');
      }, error => {
        this.errorToast('La relación Clase de barco - Numero de vela ya existe para el campeonato seleccionado.');
      });
    };
  }
}

export default ['$scope', '$state', '$stateParams', '$mdToast', 'championshipsFactory', 'inscriptionsAPI', InscriptionsController];
