import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee';
import { EmployeeService } from 'app/services/employee.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  employees: Employee[] = [];
  employeeCount: number = 0;
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.fetchAllEmployees();
  }

  fetchAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log('All employees fetched:', data);
    });
  }

  editEmployee(id: number, employee: Employee): void {
    this.employeeService.updateEmployee(id, employee).subscribe(() => {
      // Once updated, navigate to the edit profile page
      this.router.navigate(['/user-profile', id]);
    });
  }
 

    deleteEmployee(id: number): void {
        this.employeeService.deleteEmployee(id).subscribe(data=>{
          this.fetchAllEmployees();
        })
    
    }
   
  }
