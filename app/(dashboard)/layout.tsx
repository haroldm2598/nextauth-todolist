import { ChildProps } from '@/lib/types/definition';

export default function AdminLayout({ children }: ChildProps) {
	return <main className='pt-20'>{children}</main>;
}
