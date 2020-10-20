import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginPage } from "./login.page";

import { LoginPageRoutingModule } from "./login-routing.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
