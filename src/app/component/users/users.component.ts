import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Response} from "../interface/response";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

 response: Response;

  constructor( private userService : UserService) { }

  ngOnInit(): void {
   this.userService.getUsers(10).subscribe((results: any) => {
     console.log('users are {}', results);
     this.response = results;
   });
  }



}
