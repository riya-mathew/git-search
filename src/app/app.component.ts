import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  title = 'git-hub-viewer';
  userName: any;
  data: any;
  localData: any;
  errmsg = false;

  searching = false;
  search() {
this.localData = localStorage.getItem('this.username');
if (this.userName == this.localData) {
  return JSON.parse(localStorage.getItem('currentUser'));
} else {
    this.searching = true;
    this.errmsg = false;
    // tslint:disable-next-line: max-line-length
    this.http.get(' https://api.github.com/users/' + this.userName + '?access_token=4230a32869b6ed09bb256138b67dcd06916260bc').subscribe(response => {
      this.data = response;
      this.searching = false;
      this.errmsg = false;

      localStorage.setItem(this.userName, JSON.stringify(this.data));
      console.log(this.data);
    },
    err => {
      this.data = false;
      this.searching = false;
      this.errmsg = true;
      this.snackBar.open(err.error.message,'close', {
        duration: 2000,
        verticalPosition: 'top'
      });
   
    }
    );

  }


}
}
