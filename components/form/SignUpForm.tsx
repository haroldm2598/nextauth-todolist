'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';

const FormSchema = z
	.object({
		username: z.string().min(1, 'Username is Required').max(30),
		email: z.string().min(1, 'Email is required').email('Invalid email'),
		password: z
			.string()
			.min(1, 'Password is required')
			.min(8, 'Password must have than 8 characters'),
		confirmPassword: z.string().min(1, 'Confirm Password is required')
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match'
	});

export function SignUpForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	});

	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
				<div className='space-y-2'>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter your username'
										type='text'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='mail@example.com'
										type='email'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pasword</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter a password'
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pasword</FormLabel>
								<FormControl>
									<Input
										placeholder='Re enter your password'
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className='w-full mt-6' type='submit'>
					Sign Up
				</Button>

				<div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
					or
				</div>

				<p className='text-center text-sm text-gray-600 mt-2'>
					If you already have an account &nbsp;
					<Link className='text-blue-500 hover:underline' href='/sign-in'>
						Sign in
					</Link>
				</p>
			</form>
		</Form>
	);
}
