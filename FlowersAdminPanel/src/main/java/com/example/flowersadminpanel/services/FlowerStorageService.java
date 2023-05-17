package com.example.flowersadminpanel.services;


import com.example.flowersadminpanel.dto.FlowerStorageDTO;
import com.example.flowersadminpanel.models.FlowerStorage;
import com.example.flowersadminpanel.repositories.FlowerStorageRepository;
import org.apache.commons.codec.binary.Base64;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
@Transactional(readOnly = true)
public class FlowerStorageService {
    FlowerStorageRepository flowerStorageRepository;

    @Autowired
    public FlowerStorageService(FlowerStorageRepository flowerStorageRepository) {
        this.flowerStorageRepository = flowerStorageRepository;
    }
    @Transactional
    public void save(FlowerStorage flowerStorage){
        flowerStorage.setTotal_price(flowerStorage.getAmount()*flowerStorage.getPrice());
        flowerStorageRepository.save(flowerStorage);
    }

    @Transactional
    public void delete(FlowerStorage flowerStorage){
        flowerStorageRepository.delete(flowerStorage);
    }

    public List<FlowerStorage> findAll(){
        return flowerStorageRepository.findAll();
    }
    public Optional<FlowerStorage> findById(ObjectId id){
        return flowerStorageRepository.findById(id);
    }
    public Optional<FlowerStorage> findByName(String name){
        return Optional.ofNullable(flowerStorageRepository.findByName(name));
    }
    public List<String> findAllNames(){
        List<String> resultArray = new ArrayList<>();
        for (FlowerStorage item: flowerStorageRepository.findAll()) {
            resultArray.add(item.getName());
        }
        return resultArray;
    }
    public String createExcelFile(List<FlowerStorage> list) throws IOException {
/*        FlowerStorage flower = null;
        if (findById(id).isPresent())
             flower = findById(id).get();
        else
            return null;
        JsonNode result = new ObjectMapper().valueToTree(flower);*/
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
            row1.createCell(1).setCellValue("Сводка товаров на складе");
            row2.createCell(0).setCellValue("Дата создания: ");
            row2.createCell(1).setCellValue(String.valueOf(new Date()));
            row3.createCell(0).setCellValue("Склад: ");
            //gotta implement different warehouses option
            row3.createCell(1).setCellValue("DEFAULT");// .setCellStyle(style)
            row4.createCell(0).setCellValue("№");
            row4.createCell(1).setCellValue("Наименование");
            row4.createCell(2).setCellValue("Количество");
            row4.createCell(3).setCellValue("Цена");
            row4.createCell(4).setCellValue("Общая стоимость");


            row4.setHeightInPoints((float) (row4.getHeightInPoints()*1.3));
            row4.getCell((0)).setCellStyle(style);
            row4.getCell((1)).setCellStyle(style);
            row4.getCell((2)).setCellStyle(style);
            row4.getCell((3)).setCellStyle(style);
            row4.getCell((4)).setCellStyle(style);

            sheet.setColumnWidth(0,5000);
            sheet.setColumnWidth(1,8000);
            sheet.setColumnWidth(2,4000);
            sheet.setColumnWidth(3,4000);
            sheet.setColumnWidth(4,5000);

            int number_counter = 0;
            int amount_sum = 0;
            int price_sum = 0;
            int total_price_sum = 0;
            for (FlowerStorage flower : list){
                Row roww = sheet.createRow(number_counter+5);
                roww.createCell(0).setCellValue(number_counter+1);
                roww.createCell(1).setCellValue(flower.getName());
                roww.createCell(2).setCellValue(flower.getAmount());
                amount_sum += flower.getAmount();
                roww.createCell(3).setCellValue(flower.getPrice());
                price_sum += flower.getPrice();
                roww.createCell(4).setCellValue(flower.getTotal_price());
                total_price_sum += flower.getTotal_price();
                number_counter++;
            }

            Row row5 = sheet.createRow(number_counter+5);
            row5.createCell(1).setCellValue("Итого: ");
            row5.createCell(2).setCellValue(amount_sum);
            row5.createCell(3).setCellValue(price_sum);
            row5.createCell(4).setCellValue(total_price_sum);


/*            try(OutputStream file = new FileOutputStream("src/main/resources/static/excel-files/meow.xlsx")){
                workbook.write(file);
                return file;
            }*/
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            workbook.write(stream);
            return Base64.encodeBase64String(stream.toByteArray());
//            return new ByteArrayResource(stream.toByteArray());
        }

/*        System.out.println(result.getNodeType());
        System.out.println(result);
        return result;*/
    }

}
