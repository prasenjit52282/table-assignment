package com.example.demo.Controllers;

import com.example.demo.DB.DataService;
import com.example.demo.DB.employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("employee") //Resource
public class Controller1 {

    private DataService database;

    @Autowired
    public Controller1(DataService database) {
        this.database = database;
    }

    //Get Mappings
    @GetMapping("")
    public Iterable<employee> getAllEmployees(){
        return database.getAll();
    }

    @GetMapping("/{id}")
    public employee getOneEmployee(@PathVariable Long id){
        return database.getOne(id);
    }

    //Post Mappings
    @PostMapping("")
    public String addEmployee(@RequestBody employee emp){
        return database.insert(emp);
    }

    //Put Mappings
    @PutMapping("/{id}")
    public String UpdateEmployeeData(@PathVariable Long id, @RequestBody employee emp){
        return database.update(emp,id);
    }

    //Delete Mappings
    @DeleteMapping("/{id}")
    public String DeleteById(@PathVariable Long id){
        return database.delete(id);
    }

}
