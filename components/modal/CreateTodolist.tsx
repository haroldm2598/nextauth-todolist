'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

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

const FormSchema = z.object({
	title: z.string().min(1, 'Title is required')
});

export default function CreateTodolist() {
	const ref = useRef<HTMLFormElement>(null);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: ''
		}
	});

	const onSubmit = () => {
		console.log('testing');
	};

	return (
		<dialog id='modalCreateTodolist' className='modal'>
			<div className='modal-box max-w-[300px]'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
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
