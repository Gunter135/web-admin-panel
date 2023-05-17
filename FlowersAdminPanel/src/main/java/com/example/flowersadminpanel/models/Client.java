package com.example.flowersadminpanel.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Clients")
public class Client {

    @Id
    private String id;
    private String name;
    private String phone;
    private String email;
    private double avg_check;
    private double orders_price_sum;
    private int bonuses;
    private String bonusGroup;
    private String details;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public double getAvg_check() {
        return avg_check;
    }

    public void setAvg_check(double avg_check) {
        this.avg_check = avg_check;
    }

    public double getOrders_price_sum() {
        return orders_price_sum;
    }

    public void setOrders_price_sum(double orders_price_sum) {
        this.orders_price_sum = orders_price_sum;
    }

    public int getBonuses() {
        return bonuses;
    }

    public void setBonuses(int bonuses) {
        this.bonuses = bonuses;
    }

    public String getBonusGroup() {
        return bonusGroup;
    }

    public void setBonusGroup(String bonusGroup) {
        this.bonusGroup = bonusGroup;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
