package com.ai.build.satellitebackend.rest;

import com.ai.build.satellitebackend.BaseSatelliteTest;
import com.ai.build.satellitebackend.facade.SatelliteFacade;
import com.ai.build.satellitebackend.model.Satellite;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

public class SatelliteControllerTest extends BaseSatelliteTest {

    @Mock
    private SatelliteFacade satelliteFacade;

    @InjectMocks
    private SatelliteController satelliteController;

    @Test
    public void testGetAllSatellites() {
        Satellite satellite1 = createSatellite("Satellite 1", 10.0f, 20.0f, "Owner 1");
        Satellite satellite2 = createSatellite("Satellite 2", 30.0f, 40.0f, "Owner 2");

        when(satelliteFacade.getAllSatellites()).thenReturn(Arrays.asList(satellite1, satellite2));

        List<Satellite> result = satelliteController.getAllSatellites();

        assertEquals(2, result.size());
        assertEquals(satellite1.getName(), result.get(0).getName());
        assertEquals(satellite2.getName(), result.get(1).getName());

        verify(satelliteFacade, times(1)).getAllSatellites();
    }

    @Test
    public void testUpdateSatellite() {
        UUID satelliteId = UUID.randomUUID();
        Satellite updatedSatellite = createSatellite("Updated Satellite", 50.0f, 60.0f, "Updated Owner");

        when(satelliteController.updateSatellite(satelliteId, updatedSatellite))
                .thenReturn(ResponseEntity.ok(updatedSatellite));
        ResponseEntity<Satellite> response = satelliteController.updateSatellite(satelliteId, updatedSatellite);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedSatellite.getName(), response.getBody().getName());

        verify(satelliteFacade, times(1)).updateSatellite(satelliteId, updatedSatellite);

        when(satelliteController.updateSatellite(satelliteId, updatedSatellite))
                .thenReturn(ResponseEntity.notFound().build());
        response = satelliteController.updateSatellite(satelliteId, updatedSatellite);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testCreateSatellite() {
        Satellite satellite = createSatellite("New Satellite", 70.0f, 80.0f, "New Owner");
        Satellite createdSatellite = createSatelliteWithId(satellite, UUID.randomUUID());

        when(satelliteFacade.createSatellite(satellite)).thenReturn(createdSatellite);

        Satellite result = satelliteController.createSatellite(satellite);

        assertEquals(createdSatellite.getId(), result.getId());
        assertEquals(createdSatellite.getName(), result.getName());
        assertEquals(createdSatellite.getLatitude(), result.getLatitude());
        assertEquals(createdSatellite.getLongitude(), result.getLongitude());
        assertEquals(createdSatellite.getOwner(), result.getOwner());

        verify(satelliteFacade, times(1)).createSatellite(satellite);
    }

    @Test
    public void testDeleteSatellite() {
        UUID satelliteId = UUID.randomUUID();

        when(satelliteFacade.deleteSatellite(satelliteId))
                .thenReturn(ResponseEntity.ok("Satellite deleted successfully"));

        ResponseEntity<String> response = satelliteController.deleteSatellite(satelliteId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Satellite deleted successfully", response.getBody());

        verify(satelliteFacade, times(1)).deleteSatellite(satelliteId);
    }
}
