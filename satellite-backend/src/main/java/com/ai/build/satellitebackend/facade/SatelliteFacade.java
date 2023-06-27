package com.ai.build.satellitebackend.facade;

import com.ai.build.satellitebackend.aop.LogExecutionTime;
import com.ai.build.satellitebackend.model.Satellite;
import com.ai.build.satellitebackend.service.SatelliteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SatelliteFacade {

    private SatelliteRepository satelliteRepository;

    @LogExecutionTime
    public List<Satellite> getAllSatellites() {
        return satelliteRepository.findAll();
    }

    @LogExecutionTime
    public ResponseEntity<Satellite> updateSatellite(UUID satelliteId, Satellite updatedSatellite) {
        Satellite satellite = satelliteRepository.findById(satelliteId).orElse(null);
        if (satellite != null) {
            satellite.setName(updatedSatellite.getName());
            satellite.setLatitude(updatedSatellite.getLatitude());
            satellite.setLongitude(updatedSatellite.getLongitude());
            return ResponseEntity.ok(satelliteRepository.save(satellite));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @LogExecutionTime
    public Satellite createSatellite(Satellite satellite) {
        return satelliteRepository.save(satellite);
    }

    @LogExecutionTime
    public ResponseEntity<String> deleteSatellite(UUID satelliteId) {
        Satellite satellite = satelliteRepository.findById(satelliteId).orElse(null);
        if (satellite != null) {
            satelliteRepository.delete(satellite);
            return ResponseEntity.ok("Satellite deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Autowired
    public void setTrademarkRepository(SatelliteRepository satelliteRepository) {
        this.satelliteRepository = satelliteRepository;
    }
}
