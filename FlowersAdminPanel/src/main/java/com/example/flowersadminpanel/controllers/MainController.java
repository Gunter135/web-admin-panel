package com.example.flowersadminpanel.controllers;


import com.example.flowersadminpanel.dto.*;
import com.example.flowersadminpanel.models.*;
import com.example.flowersadminpanel.services.*;
import com.fasterxml.jackson.databind.JsonNode;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class MainController {
    private final FlowerShipmentService flowerShipmentService;
    private final FlowerStorageService flowerStorageService;
    private final ProviderService providerService;
    private final ShipmentService shipmentService;
    private final CodeGenService codeGenService;
    private final BouquetService bouquetService;
    private final ModelMapper modelMapper;
    private final ImageService imageService;
    private final ClientService clientService;
    private final BonusGroupService bonusGroupService;

    @Autowired
    public MainController(FlowerShipmentService flowerShipmentService,
                          FlowerStorageService flowerStorageService,
                          ProviderService providerService,
                          ModelMapper modelMapper,
                          ShipmentService shipmentService,
                          CodeGenService codeGenService,
                          ImageService imageService,
                          BouquetService bouquetService,
                          ClientService clientService,
                          BonusGroupService bonusGroupService) {
        this.flowerShipmentService = flowerShipmentService;
        this.flowerStorageService = flowerStorageService;
        this.providerService = providerService;
        this.modelMapper = modelMapper;
        this.shipmentService = shipmentService;
        this.codeGenService = codeGenService;
        this.imageService = imageService;
        this.bouquetService = bouquetService;
        this.clientService = clientService;
        this.bonusGroupService = bonusGroupService;
    }

    @GetMapping("/warehouse")
    public ResponseEntity<List<FlowerStorage>> getAllStoredFlowers(){
        return new ResponseEntity<>(flowerStorageService.findAll()
                , HttpStatus.OK);
    }

    @GetMapping("/warehouse_dto")
    public ResponseEntity<List<FlowerStorageDTO>> getAllStoredFlowersDTO(){
        return new ResponseEntity<>(convertToFlowerStorageDTOList(flowerStorageService.findAll())
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

    @GetMapping("/warehouse/names")
    public ResponseEntity<List<String>> getAllStoredFlowersNames(){
        return new ResponseEntity<>(flowerStorageService.findAllNames()
                , HttpStatus.OK);
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

    @GetMapping("/bouquets")
    public ResponseEntity<List<BouquetDTO>> getAllBouquets(){
        return new ResponseEntity<List<BouquetDTO>>(bouquetService.findAll(),HttpStatus.OK);
    }


    @PostMapping("/showcase/save_image")
    public ResponseEntity<HttpStatus> saveImage(@RequestBody Base64 blob){
        System.out.println(blob);
//        System.out.println(imageService.addPhoto(inputStream));
        return new ResponseEntity<>(HttpStatus.OK);
    }
//    @GetMapping(value = "/showcase/get_image/{id}",produces = MediaType.IMAGE_PNG_VALUE)
//    public ResponseEntity<String> getImage(@PathVariable String id) throws IOException {
//        GridFsResource gridFsdbFile = imageService.getPhoto(id);
//        byte[] bytes = gridFsdbFile.getInputStream().readAllBytes();
//        String encoded = Base64.getEncoder().encodeToString(bytes);
//        return new ResponseEntity<String>(encoded,HttpStatus.OK);
//    }
    @GetMapping(value = "/showcase/get_image/{id}",produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable String id) throws IOException {
        ByteArrayResource inputStream = imageService.getImageResource(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentLength(inputStream.contentLength())
                .body(inputStream);
    }

    @PostMapping("/showcase/save_new_bouquet")
    public ResponseEntity<HttpStatus> saveNewBouquet(@RequestBody NewBouquet newBouquet){
        bouquetService.saveNewBouquet(newBouquet);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/showcase/delete_bouquet/{id}")
    public ResponseEntity<HttpStatus> deleteBouquet(@PathVariable String id){
        bouquetService.deleteByStringId(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/showcase/disassemble_bouquet/{id}")
    public ResponseEntity<HttpStatus> disassembleBouquet(@PathVariable String id){
        bouquetService.disassemble(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/clients")
    public ResponseEntity<List<Client>> getAllClients(){
        return new ResponseEntity<>(clientService.findAndReplaceBonusGroup(clientService.findAll()),HttpStatus.OK);
    }

    @PostMapping("/clients/add")
    public ResponseEntity<HttpStatus> addNewClient(@RequestBody ClientDTO clientDTO){
        clientService.addNewClient(convertToClient(clientDTO));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/clients/download/excel")
    public ResponseEntity<String> downloadClientsExcel() throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=storage.xlsx");
        return ResponseEntity
                .ok().headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(clientService.createExcelFile(clientService.findAll()));
    }

    @GetMapping("/bonus_groups")
    public ResponseEntity<List<BonusGroup>> getAllBonuses(){
        return new ResponseEntity<>(bonusGroupService.findAll(),HttpStatus.OK);
    }

    @PostMapping("/bonus_groups/add")
    public ResponseEntity<HttpStatus> addNewBonusGroup(@RequestBody BonusGroup bonusGroup){
        bonusGroupService.saveNew(bonusGroup);
        return new ResponseEntity<>(HttpStatus.OK);
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

    private ClientDTO convertToClientDTO(Client client){
        return modelMapper.map(client,ClientDTO.class);
    }

    private Client convertToClient(ClientDTO clientDTO){
        return modelMapper.map(clientDTO,Client.class);
    }

}
