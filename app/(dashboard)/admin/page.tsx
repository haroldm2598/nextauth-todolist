import { getServerSession } from 'next-auth';

import { options } from '@/app/api/auth/[...nextauth]/options';
import User from '@/components/User';

export default async function DashboardPage() {
	// IF ONLY YOU WANT TO GETSERVERSESSION
	const session = await getServerSession(options);

	if (session?.user) {
		return <h2>welcome to back Mr.{session?.user.username}</h2>;
	}

	return (
		<main>
			<div>
				<h2>Client Session</h2>
				<User />
			</div>

			<div>
				<h2>Server Session</h2>
				{JSON.stringify(session)}
			</div>
		</main>
	);
}
