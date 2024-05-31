// import { Routes } from '@angular/router';
// import { EmployeeComponent } from './pages/employee/employee.component';
// import {VehicleInfoComponent} from './pages/vehicle-info/vehicle-info.component';
// import { OilchangehistoryComponent } from './pages/oilchangehistory/oilchangehistory.component';

// export const routes: Routes = [
//     { path: '', component: EmployeeComponent },
//     {
//         path: 'Vehicle-info',
//         component: VehicleInfoComponent,
//       },
//       {
//         path: 'oilchangehistory',
//         component: OilchangehistoryComponent,
//       },

// ];

import { Routes } from '@angular/router';
import { EmployeeComponent } from './pages/employee/employee.component';
import { VehicleInfoComponent } from './pages/vehicle-info/vehicle-info.component';
import { OilchangehistoryComponent } from './pages/oilchangehistory/oilchangehistory.component';
export const routes: Routes = [
{ path: '', component: EmployeeComponent },
{ path: 'Vehicle-info', component: VehicleInfoComponent },
{ path: 'oilchangehistory', component: OilchangehistoryComponent },
];
