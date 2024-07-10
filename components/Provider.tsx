'use client';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

interface ProviderProps {
	children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
	// use this when you want to use client sesssion
	return (
		<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
			<SessionProvider>{children}</SessionProvider>
		</ThemeProvider>
	);
}
