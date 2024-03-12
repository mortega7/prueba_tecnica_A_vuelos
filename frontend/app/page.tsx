'use client';

import { useState } from 'react';
import menu from './menu';
import Topbar from '@/components/Topbar';

export default function Home() {
	const [selectedMenu, setSelectedMenu] = useState('busqueda');

	const renderComponent = () => {
		const selected = menu.find((item) => item.id === selectedMenu);
		if (selected) {
			return selected.component;
		}
		return null;
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-start gap-6 bg-gradient-to-b from-slate-50 to-slate-300">
			<Topbar
				menu={menu}
				selectedMenu={selectedMenu}
				setSelectedMenu={setSelectedMenu}
			/>
      {renderComponent()}
		</main>
	);
}
