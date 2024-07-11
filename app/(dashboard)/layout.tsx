import { ChildProps } from '@/lib/types/definition';

export default function AdminLayout({ children }: ChildProps) {
	return <main className='min-h-full py-20 lg:py-0 lg:pt-20'>{children}</main>;
}
