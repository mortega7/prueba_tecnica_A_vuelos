import { MenuItem } from '@/helpers/interfaces';
import RegistroVuelo from '@/components/Vuelo/RegistroVuelo';
import Busqueda from '@/components/Busqueda/Busqueda';
import ListaVuelos from '@/components/Vuelo/ListaVuelos';
import Estadisticas from '@/components/Estadisticas/Estadisticas';

const menu: MenuItem[] = [
	{
		id: 'busqueda',
		title: 'Busca Vuelos',
		component: <Busqueda />,
	},
	{
		id: 'lista-vuelos',
		title: 'Listado de Vuelos Disponibles',
		component: <ListaVuelos />,
	},
	{
		id: 'registro',
		title: 'Registro de Vuelos',
		component: <RegistroVuelo />,
	},
	{
		id: 'estadisticas',
		title: 'Estadísticas',
		component: <Estadisticas />,
	},
];

export default menu;
