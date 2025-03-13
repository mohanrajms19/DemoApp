package customer.demoapp.employee;
import org.springframework.stereotype.Component;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Component
@Entity
@Getter
@Setter
@Table(name = "Employee")

public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EmployeeID")
    private Long employeeId;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "FirstName")
    private String firstName;

    @Column(name = "Address")
    private String address;

    @Column(name = "City")
    private String city;

    @Column(name = "Region")
    private String region;

    @Column(name = "PostalCode")
    private Long postalCode;

    @Column(name = "Country")
    private String country;

    @Column(name = "HomePhone")
    private String homePhone;
}
