import Link from 'next/link';
import { getServerSession } from 'next-auth';

// components
import { House } from 'lucide-react';
import { buttonVariants } from './ui/button';
import UserAccountNav from './UserAccountNav';

// lib
import { options } from '@/app/api/auth/[...nextauth]/options';
import BtnCreateTodolist from './modal/BtnCreateTodolist';
import ThemeSwitch from './ThemeSwitch';

export default async function Navbar() {
	const session = await getServerSession(options);

	return (
		<header className='py-2 bg-zinc-100 dark:bg-slate-900 border-b border-zinc-200 dark:border-slate-950 fixed w-full z-10 top-0'>
			<nav className='container flex items-center justify-between'>
				{session?.user ? (
					<Link href='/admin'>
						<House />
					</Link>
				) : (
					<Link href='/'>
						<House />
					</Link>
				)}

				{session?.user ? (
					<div className='flex items-center space-x-2'>
						<BtnCreateTodolist />
						<ThemeSwitch />
						<UserAccountNav />
					</div>
				) : (
					<div className='flex items-center space-x-2'>
						<ThemeSwitch />
						<Link
							className={`${buttonVariants()} dark:bg-dark200 dark:text-white`}
							href='/sign-in'
						>
							Sign in
						</Link>
					</div>
				)}
			</nav>
		</header>
	);
}
