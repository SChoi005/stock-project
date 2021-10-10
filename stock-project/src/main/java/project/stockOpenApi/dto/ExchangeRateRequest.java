package project.stockOpenApi.dto;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeRateRequest{
    private String function = "CURRENCY_EXCHANGE_RATE";
    
    private String fromCurrency = "USD";
    
    private String toCurrency = "KRW";
    
    private String apikey = "7DLIVAS9NWL89J34";
    
    public MultiValueMap<String, String> toMultiValueMap(){
        LinkedMultiValueMap map = new LinkedMultiValueMap<String,String>();
        
        map.add("function", function);
        map.add("from_currency", fromCurrency);
        map.add("to_currency", toCurrency);
        map.add("apikey", apikey);
        return map;
    }
}