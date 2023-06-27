package com.ai.build.satellitebackend.rest;

import com.ai.build.satellitebackend.facade.SatelliteFacade;
import com.ai.build.satellitebackend.model.Satellite;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/satellites")
public class SatelliteController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SatelliteController.class);


    @Autowired
    private SatelliteFacade satelliteFacade;

    @GetMapping
    public List<Satellite> getAllSatellites() {
        LOGGER.info("Return all satellites");
        return satelliteFacade.getAllSatellites();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Satellite> updateSatellite(@PathVariable("id") UUID id,
                                                     @RequestBody Satellite updatedSatellite) {
        LOGGER.info("Update satellite with id: " + id + " with following data: " + updatedSatellite);
        return satelliteFacade.updateSatellite(id, updatedSatellite);
    }

    @PostMapping
    public Satellite createSatellite(@RequestBody Satellite satellite) {
        LOGGER.info("Create satellite with following data: " + satellite);
        return satelliteFacade.createSatellite(satellite);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSatellite(@PathVariable("id") UUID id) {
        LOGGER.info("Delete satellite with id: " + id);
        return satelliteFacade.deleteSatellite(id);
    }
}
