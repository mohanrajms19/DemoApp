// package customer.demoapp.employee;


// import customer.demoapp.employee.Employee;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    
// }


package customer.demoapp.employee;

// import customer.demoapp.employee.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
