package com.webapp.Webapp.model;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Product {

    private int prodId;
    private String proName;
    private int price;

}
