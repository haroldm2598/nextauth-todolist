import { getServerSession } from 'next-auth';

import { options } from '@/app/api/auth/[...nextauth]/options';
import User from '@/components/User';
import prisma from '@/lib/db';
import CreateTodolist from '@/components/modal/CreateTodolist';

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
			<div>
				<h2 className='font-semibold'>Server Session</h2>
				{users?.todolist.map((item) => (
					<div key={item.id}>
						<h1>{item.title}</h1>
					</div>
				))}
			</div>

			<CreateTodolist userId={users?.id as string} />
		</main>
	);
}
