import api from '../lib/api';

const getPokemonsDataFromApi = (
	url = `${process.env.REACT_APP_POKEAPI_BASE_URL}pokemon`
) => api.get(url).then((response) => response.data);

export default getPokemonsDataFromApi;
