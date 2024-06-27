import { getServerSession } from 'next-auth';

import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function DashboardPage() {
	const session = await getServerSession(options);

	if (session?.user) {
		return <h2>welcome to back Mr.{session?.user.username}</h2>;
	}

	return <h2>Error please login first</h2>;
}
