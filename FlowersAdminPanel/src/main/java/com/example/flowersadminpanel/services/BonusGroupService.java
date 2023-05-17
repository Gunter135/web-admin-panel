package com.example.flowersadminpanel.services;


import com.example.flowersadminpanel.models.BonusGroup;
import com.example.flowersadminpanel.repositories.BonusGroupRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class BonusGroupService {

    BonusGroupRepository bonusGroupRepository;

    @Autowired
    public BonusGroupService(BonusGroupRepository bonusGroupRepository) {
        this.bonusGroupRepository = bonusGroupRepository;
    }

    @Transactional
    public void save(BonusGroup bonusGroup) {
        bonusGroupRepository.save(bonusGroup);
    }
    @Transactional
    public void delete(BonusGroup bonusGroup){
        bonusGroupRepository.delete(bonusGroup);
    }

    public List<BonusGroup> findAll(){
        return bonusGroupRepository.findAll();
    }
    public BonusGroup findById(String id) {
        if (bonusGroupRepository.findById(new ObjectId(id)).isPresent()){
            return bonusGroupRepository.findById(new ObjectId(id)).get();
        }
        return null;
    }
    public void saveNew(BonusGroup bonusGroup){
        bonusGroup.setId(String.valueOf(new ObjectId()));
        save(bonusGroup);
    }
}
