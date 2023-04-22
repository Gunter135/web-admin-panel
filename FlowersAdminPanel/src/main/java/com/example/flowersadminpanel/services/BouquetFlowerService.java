package com.example.flowersadminpanel.services;

import com.example.flowersadminpanel.models.BouquetFlower;
import com.example.flowersadminpanel.repositories.BouquetFlowerRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class BouquetFlowerService {
    BouquetFlowerRepository bouquetFlowerRepository;

    @Autowired
    public BouquetFlowerService(BouquetFlowerRepository bouquetFlowerRepository) {
        this.bouquetFlowerRepository = bouquetFlowerRepository;
    }

    @Transactional
    public void save(BouquetFlower bouquetFlower){
        bouquetFlowerRepository.save(bouquetFlower);
    }
    public BouquetFlower findById(String id){
        return bouquetFlowerRepository.findById(new ObjectId(id)).get();
    }
}
