'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { createTodolist } from '@/action/actionTodolist';

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
import { toast } from '../ui/use-toast';

interface CreateTodolistProps {
	userId: string;
}

const FormSchema = z.object({
	userId: z.string(),
	title: z.string().min(1, 'title is required')
});

export default function CreateTodolist({ userId }: CreateTodolistProps) {
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
		toast({
			description: 'Successfully create todolist'
		});
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
*/
}
