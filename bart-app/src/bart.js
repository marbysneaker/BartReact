const API_KEY = 'MW9S-E7SL-26DU-VV8V'
const API_ENDPOINT = 'https://api.bart.gov/api/etd.aspx?'
const FARE_ENDPOINT = 'https://api.bart.gov/api/sched.aspx?'



const fetchStationData = async (station) => {
    
    const params = new URLSearchParams({
        cmd: 'etd',
        orig: station,
        key: 'MW9S-E7SL-26DU-VV8V',
        json: 'y'
    })
    try {
        const response = await fetch( API_ENDPOINT + params);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
    
}


const fetchFairData = async (orig, dest) => {
    const params = new URLSearchParams({
        cmd: 'fare',
        orig: orig,
        dest: dest,
        date:'today',
        key: 'MW9S-E7SL-26DU-VV8V',
        json: 'y'
    })
    try {
        const response = await fetch( FARE_ENDPOINT + params);
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
    }
    
}

export {fetchStationData, fetchFairData};
