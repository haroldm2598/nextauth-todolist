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
		<header className='bg-zinc-100 py-2 border-b border-zinc-200 fixed w-full z-10 top-0'>
			<nav className='container flex items-center justify-between'>
				{session?.user ? (
					<Link href='/admin'>
						<House className='text-black' />
					</Link>
				) : (
					<Link href='/'>
						<House className='text-black' />
					</Link>
				)}

				{session?.user ? (
					<div className='flex items-center space-x-2'>
						<BtnCreateTodolist />
						<ThemeSwitch />
						<UserAccountNav />
					</div>
				) : (
					<>
						<ThemeSwitch />
						<Link className={buttonVariants()} href='/sign-in'>
							Sign in
						</Link>
					</>
				)}
			</nav>
		</header>
	);
}
