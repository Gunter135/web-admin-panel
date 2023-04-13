package com.example.flowersadminpanel;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FlowersAdminPanelApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlowersAdminPanelApplication.class, args);
    }


    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
