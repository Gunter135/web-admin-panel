package com.example.flowersadminpanel.controllers;


import com.example.flowersadminpanel.dto.FlowerStorageDTO;
import com.example.flowersadminpanel.dto.ShipmentDTO;
import com.example.flowersadminpanel.models.FlowerShipment;
import com.example.flowersadminpanel.models.FlowerStorage;
import com.example.flowersadminpanel.models.Provider;
import com.example.flowersadminpanel.models.Shipment;
import com.example.flowersadminpanel.services.*;
import com.fasterxml.jackson.databind.JsonNode;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class MainController {
    FlowerShipmentService flowerShipmentService;
    FlowerStorageService flowerStorageService;
    ProviderService providerService;
    ShipmentService shipmentService;
    CodeGenService codeGenService;
    ModelMapper modelMapper;

    @Autowired
    public MainController(FlowerShipmentService flowerShipmentService,
                          FlowerStorageService flowerStorageService,
                          ProviderService providerService,
                          ModelMapper modelMapper,
                          ShipmentService shipmentService,
                          CodeGenService codeGenService) {
        this.flowerShipmentService = flowerShipmentService;
        this.flowerStorageService = flowerStorageService;
        this.providerService = providerService;
        this.modelMapper = modelMapper;
        this.shipmentService = shipmentService;
        this.codeGenService = codeGenService;
    }

    @GetMapping("/warehouse")
    public ResponseEntity<List<FlowerStorage>> getAllStoredFlowers(){
        return new ResponseEntity<>(flowerStorageService.findAll()
                , HttpStatus.OK);
    }

    @PostMapping("/warehouse/create")
    public ResponseEntity<HttpStatus> createNewFlower(@RequestBody FlowerStorage flowerStorage){
        flowerStorageService.save(flowerStorage);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/warehouse/{id}")
    public ResponseEntity<Optional<FlowerStorage>> getFlowerFromStorage(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<FlowerStorage>>(flowerStorageService.findById(id),HttpStatus.OK);

    }

    @PostMapping("/warehouse/update")
    public ResponseEntity<HttpStatus> updateFlower(@RequestBody FlowerStorage flowerStorage){
        flowerStorageService.save(flowerStorage);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @PostMapping("/warehouse/delete")
    public ResponseEntity<HttpStatus> deleteFlower(@RequestBody FlowerStorage flowerStorage){
        flowerStorageService.delete(flowerStorage);
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @GetMapping("/shipments")
    public ResponseEntity<List<ShipmentDTO>> getAllShipments(){
        return new ResponseEntity<List<ShipmentDTO>>(convertToShipmentDTOList(shipmentService.findAll()),HttpStatus.OK);
    }

    @GetMapping("/shipments/{code}")
    public ResponseEntity<ShipmentDTO> getShipmentByCode(@PathVariable String code){
        return new ResponseEntity<ShipmentDTO>(convertToShipmentDTO(shipmentService.findShipmentByCode(code)),HttpStatus.OK);
    }

    //??? нужно ли это тут ???
    @PostMapping("/shipments/add")
    public ResponseEntity<HttpStatus> registerNewShipment(@RequestBody Shipment shipment,
                                                          BindingResult bindingResult){
        shipmentService.save(shipment);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @GetMapping("/shipments/create")
    public ResponseEntity<List<ShipmentDTO>> createNewShipment(){
        shipmentService.createNewShipment();
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/shipments/delete/{id}")
    public ResponseEntity<ShipmentDTO> deleteShipment(@PathVariable String id){
        shipmentService.delete(shipmentService.findById(new ObjectId(id)).get());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/shipments/update_values")
    public ResponseEntity<HttpStatus> updateShipments(@RequestBody List<Shipment> shipments,
                                                          BindingResult bindingResult){
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/flower_shipments")
    public ResponseEntity<List<FlowerShipment>> getAllFlowerShipments(){
        return new ResponseEntity<List<FlowerShipment>>(flowerShipmentService.findAll(),HttpStatus.OK);
    }

    @PostMapping("/flower_shipments/add")
    public ResponseEntity<HttpStatus> registerNewFlowerShipment(@RequestBody FlowerShipment flowerShipment,
                                                          BindingResult bindingResult){
        flowerShipmentService.save(flowerShipment);
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @PostMapping("/flower_shipments/update")
    public ResponseEntity<HttpStatus> updateFlowerShipments(@RequestBody List<FlowerShipment> flowerShipmentList,
                                                                BindingResult bindingResult){
        flowerShipmentService.updateShipments(flowerShipmentList);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/flower_shipments/{code}")
    public ResponseEntity<List<FlowerShipment>> getAllFlowerShipments(@PathVariable String code){
//        List<FlowerShipment> test = flowerShipmentService.findAllByCode(code);
//        for (FlowerShipment item:
//             test) {
//            System.out.println(item.getName());
//        }
        return new ResponseEntity<List<FlowerShipment>>(flowerShipmentService.findAllByCode(code),HttpStatus.OK);
    }


    @GetMapping("/shipments/{code}/change")
    public ResponseEntity<HttpStatus> changeShipmentStatus(@PathVariable String code){
        Shipment kirby = shipmentService.findShipmentByCode(code);
        kirby.setProvider_id(shipmentService.findById(new ObjectId(kirby.getId())).get().getId());
        shipmentService.changeStatus(kirby);
        flowerShipmentService.update_storage((kirby));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/vendors")
    public ResponseEntity<List<Provider>> getAllProviders(){
        return new ResponseEntity<List<Provider>>(providerService.findAll(),HttpStatus.OK);
    }
    @GetMapping("/warehouse/download/excel")
    public ResponseEntity<String> downloadExcel() throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=storage.xlsx");
        return ResponseEntity
                .ok().headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(flowerStorageService.createExcelFile(flowerStorageService.findAll()));
    }


    // DTO CONVERTERS

    private FlowerStorageDTO convertToFlowerStorageDTO(FlowerStorage flowerStorage){
        return modelMapper.map(flowerStorage,FlowerStorageDTO.class);
    }

    private FlowerStorage convertToFlowerStorage(FlowerStorageDTO flowerStorageDTO){
        return modelMapper.map(flowerStorageDTO,FlowerStorage.class);
    }
    private List<FlowerStorageDTO> convertToFlowerStorageDTOList(List<FlowerStorage> flowerStorageList){
        List<FlowerStorageDTO> result = new ArrayList<>();
        for (FlowerStorage item:
             flowerStorageList) {
            result.add(convertToFlowerStorageDTO(item));
        }
        return result;
    }

    private List<FlowerStorage> convertToFlowerStorageList(List<FlowerStorageDTO> flowerStorageDTOList){
        List<FlowerStorage> result = new ArrayList<>();
        for (FlowerStorageDTO item:
                flowerStorageDTOList) {
            result.add(convertToFlowerStorage(item));
        }
        return result;
    }

    private ShipmentDTO convertToShipmentDTO(Shipment shipment){
        return modelMapper.map(shipment,ShipmentDTO.class);
    }

    private Shipment convertToShipment(ShipmentDTO shipmentDTO){
        return modelMapper.map(shipmentDTO,Shipment.class);
    }

    private List<ShipmentDTO> convertToShipmentDTOList(List<Shipment> shipmentList){
        List<ShipmentDTO> result = new ArrayList<>();
        for (Shipment item:
                shipmentList) {
            result.add(convertToShipmentDTO(item));
        }
        return result;
    }

    private List<Shipment> convertToShipmentList(List<ShipmentDTO> shipmentDTOList){
        List<Shipment> result = new ArrayList<>();
        for (ShipmentDTO item:
                shipmentDTOList) {
            result.add(convertToShipment(item));
        }
        return result;
    }
}
