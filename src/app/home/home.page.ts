import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, take } from "rxjs/operators";
import { of, throwError } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  loading = false;
  loginForm: FormGroup;
  submitted: boolean;

  constructor(public fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.http
        .post(
          "https://huaweiincentives.foneworx.co.za/productincentive/rest/v1/login",
          {
            username: this.loginForm.get("username").value,
            password: this.loginForm.get("password").value,
          },
          {
            headers: new HttpHeaders().set(
              "Api-Key",
              "f122491c88101ce047e40b760300ac33076344b6df36d93686918f60"
            ),
          }
        )
        .pipe(
          take(1),
          catchError((err) => {
            console.log("Handling error locally and rethrowing it...", err);
            return throwError(err);
          })
        )
        .subscribe((p) => {
          console.log({ p });
          this.loading = false;
          // this.submitted = false;
        });

      // username: "8406065150089",
      // password: "password",
    }
  }
}
