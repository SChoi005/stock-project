package project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import project.db.dto.PortfolioDto;
import project.db.entity.Portfolio;
import project.db.repository.PortfolioRepository;
import project.db.repository.UserRepository;

@Slf4j
@Service
public class PortfolioService{
    
    @Autowired
    private PortfolioRepository portfolioRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    //c
    
    public PortfolioDto create(PortfolioDto portfolioDto) throws Exception{
        
        if(portfolioRepository.findByName(portfolioDto.getName()).isPresent()){
            throw new Exception("Duplicated Name");
        }
        else{
            log.info("{}", portfolioDto);
            Portfolio portfolio = new Portfolio();
            portfolio.setName(portfolioDto.getName());
            portfolio.setUser(userRepository.getOne(portfolioDto.getUserid()));
            portfolioRepository.save(portfolio);
            
            return portfolioDto;            
        }
    }
    
    //U
    public PortfolioDto update(PortfolioDto portfolioDto) throws Exception{
        
        if(portfolioRepository.findById(portfolioDto.getId()).isPresent()){
            Portfolio portfolio = new Portfolio();
            portfolio.setId(portfolioDto.getId());
            portfolio.setName(portfolioDto.getName());
            portfolio.setUser(userRepository.getOne(portfolioDto.getUserid()));

            portfolioRepository.save(portfolio);
            
            return portfolioDto;
        }
        else{
            throw new Exception("Not found");
        }
    }
    
    //D
    public String delete(Long id) throws Exception{
        if(portfolioRepository.findById(id).isPresent()){
            portfolioRepository.deleteById(id);
            return "Delete Successfully!";
        }
        else{
            throw new Exception("Not found");
        }
    }

}