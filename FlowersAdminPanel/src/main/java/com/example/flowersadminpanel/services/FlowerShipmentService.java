package com.example.flowersadminpanel.services;

import com.example.flowersadminpanel.dto.FlowerShipmentDTO;
import com.example.flowersadminpanel.models.FlowerShipment;
import com.example.flowersadminpanel.models.FlowerStorage;
import com.example.flowersadminpanel.models.Shipment;
import com.example.flowersadminpanel.repositories.FlowerShipmentRepository;
import com.example.flowersadminpanel.repositories.FlowerStorageRepository;
import com.example.flowersadminpanel.repositories.ShipmentRepository;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class FlowerShipmentService {

    FlowerShipmentRepository flowerShipmentRepository;
    FlowerStorageRepository flowerStorageRepository;
    ShipmentRepository shipmentRepository;
    ModelMapper modelMapper;
    FlowerStorageService flowerStorageService;
    ShipmentService shipmentService;

    @Autowired
    public FlowerShipmentService(FlowerShipmentRepository flowerShipmentRepository,
                                 FlowerStorageRepository flowerStorageRepository,
                                 ShipmentRepository shipmentRepository,
                                 ModelMapper modelMapper,
                                 FlowerStorageService flowerStorageService,
                                 ShipmentService shipmentService) {
        this.flowerShipmentRepository = flowerShipmentRepository;
        this.flowerStorageRepository = flowerStorageRepository;
        this.flowerStorageService = flowerStorageService;
        this.shipmentRepository = shipmentRepository;
        this.modelMapper = modelMapper;
        this.shipmentService = shipmentService;
    }

    @Transactional
    public void save(FlowerShipment flowerShipment){
        //add_to_storage(flowerShipment);
        flowerShipmentRepository.save(flowerShipment);
    }

    @Transactional
    public void delete(FlowerShipment flowerShipment){
        //add_to_storage(flowerShipment);
        flowerShipmentRepository.delete(flowerShipment);
    }

    @Transactional
    public void createAndSave(FlowerShipmentDTO flowerShipmentDTO){
        if (flowerStorageService.findByName(flowerShipmentDTO.getName()).isPresent()){
            FlowerShipment flowerShipment = modelMapper.map(flowerShipmentDTO,FlowerShipment.class);
            flowerShipment.setId(String.valueOf(new ObjectId()));
            //add_to_storage(flowerShipment);
            flowerShipmentRepository.save(flowerShipment);
        }
    }


    @Transactional
    public void update_storage(Shipment shipment){
        List<FlowerShipment> items = flowerShipmentRepository.findAllByCode(shipment.getCode());
        if (shipment.isStatus()) {
            for (FlowerShipment flowerShipment :
                    items) {
                FlowerStorage flower_item = flowerStorageRepository.findByName(flowerShipment.getName());
                flower_item.setAmount(flower_item.getAmount() + flowerShipment.getAmount());
                flower_item.setTotal_price(flower_item.getAmount() * flower_item.getPrice());
                flowerStorageRepository.save(flower_item);
            }
        }else {
            for (FlowerShipment flowerShipment :
                    items) {
                FlowerStorage flower_item = flowerStorageRepository.findByName(flowerShipment.getName());
                flower_item.setAmount(flower_item.getAmount() - flowerShipment.getAmount());
                flower_item.setTotal_price(flower_item.getAmount() * flower_item.getPrice());
                flowerStorageRepository.save(flower_item);
            }
        }
    }
    public List<FlowerShipment> findAll(){
        return flowerShipmentRepository.findAll();
    }
    public List<FlowerShipment> findAllByCode(String code){
        return flowerShipmentRepository.findAllByCode(code);
    }
    public void updateShipments(List<FlowerShipment> flowerShipmentList){
        int total_price = 0;
        int amount = 0;
        for (FlowerShipment item:
                flowerShipmentList) {
            if(!flowerShipmentRepository.existsById(item.getId())) {
                item.setId(String.valueOf(new ObjectId()));
            }
            amount += item.getAmount();
            total_price += item.getTotal_price();
        }
        flowerShipmentRepository.deleteAll();
        flowerShipmentRepository.saveAll(flowerShipmentList);
        Shipment shipment = shipmentRepository.findShipmentByCode(flowerShipmentList.get(0).getCode());
        shipment.setAmount_of_items(amount);
        shipment.setTotal_price(total_price);
        shipmentService.save(shipment);
    }


    public FlowerShipment findShipmentByCode(String code){
        return flowerShipmentRepository.findFlowerShipmentByCode(code);
    }

    private Optional<FlowerShipment> findById(ObjectId id) {
        return flowerShipmentRepository.findById(id);
    }


//    public void updateShipments(List<FlowerShipment> flowerShipmentList){
//        int total_price = 0;
//        int amount = 0;
//        for (FlowerShipment item:
//                flowerShipmentList) {
//            if(!flowerShipmentRepository.existsById(item.getId())) {
//                item.setId(String.valueOf(new ObjectId()));
//                amount += item.getAmount();
//                total_price += item.getTotal_price();
//                save(item);
//            }else{
//                Optional<FlowerShipment> flowerShipmentOptional = findById(new ObjectId(item.getId()));
//                if(flowerShipmentOptional.isPresent()){
//                    flowerShipmentOptional.get().setAmount(item.getAmount());
//                    flowerShipmentOptional.get().setPurchase_price(item.getPurchase_price());
//                    flowerShipmentOptional.get().setTotal_price(item.getTotal_price());
//                    amount += flowerShipmentOptional.get().getAmount();
//                    total_price += flowerShipmentOptional.get().getTotal_price();
//                    save(flowerShipmentOptional.get());
//                }
//            }
//        }
//        Shipment shipment = shipmentRepository.findShipmentByCode(flowerShipmentList.get(0).getCode());
//        shipment.setAmount_of_items(amount);
//        shipment.setTotal_price(total_price);
//        shipmentService.save(shipment);
//    }
}
