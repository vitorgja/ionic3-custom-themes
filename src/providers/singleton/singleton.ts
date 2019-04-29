import { Injectable } from '@angular/core';
import { Theme } from './theme';
// import { Observable, of } from 'rxjs/Observable';
import { Observable, BehaviorSubject } from 'rxjs';


import { HttpClient, HttpHeaders } from '@angular/common/http';
/*
  Generated class for the SingletonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SingletonProvider {
  private appTheme: BehaviorSubject<Theme>;
  private customCss: BehaviorSubject<string>;
  constructor(
    private http: HttpClient
  ) {
    console.log('Hello SingletonProvider Provider');
    this.appTheme = new BehaviorSubject<Theme>(Theme.DEFAULT);
    this.customCss = new BehaviorSubject<string>(null);

    this.http.get("/assets/css/mock.css", {
      responseType: 'text'
    }).subscribe(theme=>{
      console.log("css: ", theme);
      this.customCss.next(theme);
    })

  }

  public setTheme(theme: Theme): void {
    this.appTheme.next(theme);
  }
  getTheme(): Observable<Theme> {
    return this.appTheme.asObservable();
  }

  public getCustomCss(){
    return this.customCss.asObservable();
  }

}
