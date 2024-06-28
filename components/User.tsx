'use client';
import { useSession } from 'next-auth/react';
// IF ONLY YOU WANT TO GETCLIENTSESSION
export default function User() {
	const { data: session } = useSession();

	return <div>{JSON.stringify(session?.user?.email)}</div>;
}
