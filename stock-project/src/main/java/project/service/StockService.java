package project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.db.repository.StockRepository;

@Service
public class StockService{
    
    @Autowired
    private StockRepository stockRepository;
    
        
}