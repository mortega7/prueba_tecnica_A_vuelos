import { useEffect, useState } from 'react';
import { getAeropuertos } from '@/helpers/http';
import { Aeropuerto, DatosBusquedaVuelos } from '@/helpers/interfaces';
import { SetDispatchGeneral } from '@/helpers/types';

const FormBusqueda = ({
	setDatosBusqueda,
	setRealizarBusqueda,
}: {
	setDatosBusqueda: SetDispatchGeneral<DatosBusquedaVuelos>;
	setRealizarBusqueda: SetDispatchGeneral<boolean>;
}) => {
	const [aeropuertos, setAeropuertos] = useState<Aeropuerto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [camposValidacion, setCamposValidacion] = useState({
		origen: '',
		destino: '',
		fechaDesde: '',
		fechaHasta: '',
	});
	const [errorValidacion, setErrorValidacion] = useState({
		origen: false,
		destino: false,
		fechaDesde: false,
		fechaHasta: false,
	});

	useEffect(() => {
		async function fetchAeropuertos() {
			try {
				const aeropuertosFetched = await getAeropuertos();
				setAeropuertos(aeropuertosFetched);
			} catch (err) {
				console.log(err);
			}

			setIsLoading(false);
		}

		fetchAeropuertos();
	}, []);

	const setValorCampo = (campo: string, valor: string) => {
		setCamposValidacion((prevState) => {
			return {
				...prevState,
				[campo]: valor,
			};
		});
	};

	const validarFormBusqueda = () => {
		const { origen, destino, fechaDesde, fechaHasta } = camposValidacion;
		setErrorValidacion({
			origen: !origen || (!!origen && origen === destino),
			destino: !destino || (!!destino && origen === destino),
			fechaDesde: !fechaDesde,
			fechaHasta: !fechaHasta,
		});

		if (origen && destino && fechaDesde && fechaHasta && origen !== destino) {
			enviarFormBusqueda();
		}
	};

	const enviarFormBusqueda = () => {
		const formData: DatosBusquedaVuelos = {
			IdAeropuertoOrigen: parseInt(camposValidacion.origen) || 0,
			IdAeropuertoDestino: parseInt(camposValidacion.destino) || 0,
			FechaDesde: camposValidacion.fechaDesde,
			FechaHasta: camposValidacion.fechaHasta,
		};

		setDatosBusqueda(formData);
		setRealizarBusqueda(true);
	};

	return (
		<div className="flex flex-col items-start justify-start gap-2 mb-8">
			<div className="font-semibold mb-3 text-sm md:text-xl xl:text-3xl text-blue-700">Busca Vuelos</div>
			<div className="flex flex-col gap-2 items-center justify-start">
				{isLoading && (
					<p className="text-center text-sm">Cargando Aeropuertos...</p>
				)}
				{!isLoading && aeropuertos.length === 0 && (
					<p className="text-center">No hay Aeropuertos para mostrar.</p>
				)}
				{!isLoading && aeropuertos.length > 0 && (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
							<div className="flex flex-col md:gap-2">
								<label className="text-xs">Origen:</label>
								<select
                  required
									onChange={(event) => {
										setValorCampo('origen', event.target.value);
									}}
									className={`px-4 py-2 border-2 rounded-lg text-xs ${
										errorValidacion.origen
											? 'border-red-500'
											: 'border-stone-400'
									}`}
								>
									<option value="">- Seleccione -</option>
									{aeropuertos.map((aeropuerto: Aeropuerto, index) => {
										return (
											<option key={index} value={aeropuerto.IdAeropuerto}>
												{aeropuerto.NombreAeropuerto} (
												{aeropuerto.CodigoAeropuerto})
											</option>
										);
									})}
								</select>
							</div>
							<div className="flex flex-col md:gap-2">
								<label className="text-xs">Destino:</label>
								<select
                  required
									onChange={(event) => {
										setValorCampo('destino', event.target.value);
									}}
									className={`px-4 py-2 border-2 rounded-lg text-xs ${
										errorValidacion.destino
											? 'border-red-500'
											: 'border-stone-400'
									}`}
								>
									<option value="">- Seleccione -</option>
									{aeropuertos.map((aeropuerto: Aeropuerto, index) => {
										return (
											<option key={index} value={aeropuerto.IdAeropuerto}>
												{aeropuerto.NombreAeropuerto} (
												{aeropuerto.CodigoAeropuerto})
											</option>
										);
									})}
								</select>
							</div>
							<div className="flex flex-col md:gap-2">
								<label className="text-xs">Desde:</label>
								<input
									type="date"
                  required
									onChange={(event) => {
										setValorCampo('fechaDesde', event.target.value);
									}}
									className={`px-4 py-2 border-2 rounded-lg text-xs ${
										errorValidacion.fechaDesde
											? 'border-red-500'
											: 'border-stone-400'
									}`}
								/>
							</div>
							<div className="flex flex-col md:gap-2">
								<label className="text-xs">Hasta:</label>
								<input
									type="date"
                  required
									onChange={(event) => {
										setValorCampo('fechaHasta', event.target.value);
									}}
									className={`px-4 py-2 border-2 rounded-lg text-xs ${
										errorValidacion.fechaHasta
											? 'border-red-500'
											: 'border-stone-400'
									}`}
								/>
							</div>
							<div className="flex flex-col gap-2 justify-end">
								<button
									className="rounded-lg bg-blue-700 hover:bg-blue-900 text-white px-8 py-2"
									onClick={validarFormBusqueda}
								>
									Buscar
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default FormBusqueda;
