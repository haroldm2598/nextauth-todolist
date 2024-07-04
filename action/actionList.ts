// 'use server';

// import { z } from 'zod';
// import prisma from '@/lib/db';
// import { revalidatePath } from 'next/cache';

// const CreateListSchema = z.object({
// 	list: z.string().min(1, { message: 'List must not be empty' })
// });

// export async function createList(formData: FormData) {
// 	const { list } = CreateListSchema.parse({
// 		list: formData.get('list') as string
// 	});

// 	await prisma.list.create({
// 		data: {
// 			list
// 		}
// 	});

// 	revalidatePath('/');
// }
