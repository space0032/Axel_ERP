package com.axelerp.controller;

import com.axelerp.model.Attendance;
import com.axelerp.model.Employee;
import com.axelerp.model.Leave;
import com.axelerp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;
    
    // Employee endpoints
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }
    
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.createEmployee(employee));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employee));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok().build();
    }
    
    // Attendance endpoints
    @GetMapping("/{id}/attendance")
    public ResponseEntity<List<Attendance>> getEmployeeAttendance(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeAttendance(id));
    }
    
    @PostMapping("/attendance")
    public ResponseEntity<Attendance> markAttendance(@RequestBody Attendance attendance) {
        return ResponseEntity.ok(employeeService.markAttendance(attendance));
    }
    
    // Leave endpoints
    @GetMapping("/{id}/leaves")
    public ResponseEntity<List<Leave>> getEmployeeLeaves(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeLeaves(id));
    }
    
    @PostMapping("/leaves")
    public ResponseEntity<Leave> applyLeave(@RequestBody Leave leave) {
        return ResponseEntity.ok(employeeService.applyLeave(leave));
    }
    
    @PutMapping("/leaves/{id}/approve")
    public ResponseEntity<Leave> approveLeave(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return ResponseEntity.ok(employeeService.approveLeave(id, status));
    }
}
