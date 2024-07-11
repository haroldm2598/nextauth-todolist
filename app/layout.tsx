import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Nextauth Todolist',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<Provider>
					<Navbar />
					<main className='min-h-screen'>{children}</main>
					<Toaster />
				</Provider>
			</body>
		</html>
	);
}
