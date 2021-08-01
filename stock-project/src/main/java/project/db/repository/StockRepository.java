package project.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.db.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long>{
    
}