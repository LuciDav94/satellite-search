package com.ai.build.satellitebackend.facade;

import com.ai.build.satellitebackend.BaseSatelliteTest;
import com.ai.build.satellitebackend.model.Satellite;
import com.ai.build.satellitebackend.service.SatelliteRepository;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

public class SatelliteFacadeTest extends BaseSatelliteTest {

    @Mock
    private SatelliteRepository satelliteRepository;

    @InjectMocks
    private SatelliteFacade satelliteFacade;

    @Test
    public void testGetAllSatellites() {
        // Arrange
        Satellite satellite1 = createSatellite("Satellite 1", 10.0f, 20.0f, "Owner 1");
        Satellite satellite2 = createSatellite("Satellite 2", 30.0f, 40.0f, "Owner 2");

        when(satelliteRepository.findAll()).thenReturn(Arrays.asList(satellite1, satellite2));

        List<Satellite> result = satelliteFacade.getAllSatellites();

        assertEquals(2, result.size());
        assertEquals(satellite1.getName(), result.get(0).getName());
        assertEquals(satellite2.getName(), result.get(1).getName());

        verify(satelliteRepository, times(1)).findAll();
    }

    @Test
    public void testUpdateSatellite() {
        UUID satelliteId = UUID.randomUUID();
        Satellite existingSatellite = createSatelliteWithId("Satellite 1", 10.0f, 20.0f, "Owner 1", satelliteId);
        Satellite updatedSatellite = createSatelliteWithId("Updated Satellite", 50.0f, 60.0f, "Updated Owner", satelliteId);

        when(satelliteRepository.findById(satelliteId)).thenReturn(Optional.of(existingSatellite));
        when(satelliteRepository.save(any(Satellite.class))).thenReturn(updatedSatellite);

        ResponseEntity<Satellite> response = satelliteFacade.updateSatellite(satelliteId, updatedSatellite);

        assertEquals(updatedSatellite.getName(), response.getBody().getName());

        verify(satelliteRepository, times(1)).findById(satelliteId);
        verify(satelliteRepository, times(1)).save(any(Satellite.class));
    }

    @Test
    public void testCreateSatellite() {
        Satellite satellite = createSatellite("New Satellite", 70.0f, 80.0f, "New Owner");

        when(satelliteRepository.save(satellite)).thenReturn(satellite);

        Satellite result = satelliteFacade.createSatellite(satellite);

        assertEquals(satellite.getName(), result.getName());
        assertEquals(satellite.getLatitude(), result.getLatitude());
        assertEquals(satellite.getLongitude(), result.getLongitude());
        assertEquals(satellite.getOwner(), result.getOwner());

        verify(satelliteRepository, times(1)).save(satellite);
    }

    @Test
    public void testDeleteSatellite() {
        UUID satelliteId = UUID.randomUUID();
        Satellite satellite = createSatelliteWithId("Satellite 1", 10.0f, 20.0f, "Owner 1", satelliteId);

        when(satelliteRepository.findById(satelliteId)).thenReturn(Optional.of(satellite));

        ResponseEntity<String> response = satelliteFacade.deleteSatellite(satelliteId);

        assertEquals("Satellite deleted successfully", response.getBody());

        verify(satelliteRepository, times(1)).findById(satelliteId);
        verify(satelliteRepository, times(1)).delete(satellite);
    }
}
