package com.example.flowersadminpanel.services;


import com.example.flowersadminpanel.dto.BouqFlowerComplete;
import com.example.flowersadminpanel.dto.BouquetDTO;
import com.example.flowersadminpanel.dto.NewBouquet;
import com.example.flowersadminpanel.dto.NewFlowItem;
import com.example.flowersadminpanel.models.Bouquet;
import com.example.flowersadminpanel.models.BouquetFlower;
import com.example.flowersadminpanel.models.FlowerStorage;
import com.example.flowersadminpanel.models.Image;
import com.example.flowersadminpanel.repositories.BouquetRepository;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class BouquetService {

    BouquetRepository bouquetRepository;
    BouquetFlowerService bouquetFlowerService;
    FlowerStorageService flowerStorageService;
    ModelMapper modelMapper;
    ImageService imageService;

    @Autowired
    public BouquetService(BouquetRepository bouquetRepository,
                          BouquetFlowerService bouquetFlowerService,
                          FlowerStorageService flowerStorageService,
                          ModelMapper modelMapper,
                          ImageService imageService) {
        this.bouquetRepository = bouquetRepository;
        this.bouquetFlowerService = bouquetFlowerService;
        this.flowerStorageService = flowerStorageService;
        this.modelMapper = modelMapper;
        this.imageService = imageService;
    }

    @Transactional
    public void save(Bouquet bouquet){
        bouquetRepository.save(bouquet);
    }
    public List<BouquetDTO> findAll(){
        List<Bouquet> bouquetList = bouquetRepository.findAll();
        List<BouquetDTO> bouquetDTOList = new ArrayList<>();
        for (Bouquet bouquet:
             bouquetList) {
            List<BouqFlowerComplete> bouqFlowerCompleteList = new ArrayList<>();
            for (String flId:
                 bouquet.getFlowers()) {
                BouqFlowerComplete bouqFlowerComplete = new BouqFlowerComplete();
                bouqFlowerComplete.setAmount(bouquetFlowerService.findById(flId).getAmount());
                FlowerStorage flowerStorage = flowerStorageService
                        .findById(new ObjectId(bouquetFlowerService.findById(flId).getFlowerStorageId())).get();
                bouqFlowerComplete.setName(flowerStorage.getName());
                bouqFlowerComplete.setPrice(flowerStorage.getPrice());
                bouqFlowerCompleteList.add(bouqFlowerComplete);

            }

            BouquetDTO bouquetDTO = modelMapper.map(bouquet,BouquetDTO.class);
            bouquetDTO.setBouqFlowerCompleteList(bouqFlowerCompleteList);
            bouquetDTOList.add(bouquetDTO);
        }
        return bouquetDTOList;
    }
    public Optional<Bouquet> findById(String id){
        return bouquetRepository.findById(new ObjectId(id));
    }

    public void saveNewBouquet(NewBouquet newBouquet){
        Bouquet bouquet = new Bouquet();
        Image image = new Image();
        List<String> flowers = new ArrayList<>();
        image.setId(String.valueOf(new ObjectId()));
        image.setBase64(newBouquet.getImgb64());
        bouquet.setId(String.valueOf(new ObjectId()));
        bouquet.setName(newBouquet.getName());
        bouquet.setPrice(newBouquet.getPrice());
        bouquet.setPrice(newBouquet.getPrice());
        bouquet.setDate(String.valueOf(new Date()));
        //codegen?
        bouquet.setCode("№00000");
        bouquet.setImage_id(image.getId());
        for (NewFlowItem item:
             newBouquet.getFlowItemList()) {
            BouquetFlower bouquetFlower = new BouquetFlower();
            if (flowerStorageService.findByName(item.getName()).isPresent()){
                bouquetFlower.setId(String.valueOf(new ObjectId()));
                bouquetFlower.setFlowerStorageId(flowerStorageService.findByName(item.getName()).get().getId());
                bouquetFlower.setAmount(item.getAmount());
                flowers.add(bouquetFlower.getId());
                bouquetFlowerService.save(bouquetFlower);
                Optional<FlowerStorage> flowerStorageOptional = flowerStorageService.findById(new ObjectId(bouquetFlower.getFlowerStorageId()));
                flowerStorageOptional.ifPresent(storage -> storage.setAmount(storage.getAmount() - bouquetFlower.getAmount()));
                flowerStorageOptional.ifPresent(storage -> flowerStorageService.save(storage));
            }
        }
        bouquet.setFlowers(flowers);
        imageService.save(image);
        save(bouquet);
    }
    public void disassemble(String id){
        if(bouquetRepository.findById(new ObjectId(id)).isPresent()){
            Bouquet bouquet = bouquetRepository.findById(new ObjectId(id)).get();
            for (String flow_id:
                 bouquet.getFlowers()) {
                BouquetFlower bouquetFlower = bouquetFlowerService.findById(flow_id);
                Optional<FlowerStorage> flowerStorage = flowerStorageService.findById(new ObjectId(bouquetFlower.getFlowerStorageId()));
                flowerStorage.ifPresent(storage -> storage.setAmount(storage.getAmount() + bouquetFlower.getAmount()));
                flowerStorage.ifPresent(storage -> flowerStorageService.save(storage));
                bouquetFlowerService.delete(bouquetFlower);
            }
            Optional<Image> imageOptional = imageService.findImageById(bouquet.getImage_id());
            imageOptional.ifPresent(image -> imageService.delete(image));
            delete(bouquet);
        }
    }
    @Transactional
    public void deleteByStringId(String id) {
        Optional<Bouquet> optionalBouquet = bouquetRepository.findById(new ObjectId(id));
        if(optionalBouquet.isPresent()){
            Bouquet bouquet = optionalBouquet.get();
            for (String flow_id:
                    bouquet.getFlowers()) {
                BouquetFlower bouquetFlower = bouquetFlowerService.findById(flow_id);
                bouquetFlowerService.delete(bouquetFlower);
            }
            Optional<Image> imageOptional = imageService.findImageById(bouquet.getImage_id());
            imageOptional.ifPresent(image -> imageService.delete(image));
            delete(bouquet);
        }
    }
    @Transactional
    public void delete(Bouquet bouquet) {
        bouquetRepository.delete(bouquet);
    }

}
