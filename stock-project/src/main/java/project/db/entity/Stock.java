package project.db.entity;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Stock{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String symbol;
    
    private String name;

    private String type;
    
    private Long quantity;

    private BigDecimal averagePrice;
    
    private String region;

    private String marketOpen;

    private String marketClose;

    private String timezone;

    private String currency;

    @JsonIgnore        
    @ManyToOne
    private Portfolio portfolio;
}