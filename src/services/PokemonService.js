import api from '../lib/api';

const getPokemonsDataFromApi = (
	url = `${process.env.REACT_APP_POKEAPI_BASE_URL}pokemon?offset=0&limit=1154`
) => api.get(url).then((response) => response.data);

export default getPokemonsDataFromApi;
