package com.example.flowersadminpanel.services;


import com.example.flowersadminpanel.dto.BouqFlowerComplete;
import com.example.flowersadminpanel.dto.BouquetDTO;
import com.example.flowersadminpanel.models.Bouquet;
import com.example.flowersadminpanel.models.FlowerStorage;
import com.example.flowersadminpanel.repositories.BouquetRepository;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class BouquetService {

    BouquetRepository bouquetRepository;
    BouquetFlowerService bouquetFlowerService;
    FlowerStorageService flowerStorageService;
    ModelMapper modelMapper;

    @Autowired
    public BouquetService(BouquetRepository bouquetRepository,
                          BouquetFlowerService bouquetFlowerService,
                          FlowerStorageService flowerStorageService,
                          ModelMapper modelMapper) {
        this.bouquetRepository = bouquetRepository;
        this.bouquetFlowerService = bouquetFlowerService;
        this.flowerStorageService = flowerStorageService;
        this.modelMapper = modelMapper;
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
}
