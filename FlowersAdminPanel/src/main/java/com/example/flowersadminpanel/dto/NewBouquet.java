package com.example.flowersadminpanel.dto;

import java.util.List;

public class NewBouquet {
    int price;
    String name;
    String imgb64;
    List<NewFlowItem> flowItemList;

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

    public String getImgb64() {
        return imgb64;
    }

    public void setImgb64(String imgb64) {
        this.imgb64 = imgb64;
    }

    public List<NewFlowItem> getFlowItemList() {
        return flowItemList;
    }

    public void setFlowItemList(List<NewFlowItem> flowItemList) {
        this.flowItemList = flowItemList;
    }
}
