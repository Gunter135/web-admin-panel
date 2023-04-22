package com.example.flowersadminpanel.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Bouquet")
public class Bouquet {
    @Id
    private String id;
    private int price;
    private String name;
    private String date;
    private String code;
    private String image_id;
    private List<String> flowers;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getImage_id() {
        return image_id;
    }

    public void setImage_id(String image_id) {
        this.image_id = image_id;
    }

    public List<String> getFlowers() {
        return flowers;
    }

    public void setFlowers(List<String> flowers) {
        this.flowers = flowers;
    }
}
