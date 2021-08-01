package project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.db.dto.StockDto;
import project.db.entity.Stock;
import project.db.repository.PortfolioRepository;
import project.db.repository.StockRepository;

@Service
public class StockService{
    
    @Autowired
    private StockRepository stockRepository;
    
    @Autowired
    private PortfolioRepository portfolioRepository;
    
    
    //c
    public StockDto create(StockDto stockDto){
        
        if(stockRepository.findBySymbol(stockDto.getSymbol()).isPresent()){
            return null;
        }else{
            Stock stock = new Stock();
            stock.setId(stockDto.setId());
            stock.setSymbol(stockDto.setSymbol());
            stock.setPortfolio(portfolioRepository.getOne(stockDto.getPortfolioId()));

            stockRepository.save(stock);
            
            return stockDto;
        }
    }
        
}