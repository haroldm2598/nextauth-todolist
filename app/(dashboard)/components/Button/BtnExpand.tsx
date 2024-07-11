import { Button } from '@/components/ui/button';
import { Maximize } from 'lucide-react';

export default function BtnExpand() {
	return (
		<Button size='sm' className='dark:bg-black dark:text-white'>
			<Maximize size='18' />
		</Button>
	);
}
