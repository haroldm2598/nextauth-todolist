import { SignInForm } from '@/components/form/SignInForm';

export default function Home() {
	return (
		<main className='min-h-screen flex items-center justify-center'>
			<section className='max-w-md mx-auto bg-slate-200 rounded-lg'>
				<SignInForm />
			</section>
		</main>
	);
}
