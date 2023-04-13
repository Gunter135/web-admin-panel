package com.example.flowersadminpanel.repositories;
import org.bson.types.ObjectId;
import com.example.flowersadminpanel.models.CodeGen;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CodeGenRepository extends MongoRepository<CodeGen, ObjectId> {
}
