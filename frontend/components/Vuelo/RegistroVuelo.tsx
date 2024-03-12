import { useEffect, useState } from 'react';
import FormRegistro from './FormRegistro';
import { DatosRegistroVuelo } from '@/helpers/interfaces';
import { setVuelo } from '@/helpers/http';
import Modal from '../Modal';

const RegistroVuelo = () => {
	const [mensajeConfirmacion, setMensajeConfirmacion] = useState(<></>);
	const [mostrarModalConfirmacion, setMostrarModalConfirmacion] =
		useState(false);
	const [datosVuelo, setDatosVuelo] = useState({} as DatosRegistroVuelo);
	const [guardarVuelo, setGuardarVuelo] = useState(false);

	useEffect(() => {
		async function almacenarVuelo() {
			try {
				if (guardarVuelo) {
					const idVuelo = await setVuelo(datosVuelo);
					setMensajeConfirmacion(
						<p>
							El vuelo se ha generado con éxito, el nuevo ID es:{' '}
							<span className="text-blue-600 text-base md:text-lg font-semibold">
								{idVuelo}
							</span>
						</p>
					);

					setMostrarModalConfirmacion(true);
				}
			} catch (err: any) {
				setMensajeConfirmacion(
					<>
						<p>
							Se produjo un inconveniente al guardar el vuelo, por favor
							inténtalo de nuevo!
						</p>
						{err && (
							<p className="text-red-500 mt-2">
								{err.message}
							</p>
						)}
					</>
				);

				setMostrarModalConfirmacion(true);
			}
		}

		almacenarVuelo();
	}, [datosVuelo, guardarVuelo]);

	return (
		<div className="w-[80%] rounded-lg bg-white px-4 md:px-8 xl:px-12 py-2 md:py-4 xl:py-8">
			<FormRegistro
				setDatosVuelo={setDatosVuelo}
				setGuardarVuelo={setGuardarVuelo}
			/>
			{mostrarModalConfirmacion && (
				<Modal onClose={() => setMostrarModalConfirmacion(false)} tamano="sm">
					<div className="h-full flex flex-col items-center justify-between">
						<div className="py-2 md:py-4 text-xs md:text-sm">
							{mensajeConfirmacion}
						</div>
						<button
							onClick={() => setMostrarModalConfirmacion(false)}
							className="mt-2 rounded-lg bg-stone-500 hover:bg-stone-700 text-white px-8 py-2 text-xs md:text-base"
						>
							Cerrar
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default RegistroVuelo;
