import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'app/services/employee.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  employeeForm: FormGroup;
  employeeCIN: string;  // Use this to hold the employee's CIN

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      cin: ['', Validators.required],
      accountNumber: ['', Validators.required],
      socialSecurityNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      studyNature: ['', Validators.required],
      certifications: [''],
      educationLevel: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      contractType: ['', Validators.required],
      baseSalary: ['', Validators.required],
      salaryBenefits: [''],
      contractStartDate: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      supervisor: [''],
      recommendation: [''],
      collaborator: [''],
      comment: ['']
    });
  }

  ngOnInit(): void {
    // Get the CIN from the route params
    this.employeeCIN = this.route.snapshot.paramMap.get('cin')!;
    this.getEmployeeDetailsByCIN();
  }

  // Get employee details using CIN
  getEmployeeDetailsByCIN() {
    this.employeeService.getEmployeeByCIN(this.employeeCIN).subscribe((employee) => {
      this.employeeForm.patchValue(employee);
    });
  }

  // Update employee using CIN
  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.updateEmployeeByCIN(this.employeeCIN, this.employeeForm.value).subscribe(() => {
        this.router.navigate(['/typography']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/typography']);
  }
}
