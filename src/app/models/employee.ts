export interface Employee {
    id?: number; // Optional as it might not be set when creating a new employee
    fullname: string;
    email: string;
    address: string;
    cin: string;
    accountNumber: string;
    socialSecurityNumber: string;
    dateOfBirth: string; // Use string to represent date in ISO format
    phoneNumber: string;
    studyNature: string;
    certifications: string;
    educationLevel: string;
    yearsOfExperience: number;
    contractType: string;
    baseSalary: number;
    salaryBenefits: string;
    contractStartDate: string; // Use string to represent date in ISO format
    department: string;
    position: string;
    supervisor: string;
    recommendation: boolean;
    collaborator: string;
    comment: string;
  }