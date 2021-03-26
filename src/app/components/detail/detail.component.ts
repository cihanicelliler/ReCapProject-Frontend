import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CarDetail } from 'src/app/models/carDetail';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private carDetailService: CarDetailService,private activatedRoute:ActivatedRoute) { }
  carDetails: CarDetail[] = [];
  dataLoaded=false;
  carImageBasePath="https://localhost:44309/";
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getCarDetailByCarId(params["id"])
    }})
    
  }

  
  getCarDetailByCarId(id:number){
    this.carDetailService.getCarDetailByCarId(id).subscribe((response)=>{
      this.carDetails=response.data;
      this.dataLoaded=true;
    })
  }
  
}
