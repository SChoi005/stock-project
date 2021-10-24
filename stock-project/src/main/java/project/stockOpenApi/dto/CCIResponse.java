package project.stockOpenApi.dto;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CCIResponse{
    /*
        {
            "Meta Data": {
                "1: Symbol": "IBM",
                "2: Indicator": "Commodity Channel Index (CCI)",
                "3: Last Refreshed": "2021-10-22",
                "4: Interval": "daily",
                "5: Time Period": 10,
                "6: Time Zone": "US/Eastern Time"
            },
            "Technical Analysis: CCI": {
                "2021-10-22": {
                    "CCI": "-181.0183"
                },
                "2021-10-21": {
                    "CCI": "-319.3876"
                },
                "2021-10-20": {
                    "CCI": "-55.1233"
                },
                "2021-10-19": {
                    "CCI": "-46.0986"
                },
                ...
        }
    */
    @JsonProperty("Meta Data")
    private MetaData metaData; 
    @JsonProperty("Technical Analysis: CCI")
    private TimeSeries timeSeries; 
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MetaData{
        @JsonProperty("1: Symbol")
        private String symbol;
        @JsonProperty("2: Indicator")
        private String indicator;
        @JsonProperty("3: Last Refreshed")
        private String lastRefreshed;
        @JsonProperty("4: Interval")
        private String interval;
        @JsonProperty("5: Time Period")
        private int timePeriod;
        @JsonProperty("6: Time Zone")
        private String timeZone;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimeSeries{
        private Map<String, CCI> series = new HashMap<>();;
        
        @JsonAnySetter
        public void add(String key, CCI value) { 
            series.put(key, value);
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CCI{
        @JsonProperty("CCI")
        private String cci;
    }
}