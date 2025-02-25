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
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

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
	const router = useRouter();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	});

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		const response = await fetch('/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: values.username,
				email: values.email,
				password: values.password
			})
		});

		if (response.ok) {
			router.push('/sign-in');
		} else {
			toast({
				title: 'Error',
				description: 'Registration failed',
				variant: 'destructive'
			});
		}
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
								<FormLabel className='dark:text-darkText100'>
									Username
								</FormLabel>
								<FormControl>
									<Input
										className='dark:bg-dark200 dark:focus:ring dark:focus:ring-blue-300 dark:shadow-md dark:shadow-zinc-900'
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
								<FormLabel className='dark:text-darkText100'>Email</FormLabel>
								<FormControl>
									<Input
										className='dark:bg-dark200 dark:focus:ring dark:focus:ring-blue-300  dark:shadow-md dark:shadow-zinc-900'
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
								<FormLabel className='dark:text-darkText100'>Pasword</FormLabel>
								<FormControl>
									<Input
										className='dark:bg-dark200 dark:focus:ring dark:focus:ring-blue-300  dark:shadow-md dark:shadow-zinc-900'
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
								<FormLabel className='dark:text-darkText100'>
									Confirm Pasword
								</FormLabel>
								<FormControl>
									<Input
										className='dark:bg-dark200 dark:focus:ring dark:focus:ring-blue-300  dark:shadow-md dark:shadow-zinc-900'
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
				<Button
					className='w-full mt-6 dark:bg-black dark:text-white dark:shadow-md dark:shadow-zinc-900'
					type='submit'
				>
					Sign Up
				</Button>

				<div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
					or
				</div>

				<p className='mt-2 text-center text-sm text-gray-600 dark:text-darkText100 '>
					If you already have an account &nbsp;
					<Link className='text-blue-500 hover:underline' href='/sign-in'>
						Sign in
					</Link>
				</p>
			</form>
		</Form>
	);
}
