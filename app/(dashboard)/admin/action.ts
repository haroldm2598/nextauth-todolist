'use server';

import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createList(formData: FormData) {
	try {
		await prisma.todolist.create({
			data: {
				title: formData.get('title') as string,
				slug: (formData.get('title') as string)
					.replace(/\s+/g, '-')
					.toLowerCase()
			}
		});
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				console.log(
					'There is a unique constraint violation, a new user cannot be created with this email'
				);
			}
		}
	}

	revalidatePath('/admin');
}
