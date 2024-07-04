import Link from 'next/link';
import { getServerSession } from 'next-auth';

// components
import { House } from 'lucide-react';
import { buttonVariants } from './ui/button';
import UserAccountNav from './UserAccountNav';

// lib
import { options } from '@/app/api/auth/[...nextauth]/options';
import BtnCreateTodolist from './modal/BtnCreateTodolist';

export default async function Navbar() {
	const session = await getServerSession(options);

	return (
		<header className='bg-zinc-100 py-2 border-b border-zinc-200 fixed w-full z-10 top-0'>
			<nav className='container flex items-center justify-between'>
				<Link href='/'>
					<House />
				</Link>

				{session?.user ? (
					<div className='space-x-2'>
						<BtnCreateTodolist name='create' />
						<UserAccountNav />
					</div>
				) : (
					<Link className={buttonVariants()} href='/sign-in'>
						Sign in
					</Link>
				)}
			</nav>
		</header>
	);
}
