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

	console.log(users?.todolist[1].contentList.length);

	return (
		<main>
			<div className='flex flex-col md:flex-row flex-wrap justify-center gap-6'>
				{users?.todolist.map((item) => (
					<div
						key={item.id}
						className='flex flex-col justify-between p-4 mx-auto md:mx-0 w-72 md:w-96 max-w-sm min-h-64 dark:bg-main300 dark:text-main100 border border-gray-300 rounded-lg shadow-lg dark:shadow-gray-700'
					>
						<section>
							<h1 className='font-semibold text-lg uppercase'>{item.title}</h1>
							<div className='mt-3 space-y-2'>
								{/* {item.contentList.map((lists) => (
									<p key={lists.id} className='opacity-90 leading-4'>
										{lists.list}
									</p>
								))} */}
								{/* may mali rine na double yung nasa paragraph */}
								{item?.contentList.length > 4
									? // if greater than 4 yung content so ipreview niya na 4 lang
									  item?.contentList.slice(0, 4).map((lists) => {
											const truncateStr = lists?.list;
											const maxLength = 80;

											return (
												<p key={lists.id} className='opacity-90 leading-4'>
													{truncateStr?.length > maxLength
														? `${truncateStr.substring(0, maxLength)} ...`
														: truncateStr}
												</p>
											);
									  })
									: // else less than 4 lang yung content edi preview lang niya kung ano natitira
									  item?.contentList.map((lists) => {
											const truncateStr = lists?.list;
											const maxLength = 80;

											return (
												<p key={lists.id} className='opacity-90 leading-4'>
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
		</main>
	);
}
