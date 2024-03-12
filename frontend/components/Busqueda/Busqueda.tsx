import { useEffect, useState } from 'react';
import FormBusqueda from './FormBusqueda';
import ListadoBusqueda from './ListadoBusqueda';
import { DatosBusquedaVuelos, Vuelo } from '@/helpers/interfaces';
import { getVuelos } from '@/helpers/http';

const Busqueda = () => {
	const [datosBusqueda, setDatosBusqueda] = useState<DatosBusquedaVuelos>(
		{} as DatosBusquedaVuelos
	);
	const [realizarBusqueda, setRealizarBusqueda] = useState(false);
	const [vuelos, setVuelos] = useState<Vuelo[]>([] as Vuelo[]);

	useEffect(() => {
		async function fetchVuelos() {
			try {
				if (realizarBusqueda) {
					const vuelosFetched = await getVuelos(datosBusqueda);
					setVuelos(vuelosFetched);
				}
			} catch (err) {
				console.log(err);
			}
		}

		fetchVuelos();
	}, [datosBusqueda, realizarBusqueda]);

	return (
		<div className="w-[80%] rounded-lg bg-white px-4 md:px-8 xl:px-12 py-2 md:py-4 xl:py-8">
			<FormBusqueda
				setDatosBusqueda={setDatosBusqueda}
				setRealizarBusqueda={setRealizarBusqueda}
			/>
			<ListadoBusqueda vuelos={vuelos} realizarBusqueda={realizarBusqueda} />
		</div>
	);
};

export default Busqueda;
