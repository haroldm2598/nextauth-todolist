'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateListSchema = z.object({
	todolistId: z.string(),
	list: z.string().min(1, { message: 'List must not be empty' })
});

export async function createList(formData: FormData) {
	try {
		const { todolistId, list } = CreateListSchema.parse({
			todolistId: formData.get('listId') as string,
			list: formData.get('list') as string
		});

		await prisma.list.create({
			data: {
				todolistId,
				list
			}
		});
	} catch (err) {
		console.log('Error create list', err);
	}

	revalidatePath('/admin');
}

export async function deleteList(id: string) {
	await prisma.list.delete({
		where: {
			id
		}
	});

	revalidatePath('/admin');
}
