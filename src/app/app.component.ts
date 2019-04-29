import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';


import { SingletonProvider } from '../providers/singleton/singleton';
import { Theme } from '../providers/singleton/theme';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  themesList: Theme[] = [
    Theme.TEMA1,
    Theme.TEMA2,
    Theme.DEFAULT
  ]
  theme: any ;

  constructor(private themes: SingletonProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    this.themes.getCustomCss().subscribe( customCss=> {
      document.querySelector("#custom-css").innerHTML = customCss;
      console.log("querySelector", document.querySelector("#custom-css") )
    });
    
    let ionApp = <HTMLElement> document.querySelector("ion-app");
    this.temaCustomizado.getTheme().subscribe(theme => {
      if( RegExp("theme-").test(ionApp.className) ){
        ionApp.className = ionApp.className.replace(/theme-(.+)/, "theme-"+ theme);
      }else{
        ionApp.className += " theme-"+ theme;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  changeTheme(theme: Theme){
    this.themes.setTheme(theme);
  }
}
