import {
	getEstadisticaAerolineas,
	getEstadisticaReservas,
} from '@/helpers/http';
import { EstadisticaReservas } from '@/helpers/interfaces';
import { useEffect, useState } from 'react';

const Estadisticas = () => {
	const [isLoadingEstadisticaAerolineas, setIsLoadingEstadisticaAerolineas] =
		useState(true);
	const [isLoadingEstadisticaReservas, setIsLoadingEstadisticaReservas] =
		useState(true);
	const [cantidadAerolineas, setCantidadAerolineas] = useState(0);
	const [cantidadReservas, setCantidadReservas] = useState<
		EstadisticaReservas[]
	>([] as EstadisticaReservas[]);

	useEffect(() => {
		async function fetchCantidadAerolineas() {
			try {
				const aerolineasFetched = await getEstadisticaAerolineas();
				setCantidadAerolineas(aerolineasFetched);
			} catch (err) {
				console.log(err);
			}

			setIsLoadingEstadisticaAerolineas(false);
		}

		fetchCantidadAerolineas();
	}, []);

	useEffect(() => {
		async function fetchCantidadReservas() {
			try {
				const reservasFetched = await getEstadisticaReservas();
				setCantidadReservas(reservasFetched);
			} catch (err) {
				console.log(err);
			}

			setIsLoadingEstadisticaReservas(false);
		}

		fetchCantidadReservas();
	}, []);
	return (
		<div className="w-[80%] rounded-lg bg-white px-4 md:px-8 xl:px-12 py-2 md:py-4 xl:py-8">
			<div className="font-semibold mb-3 text-sm md:text-xl xl:text-3xl text-blue-700">
				Estadísticas
			</div>
			<div className="w-full flex flex-col items-start justify-start gap-2 mb-4">
				<div className="w-full flex flex-col gap-2">
					{isLoadingEstadisticaAerolineas && (
						<p className="text-xs md:text-sm">
							Cargando estadística de aerolíneas...
						</p>
					)}
					{!isLoadingEstadisticaAerolineas && (
						<ul className="list-disc ml-5">
							<li className="text-xs md:text-sm">
								Hay {cantidadAerolineas} aerolineas registradas en el sistema
							</li>
						</ul>
					)}
					{isLoadingEstadisticaReservas && (
						<p className="text-xs md:text-sm">
							Cargando estadística de aerolíneas...
						</p>
					)}
					{!isLoadingEstadisticaAerolineas && cantidadReservas.length === 0 && (
						<ul className="list-disc ml-5">
							<li className="text-xs md:text-sm">
								No hay reservas registradas en el sistema
							</li>
						</ul>
					)}
					{!isLoadingEstadisticaReservas && cantidadReservas.length > 0 && (
						<div>
							<div className="font-semibold mt-4 mb-4 text-sm md:text-lg 2xl:text-xl text-blue-700">
								Cantidad de Reservas por Aerolínea:
							</div>
							<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 xl:gap-6 justify-between">
								{cantidadReservas.map((reserva: EstadisticaReservas) => (
									<div
										key={reserva.Vuelo.IdAerolinea}
										className="border-2 border-stone-400 rounded-lg shadow-lg px-4 py-2 flex flex-col justify-between items-center"
									>
										<p className="text-xl text-center font-semibold mb-2 text-blue-700">
											{reserva.Vuelo.Aerolinea.NombreAerolinea}
										</p>
										<p className="text-3xl text-center font-semibold">
											{reserva.CantidadReservas}
										</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Estadisticas;
