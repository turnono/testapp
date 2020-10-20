import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, take } from "rxjs/operators";
import { of, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AppService } from "../services/app.service";

@Component({
  selector: "app-login",
  templateUrl: "login.page.html",
  styleUrls: ["login.page.scss"],
})
export class LoginPage implements OnInit {
  loading = false;
  loginForm: FormGroup;
  submitted: boolean;
  errorMessage: string;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private service: AppService
  ) {}

  ngOnInit() {
    this.service.clearStorage();
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;

      this.service
        .login(
          this.loginForm.get("username").value,
          this.loginForm.get("password").value
        )
        .subscribe((p: any) => {
          console.log({ p });
          this.loading = false;
          if (p.status === "ok") {
            this.router.navigate(["home"]).catch();
            this.errorMessage = undefined;
          } else {
            this.errorMessage = p.error.error_message;
          }

          // this.submitted = false;
        });

      // username: "8406065150089",

      // password: "password",
    }
  }
}
