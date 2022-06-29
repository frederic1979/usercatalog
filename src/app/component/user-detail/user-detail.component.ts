import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Response} from "../interface/response";
import {User} from "../interface/user";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  /*response: Response;*/
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save changes'|'Edit' = 'Edit';
  user: User;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = <User>(this.activatedRoute.snapshot.data['resolvedResponse'].results[0]);
   /* this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      console.log('User ID :', params.get('uuid'))
      this.userService.getUser(+params.get('uuid')!)
        .subscribe((resultResponse: Response) => {
          console.log(resultResponse);
          this.response = resultResponse;
          this.user = resultResponse.results[0];
        })
    })*/
  }

  changeMode(mode?: 'edit'|'locked'): void {
    if (mode === 'edit'){
      this.mode = 'locked';
      this.buttonText = 'Edit';
      /*Logic to save user*/
      console.log("Updating user in DB here");
    } else {
      this.mode = 'edit';
      this.buttonText = 'Save changes';
    }
   }


}
