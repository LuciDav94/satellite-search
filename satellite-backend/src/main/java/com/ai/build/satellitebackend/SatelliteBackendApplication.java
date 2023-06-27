package com.ai.build.satellitebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class SatelliteBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SatelliteBackendApplication.class, args);
    }

}
