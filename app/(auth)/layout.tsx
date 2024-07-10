import { ChildProps } from '@/lib/types/definition';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: ChildProps) {
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
		<main className='min-h-screen flex justify-center items-center'>
			<div className='w-72 md:w-96 flex flex-col justify-center items-center bg-slate-200 dark:bg-dark100 p-4 md:p-10 rounded-lg'>
				{children}
			</div>
		</main>
	);
}
