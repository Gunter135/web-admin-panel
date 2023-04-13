package com.example.flowersadminpanel.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;
import java.util.List;

@Document(collection = "Shipment")
public class Shipment {

    @Id
    private String id;
    private String date_of_arrival;
    private int total_price;
    private int amount_of_items;
    private String code;
    private boolean status;
    private String provider_id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate_of_arrival() {
        return date_of_arrival;
    }

    public void setDate_of_arrival(String date_of_arrival) {
        this.date_of_arrival = date_of_arrival;
    }

    public int getTotal_price() {
        return total_price;
    }

    public void setTotal_price(int total_price) {
        this.total_price = total_price;
    }

    public int getAmount_of_items() {
        return amount_of_items;
    }

    public void setAmount_of_items(int amount_of_items) {
        this.amount_of_items = amount_of_items;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getProvider_id() {
        return provider_id;
    }

    public void setProvider_id(String provider_id) {
        this.provider_id = provider_id;
    }
}
