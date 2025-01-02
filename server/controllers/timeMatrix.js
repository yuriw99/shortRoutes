const axios = require('axios'); 
const apiKey = process.env.API_KEY;

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
    console.log(location1, location2)
    const start = location1.join(','); 
    const end = location2.join(','); 
    try{
        const response = await axios.get(`https://api.openrouteservice.org/v2/directions/${travelMethod}?api_key=${apiKey}&start=${start}&end=${end}`, {
            headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
            }
        });
        console.log("")
        const time = response.data.features[0].properties.summary.duration; // Duration in seconds
        const directions = response.data.features[0].properties.segments[0].steps // Directions steps (if you need them)
        
        
        return { time, directions };

    }catch(error){
        console.error("get distance", error)
    }
}

//returns list of shortest distance nodes (for example [0, 1, 4, 2, 3]) as well as the total time to get to all of these nodes
const applyAlgorithm = (matrix) => {
    console.log(matrix)
    const n = matrix.length;
    const distances = Array(n).fill(Infinity);  // Shortest distance to each node
    const previous = Array(n).fill(null);  // To track the path
    const visited = Array(n).fill(false);  // To track visited nodes
    const pq = [];  // Priority queue

    // Initialize the start node
    distances[0] = 0;
    pq.push([0, 0]);  // [distance, node]

    while (pq.length > 0) {
        // Sort priority queue based on distance (min-heap behavior)
        pq.sort((a, b) => a[0] - b[0]);
        const [currentDist, u] = pq.shift();  // Get the node with the shortest distance

        if (visited[u]) continue;
        visited[u] = true;

        // Relax the edges
        for (let v = 0; v < n; v++) {
            if (matrix[u][v] !== Infinity && !visited[v]) {
                const alt = currentDist + matrix[u][v];
                if (alt < distances[v]) {
                    distances[v] = alt;
                    previous[v] = u;  // Track the previous node for path reconstruction
                    pq.push([distances[v], v]);  // Add to the priority queue
                }
            }
        }
    }

    // Reconstruct the shortest path
    const indices = [];
    let current = n - 1;  // Target node (change this for different destinations)
    while (current !== null) {
        indices.unshift(current);
        current = previous[current];
    }
    const time = distances[n - 1];
    

    return {time, indices};

}

//returns a list of directions that you will need to travel
const getDirectionsList = (matrix, indices) => {
    const directionList = []
    for (let i =0; i<indices.length - 1; i++){
        directionList.push(matrix[indices[i]][indices[i+1]]);
    }
    return directionList; 

}


const findShortestRoute = async (req, res) => {
    try {
        const {locations, transportList} = req.body; // ["100 Church St", "124 Chambers Street"], ["Car"]
        const coordinateList = [];
        for (let i=0; i<locations.length; i++){
            let coordinate = await getCoordinate(locations[i]);
            coordinateList[i] = coordinate;
        }
        const timeMatrix = []; 
        const directionsMatrix = [];
        for (let i=0; i< coordinateList.length; i++){
            timeMatrix[i] = [];
            directionsMatrix[i] = [];
            for(let j=1; j<coordinateList.length; j++){
                if(i == j){
                    timeMatrix[i][j] = Infinity; 
                    directionsMatrix[i][j] = [];
                }
                else {
                    const {time, directions} = await getDistanceTwoPoints(coordinateList[i], coordinateList[j], transportList[i]);
                    timeMatrix[i][j] = time;
                    directionsMatrix[i][j] = directions;
                }
            }
        }
        const {time, indices} = applyAlgorithm(timeMatrix);
        console.log(time, indices)
        const locationsOrder = indices.map(index => locations[index]);
        const directionsOrder = getDirectionsList(directionsMatrix, indices)
        res.status(200).json({indices: indices, locations: locationsOrder, directions: directionsOrder, totalTime: time});


    } catch (error) {
        console.log("findShortestDistance", error)
        res.status(500).json({message: "failed distance matrix"})
    }
}

module.exports = {findShortestRoute};