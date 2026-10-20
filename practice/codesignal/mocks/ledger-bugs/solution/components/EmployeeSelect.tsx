import type { Employee } from "../api";

interface EmployeeSelectProps {
  employees: Employee[];
  isLoading: boolean;
  value: string;
  onChange: (employeeId: string) => void;
}

export function EmployeeSelect({ employees, isLoading, value, onChange }: EmployeeSelectProps) {
  if (isLoading) {
    return (
      <select data-testid="employee-filter" disabled>
        <option>Loading employees...</option>
      </select>
    );
  }

  return (
    <select data-testid="employee-filter" value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">All employees</option>
      {employees.map((employee) => (
        <option key={employee.id} value={employee.id}>
          {employee.firstName} {employee.lastName}
        </option>
      ))}
    </select>
  );
}
