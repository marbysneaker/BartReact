const API_KEY = 'MW9S-E7SL-26DU-VV8V'



const fetcthStationData = async (station) => {
    const response = await fetch(' https://api.bart.gov/api/etd.aspx?');
    const params = {
        cmd: 'etd',
        orig: station,
        key: 'MW9S-E7SL-26DU-VV8V',
        json: 'y'
    }
    return data.root.stations.station;
    }
