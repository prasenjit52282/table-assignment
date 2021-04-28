package com.example.demo.DB;

import javax.persistence.*;

@Table(name="EMPLOYEES")
@Entity
public class employee {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY) /* It will auto gen id for the sql file also */
    private Long id;
    private String name;
    private String position;
    private String salary;
    private String start_date;
    private String office;

    public employee() {
    }

    public employee(String name, String position, String salary, String start_date, String office) {
        this.name = name;
        this.position = position;
        this.salary = salary;
        this.start_date = start_date;
        this.office = office;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = office;
    }
}
