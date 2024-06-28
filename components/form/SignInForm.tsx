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
import GithubSignIn from '../GithubSignIn';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const FormSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must have than 8 characters')
});

export function SignInForm() {
	const router = useRouter();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		const signInData = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false
		});

		if (signInData?.error) {
			toast({
				title: 'Error',
				description: 'something went wrong',
				variant: 'destructive'
			});
		} else {
			router.push('/admin');
			router.refresh();
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
				<div className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='testing@example.com'
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
				</div>
				<Button className='w-full mt-6' type='submit'>
					Sign In
				</Button>

				<div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
					or
				</div>

				<p className='text-center text-sm text-gray-600 mt-2'>
					If you don&apos;t have an account please &nbsp;
					<Link className='text-blue-500 hover:underline' href='/sign-up'>
						Sign up
					</Link>
				</p>

				<GithubSignIn />
			</form>
		</Form>
	);
}
