import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, take, tap } from "rxjs/operators";
import { of, throwError } from "rxjs";
import { Plugins } from "@capacitor/core";
import { Router } from "@angular/router";

const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class AppService {
  loggedIn: boolean;
  constructor(private http: HttpClient, private router: Router) {}

  login(username, password) {
    return this.http
      .post(
        "https://huaweiincentives.foneworx.co.za/productincentive/rest/v1/login",
        {
          username,
          password,
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
        tap((x: any) => {
          this.loggedIn = true;
          this.set("session_token", x.session_token);
          this.set("storemember_guid", x.storemember_guid);
        }),
        catchError((err) => {
          console.log("Handling error locally ...", err);
          return of(err);
        })
      );
  }

  getUserData(sessionToken: string, guid: string) {
    return this.http
      .get(
        "https://huaweiincentives.foneworx.co.za/productincentive/rest/v1/storemember/" +
          guid,
        {
          // params: { storemember_guid: guid },
          headers: {
            "Api-Key":
              "f122491c88101ce047e40b760300ac33076344b6df36d93686918f60",
            "Session-Token": sessionToken,
          },
        }
      )
      .pipe(
        take(1),
        catchError((err) => {
          console.log("Handling error locally ...", err);
          this.router.navigate(["login"]).catch();
          return of("error");
        })
      );
  }

  async set(key: string, value: any): Promise<void> {
    await Storage.set({
      key,
      value: JSON.stringify(value),
    });
  }

  async getFromStorage(key: string): Promise<any> {
    const item = await Storage.get({ key });
    return JSON.parse(item.value);
  }

  clearStorage() {
    Storage.clear().catch();
  }
}
