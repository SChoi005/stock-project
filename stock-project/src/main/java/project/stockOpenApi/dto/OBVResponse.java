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
public class OBVResponse{
    /*
        {
            "Meta Data": {
                "1: Symbol": "IBM",
                "2: Indicator": "On Balance Volume (OBV)",
                "3: Last Refreshed": "2021-10-22",
                "4: Interval": "weekly",
                "5: Time Zone": "US/Eastern Time"
            },
            "Technical Analysis: OBV": {
                "2021-10-22": {
                    "OBV": "882595243.0000"
                },
                "2021-10-15": {
                    "OBV": "942326825.0000"
                },
                "2021-10-08": {
                    "OBV": "926064138.0000"
                },
                "2021-10-01": {
                    "OBV": "953275429.0000"
                },
                ...
        }
    */
    @JsonProperty("Meta Data")
    private MetaData metaData; 
    @JsonProperty("Technical Analysis: OBV")
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
        @JsonProperty("5: Time Zone")
        private String timeZone;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimeSeries{
        private Map<String, OBV> series = new HashMap<>();;
        
        @JsonAnySetter
        public void add(String key, OBV value) { 
            series.put(key, value);
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OBV{
        @JsonProperty("OBV")
        private String obv;
    }
}