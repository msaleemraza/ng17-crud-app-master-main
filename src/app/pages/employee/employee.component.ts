import { Component, OnInit, TrackByFunction } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../shared/models/Employee';
import { RouterModule } from '@angular/router';
import { Items } from '../shared/models/items';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ModelComponent, EmployeeFormComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  isModelOpen = false;
  employees: IEmployee[] = [];
  employee!: IEmployee;
  selectedItem: Items | null = null;
  itemsArray: Items[] = [];
trackById: TrackByFunction<IEmployee> | undefined;

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (response) => {
        if (response.data) {
          this.employees = response.data;
        }
      },
    });
  }

  loadEmployee(employee: IEmployee) {
    this.employee = employee;
    this.openModel();
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getAllEmployee();
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllEmployee();
  }

  handleSave(selectedItem: Items) {
    console.log('On Save event received:', selectedItem);
    this.selectedItem = selectedItem;
    this.itemsArray.push(this.selectedItem);
    this.isModelOpen = false;

  }
  deleteItems(id: string){
    console.log('Before deletion:', this.itemsArray);
    this.itemsArray = this.itemsArray.filter(item => item.Item_ID !== id);
    console.log('After deletion:', this.itemsArray);
    this.refreshItemsArray();
    
  }

  refreshItemsArray() {
    // This method ensures that the itemsArray is updated
    this.itemsArray = [...this.itemsArray];
    this.calculateTotal();
  }

  calculateTotal(): number {
    return this.itemsArray.reduce((total, item) => {
      const quantity = item.Quantity || 0;
      const rate = item.Rate || 0;
      const discount = item.Discount || 0;
      return total + (quantity * (rate - discount));
    }, 0);
  }
}
