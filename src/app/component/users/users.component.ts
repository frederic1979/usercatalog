import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {



  constructor( private userService : UserService) { }

  ngOnInit(): void {
   this.userService.getUsers(10).subscribe((results: any) => {
     console.log('users are {}', results);
   });
  }



}
