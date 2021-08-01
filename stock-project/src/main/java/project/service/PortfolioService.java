package project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.db.repository.PortfolioRepository;

@Service
public class PortfolioService{
    
    @Autowired
    private PortfolioRepository portfolioRepository;
    
    
}