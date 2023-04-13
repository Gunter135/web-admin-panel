package com.example.flowersadminpanel.repositories;

import com.example.flowersadminpanel.models.FlowerStorage;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FlowerStorageRepository extends MongoRepository<FlowerStorage, ObjectId> {
    FlowerStorage findByName(String name);
    Optional<FlowerStorage> findById(ObjectId id);
}
