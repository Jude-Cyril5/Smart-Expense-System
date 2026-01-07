package com.webapp.Webapp.service;

import com.webapp.Webapp.model.Product;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;


@Service
public class ProductService {


    private Arrays Arraylist;
    @Getter
    List<Product> products = Arrays.asList(new Product(101,"iphone",83000),
            new Product(102,"mac",100000));

    public Product getProductById(int prodId){
        return products.stream().filter(p -> p.getProdId() == prodId).findFirst().orElse(new Product(101,"No item",0));
    }

}
