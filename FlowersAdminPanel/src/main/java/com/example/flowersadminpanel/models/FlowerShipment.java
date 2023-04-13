package com.example.flowersadminpanel.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.validation.ObjectError;

import java.util.List;

@Document(collection = "FlowerShipment")
public class FlowerShipment {

    @Id
    private String id;
    private String name;
    private int amount;
    private int purchase_price;
    private double total_price;
    private String code;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getPurchase_price() {
        return purchase_price;
    }

    public void setPurchase_price(int purchase_price) {
        this.purchase_price = purchase_price;
    }

    public double getTotal_price() {
        return total_price;
    }

    public void setTotal_price(double total_price) {
        this.total_price = total_price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
