package com.example.flowersadminpanel.services;

import com.example.flowersadminpanel.models.Provider;
import com.example.flowersadminpanel.repositories.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProviderService {
    ProviderRepository providerRepository;

    @Autowired
    public ProviderService(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    @Transactional
    public void save(Provider provider){
        providerRepository.save(provider);
    }

    public List<Provider> findAll(){
        return providerRepository.findAll();
    }
}
