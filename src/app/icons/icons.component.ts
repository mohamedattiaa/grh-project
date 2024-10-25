import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'app/models/employee';
import { EmployeeService } from 'app/services/employee.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  profileForm: FormGroup;
  employeeCIN: string;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializeForm();

    // Subscribe to the route to get the employee CIN from the URL
    this.route.paramMap.subscribe(params => {
      const cin = params.get('cin');
      if (cin) {
        this.employeeCIN = cin;
        this.getEmployeeByCIN(cin); // Load the employee data by CIN
      }
    });
  }

  initializeForm() {
    this.profileForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl(''),
      cin: new FormControl('', Validators.required),
      accountNumber: new FormControl(''),
      socialSecurityNumber: new FormControl(''),
      dateOfBirth: new FormControl(''),
      phoneNumber: new FormControl(''),
      studyNature: new FormControl(''),
      certifications: new FormControl(''),
      educationLevel: new FormControl(''),
      yearsOfExperience: new FormControl(0),
      contractType: new FormControl(''),
      baseSalary: new FormControl(0),
      salaryBenefits: new FormControl(''),
      contractStartDate: new FormControl(''),
      department: new FormControl(''),
      position: new FormControl(''),
      supervisor: new FormControl(''),
      recommendation: new FormControl(false),
      collaborator: new FormControl(''),
      comment: new FormControl(''),
    });
  }

  getEmployeeByCIN(cin: string): void {
    this.employeeService.getEmployeeByCIN(cin).subscribe(
      (data: Employee) => {
        this.profileForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }

  updateEmployee(): void {
    if (this.profileForm.valid) {
      const updatedEmployee: Employee = this.profileForm.value;

      this.employeeService.updateEmployeeByCIN(this.employeeCIN, updatedEmployee).subscribe(
        () => {
          console.log('Employee updated successfully!');
          this.router.navigate(['./typography']); // Redirect to a relevant path after update
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
