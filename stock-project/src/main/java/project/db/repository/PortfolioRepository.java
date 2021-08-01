package project.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.db.entity.Portfolio;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long>{
}