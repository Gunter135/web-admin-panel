package com.example.flowersadminpanel.dto;

import org.springframework.data.annotation.Id;

import java.util.List;

public class BouquetDTO {
    private String id;
    private int price;
    private String name;
    private String date;
    private String code;
    private String image_id;
    private List<BouqFlowerComplete> bouqFlowerCompleteList;

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

    public List<BouqFlowerComplete> getBouqFlowerCompleteList() {
        return bouqFlowerCompleteList;
    }

    public void setBouqFlowerCompleteList(List<BouqFlowerComplete> bouqFlowerCompleteList) {
        this.bouqFlowerCompleteList = bouqFlowerCompleteList;
    }
}
