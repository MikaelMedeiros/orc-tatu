import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/service/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  componentToShow: string = "welcome";

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params["code"] !== undefined) {
          this.authService.getToken(params["code"]).subscribe(result => {
            if (result === true) {
              this.componentToShow = "protected";
            } else {
              this.componentToShow = "welcome";
            }
          });
        }
      }
    );
  }
  
}
