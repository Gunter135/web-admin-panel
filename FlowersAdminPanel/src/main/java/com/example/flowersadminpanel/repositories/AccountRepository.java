package com.example.flowersadminpanel.repositories;

import com.example.flowersadminpanel.models.Account;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends MongoRepository<Account, ObjectId> {
    Optional<Account> findByUsername(String username);
}
