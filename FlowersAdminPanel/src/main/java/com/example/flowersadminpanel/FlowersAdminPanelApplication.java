package com.example.flowersadminpanel;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClientFactory;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@SpringBootApplication
public class FlowersAdminPanelApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlowersAdminPanelApplication.class, args);
    }


    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
    //use in case gridfs is needed
//    @Bean
//    public SimpleMongoClientDatabaseFactory simpleMongoClientDatabaseFactory(){
//        return new SimpleMongoClientDatabaseFactory("mongodb://localhost:27017/flower_admin_db");
//    }
}
