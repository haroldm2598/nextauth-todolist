'use client';

import { createList } from '@/action/actionList';
import { useRef } from 'react';

interface ModalCreateListProps {
	listId: string;
}

export default function ModalCreateList({ listId }: ModalCreateListProps) {
	const ref = useRef<HTMLFormElement>(null);

	const handleAction = async (formData: FormData) => {
		await createList(formData);
		ref.current?.reset();
	};

	return (
		<dialog id='modalCreateList' className='modal'>
			<div className='modal-box text-center max-w-[300px]'>
				<form
					ref={ref}
					action={handleAction}
					className='flex flex-col gap-y-2 w-full'
				>
					<input type='hidden' name='listId' value={listId} />
					<textarea
						name='list'
						rows={5}
						placeholder='list here.....'
						className='textarea textarea-bordered px-2 py-1 rounded-sm'
					/>
					<button
						type='submit'
						className='bg-blue-500 py-2 text-white rounded-sm'
					>
						Create List
					</button>
				</form>
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
}
