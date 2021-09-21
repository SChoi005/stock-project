package project.stockOpenApi;

import java.net.URI;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.extern.slf4j.Slf4j;
import project.stockOpenApi.dto.CompanyOverviewRequest;
import project.stockOpenApi.dto.CompanyOverviewResponse;
import project.stockOpenApi.dto.QuoteEndpointRequest;
import project.stockOpenApi.dto.QuoteEndpointResponse;
import project.stockOpenApi.dto.SymbolSearchRequest;
import project.stockOpenApi.dto.SymbolSearchResponse;

@Slf4j
@Component
public class StockClient{
    
    private String stockUrl = "https://www.alphavantage.co/query";
    
    public QuoteEndpointResponse searchQuoteEndpoint(QuoteEndpointRequest quoteEndpointRequest){
        
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(quoteEndpointRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<QuoteEndpointResponse>() {};
        
        ResponseEntity<QuoteEndpointResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        
        return responseEntity.getBody();
    }
    
    public SymbolSearchResponse searchSymbol(SymbolSearchRequest symbolSearchRequest){
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(symbolSearchRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<SymbolSearchResponse>() {};
        
        ResponseEntity<SymbolSearchResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        
        return responseEntity.getBody();
    }
    
    public CompanyOverviewResponse searchCompanyOverview(CompanyOverviewRequest companyOverviewRequest){
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(companyOverviewRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<CompanyOverviewResponse>() {};
        
        ResponseEntity<CompanyOverviewResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        return responseEntity.getBody();
    }
}