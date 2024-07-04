'use client';

import { Button } from '../ui/button';

interface BtnProps {
	name: string;
}
export default function BtnCreateTodolist({ name }: BtnProps) {
	const showModalCreate = () => {
		const modalCreate = document.getElementById('modalCreateTodolist');
		if (modalCreate) return (modalCreate as HTMLDialogElement).showModal();
	};

	return <Button onClick={showModalCreate}>{name}</Button>;
}
