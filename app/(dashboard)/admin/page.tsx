import { getServerSession } from 'next-auth';

import { options } from '@/app/api/auth/[...nextauth]/options';
import User from '@/components/User';
import prisma from '@/lib/db';
import CreateTodolist from '@/components/modal/CreateTodolist';
import BtnDelete from '../components/BtnDelete';
import BtnExpand from '../components/BtnExpand';

export default async function DashboardPage() {
	// IF ONLY YOU WANT TO GETSERVERSESSION
	// -- Check if user is authenticated
	// if (session?.user) {
	// 	return <h2>welcome to back Mr.{session?.user.username}</h2>;
	// }
	const session = await getServerSession(options);
	const users = await prisma.user.findUnique({
		where: {
			email: session?.user.email as string
		},
		include: {
			todolist: true
		}
	});

	return (
		<main>
			<div className='flex flex-col md:flex-row flex-wrap justify-center gap-6'>
				{users?.todolist.map((item) => (
					<div
						key={item.id}
						className='flex flex-col justify-between p-4 w-72 md:w-96 max-w-sm min-h-64 dark:bg-main300 dark:text-main100 border border-gray-300 rounded-lg shadow-lg dark:shadow-gray-700'
					>
						<h1 className='font-semibold'>{item.title}</h1>

						<div className='max-w-sm text-right space-x-2'>
							<BtnExpand />
							<BtnDelete userId={item.id as string} />
						</div>
					</div>
				))}
			</div>

			<CreateTodolist userId={users?.id as string} />
		</main>
	);
}
