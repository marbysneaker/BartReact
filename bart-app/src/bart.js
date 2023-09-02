const API_KEY = 'MW9S-E7SL-26DU-VV8V'



const fetchStationData = async (station) => {
    const response = await fetch(' https://api.bart.gov/api/etd.aspx?');
    const params = new URLSearchParams({
        cmd: 'etd',
        orig: station,
        key: 'MW9S-E7SL-26DU-VV8V',
        json: 'y'
    })
    try {
        const response = await fetch(' https://api.bart.gov/api/etd.aspx?' + params);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
    
}

export default fetchStationData;
