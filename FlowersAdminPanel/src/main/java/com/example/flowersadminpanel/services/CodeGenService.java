package com.example.flowersadminpanel.services;

import com.example.flowersadminpanel.models.CodeGen;
import com.example.flowersadminpanel.repositories.CodeGenRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class CodeGenService {
    CodeGenRepository codeGenRepository;
    @Autowired
    public CodeGenService(
            CodeGenRepository codeGenRepository) {
        this.codeGenRepository = codeGenRepository;
    }
    @Transactional
    public void save(CodeGen codeGen){
        codeGenRepository.save(codeGen);
    }
    public String updateCodeGen(CodeGen codeGen){
        //LIMIT OF 10000, NEED TO IMPLEMENT ALGORITHM TO CHANGE AAAA -> AAAB -> AAAC AND ETC UP TO FFFF
        int ipart = Integer.parseInt(codeGen.getInt_part());
        if (ipart < 9999) {
            ipart++;
        }else{
            ipart = 0;
        }
        StringBuilder stringBuilder = new StringBuilder(String.valueOf(ipart));
        while (stringBuilder.length() < 4){
            stringBuilder.insert(0,"0");
        }
        codeGen.setInt_part(stringBuilder.toString());
        save(codeGen);
        return codeGen.getString_part() + codeGen.getInt_part();
    }
    public Optional<CodeGen> findById(){
        return codeGenRepository.findById(new ObjectId("642c004a80075e396c4b9196"));
    }
}
