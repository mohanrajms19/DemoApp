// package customer.demoapp.employee;

// import customer.demoapp.employee.Employee;
// import customer.demoapp.employee.EmployeeRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class EmployeeService {

//     @Autowired
//     EmployeeRepository employeeRepository;

//     public List<Employee> getAllEmployees() {
//        // return employeeRepository.findAll();
//        try {
//         return employeeRepository.findAll();
//     } catch (Exception ex) {
//         throw ex;
//     }
//     }

//     public Optional<Employee> getEmployeeById(Long employeeId) {
//         return employeeRepository.findById(employeeId);
//     }

//     public Employee addEmployee(Employee employee) {
//         return employeeRepository.save(employee);
//     }

//     public void deleteEmployee(Long id) {
//         employeeRepository.deleteById(id);
//     }
// }



package customer.demoapp.employee;

// import customer.demoapp.employee.Employee;
// import customer.demoapp.employee.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }
}
