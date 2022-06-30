import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import * as Leaflet from 'leaflet';
import {User} from "../interface/user";
import {Coordinate} from "../interface/coordinate";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  /*response: Response;*/
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save changes'|'Edit' = 'Edit';
  marker = new Leaflet.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });
  user: User;

  constructor(private activatedRoute: ActivatedRoute, private _userService: UserService) {
  }

  ngOnInit(): void {
    this.user = <User>(this.activatedRoute.snapshot.data['resolvedResponse'].results[0]);
    console.log('user {}',this.user);
   /* this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      console.log('User ID :', params.get('uuid'))
      this.userService.getUser(+params.get('uuid')!)
        .subscribe((resultResponse: Response) => {
          console.log(resultResponse);
          this.response = resultResponse;
          this.user = resultResponse.results[0];
        })
    })*/
    this.loadMap(this.user.coordinate);
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

   private loadMap(coordinate: Coordinate): void{
      const map = Leaflet.map('map', {
        center: [coordinate.latitude, coordinate.longitude],
        zoom: 8
      });
      const mainLayer= Leaflet.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        maxZoom:30,
        crossOrigin: true,
        attribution: 'credit merci à LeafLet'
      });
      mainLayer.addTo(map);
     const marker = Leaflet.marker([coordinate.latitude, coordinate.longitude], { icon: this.marker });
     marker.addTo(map).bindPopup(`${this.user.firstName}'s Location`).openPopup();
   }


}
