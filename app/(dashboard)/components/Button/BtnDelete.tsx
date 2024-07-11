'use client';
import { Trash2 } from 'lucide-react';
import { deleteTodolist } from '@/action/actionTodolist';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { userIdProps } from '@/lib/types/definition';

export default function BtnDelete({ userId }: userIdProps) {
	const handleDelete = async () => {
		try {
			await deleteTodolist(userId);
			toast({
				description: 'Successfully delete'
			});
		} catch (err) {
			toast({
				description: 'Unsuccessfully delete',
				variant: 'destructive'
			});
		}
	};
	return (
		<Button
			size='sm'
			className='dark:bg-black dark:text-white'
			onClick={handleDelete}
		>
			<Trash2 size='18' />
		</Button>
	);
}
