import { useEffect, useState } from 'react';
import { getVuelosDisponibles } from '@/helpers/http';
import { Vuelo } from '@/helpers/interfaces';
import DetalleVuelo from './DetalleVuelo';

const ListaVuelos = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [vuelos, setVuelos] = useState<Vuelo[]>([] as Vuelo[]);

	useEffect(() => {
		async function fetchVuelosDisponibles() {
			try {
				const vuelosFetched = await getVuelosDisponibles();
				setVuelos(vuelosFetched);
			} catch (err) {
				console.log(err);
			}

			setIsLoading(false);
		}

		fetchVuelosDisponibles();
	}, []);

	return (
		<div className="w-[80%] rounded-lg bg-white px-4 md:px-8 xl:px-12 py-2 md:py-4 xl:py-8">
			<div className="font-semibold md:mb-1 xl:mb-3 text-sm md:text-xl xl:text-3xl text-blue-700">
				Lista de Vuelos Disponibles
			</div>
			<div className="w-full flex flex-col items-start justify-start gap-2 mb-4">
				<div className="w-full flex gap-2">
					{isLoading && (
						<p className="text-center text-sm">
							Cargando los vuelos disponibles...
						</p>
					)}
					{!isLoading && vuelos.length === 0 && (
						<p className="text-center">
							No hay vuelos disponibles para mostrar.
						</p>
					)}
					{!isLoading && vuelos.length > 0 && (
						<div className="w-full flex flex-col gap-3">
							<div className="py-4">{vuelos.length} vuelos encontrados</div>
							<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 xl:gap-6">
								{vuelos.map((vuelo: Vuelo) => (
									<DetalleVuelo
										key={vuelo.IdVuelo}
										vuelo={vuelo}
										mostrarAeropuertos={true}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ListaVuelos;
