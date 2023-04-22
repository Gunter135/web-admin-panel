package com.example.flowersadminpanel.repositories;


import com.example.flowersadminpanel.models.BouquetFlower;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BouquetFlowerRepository extends MongoRepository<BouquetFlower, ObjectId> {
}
