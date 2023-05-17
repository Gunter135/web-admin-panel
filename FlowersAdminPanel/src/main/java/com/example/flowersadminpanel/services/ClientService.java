package com.example.flowersadminpanel.services;


import com.example.flowersadminpanel.models.Client;
import com.example.flowersadminpanel.models.FlowerStorage;
import com.example.flowersadminpanel.repositories.ClientRepository;
import org.apache.commons.codec.binary.Base64;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class ClientService {

    ClientRepository clientRepository;
    BonusGroupService bonusGroupService;

    @Autowired
    public ClientService(ClientRepository clientRepository,
                         BonusGroupService bonusGroupService) {
        this.clientRepository = clientRepository;
        this.bonusGroupService = bonusGroupService;
    }

    @Transactional
    public void save(Client client){
        clientRepository.save(client);
    }
    @Transactional
    public void delete(Client client){
        clientRepository.delete(client);
    }

    public List<Client> findAll(){
        return clientRepository.findAll();
    }

    public List<Client> findAndReplaceBonusGroup(List<Client> list){
        for (Client client:
             list) {
            client.setBonusGroup(String.valueOf(bonusGroupService.findById(client.getBonusGroup()).getPercentage()));
        }
        return list;
    }

    public void addNewClient(Client client){
        client.setId(String.valueOf(new ObjectId()));
        client.setAvg_check(0);
        client.setBonuses(0);
        client.setOrders_price_sum(0);
        // There should always be basic BonusGroup with 0 entry threshold, thus i've made Main Bonus Group
        client.setBonusGroup("645f96e01a07d78f0abcb9e5");
        save(client);
    }

    public String createExcelFile(List<Client> list) throws IOException {
        try(XSSFWorkbook workbook = new XSSFWorkbook()){
            XSSFSheet sheet = workbook.createSheet();


            Row row1 = sheet.createRow(0);
            Row row2 = sheet.createRow(1);
            Row row3 = sheet.createRow(2);
            Row row4 = sheet.createRow(4);


            CellStyle style = workbook.createCellStyle();
            style.setBorderBottom(BorderStyle.THIN);
            style.setBorderTop(BorderStyle.THIN);
            style.setBorderLeft(BorderStyle.THIN);
            style.setBorderRight(BorderStyle.THIN);
            style.setAlignment(HorizontalAlignment.CENTER);
            style.setFillForegroundColor(IndexedColors.LAVENDER.getIndex());
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);


            row1.createCell(0).setCellValue("Накладная: ");
            row1.createCell(1).setCellValue("Сводка клиентов в базе");
            row2.createCell(0).setCellValue("Дата создания: ");
            row2.createCell(1).setCellValue(String.valueOf(new Date()));
            row4.createCell(0).setCellValue("№");
            row4.createCell(1).setCellValue("Name");
            row4.createCell(2).setCellValue("Phone");
            row4.createCell(3).setCellValue("Email");
            row4.createCell(4).setCellValue("Average Check");
            row4.createCell(5).setCellValue("Total money spend");
            row4.createCell(6).setCellValue("Bonuses");
            row4.createCell(7).setCellValue("Details");


            row4.setHeightInPoints((float) (row4.getHeightInPoints()*1.3));
            row4.getCell((0)).setCellStyle(style);
            row4.getCell((1)).setCellStyle(style);
            row4.getCell((2)).setCellStyle(style);
            row4.getCell((3)).setCellStyle(style);
            row4.getCell((4)).setCellStyle(style);
            row4.getCell((5)).setCellStyle(style);
            row4.getCell((6)).setCellStyle(style);
            row4.getCell((7)).setCellStyle(style);

            sheet.setColumnWidth(0,5000);
            sheet.setColumnWidth(1,8000);
            sheet.setColumnWidth(2,4000);
            sheet.setColumnWidth(3,4000);
            sheet.setColumnWidth(4,5000);
            sheet.setColumnWidth(5,5000);
            sheet.setColumnWidth(6,5000);
            sheet.setColumnWidth(7,5000);

            int number_counter = 0;
            for (Client client : list){
                Row roww = sheet.createRow(number_counter+5);
                roww.createCell(0).setCellValue(number_counter+1);
                roww.createCell(1).setCellValue(client.getName());
                roww.createCell(2).setCellValue(client.getPhone());
                roww.createCell(3).setCellValue(client.getEmail());
                roww.createCell(4).setCellValue(client.getAvg_check());
                roww.createCell(5).setCellValue(client.getOrders_price_sum());
                roww.createCell(6).setCellValue(client.getBonuses());
                roww.createCell(7).setCellValue(client.getDetails());
                number_counter++;
            }

            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            workbook.write(stream);
            return Base64.encodeBase64String(stream.toByteArray());
        }
    }

}
