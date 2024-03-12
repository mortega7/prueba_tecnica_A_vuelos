import { Vuelo } from '@/helpers/interfaces';
import DetalleVuelo from '../Vuelo/DetalleVuelo';

const ListadoBusqueda = ({
	vuelos,
	realizarBusqueda,
}: {
	vuelos: Vuelo[];
	realizarBusqueda: boolean;
}) => {
	return (
		<div className="w-full flex flex-col items-start justify-start gap-2 mb-4">
			<div className="font-semibold md:mt-4 mb-2 text-sm md:text-lg 2xl:text-xl text-blue-700">Listado de Vuelos</div>
			<div className="w-full flex gap-2">
				{!realizarBusqueda && (
					<p className="text-center text-sm">
						Completa los campos del formulario y presiona el botón &quot;Buscar&quot;.
					</p>
				)}
				{realizarBusqueda && vuelos.length === 0 && (
					<p className="text-center">
						No hay Vuelos para mostrar con los filtros establecidos.
					</p>
				)}
				{realizarBusqueda && vuelos.length > 0 && (
					<div className="w-full flex flex-col gap-3">
						<div className="text-xs md:text-base">{vuelos.length} vuelos encontrados para la ruta {vuelos[0].AeropuertoOrigen.CodigoAeropuerto} - {vuelos[0].AeropuertoDestino.CodigoAeropuerto}</div>
						<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 xl:gap-6">
							{vuelos.map((vuelo: Vuelo) => (
								<DetalleVuelo key={vuelo.IdVuelo} vuelo={vuelo} />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ListadoBusqueda;
