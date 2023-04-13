package com.example.flowersadminpanel.repositories;

import com.example.flowersadminpanel.models.Shipment;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ShipmentRepository extends MongoRepository<Shipment, ObjectId> {
    Shipment findShipmentByCode(String code);
}
