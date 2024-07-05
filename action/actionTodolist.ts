'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const CreateTodolistSchema = z.object({
	title: z.string().min(1, { message: 'Title is requried' }),
	userId: z.string()
});

export async function createTodolist(formData: FormData) {
	try {
		const { userId, title } = CreateTodolistSchema.parse({
			userId: formData.get('userId') as string,
			title: formData.get('title') as string
		});

		await prisma.todolist.create({
			data: {
				userId,
				title,
				slug: (formData.get('title') as string)
					.replace(/\s+/g, '-')
					.toLowerCase()
			}
		});

		revalidatePath('/admin');
	} catch (err) {
		console.error('validation error', err);
	}
}
