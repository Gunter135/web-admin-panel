package com.example.flowersadminpanel.services;

import com.example.flowersadminpanel.models.Provider;
import com.example.flowersadminpanel.models.Shipment;
import com.example.flowersadminpanel.repositories.ProviderRepository;
import com.example.flowersadminpanel.repositories.ShipmentRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional(readOnly = true)
public class ShipmentService {
    ShipmentRepository shipmentRepository;
    ProviderRepository providerRepository;
    CodeGenService codeGenService;

    @Autowired
    public ShipmentService(ShipmentRepository shipmentRepository,
                           ProviderRepository providerRepository,
                           CodeGenService codeGenService) {
        this.shipmentRepository = shipmentRepository;
        this.providerRepository = providerRepository;
        this.codeGenService = codeGenService;
    }

    @Transactional
    public void save(Shipment shipment){
        shipmentRepository.save(shipment);
    }
    @Transactional
    public void delete(Shipment shipment){
        shipmentRepository.delete(shipment);
    }
    @Transactional
    public void changeStatus(Shipment shipment){
        shipment.setStatus(!shipment.isStatus());
        shipmentRepository.save(shipment);
    }
    public void createNewShipment(){
        Shipment shipment = new Shipment();
        shipment.setId(String.valueOf(new ObjectId()));
        RandomString randomString = new RandomString(16, ThreadLocalRandom.current());
        shipment.setCode(codeGenService.updateCodeGen(codeGenService.findById().get()));
        LocalDateTime myDateObj = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd.MM.yyyy, HH:mm");
        shipment.setDate_of_arrival(myDateObj.format(myFormatObj));
        shipment.setStatus(false);
        shipment.setTotal_price(0);
        shipment.setAmount_of_items(0);
        shipment.setProvider_id("63cbf7d7f59a176735a23125");
        save(shipment);

    }
    public List<Shipment> findAll(){
        List<Shipment> result = shipmentRepository.findAll();
        for (Shipment item:
             result) {
            Optional<Provider> provider = providerRepository.findById(new ObjectId(item.getProvider_id()));
            provider.ifPresent(value -> item.setProvider_id(value.getName()));
        }
        return result;
    }
    public Shipment findShipmentByCode(String code){
        Shipment item = shipmentRepository.findShipmentByCode(code);
        Optional<Provider> provider = providerRepository.findById(new ObjectId(item.getProvider_id()));
        provider.ifPresent(value -> item.setProvider_id(value.getName()));
        return item;
    }
    public Optional<Shipment> findById(ObjectId id){
        return shipmentRepository.findById(id);
    }



    //ALPHANUMERIC-STRING-GENERATOR THANKS TO COMMUNITY POST IN STACKOVERFLOW
    public static class RandomString {

        /**
         * Generate a random string.
         */
        public String nextString() {
            for (int idx = 0; idx < buf.length; ++idx)
                buf[idx] = symbols[random.nextInt(symbols.length)];
            return new String(buf);
        }

        public static final String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        public static final String lower = upper.toLowerCase(Locale.ROOT);

        public static final String digits = "0123456789";

        public static final String alphanum = upper + lower + digits;

        private final Random random;

        private final char[] symbols;

        private final char[] buf;

        public RandomString(int length, Random random, String symbols) {
            if (length < 1) throw new IllegalArgumentException();
            if (symbols.length() < 2) throw new IllegalArgumentException();
            this.random = Objects.requireNonNull(random);
            this.symbols = symbols.toCharArray();
            this.buf = new char[length];
        }

        /**
         * Create an alphanumeric string generator.
         */
        public RandomString(int length, Random random) {
            this(length, random, alphanum);
        }

        /**
         * Create an alphanumeric strings from a secure generator.
         */
        public RandomString(int length) {
            this(length, new SecureRandom());
        }

        /**
         * Create session identifiers.
         */
        public RandomString() {
            this(21);
        }

    }

}
