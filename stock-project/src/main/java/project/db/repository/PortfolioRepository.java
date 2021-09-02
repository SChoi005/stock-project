package project.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.db.entity.Portfolio;
import project.db.entity.User;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long>{
    Optional<Portfolio>findByNameAndUser(String name, User user);    
}