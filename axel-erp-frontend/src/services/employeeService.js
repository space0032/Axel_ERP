import api from './api';

const employeeService = {
  // Employees
  getAllEmployees: () => api.get('/employees'),
  getEmployeeById: (id) => api.get(`/employees/${id}`),
  createEmployee: (employee) => api.post('/employees', employee),
  updateEmployee: (id, employee) => api.put(`/employees/${id}`, employee),
  deleteEmployee: (id) => api.delete(`/employees/${id}`),

  // Attendance
  getEmployeeAttendance: (id) => api.get(`/employees/${id}/attendance`),
  markAttendance: (attendance) => api.post('/employees/attendance', attendance),

  // Leaves
  getEmployeeLeaves: (id) => api.get(`/employees/${id}/leaves`),
  applyLeave: (leave) => api.post('/employees/leaves', leave),
  approveLeave: (id, status) => api.put(`/employees/leaves/${id}/approve`, { status }),
};

export default employeeService;
