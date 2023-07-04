// src/app/components/form.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Truck } from '../../models/truck';
import { User } from '../../models/user';
import { Schedule } from '../../models/shedule';
import { Maintenance } from '../../models/maintanence';


@Component({
  selector: 'app-form',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit {
  trucks: Truck[] = [];
  types: Maintenance[] = [];
  drivers: User[] = [];
  dispatchers: User[] = [];
  mechanics: User[] = [];
  dataSource: Schedule[] = [];
  
  selectedTruck = "";
  selectedMechanical = "";
  selectedDispatcher = "";
  selectedDriver = "";
  selectedType = "";
  selectedDueDate = "";

  displayedColumns: string[] = ['id', 'truck', 'type', 'driver', 'dispatcher', 'duedate', 'mechanic','actions'];
  

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTrucks();
    this.loadDriver();
    this.loadTypes();
    this.loadDispachers();
    this.loadMechanical();
    this.loadScheduler();
  }

  loadTrucks(): void {
    this.apiService.getAllTrucks().subscribe(
      (trucks: Truck[]) => {
        this.trucks = trucks;
      },
      (error: any) => {
        console.error('Error loading trucks', error);
      }
    );
  }

  loadDriver(): void {
    this.apiService.getAllDrivers().subscribe(
      (drivers: User[]) => {
        this.drivers = drivers;
      },
      (error: any) => {
        console.error('Error loading trucks', error);
      }
    );
  }

  loadTypes(): void {
    this.apiService.getAllMaintenance().subscribe(
      (type: Maintenance[]) => {
        this.types = type;
      },
      (error: any) => {
        console.error('Error loading trucks', error);
      }
    );
  }

  loadDispachers(): void {
    this.apiService.getAllDispatchers().subscribe(
      (user: User[]) => {
        this.dispatchers = user;
      },
      (error: any) => {
        console.error('Error loading trucks', error);
      }
    );
  }

  loadMechanical(): void {
    this.apiService.getAllMechanics().subscribe(
      (user: User[]) => {
        this.mechanics = user;
      },
      (error: any) => {
        console.error('Error loading trucks', error);
      }
    );
  }

  loadScheduler(): void {
    this.apiService.getAllScheduler().subscribe(
      (user: Schedule[]) => {
        this.dataSource = user;
      },
      (error: any) => {
        console.error('Error loading trucks', error);
      }
    );
  }

  submitForm(): void {
    const formData = {
      Truck: this.selectedTruck,
      Type: this.selectedType,
      Driver: this.selectedDriver,
      Dispatcher: this.selectedDispatcher,
      Duedate: this.formatDate(this.selectedDueDate),
      Mechanic: this.selectedMechanical
      
    };

    console.log(formData);
    console.log(formData.Duedate);
    this.apiService.saveSchedulet(formData).subscribe(
      (response: any) => {
        console.log('Form submitted successfully', response);
        this.loadScheduler();
      },
      (error: any) => {
        console.error('Error submitting form', error);
      }
    );
  }

  cleanForm(): void {
      this.selectedTruck = "";
      this.selectedMechanical = "";
      this.selectedDispatcher = "";
      this.selectedDriver = "";
      this.selectedType = "";
      this.selectedDueDate = "";
  }

  formatDate(duedate: any):string{
    const jsDate: Date = new Date(duedate);
    const year: number = jsDate.getFullYear();
    const month: string = ('0' + (jsDate.getMonth() + 1)).slice(-2); 
    const day: string = ('0' + jsDate.getDate()).slice(-2); 

    const sqlDate: string = `${year}-${month}-${day}`;
    return sqlDate
  }

}
