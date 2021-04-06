import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals:Rental[]=[];
  dataLoaded=false;
  constructor(private rentService:RentalService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rentcarid"]){
        this.getRentalsById(params["rentcarid"])
      }
      else{
        this.getRentals()
      }
    })
  }
  getRentals(){
    this.rentService.getRents().subscribe((response)=>{
      this.rentals=response.data;
      this.dataLoaded=true;
    })
  }
  getRentalsById(rentcarid:number){
    this.rentService.getRentsById(rentcarid).subscribe((response)=>{
      this.rentals=response.data;
      this.dataLoaded=true;
    })
  }

}
