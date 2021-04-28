package com.example.demo.DB;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataService {
    private dataBase db;

    @Autowired
    public DataService(dataBase db) {
        this.db = db;
    }

    //Create
    public String insert(employee emp){
        this.db.save(emp);
        return "Success";
    }

    //read all
    public Iterable<employee> getAll(){
        return this.db.findAll();
    }

    //read one
    public employee getOne(Long id){
        return this.db.findById(id).get();
    }

    //update
    public String update(employee emp, Long id){
        emp.setId(id);
        this.db.save(emp);
        return "Success";
    }

    //delete
    public String delete(Long id){
        this.db.deleteById(id);
        return "Success";
    }
}
