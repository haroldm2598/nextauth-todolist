import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { options } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/lib/db';
import CreateTodolist from '@/components/modal/CreateTodolist';
import BtnDelete from '../components/Button/BtnDelete';
import BtnExpand from '../components/Button/BtnExpand';

export default async function DashboardPage() {
	// IF ONLY YOU WANT TO GETSERVERSESSION
	// -- Check if user is authenticated
	// if (session?.user) {
	// 	return <h2>welcome to back Mr.{session?.user.username}</h2>;
	// }
	const session = await getServerSession(options);
	const users = await prisma.user.findUnique({
		where: {
			email: session?.user.email as string
		},
		include: {
			todolist: {
				include: {
					contentList: true
				}
			}
		}
	});

	return (
		<section>
			<div className='flex flex-col md:flex-row flex-wrap justify-center gap-6'>
				{users?.todolist.map((item) => (
					<div
						key={item.id}
						className='flex flex-col justify-between p-4 mx-auto md:mx-0 w-72 md:w-96 max-w-sm min-h-64 dark:bg-dark100 dark:text-darkText100 border border-gray-300 dark:border-zinc-950 rounded-lg shadow-lg dark:shadow-md dark:shadow-zinc-900'
					>
						<section>
							<h1 className='font-semibold text-lg uppercase'>{item.title}</h1>
							<div className='mt-3 space-y-2'>
								{item?.contentList.length > 4
									? item?.contentList.slice(0, 4).map((lists) => {
											const truncateStr = lists?.list;
											const maxLength = 80;

											return (
												<p key={lists.id} className='opacity-80 leading-4'>
													{truncateStr?.length > maxLength
														? `${truncateStr.substring(0, maxLength)} ...`
														: truncateStr}
												</p>
											);
									  })
									: item?.contentList.map((lists) => {
											const truncateStr = lists?.list;
											const maxLength = 80;

											return (
												<p key={lists.id} className='opacity-80 leading-4'>
													{truncateStr?.length > maxLength
														? `${truncateStr.substring(0, maxLength)} ...`
														: truncateStr}
												</p>
											);
									  })}
							</div>
						</section>

						<section className='max-w-sm text-right space-x-2'>
							<Link href={`/admin/${item.slug}`}>
								<BtnExpand />
							</Link>

							<BtnDelete userId={item.id as string} />
						</section>
					</div>
				))}
			</div>

			<CreateTodolist userId={users?.id as string} />
		</section>
	);
}
