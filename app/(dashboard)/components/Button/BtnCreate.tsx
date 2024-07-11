'use client';
import { Button } from '@/components/ui/button';
import { SquarePen } from 'lucide-react';

export default function BtnCreate() {
	const showModalList = () => {
		const modalList = document.getElementById('modalCreateList');
		if (modalList) return (modalList as HTMLDialogElement).showModal();
	};

	return (
		<Button className='dark:bg-black dark:text-white' onClick={showModalList}>
			<SquarePen size='18' />
		</Button>
	);
}
