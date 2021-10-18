package project.stockOpenApi.dto;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RSIRequest{
    
    private String function = "RSI";
    
    private String symbol;
    
    private String interval="daily";
        
    private int timePeriod= 14;
    
    private String seriesType ="open";
    
    private String apikey = "7DLIVAS9NWL89J34";
    
    public MultiValueMap<String, String> toMultiValueMap(){
        LinkedMultiValueMap map = new LinkedMultiValueMap<String,String>();
        
        map.add("function", function);
        map.add("symbol", symbol);
        map.add("interval", interval);
        map.add("time_period", timePeriod);
        map.add("series_type", seriesType);
        map.add("apikey", apikey);
        return map;
    }
    
}