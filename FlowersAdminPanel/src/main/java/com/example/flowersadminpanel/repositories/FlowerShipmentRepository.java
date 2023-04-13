package com.example.flowersadminpanel.repositories;

import com.example.flowersadminpanel.models.FlowerShipment;
import com.example.flowersadminpanel.models.Shipment;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FlowerShipmentRepository extends MongoRepository<FlowerShipment, ObjectId> {
    List<FlowerShipment> findAllByCode(String code);
    FlowerShipment findFlowerShipmentByCode(String code);
    boolean existsById(String id);
}
