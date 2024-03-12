import {
	convertirMoneda,
	esEmail,
	esVacio,
	obtenerFechaActual,
} from '@/helpers/funciones';
import { DatosReserva, Vuelo } from '@/helpers/interfaces';
import { SetDispatchGeneral } from '@/helpers/types';
import { useState } from 'react';

const FormModalReserva = ({
	vuelo,
  vueloValido,
	setMostrarModal,
  setDatosReserva,
  setRealizarReserva,
}: {
	vuelo: Vuelo;
  vueloValido: boolean;
	setMostrarModal: SetDispatchGeneral<boolean>;
	setDatosReserva: SetDispatchGeneral<DatosReserva>;
  setRealizarReserva: SetDispatchGeneral<boolean>;
}) => {
	const [camposValidacion, setCamposValidacion] = useState({
		correo: '',
		nombres: '',
		apellidos: '',
		cantidad: '',
		precio: 0,
	});
	const [errorValidacion, setErrorValidacion] = useState({
		correo: false,
		nombres: false,
		apellidos: false,
		cantidad: false,
	});

	const setValorCampo = (campo: string, valor: string) => {
		setCamposValidacion((prevState) => {
			return {
				...prevState,
				[campo]: valor,
			};
		});
	};

	const validarFormReserva = () => {
		const { correo, nombres, apellidos, cantidad } = camposValidacion;
		const validaciones = {
			correo: !esVacio(correo) && esEmail(correo),
			nombres: !esVacio(nombres),
			apellidos: !esVacio(apellidos),
			cantidad: !esVacio(cantidad),
		};

		setErrorValidacion({
			correo: !validaciones.correo,
			nombres: !validaciones.nombres,
			apellidos: !validaciones.apellidos,
			cantidad: !validaciones.cantidad,
		});

		if (validaciones.correo && validaciones.nombres && validaciones.apellidos && validaciones.cantidad) {
			enviarFormReserva();
		}
	};

	const enviarFormReserva = () => {
		const { anio, mes, dia, horas, minutos, segundos } = obtenerFechaActual();

		const formData: DatosReserva = {
			DatosUsuario: {
				CorreoUsuario: camposValidacion.correo,
				NombresUsuario: camposValidacion.nombres,
				ApellidosUsuario: camposValidacion.apellidos,
			},
			DatosReserva: {
				IdVuelo: vuelo.IdVuelo,
				FechaReserva: `${anio}-${mes}-${dia}`,
				HoraReserva: `${horas}:${minutos}:${segundos}`,
				CantidadAsientosReserva: parseInt(camposValidacion.cantidad),
				PrecioReserva: vuelo.PrecioVuelo * parseInt(camposValidacion.cantidad),
			},
		};

		setDatosReserva(formData);
    setRealizarReserva(true);
	};

	return (
		<div className="w-full flex flex-col gap-2">
			{!vueloValido && (
				<p className="text-xs md:text-sm mb-2 text-red-500">
					El vuelo no se puede reservar, ya pasó la fecha de salida!
				</p>
			)}
			{vueloValido && (
				<p className="text-xs md:text-sm my-2">
					Por favor complete este formulario para confirmar la reserva:
				</p>
			)}
			<div className="flex justify-between my-2 bg-sky-100 p-4 rounded-lg">
				<div className="flex flex-col">
					<div className="text-xs md:text-sm font-semibold">Aerolinea</div>
					<div className="text-xs">{vuelo.Aerolinea.NombreAerolinea}</div>
				</div>
				<div className="flex flex-col">
					<div className="text-xs md:text-sm font-semibold">Salida</div>
					<div className="text-xs">
						{vuelo.FechaSalidaVuelo} {vuelo.HoraSalidaVuelo}
					</div>
				</div>
				<div className="flex flex-col">
					<div className="text-xs md:text-sm font-semibold">Llegada</div>
					<div className="text-xs">
						{vuelo.FechaLlegadaVuelo} {vuelo.HoraLlegadaVuelo}
					</div>
				</div>
			</div>
			<label className="text-xs md:mt-2">Correo Electrónico:</label>
			<input
				type="email"
				required
				disabled={!vueloValido}
				onChange={(event) => {
					setValorCampo('correo', event.target.value);
				}}
				className={`px-4 py-2 border-2 rounded-lg text-xs ${
					errorValidacion.correo ? 'border-red-500' : 'border-stone-400'
				}`}
			/>
			<label className="text-xs md:mt-2">Nombres:</label>
			<input
				type="text"
				required
				disabled={!vueloValido}
				onChange={(event) => {
					setValorCampo('nombres', event.target.value);
				}}
				className={`px-4 py-2 border-2 rounded-lg text-xs ${
					errorValidacion.nombres ? 'border-red-500' : 'border-stone-400'
				}`}
			/>
			<label className="text-xs md:mt-2">Apellidos:</label>
			<input
				type="text"
				required
				disabled={!vueloValido}
				onChange={(event) => {
					setValorCampo('apellidos', event.target.value);
				}}
				className={`px-4 py-2 border-2 rounded-lg text-xs ${
					errorValidacion.apellidos ? 'border-red-500' : 'border-stone-400'
				}`}
			/>
			<label className="text-xs md:mt-2">Cantidad de asientos:</label>
			<select
				required
				disabled={!vueloValido}
				onChange={(event) => {
					setValorCampo('cantidad', event.target.value);
				}}
				className={`px-4 py-2 border-2 rounded-lg text-xs ${
					errorValidacion.cantidad ? 'border-red-500' : 'border-stone-400'
				}`}
			>
				<option value="">- Seleccione -</option>
				{Array.from({ length: 20 }, (_, index) => (
					<option key={index} value={index + 1}>
						{index + 1}
					</option>
				))}
			</select>
			<label className="text-xs md:mt-2">Precio total:</label>
			<p className="text-base md:text-lg font-semibold">
				{convertirMoneda(
					vuelo.PrecioVuelo * (parseInt(camposValidacion.cantidad) || 0)
				)}
			</p>
			<div className="mt-2 md:mt-4 flex gap-4 justify-center items-center">
				{vueloValido && (
					<button
						onClick={validarFormReserva}
						className="rounded-lg bg-blue-700 hover:bg-blue-900 text-white px-8 py-2 text-sm md:text-base"
					>
						Reservar
					</button>
				)}
				<button
					onClick={() => setMostrarModal(false)}
					className="rounded-lg bg-stone-500 hover:bg-stone-700 text-white px-8 py-2 text-sm md:text-base"
				>
					Cancelar
				</button>
			</div>
		</div>
	);
};

export default FormModalReserva;
