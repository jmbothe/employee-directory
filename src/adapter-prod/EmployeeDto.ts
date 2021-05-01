export interface EmployeeDto {
  id: string;
  name: string;
  species: string;
  location: {
    name?: string;
    type?: string;
  };
}
