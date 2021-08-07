import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  message = '';
  messages = [];
  currentUser = '';

  constructor(private socket: Socket, private toastCtrl: ToastController) {}
  
  ngOnInit(){
    this.socket.connect();  

    let name = `user-${new Date().getTime()}`;
    this.currentUser = name;
    //this.currentUser = 'shaharil';
    this.socket.emit('set-name', this.currentUser);
    this.socket.fromEvent('users-changed').subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
        console.log('User joined: ' + user);
        
      }
    });
    this.socket.fromEvent('message').subscribe(message => {
      this.messages.push(message);
    });
  }
  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  sendMessage() {
    this.socket.emit('send-message', { text: this.message });
    this.message = '';
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
  


  

}
