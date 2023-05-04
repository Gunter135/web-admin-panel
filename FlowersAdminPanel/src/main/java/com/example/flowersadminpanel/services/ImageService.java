package com.example.flowersadminpanel.services;

import com.example.flowersadminpanel.models.Image;
import com.example.flowersadminpanel.repositories.ImageRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.util.Base64;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ImageService {
//
//    private final GridFsTemplate gridFsTemplate;
//    private GridFsOperations gridFsOperations;
//    private final SimpleMongoClientDatabaseFactory simpleMongoClientDatabaseFactory;


//    @Autowired
//    public ImageService(GridFsTemplate gridFsTemplate,
//                        GridFsOperations gridFsOperations,
//                        SimpleMongoClientDatabaseFactory simpleMongoClientDatabaseFactory){
//        this.gridFsOperations = gridFsOperations;
//        this.gridFsTemplate = gridFsTemplate;
//        this.simpleMongoClientDatabaseFactory = simpleMongoClientDatabaseFactory;
//    }
//
//    @Transactional
//    public String addPhoto(InputStream inputStream) {
//        DBObject metaData = new BasicDBObject();
//        metaData.put("type","image/png");
//        metaData.put("title","logo");
//        ObjectId id = gridFsTemplate.store(
//                inputStream, "Logo", "image/png", metaData);
//        return id.toString();
//    }
//
//    public GridFsResource getPhoto(String id) throws IllegalStateException, IOException {
//        GridFSFile file = gridFsOperations.findOne(new Query(Criteria.where("_id").is(new ObjectId(id))));
////        Photo photo = new Photo();
////        assert file != null;
////        assert file.getMetadata() != null;
////        photo.setTitle(file.getMetadata().get("title").toString());
////        photo.setStream(gridFsOperations.getResource(file).getInputStream());
//        assert file != null;
//
//        File file1 = new File("E:/" + file.getFilename());
//        FileOutputStream streamToDownloadTo = new FileOutputStream(file1);
//        getGridFs().downloadToStream(file.getId(), streamToDownloadTo);
//        streamToDownloadTo.close();
//        System.out.println("File sent");
//
//        return new GridFsResource(file, getGridFs().openDownloadStream(file.getObjectId()));
//    }
//    private GridFSBucket getGridFs() {
//        //there is a bean in FlowersAdminPanelApplication
////        SimpleMongoClientDatabaseFactory simpleMongoClientDatabaseFactory =
////                new SimpleMongoClientDatabaseFactory("mongodb://localhost:27017/flower_admin_db");
//        MongoDatabase db = simpleMongoClientDatabaseFactory.getMongoDatabase();
//        return GridFSBuckets.create(db);
//    }
    ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Transactional
    public void save(Image image){
        imageRepository.save(image);
    }
    @Transactional
    public void delete(Image image){
        imageRepository.delete(image);
    }
    public Optional<Image> findImageById(String id){
        return imageRepository.findById(new ObjectId(id));
    }
    public ByteArrayResource getImageResource(String id){
        if(findImageById(id).isPresent()){
            Image image = findImageById(id).get();
            return new ByteArrayResource(Base64.getDecoder().decode(image.getBase64()));
        }else {
            System.out.println("NOT FOUND");
        }
        return null;
    }
}
