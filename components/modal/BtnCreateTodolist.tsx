'use client';

import { Button } from '../ui/button';
import { SquarePen } from 'lucide-react';

export default function BtnCreateTodolist() {
	const showModalCreate = () => {
		const modalCreate = document.getElementById('modalCreateTodolist');
		if (modalCreate) return (modalCreate as HTMLDialogElement).showModal();
	};

	return (
		<Button size='sm' onClick={showModalCreate}>
			<SquarePen />
		</Button>
	);
}
