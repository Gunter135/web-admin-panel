package com.example.flowersadminpanel.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BonusGroup")
public class BonusGroup {
    @Id
    private String id;
    private String name;
    private boolean status;
    private int percentage;
    private int max_pay_percent;
    private int entry_threshold;

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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public int getPercentage() {
        return percentage;
    }

    public void setPercentage(int percentage) {
        this.percentage = percentage;
    }

    public int getMax_pay_percent() {
        return max_pay_percent;
    }

    public void setMax_pay_percent(int max_pay_percent) {
        this.max_pay_percent = max_pay_percent;
    }

    public int getEntry_threshold() {
        return entry_threshold;
    }

    public void setEntry_threshold(int entry_threshold) {
        this.entry_threshold = entry_threshold;
    }
}
