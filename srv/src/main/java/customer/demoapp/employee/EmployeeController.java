// package customer.demoapp.employee;

// import customer.demoapp.employee.Employee;
// import customer.demoapp.employee.EmployeeService;
// import org.springframework.beans.factory.annotation.Autowired;
//  import org.springframework.http.HttpStatus;
//  import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @SuppressWarnings("unused")
// @RestController
// @RequestMapping("/employees")
// //@CrossOrigin(origins = "*") // Allow frontend to access the backend
// public class EmployeeController {

//     @Autowired
//     EmployeeService employeeService;

//     @GetMapping
//     public List<Employee> getAllEmployees() {
//         return employeeService.getAllEmployees();
//     }

//     @GetMapping("/{id}")
//     public Optional<Employee> getEmployeeById(@PathVariable Long employeeId) {
//         return employeeService.getEmployeeById(employeeId);
//     }

//     @PostMapping
//     public Employee addEmployee(@RequestBody Employee employee) {
//         return employeeService.addEmployee(employee);
//     }

//     @DeleteMapping("/{id}")
//     public void deleteEmployee(@PathVariable Long id) {
//         employeeService.deleteEmployee(id);
//     }
// }


package customer.demoapp.employee;

//  import customer.demoapp.employee.Employee;
//  import customer.demoapp.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")  // Allow frontend (UI5) to access API
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
        // return Arrays.asList("Employee1", "Employee2");
    }

    @GetMapping("/{id}")
    public Optional<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }
}
