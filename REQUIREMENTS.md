# Satellite Tracking App

Let's build a satellite tracking platform that provides users with the latest position updates for satellites orbiting the Earth. Built using cutting-edge technologies like React, Java, and PostgreSQL 🚀🛰️🪐.

<p align="center">
  <img width="400" src="./assets/galaxy.jpg" alt="Galaxy">
</p>

---

# Business requirements - frontend

We're builiding a Satellite Tracking App where the user can create, update and delete the satellites and see their positions on the earth map.

- [ ] The user is able to see all available satellites in the sidebar list and on the map.
- [ ] When the user clicks on the add satellite button
  - [ ] the popup with the form appears
  - [ ] user must enter the satellite `name`, `owner`, `longitude` and `latitude` in order to save the form
- [ ] When the user clicks on the edit satellite button follow the same requirements as for the add satellite button
- [ ] When the user clicks on the delete the satellite button
  - [ ] the popup with the waning message `Are you sure you want to delete the sattelite - {sattelite.name}?` is appears
  - [ ] user must approve or reject an action by click on the continue or cancel button
- [ ] When the user selects a sattelite in the list:
  - [ ] the list item is highlighted
  - [ ] the map centeres on the sattelite location area
  - [ ] a popup with the satellite details is shown
- [ ] When the user clicks on a satellite on the map
  - [ ] the proper list item is highlighted
  - [ ] it shows a popup with the satellite details
- [ ] User is able to search the sattelite by `id`, `name`, `owner`.
- [ ] When the user searching for sattelites the map and the list should render only the sattelites witch match the user query.
- [ ] [react-redux](https://react-redux.js.org/) or [react context api](https://react-redux.js.org/) is used for data managment
- [ ] At least one pertinent automated test has been written
- [ ] you need to create an application with at least 3 components:
    - a `<Map />` component to display the earth and the satellites positions
    - a `<List />` component to provide the list of satellites
    - and a `<SearchBar />` component to provide a search functionality related to this context

# Business requirements - backend
- [ ] implement the APIs as defined
- [ ] use a data store to save the needed info
- [ ] use Docker and provide a docker-compose file
- [ ] use Java
- [ ] implement the needed unit tests
- [ ] your code must compile

## APIs
- `GET /satellites`
  output: Satellite
- `PUT /satellites/<satellite-id>`
  input payload:
    name,
    latitude,
    longitude
- `POST /satellites`
  input payload:
    name,
    latitude,
    longitude,
    owner
  output: Satellite
- `DELETE /satellites/<satellite-id>`

## Data structures

### Satellite
	id: UUID | not null,
	name: String | not null,
	latitude: float | not null,
	longitude: float | not null,
	owner: string | nullable

# Bonus points

- [ ] The satelite list scrolls to the active item every time when it's updated
- [ ] [styled-components](https://styled-components.com/) is used for styling
- [ ] [theme](https://styled-components.com/docs/advanced#theming) is supported
- [ ] [threejs](https://threejs.org/) is used anywhere in the application
- [ ] during the update of a satellite the user can't update the satellites that are inside a predefined `Set<NotEditableZone>`
	- a NotEditableZone is a predefined object described by a single point (longitude, latitude) and a radius. All the Satellites inside that circle can't be edited



