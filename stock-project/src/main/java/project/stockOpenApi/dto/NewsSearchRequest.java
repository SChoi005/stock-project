package project.stockOpenApi.dto;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewsSearchRequest{
    private String query ="";
    private int display = 15;
    private int start = 1;
    private String sort = "date";
    
    public MultiValueMap<String, String> toMultiValueMap(){
        LinkedMultiValueMap map = new LinkedMultiValueMap<String,String>();
        
        map.add("query", query);
        map.add("display", String.valueOf(display));
        map.add("start",String.valueOf(start));
        map.add("sort",sort);
        return map;
    }
}