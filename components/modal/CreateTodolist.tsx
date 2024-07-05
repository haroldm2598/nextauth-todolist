'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { createTodolist } from '@/action/actionTodolist';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form';
import { Input } from '../ui/input';

interface CreateTodolistProps {
	userId: string;
}

const FormSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	userId: z.string()
});

export default function CreateTodolist({ userId }: CreateTodolistProps) {
	const ref = useRef<HTMLFormElement>(null);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			userId: userId,
			title: ''
		}
	});

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		const formData = new FormData();
		formData.append('userId', values.userId);
		formData.append('title', values.title);

		await createTodolist(formData);
		console.log('Created new todolist');
	};

	return (
		<dialog id='modalCreateTodolist' className='modal'>
			<div className='modal-box max-w-[300px]'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='userId'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type='hidden' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='title.....' type='text' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className='w-full mt-6' type='submit'>
							Create Todolist
						</Button>
					</form>
				</Form>
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
}

{
	/* 
<form
	ref={ref}
	// action={async (formData) => {
	// 	await createTodoList(formData);
	// 	ref.current?.reset();
	// }}
	className='flex flex-col gap-y-2 w-full'
>
	<input
		type='text'
		name='title'
		placeholder='Title'
		className='input input-bordered px-2 py-1 rounded-sm dark:text-slate-600'
	/>
	<button type='submit' className='bg-blue-500 py-2 text-white rounded-sm'>
		Create Post
	</button>
</form>; 
*/
}
