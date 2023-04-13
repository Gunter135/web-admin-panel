package com.example.flowersadminpanel.repositories;

import com.example.flowersadminpanel.models.Provider;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderRepository extends MongoRepository<Provider, ObjectId> {
}
