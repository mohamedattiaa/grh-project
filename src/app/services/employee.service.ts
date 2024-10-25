import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'app/models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = [];

  private baseUrl = 'http://localhost:8080/employees';
  constructor(private http: HttpClient) { }
/*
  // Get a specific employee by ID
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }
*/
/*
getEmployee(email:string){
  return this.http.get('http://localhost:8080/employees/${email}/user-profile/:id');
}*/
  // Get all employees
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  // Create a new employee
  createEmployee(employee: Employee): Observable<string> {
    return this.http.post<string>(this.baseUrl, employee, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Update an existing employee
  updateEmployee(id: number, employee: Employee): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}`, employee, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
 /*
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`http://localhost:8080/employees/${id}`, employee);
}
*/

  // Delete an employee by ID
  deleteEmployee(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }

  // Upload files for an employee
  uploadFiles(employee: Employee, files: File[]): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('employee', JSON.stringify(employee));

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }

    return this.http.post<string>(`${this.baseUrl}/upload`, formData);
  }
  // employee.service.ts

getEmployeeCount(): Observable<number> {
  return this.http.get<number>('http://localhost:8080/employees/count');
}
deleteEmployeeByEmail(email: string): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/employees/email/${email}`);
}
getEmployeeByEmail(email: string): Observable<Employee> {
  return this.http.get<Employee>(`${this.baseUrl}/email/${email}`);
}

// Update an employee by email
updateEmployeeByEmail(email: string, employee: Employee): Observable<any> {
  return this.http.put(`${this.baseUrl}/email/${email}`, employee);
}
getEmployee(id: number): Observable<Employee> {
  return this.http.get<Employee>(`${this.baseUrl}/employees/${id}`);
}
getEmployeeByCIN(cin: string): Observable<Employee> {
  return this.http.get<Employee>(`http://localhost:8080/employees/cin/${cin}`);
}
EmployeeByCIN(cin: string): Observable<Employee> {
  return this.http.get<Employee>(`${this.baseUrl}/cin/${cin}`);
}

// Existing methods
updateEmployeeByCIN(cin: string, employee: Employee): Observable<any> {
  return this.http.put(`${this.baseUrl}/cin/${cin}`, employee);
}
 // Method to find an employee by CIN
 getEmployeeByCin(cin: string): Observable<Employee> {
  return this.http.get<Employee>(`${this.baseUrl}/cin/${cin}`);
}

// Method to update an employee by CIN
updateEmployeeByCin(cin: string, employee: Employee): Observable<Employee> {
  return this.http.put<Employee>(`${this.baseUrl}/cin/${cin}`, employee);
}

}


