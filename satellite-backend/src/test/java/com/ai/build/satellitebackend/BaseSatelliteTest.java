package com.ai.build.satellitebackend;

import com.ai.build.satellitebackend.model.Satellite;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.UUID;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(
        locations = "classpath:application-test.properties")
public abstract class BaseSatelliteTest {


    // Helper method to create a satellite object
    protected Satellite createSatellite(String name, float latitude, float longitude, String owner) {
        Satellite satellite = new Satellite();
        satellite.setName(name);
        satellite.setLatitude(latitude);
        satellite.setLongitude(longitude);
        satellite.setOwner(owner);
        return satellite;
    }

    // Helper method to create a satellite object with the specified id
    protected Satellite createSatelliteWithId(Satellite satellite, UUID id) {
        satellite.setId(id);
        return satellite;
    }

    // Helper method to create a satellite object with the specified id
    protected Satellite createSatelliteWithId(String name, float latitude, float longitude, String owner, UUID id) {
        Satellite satellite = new Satellite();
        satellite.setId(id);
        satellite.setName(name);
        satellite.setLatitude(latitude);
        satellite.setLongitude(longitude);
        satellite.setOwner(owner);
        return satellite;
    }
}
