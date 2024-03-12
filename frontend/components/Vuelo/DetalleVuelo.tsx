import { useEffect, useState } from 'react';
import { convertirMoneda, esVueloValido } from '@/helpers/funciones';
import { DatosReserva, Vuelo } from '@/helpers/interfaces';
import Modal from '../Modal';
import FormModalReserva from '../Reserva/FormModalReserva';
import { setReserva } from '@/helpers/http';

const DetalleVuelo = ({
	vuelo,
	mostrarAeropuertos,
}: {
	vuelo: Vuelo;
	mostrarAeropuertos?: boolean;
}) => {
	const [mostrarModalReserva, setMostrarModalReserva] = useState(false);
	const [mostrarModalConfirmacion, setMostrarModalConfirmacion] =
		useState(false);
	const [vueloSeleccionado, setVueloSeleccionado] = useState({} as Vuelo);
	const [datosReserva, setDatosReserva] = useState({} as DatosReserva);
	const [realizarReserva, setRealizarReserva] = useState(false);
	const [mensajeConfirmacion, setMensajeConfirmacion] = useState(<></>);

	const mostrarModalVuelo = (vuelo: Vuelo) => {
		setVueloSeleccionado(vuelo);
		setMostrarModalReserva(true);
	};

	const vueloValido = esVueloValido(
		vuelo.FechaSalidaVuelo,
		vuelo.HoraSalidaVuelo
	);

	useEffect(() => {
		async function guardarReserva() {
			try {
				if (realizarReserva) {
					const codigoReserva = await setReserva(datosReserva);
					setMensajeConfirmacion(
						<p>
							La reserva se ha generado con éxito, el código es:{' '}
							<span className="text-blue-600 text-base md:text-lg font-semibold">
								{codigoReserva}
							</span>
						</p>
					);
					setMostrarModalReserva(false);
					setMostrarModalConfirmacion(true);
				}
			} catch (err: any) {
				setMensajeConfirmacion(
					<>
						<p>
							Se produjo un inconveniente al guardar la reserva, por favor
							inténtalo de nuevo!
						</p>
						{err && <p className="text-red-500 mt-2">{err.message}</p>}
					</>
				);

				setMostrarModalConfirmacion(true);
			}
		}

		guardarReserva();
	}, [datosReserva, realizarReserva]);

	return (
		<div className="border-2 border-stone-400 rounded-lg shadow-lg px-4 py-2 flex flex-col justify-between">
			<div>
				<p className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold mb-2 text-blue-700">
					{vuelo.Aerolinea.NombreAerolinea}
				</p>
				{mostrarAeropuertos && (
					<div className="font-semibold">
						{vuelo.AeropuertoOrigen.CodigoAeropuerto} -{' '}
						{vuelo.AeropuertoDestino.CodigoAeropuerto}
					</div>
				)}
				<div className="text-xs lg:text-sm flex mt-2">
					<div className="font-semibold w-20">Salida: </div>
					<div>
						{vuelo.FechaSalidaVuelo} {vuelo.HoraSalidaVuelo}
					</div>
				</div>
				<div className="text-xs lg:text-sm flex">
					<div className="font-semibold w-20">Llegada: </div>
					<div>
						{vuelo.FechaLlegadaVuelo} {vuelo.HoraLlegadaVuelo}
					</div>
				</div>
			</div>
			<div>
				<p className="text-xs lg:text-sm text-right mt-3">Precio por tiquete</p>
				<p className="text-xl lg:text-2xl xl:text-3xl text-right font-semibold">
					{convertirMoneda(vuelo.PrecioVuelo)}
				</p>
				<div className="text-center mt-4">
					{vueloValido && (
						<button
							onClick={() => mostrarModalVuelo(vuelo)}
							className="rounded-lg bg-blue-700 hover:bg-blue-900 text-white px-8 py-2"
						>
							Reservar
						</button>
					)}
					{!vueloValido && <p className="text-red-500">Vuelo no disponible</p>}
				</div>
			</div>
			{mostrarModalReserva && (
				<Modal onClose={() => setMostrarModalReserva(false)}>
					<FormModalReserva
						vuelo={vueloSeleccionado}
						vueloValido={vueloValido}
						setMostrarModal={setMostrarModalReserva}
						setDatosReserva={setDatosReserva}
						setRealizarReserva={setRealizarReserva}
					/>
				</Modal>
			)}
			{mostrarModalConfirmacion && (
				<Modal onClose={() => setMostrarModalConfirmacion(false)} tamano="sm">
					<div className="h-full flex flex-col items-center justify-between">
						<div className="py-2 md:py-4 text-xs md:text-sm">
							{mensajeConfirmacion}
						</div>
						<button
							onClick={() => setMostrarModalConfirmacion(false)}
							className="rounded-lg bg-stone-500 hover:bg-stone-700 text-white px-8 py-2 text-xs md:text-base"
						>
							Cerrar
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default DetalleVuelo;
