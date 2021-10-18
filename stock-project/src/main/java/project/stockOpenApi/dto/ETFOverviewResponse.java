package project.stockOpenApi.dto;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ETFOverviewResponse{
    
    /*
        "id": "SPYG",
        "attributes":{
        "divYield": 0.69,
        "impliedMarketCap": null,
        "marketCap": 13652739687.4,
        "netAssets": 13453141387.0,
        "divTimeFrame": "historic",
        "divRate": 0.46,
        "divDistribution": "Quarterly",
        "expenseRatio": 0.04,
        "high52": 68.48,
        "low52": 47.7,
        "longDesc": "SPDR Series Trust - SPDR Portfolio S&P 500 Growth ETF is an exchange traded fund launched by State Street Global Advisors, Inc. The fund is managed by SSGA Funds Management, Inc. The fund invests in public equity markets of the United States. The fund invests in stocks of companies operating across diversified sectors. It invests in growth stocks of large-cap companies. It seeks to track the performance of the S&P 500 Growth Index and the S&P 500 Index, by using representative sampling technique. SPDR Series Trust - SPDR Portfolio S&P 500 Growth ETF was formed on September 25, 2000 and is domiciled in the United States.",
        "prospectusPrimaryBenchmark": "S&P 500 Growth TR USD",
        "fundProfile":{"fundName": "SPDR® Portfolio S&P 500 Growth ETF", "legalName": "SPDR® Portfolio S&P 500 Growth ETF", "providerCompany": "SPDR State Street Global Advisors",…},
        "stockHoldings":{"basicMaterials": 1.56, "consumerCyclical": 15.9, "financials": 6.62, "realEstate": 1.06, "consumerDefensive": 3.72,…}
    */
    
    private Body data;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Body{
        
        private String id;
        private String attributes;
        private String divYield;
        private String impliedMarketCap;
        private String marketCap;
        private String netAssets;
        private String divTimeFrame;
        private String divRate;
        private String divDistribution;
        private String expenseRatio;
        private String high52;
        private String low52;
        private String longDesc;
        
        private Map<String, Object> fundProfile = new HashMap<>();
        
        @JsonAnySetter
        public void add(String key, Object value) { 
            fundProfile.put(key, value);
        }
    }
}