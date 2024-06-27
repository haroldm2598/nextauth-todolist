import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
	session: { strategy: 'jwt' },
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'mail@example.com'
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Enter your password'
				}
			},

			async authorize(credentials) {
				const user = { id: '1', email: 'rold', password: '123qwerty' };
				return user;
			}
		})
	]
};
