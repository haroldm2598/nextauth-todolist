import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
	children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return <div className='bg-slate-200 p-10 rounded-lg'>{children}</div>;
}
