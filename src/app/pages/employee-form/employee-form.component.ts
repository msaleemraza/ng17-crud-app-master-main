import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IEmployee } from '../shared/models/Employee';
import { Items } from '../shared/models/items';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectSearchModule } from 'mat-select-search';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatSelectSearchModule,
    MatSelectModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnChanges, OnInit {
  @Input() data: IEmployee | null = null;
  @Output() onCloseModel = new EventEmitter();
  @Input() item: Items | null = null;
  @Output() onSave = new EventEmitter<Items>();
  originalItems: Record<string, string>[] = []; 
  isSearchEmpty: boolean = true;
  items: Items[] = [];
  selectedItemDetails: Items | null = null;
  employeeForm!: FormGroup;

  itemControl = new FormControl();
  searchControl = new FormControl();
  transformedItems: Record<string, string>[] = [];
  filteredItems: Record<string, string>[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.employeeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      doj: new FormControl('', [Validators.required]),
      quantity: new FormControl(1),
    });
  }

  ngOnInit() {
    this.getAllItems();
    this.searchControl.valueChanges.subscribe((value) => {
      this.isSearchEmpty = !value || value.trim() === ''; // Update the flag
      this.filteredItems = this.filterItems(value);
    });
  }

  ngOnChanges(): void {
    if (this.data) {
      this.employeeForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        mobile: this.data.mobile,
        dob: formatDate(this.data.dob, 'yyyy-MM-dd', 'en'),
        doj: this.data.doj,
       
      });
    }
  }

  getAllItems() {
    this.http
      .get<Items[]>('http://103.173.62.194/api/BillingApp/GetItemsList')
      .subscribe((data) => {
        this.items = data;
        this.transformedItems = data.map((item) => ({
          Item_ID: item.Item_ID,
          Item_Name: item.Item_Name,
          //Rate: item.Rate,
        }));
        this.filteredItems = [...this.transformedItems];
        this.originalItems = data.map((item) => ({
          Item_ID: item.Item_ID,
          Item_Name: item.Item_Name,
          //Rate: item.Rate,
        }));
      });
  }

  filterItems(value: string): Record<string, string>[] {
    if (this.isSearchEmpty) {
      return [...this.transformedItems]; // Display entire list if search input is empty
    }
    const filterValue = value.toLowerCase();
    return this.transformedItems.filter((item) =>
      item['Item_Name'].toLowerCase().includes(filterValue)
    );
  }

  getSelectedItemViewValue(): string {
    const selectedItem = this.items.find(
      (item) => item.Item_ID === this.itemControl.value
    );
    return selectedItem ? selectedItem.Item_Name : '';
  }

  onItemSelectionChange(event: any) {
    this.selectedItemDetails = this.items.find(item => item.Item_ID === event.value) || null;
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.data) {
        this.employeeService
          .updateEmployee(this.data._id as string, this.employeeForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetEmployeeForm();
              this.toastr.success(response.message);
            },
          });
      } else {
        this.employeeService.createEmployee(this.employeeForm.value).subscribe({
          next: (response: any) => {
            this.resetEmployeeForm();
            this.toastr.success(response.message);
          },
        });
      }
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  resetEmployeeForm() {
    this.employeeForm.reset();
    this.onClose();
  }

  sendSelectedItem() {
    if (this.selectedItemDetails) {
      const quantity = this.employeeForm.get('quantity')?.value;
      this.selectedItemDetails.Quantity = quantity;
      console.log('Selected Item Details:', this.selectedItemDetails);
      this.onSave.emit(this.selectedItemDetails);
    }
    this.onClose();
  }
}
