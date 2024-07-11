'use client';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteList } from '@/action/actionList';

interface BtnDeleteListProps {
	id: string;
}
export default function BtnDeleteList({ id }: BtnDeleteListProps) {
	const handleDelete = async () => {
		await deleteList(id);
	};

	return (
		<Button
			size='icon'
			className='dark:bg-black dark:text-white'
			onClick={handleDelete}
		>
			<Trash2 size='18' />
		</Button>
	);
}
