import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, take } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../services/app.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  userData$: Observable<any>;

  constructor(public router: Router, private service: AppService) {}

  async ngOnInit() {
    const sessionToken = await this.service.getFromStorage("session_token");
    const storememberGuid = await this.service.getFromStorage(
      "storemember_guid"
    );

    console.log({ sessionToken, storememberGuid });
    setTimeout(() => {
      this.service.clearStorage();
    }, 5000);

    if (sessionToken) {
      this.userData$ = this.service
        .getUserData(sessionToken, storememberGuid)
        .pipe(
          map(
            (data: any) => {
              if (data === "error") {
                return;
              }
              console.log({ data });
              const minusProfile = { ...data.data[0] };
              delete minusProfile.profile;
              const profile = data.data[0].profile;
              return { minusProfile, profile };
            },
            catchError(() =>
              this.router.navigate(["login"]).catch()
            )
          )
        );
    } else {
      this.router.navigate(["login"]).catch();
    }
  }
}
