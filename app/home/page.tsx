import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function TestHome() {
	const session = await getServerSession(options);
	return <div>{JSON.stringify(session)}</div>;
}
