package com.ai.build.satellitebackend.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "SATELLITE")
public class Satellite {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "LATITUDE")
    private Float latitude;

    @Column(name = "LONGITUDE")
    private Float longitude;

    @Column(name = "OWNER")
    private String owner;

    public Satellite() {
    }

    public Satellite(String name, Float latitude, Float longitude, String owner) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.owner = owner;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Satellite{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", owner='" + owner + '\'' +
                '}';
    }
}
