import { Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { KeyValuePair } from '../../models/keyValuePair';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  private readonly PAGE_SIZE = 3; 

  queryResult: any = {};
  makes: KeyValuePair[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { }
    
  ]

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {


    this.vehicleService.getMakes()
    .subscribe(makes => this.makes = makes);

    this.populateVehicles();
    
  }

  private populateVehicles(){
    this.vehicleService.getVehicles(this.query)
    .subscribe(result => this.queryResult = result);
  }

  onVehicleQueryChange(){
    this.query.page = 1;
    this.populateVehicles();
  }

  resetVehicleQuery(){
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  sortBy(columnName){
    if(this.query.sortBy === columnName){
      this.query.isSortAscending = !this.query.isSortAscending; 
    }else{
      this.query.sortBy = columnName;
      this.query.isSortAcending = true;
    }

    this.populateVehicles();
  }

  onPageChange(page){
    this.query.page = page;
    this.populateVehicles();
  }

}
