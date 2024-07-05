import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface AuthLayoutProps {
	children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	// const { data: session, status } = useSession();
	// const router = useRouter();

	// if (status === 'loading') return <p>loading...</p>;

	// if (
	// 	session &&
	// 	(router.pathname === '/sign-in' || router.pathname === '/sign-up')
	// ) {
	// 	router.push('/');
	// 	return null;
	// }
	return (
		<div className='flex flex-col justify-center items-center bg-slate-200 p-10 rounded-lg'>
			{children}
		</div>
	);
}
