package com.example.flowersadminpanel.repositories;

import com.example.flowersadminpanel.models.Client;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ClientRepository extends MongoRepository<Client, ObjectId> {
}
