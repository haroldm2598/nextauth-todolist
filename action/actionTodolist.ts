'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const CreateTodolistSchema = z.object({
	title: z.string().min(1, { message: 'Title is requried' })
});

export async function createTodolist(formData: FormData) {
	try {
		const { title } = CreateTodolistSchema.parse({
			title: formData.get('title') as string
		});

		await prisma.todolist.create({
			data: {
				userId: formData.get('userId') as string,
				title,
				slug: (formData.get('slug') as string)
					.replace(/\s+/g, '-')
					.toLowerCase()
			}
		});
	} catch (err) {
		console.error('validation error', err);
	}

	revalidatePath('/admin');
}
