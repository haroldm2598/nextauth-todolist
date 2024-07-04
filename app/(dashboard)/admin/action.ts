'use server';

import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateListSchema = z.object({
	title: z.string().min(1, { message: 'Title must not be empty' })
});

export async function createList(formData: FormData) {
	// try {
	const { title } = CreateListSchema.parse({
		title: formData.get('title') as string
	});

	await prisma.todolist.create({
		data: {
			title,
			slug: (formData.get('title') as string).replace(/\s+/g, '-').toLowerCase()
			// author: {
			// 	connect: {
			// 		email: 'mike@testing.com'
			// 	}
			// }
		}
	});
	// } catch (error) {
	// if (error instanceof Prisma.PrismaClientKnownRequestError) {
	// 	if (error.code === 'P2002') {
	// 		console.log(
	// 			'There is a unique constraint violation, a new user cannot be created with this email'
	// 		);
	// 	}
	// }
	// }

	revalidatePath('/admin');
}
