import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee';
import { EmployeeService } from 'app/services/employee.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.fetchAllEmployees();
  }

  fetchAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  deleteEmployee(email: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployeeByEmail(email).subscribe(() => {
        this.employees = this.employees.filter(employee => employee.email !== email);
        alert('Employee deleted successfully');
      });
    }
  }
/*
  editEmployee(email: string): void {
    // Navigate to the user profile page using the employee's email
    this.router.navigate(['./icons'], { queryParams: { email } });
  }*/
    editEmployee(id : number): void {
      this.router.navigate(['./icons', {id}]); // Pass employee ID to IconsComponent
    }
  
  deleteEmployee2(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(data=>{
      this.fetchAllEmployees();
    })

}
}
