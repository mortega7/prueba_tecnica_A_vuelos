import React from 'react';
import { TopbarProps } from '@/helpers/interfaces';
import Image from 'next/image';

const Topbar = (props: TopbarProps) => {
	const { menu, selectedMenu, setSelectedMenu } = props;

	return (
		<header className="w-[90%] rounded-b-xl h-24 bg-gradient-to-r from-blue-500 via-stone-200 to-sky-200">
			<nav className="w-full h-full flex justify-center items-center gap-4">
				<div className="w-1/5">
					<Image
						src="/images/viajes-logo.png"
						width="0"
						height="0"
						sizes="100vw"
						style={{ width: 'auto', height: '80px' }}
						alt="Logotipo de Viajes"
						className="cursor-pointer"
						onClick={() => setSelectedMenu('busqueda')}
						priority={true}
					/>
				</div>
				<div className="w-3/5 h-full justify-center gap-1 flex flex-col md:hidden">
					{menu.map((item, index) => {
						return (
							<div
								key={index}
								className={`px-6 cursor-pointer text-xs md:text-regular md:text-center ${
									selectedMenu === item.id
										? 'text-blue-900 font-bold'
										: 'hover:font-semibold'
								}`}
								onClick={() => setSelectedMenu(item.id)}
							>
								{item.title}
							</div>
						);
					})}
				</div>
				<div className="w-3/5 h-full justify-center gap-1 hidden md:flex">
					{menu.map((item, index) => {
						return (
							<div
								key={index}
								className={`px-6 cursor-pointer text-xs lg:text-sm md:text-center mt-6 lg:mt-8 xl:mt-10 ${
									selectedMenu === item.id
										? 'text-blue-900 border-b-4 border-blue-900 font-bold'
										: 'hover:border-b-4 hover:border-neutral-400 hover:font-semibold'
								}`}
								onClick={() => setSelectedMenu(item.id)}
							>
								{item.title}
							</div>
						);
					})}
				</div>
			</nav>
		</header>
	);
};

export default Topbar;
