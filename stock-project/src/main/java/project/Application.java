package project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import springfox.documentation.swagger2.annotations.EnableSwagger2;


@SpringBootApplication
@ServletComponentScan
@EnableSwagger2
@EnableJpaAuditing
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}