package com.ai.build.satellitebackend.service;

import com.ai.build.satellitebackend.model.Satellite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SatelliteRepository extends JpaRepository<Satellite, UUID>, JpaSpecificationExecutor<Satellite> {
}
