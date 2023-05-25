package com.example.flowersadminpanel.repositories;


import com.example.flowersadminpanel.models.Token;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TokenRepository extends MongoRepository<Token, ObjectId> {
    Optional<Token> findByToken(String token);
    Optional<Token> findByAccountId(String accountId);
}
