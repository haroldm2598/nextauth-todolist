import prisma from '@/lib/db';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { z } from 'zod';

/*
	THIS ROUTE IF FOR SIGN-UP PURPOSE
	balik mo nalng yung confirm password after nito ma implement pero bago yon sa prisma schema mag migrate ka ulet kapag may bagong models
	z.object({
		confirmPassword: z.string().min(1, 'Confirm Password is required')
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match'
	});
*/
const UserSchema = z.object({
	username: z.string().min(1, 'Username is Required').max(30),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must have than 8 characters')
});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, username, password } = UserSchema.parse(body);

		const existingEmail = await prisma.user.findUnique({
			where: { email: email }
		});
		const existingUsername = await prisma.user.findUnique({
			where: { username: username }
		});

		if (existingEmail) {
			return NextResponse.json(
				{ user: null, message: 'Email already exist' },
				{ status: 409 }
			);
		}

		if (existingUsername) {
			return NextResponse.json(
				{ user: null, message: 'User already exist' },
				{ status: 409 }
			);
		}
		const hashedPassword = await hash(password, 10);
		const newUser = await prisma.user.create({
			data: {
				email,
				username,
				password: hashedPassword
			}
		});

		const { password: newUserPassword, ...rest } = newUser;

		return NextResponse.json(
			{
				user: rest,
				message: 'new user has been created'
			},
			{ status: 201 }
		);
	} catch (err) {
		return NextResponse.json(
			{
				message: 'server went wrong'
			},
			{ status: 500 }
		);
	}
}
