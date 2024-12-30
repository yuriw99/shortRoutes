const axios = require('axios'); 
const apiKey = '5b3ce3597851110001cf6248f6d6a55afe4c40258b0f62c243ffe143';

const getCoordinate = async (location) => {
    location = location.replace(" ", "%20");  

    try {
        const response = await axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${location}`, {
            headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
            }
        });

        const coordinates = response.data.features[0].geometry.coordinates; 
        console.log(`Coordinates for ${location}:`, coordinates);
        return coordinates; 
    } catch (error) {
        console.error('Error geocoding location:', error);
    }
};

const getTravelMethod = (travel) => {
    let travelMethod = "";
    if(travel=="car" || travel=="Car"){
        travelMethod = "driving-car";
    }
    else if (travel=="walking" || travel=="Walking"){
        travelMethod = "foot-walking";
    }
    else {
        travelMethod = "cycling-mountain";
    }
    return travelMethod;

}

const getDistanceTwoPoints = async (location1, location2, travelMethod) => {
    travelMethod = getTravelMethod(travelMethod);
    try{
        const response = await axios.get(`https://api.openrouteservice.org/v2/directions/${travelMethod}?api_key=${apiKey}&start=${location1}&end=${location2}`, {
            headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
            }
        });
        const time = response.data.properties.summary.duration; // Duration in seconds
        const directions = response.data.features[0].properties.segments[0].steps; // Directions steps (if you need them)
        
        return { time, directions };

    }catch(error){
        console.error("get distance", error)
    }
}

//returns list of shortest distance nodes (for example [0, 1, 4, 2, 3])
const applyAlgorithm = (matrix) => {

}


const findShortestDistance = async (req, res) => {
    try {
        const {locationList, transportList} = req.body; // ["100 Church St", "124 Chambers Street"], ["Car"]
        const coordinateList = [];
        for (let i=0; i<locationList.length; i++){
            let coordinate = getCoordinate(locationList[i]);
            coordinateList[i] = coordinate;
        }
        const timeMatrix = null; 
        const directionsMatrix = null;
        for (let i=0; i< coordinateList.length; i++){
            for(let j=1; j<coordinateList.length; j++){
                if(i == j){
                    timeMatrix[i][j] = 100000; //a very large number
                    directionsMatrix = [];
                }
                else {
                    time, directions = getDistanceTwoPoints(coordinateList[i], coordinateList[j], transportList[i]);
                    timeMatrix[i][j] = time;
                    directionsMatrix[i][j] = directions;
                }
            }
        }
        const indices = applyAlgorithm(timeMatrix);
        const result = indices.map(index => locationList[index]);
        res.status(200).json({data: result});


    } catch (error) {
        console.log("findShortestDistance", error)
        res.status(500).json({message: "failed distance matrix"})
    }
}