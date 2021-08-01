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

import project.stockOpenApi.dto.QuoteEndpointRequest;
import project.stockOpenApi.dto.QuoteEndpointResponse;

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
    
}