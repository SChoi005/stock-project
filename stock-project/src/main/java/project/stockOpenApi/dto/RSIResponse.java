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
public class RSIResponse{
    /*
        {
            "Meta Data": {
                "1: Symbol": "CCI",
                "2: Indicator": "Relative Strength Index (RSI)",
                "3: Last Refreshed": "2021-10-15",
                "4: Interval": "weekly",
                "5: Time Period": 11,
                "6: Series Type": "open",
                "7: Time Zone": "US/Eastern Time"
            },
            "Technical Analysis: RSI": {
                "2021-10-15": {
                    "RSI": "32.4792"
                },
                "2021-10-08": {
                    "RSI": "34.4952"
                },
                "2021-10-01": {
                    "RSI": "41.6149"
                },
                ...
            }
        }
    */
    @JsonProperty("Meta Data")
    private MetaData metaData; 
    @JsonProperty("Technical Analysis: RSI")
    private TimeSeries timeSeries; 
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MetaData{
        @JsonProperty("1: Information")
        private String information;
        @JsonProperty("2: Indicator")
        private String indicator;
        @JsonProperty("3: Last Refreshed")
        private String lastRefreshed;
        @JsonProperty("4: Interval")
        private String interval;
        @JsonProperty("5: Time Period")
        private int timePeriod;
        @JsonProperty("6: Series Type")
        private String seriesType;
        @JsonProperty("7: Time Zone")
        private String timeZone;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimeSeries{
        private Map<String, RSI> series = new HashMap<>();;
        
        @JsonAnySetter
        public void add(String key, RSI value) { 
            series.put(key, value);
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RSI{
        @JsonProperty("RSI")
        private String rsi;
    }
}