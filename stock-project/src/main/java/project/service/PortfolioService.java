package project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.db.dto.PortfolioDto;
import project.db.entity.Portfolio;
import project.db.repository.PortfolioRepository;
import project.db.repository.UserRepository;

@Service
public class PortfolioService{
    
    @Autowired
    private PortfolioRepository portfolioRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    //c
    
    public PortfolioDto create(PortfolioDto portfolioDto){
        
        if(portfolioRepository.findByName(portfolioDto.getName()).isPresent()){
            return null;
        }
        else{
            Portfolio portfolio = new Portfolio();
            portfolio.setName(portfolioDto.getName());
            portfolio.setUser(userRepository.getOne(portfolioDto.getUserId()));
            portfolioRepository.save(portfolio);
            
            return portfolioDto;            
        }
    }
    
}