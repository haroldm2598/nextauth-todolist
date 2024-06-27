import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const body = await req.json();
	const { email, username, password } = body;

	// ayaw gumana nung prisma import bakit kaya
	// const existingEmail = await prisma

	return NextResponse.json(body);
}
