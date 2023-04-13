package com.example.flowersadminpanel.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "CodeGen")
public class CodeGen {

    @Id
    private ObjectId id;
    private String string_part;
    private String int_part;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getString_part() {
        return string_part;
    }

    public void setString_part(String string_part) {
        this.string_part = string_part;
    }

    public String getInt_part() {
        return int_part;
    }

    public void setInt_part(String int_part) {
        this.int_part = int_part;
    }
}
