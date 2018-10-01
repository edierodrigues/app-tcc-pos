import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // atividades listadas na pagina home
  public rows = [
    { atividades: 'Avaliação I', nota: '9.2/10.0'},
    { atividades: 'Avaliação II', nota: '15.3/20.0'},
    { atividades: 'Avaliação III', nota: '13.8/15.0'},
    { atividades: 'Trabalho I', nota: '4.1/5.0'},
    { atividades: 'Trabalho II', nota: '2.7/3.0'}
  ];
  public columns = [
    { name:'Atividades'},
    { name: 'Nota' }
  ];

  constructor(
    public navCtrl: NavController,
    public authService: AuthProvider,
    public alertCtrl: AlertController
  ) {
  }

  /**
   * metodo executado antes de carregar a pagina,
   * verificando se usuario esta logado
  */
  ionViewCanEnter() {
    return this.authService.userIsLogged();
  }

  /**
   * encerra sessao do usuario no web service e redireciona para pagina de login
   */
  logout() {
    let authService = this.authService;
    let navCtrl     = this.navCtrl;
    const confirm = this.alertCtrl.create({
      title: 'Voçê tem Certeza?',
      message: 'Você está prestes a sair do aplicativo, tem certeza?',
      buttons: [
        { text: 'Não', handler: () => {} },
        { text: 'Sim', handler: () => {
          authService.logout().then(function (deslogado) {
            if (deslogado) {
              navCtrl.setRoot(LoginPage);
            }
          }); 
        }}
      ]
    });
    confirm.present();
  }

}
