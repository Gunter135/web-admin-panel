package com.example.flowersadminpanel.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BouquetFlower")
public class BouquetFlower {
    @Id
    private String id;
    private String flowerStorageId;
    private int amount;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFlowerStorageId() {
        return flowerStorageId;
    }

    public void setFlowerStorageId(String flowerStorageId) {
        this.flowerStorageId = flowerStorageId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
