const axios = require('axios');
const apiKey = process.env.API_KEY;
const mongoose = require('mongoose');
const Route = require('../models/Route');

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
    if (travel == "car" || travel == "Car") {
        travelMethod = "driving-car";
    }
    else if (travel == "walking" || travel == "Walking") {
        travelMethod = "foot-walking";
    }
    else {
        travelMethod = "cycling-mountain";
    }
    return travelMethod;

}

const getDistanceTwoPoints = async (location1, location2, travelMethod) => {
    travelMethod = getTravelMethod(travelMethod);
    console.log(location1, location2)
    const start = location1.join(',');
    const end = location2.join(',');
    try {
        const response = await axios.get(`https://api.openrouteservice.org/v2/directions/${travelMethod}?api_key=${apiKey}&start=${start}&end=${end}`, {
            headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
            }
        });
        console.log("")
        const time = response.data.features[0].properties.summary.duration; // Duration in seconds
        const directions = response.data.features[0].properties.segments[0].steps // Directions steps (if you need them)


        return { time, directions };

    } catch (error) {
        console.error("get distance", error)
    }
}

//returns list of shortest distance nodes (for example [0, 1, 4, 2, 3]) as well as the total time to get to all of these nodes
const applyAlgorithm = (matrix) => {
    console.log("THE MATRIX IS", matrix)
    const n = matrix.length;
    const indices = [];
    indices.push(0) //starting index
    let time = 0;
    let currRowIndex = 0;
    while (indices.length < n) {
        let minVal = Infinity;
        let minIndex = -1;
        for (let i = 0; i < matrix[currRowIndex].length; i++) {
            if (matrix[currRowIndex][i] < minVal && indices.indexOf(i) == -1) {
                minVal = matrix[currRowIndex][i];
                minIndex = i;
            }
        }
        time += matrix[currRowIndex][minIndex];
        indices.push(minIndex);
        currRowIndex = minIndex;
    }


    return { time, indices };

}

//returns a list of directions that you will need to travel
const getDirectionsList = (matrix, indices) => {
    const directionList = []
    for (let i = 0; i < indices.length - 1; i++) {
        directionList.push(matrix[indices[i]][indices[i + 1]]);
    }
    return directionList;

}

const addRouteInfoDatabase = async (userEmail, locations, directions, totalTime) => {
    try {
        mongoose.disconnect();
        const connection2 = "mongodb+srv://yuriw:TUr9QMmVjl5Upsk8@shortroutesusers.d6kud.mongodb.net/Routes?retryWrites=true&w=majority&appName=ShortRoutesUsers"; //connection to routes database
        await mongoose.connect(connection2, { useNewUrlParser: true, useUnifiedTopology: true });
        const route = new Route({
            userEmail: userEmail,
            routes: locations,
            directions: directions,
            seconds: totalTime
        });
        const result = route.save();
        console.log(result); 
    }
    catch (error) {
        console.log(error)
    }


}


const findShortestRoute = async (req, res) => {
    try {
        const { userEmail, locations, transportList } = req.body; // ["100 Church St", "124 Chambers Street"], ["Car"]
        const coordinateList = [];
        for (let i = 0; i < locations.length; i++) {
            let coordinate = await getCoordinate(locations[i]);
            coordinateList[i] = coordinate;
        }
        const timeMatrix = [];
        const directionsMatrix = [];
        for (let i = 0; i < coordinateList.length; i++) {
            timeMatrix[i] = [];
            directionsMatrix[i] = [];
            for (let j = 1; j < coordinateList.length; j++) {
                if (i == j) {
                    timeMatrix[i][j] = Infinity;
                    directionsMatrix[i][j] = [];
                }
                else {
                    const { time, directions } = await getDistanceTwoPoints(coordinateList[i], coordinateList[j], transportList[i]);
                    timeMatrix[i][j] = time;
                    directionsMatrix[i][j] = directions;
                }
            }
        }
        const { time, indices } = applyAlgorithm(timeMatrix);
        console.log(time, indices)
        const locationsOrder = indices.map(index => locations[index]);
        const directionsOrder = getDirectionsList(directionsMatrix, indices)
        if (userEmail != "initial email"){
            await addRouteInfoDatabase(userEmail, locationsOrder, directionsOrder, time);
        }
        res.status(200).json({ indices: indices, locations: locationsOrder, directions: directionsOrder, totalTime: time });


    } catch (error) {
        console.log("findShortestDistance", error)
        res.status(500).json({ message: "failed distance matrix" })
    }
}

module.exports = { findShortestRoute };