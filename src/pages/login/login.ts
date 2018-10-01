import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  // recebe as informacoes fornecidas pelo usuario
  private credential: Object = {
    aluno_email: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthProvider,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
  }

  /**
   * metodo de login,
   * caso credenciais sejam validadas pelo web service redireciona para pagina home
   * em caso de falha exibe mensagem de erro
   */
  login() {
    const loading = this.loadingCtrl.create({
      content: "Aguarde, Acessando Sistema",
      duration: 3000
    });
    let autenticando = this.loadingCtrl.create({content: 'Autenticando...'});
    const alertFalhaAutenticacao = this.alertCtrl.create({
      title: 'Falha durante autenticação!',
      subTitle: 'Não foi possível logar com as informações fornecidas, verifique-as e tente novamente!',
      buttons: ['OK']
    });
    const toastUserLogado = this.toastCtrl.create({
      position: 'top',
      message: 'Usuário Logado!',
      duration: 3000
    });
    let navCtrl = this.navCtrl;
    autenticando.present();
    this.authService.login(this.credential)
    .then(() => {
      autenticando.dismiss();
      this.authService.userIsLogged()
      .then(function (logado) {
        if (logado) {
          loading.present();
          setTimeout(() => {
            navCtrl.setRoot(HomePage);
            toastUserLogado.present();
          }, 3000);
        }
      });
    }, () => { alertFalhaAutenticacao.present(); autenticando.dismiss();});
  }

}
