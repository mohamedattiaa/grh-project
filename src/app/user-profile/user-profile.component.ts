import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'app/models/employee';
import { EmployeeService } from 'app/services/employee.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileForm: FormGroup;
  employee: Employee;
  employeeEmail: string;

  // Statuses for UI changes
  status1: boolean = false;
  status2: boolean = false;
  statusCIN: boolean = false;
  statusDiplome: boolean = false;
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService,
    private router: Router, 
    private route: ActivatedRoute) {}

  ngOnInit() {
    // Initialize the form
    this.initializeForm();

    // Subscribe to the route to get the employee email from the URL
    this.route.paramMap.subscribe(params => {
      const email = params.get('email');
      if (email) {
        this.employeeEmail = email;
        this.getEmployeeByEmail(email); // Load the employee data by email
      }
    });
      // Get the email from query params and log it
  this.route.queryParams.subscribe(params => {
    const email = params['email'];
    console.log('Received email from route params:', email); // Add this log to check email
    if (email) {
      this.getEmployeeByEmail(email);
    }
  });

   // this.getAllEmployees();
/*
    this.employeeService.getEmployee(this.employeeEmail).subscribe((res : any) => {
      console.log(res)
      this.employee = res.employee

  });*/
}
  // Initialize the form with default or empty values
  initializeForm() {
    this.profileForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl(''),
      cin: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
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
      comment: new FormControl('')
    });
  }

  // Fetch all employees
  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log('All employees fetched from backend:', data);
    });
  }

  // Fetch employee by email
  getEmployeeByEmail(email: string): void {
    this.employeeService.getEmployeeByEmail(email).subscribe((data: Employee) => {
      this.profileForm.patchValue(data); // Populate the form with employee data
      this.employee = data; // Store the employee data
      console.log('Employee fetched by email:', data);
    });
  }

  // Submit form to create or update employee
  onSubmit(): void {
    if (this.profileForm.valid) {
      const employeeToUpdate: Employee = this.profileForm.getRawValue(); // Get form values

      // If an employee exists, update; otherwise, create new
      if (this.employeeEmail) {
        this.employeeService.updateEmployee(this.employee.id, employeeToUpdate).subscribe(() => {
          console.log('Employee updated successfully');
          alert('Employee updated successfully!');
        });
      } else {
        this.employeeService.createEmployee(employeeToUpdate).subscribe(() => {
          console.log('Employee created successfully');
          alert('Employee created successfully!');
          this.getAllEmployees(); // Refresh the employee list
        });
      }
    }
  }

  // Handle file selection and validation
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB in bytes
        alert('File size exceeds 4MB. Please choose a smaller file.');
        return;
      }

      const files: FileList = event.target.files;
      if (files.length > 0) {
        const selectedFiles: File[] = Array.from(files);
        this.uploadFiles(selectedFiles);
      }

      console.log('Selected file:', file);
    }
  }

  // Upload files associated with the employee
  uploadFiles(files: File[]): void {
    const updatedEmployee: Employee = this.profileForm.value;
    this.employeeService.uploadFiles(updatedEmployee, files).subscribe((response: string) => {
      console.log('Files uploaded successfully:', response);
    });
  }
  loadEmployeeData(email: string): void {
    this.employeeService.getEmployeeByEmail(email).subscribe((employee: Employee) => {
      if (employee) {
        this.profileForm.setValue({
          fullname: employee.fullname || '',
          email: employee.email || '',
          address: employee.address || '',
          cin: employee.cin || '',
          accountNumber: employee.accountNumber || '',
          socialSecurityNumber: employee.socialSecurityNumber || '',
          dateOfBirth: employee.dateOfBirth || '',
          phoneNumber: employee.phoneNumber || '',
          studyNature: employee.studyNature || '',
          certifications: employee.certifications || '',
          educationLevel: employee.educationLevel || '',
          yearsOfExperience: employee.yearsOfExperience || 0,
          contractType: employee.contractType || '',
          baseSalary: employee.baseSalary || 0,
          salaryBenefits: employee.salaryBenefits || '',
          contractStartDate: employee.contractStartDate || '',
          department: employee.department || '',
          position: employee.position || '',
          supervisor: employee.supervisor || '',
          recommendation: employee.recommendation || false,
          collaborator: employee.collaborator || '',
          comment: employee.comment || ''
        });
      }
    });
  }
}
