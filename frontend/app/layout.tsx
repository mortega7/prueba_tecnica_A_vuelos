import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Prueba Técnica A - Vuelos',
	description:
		'Aplicación frontend para la prueba técnica, usando Next.js y React',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<div id="modal"></div>
			</body>
		</html>
	);
}
