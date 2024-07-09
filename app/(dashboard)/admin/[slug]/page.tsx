import prisma from '@/lib/db';
import BtnCreate from '../../components/Button/BtnCreate';
import ModalCreateList from '../../components/Modal/ModalCreateList';
import BtnDeleteList from '../../components/Button/BtnDeleteList';

interface TodolistProps {
	params: {
		slug: string;
	};
}

export default async function TodolistPage({ params }: TodolistProps) {
	const todolistData = await prisma.todolist.findUnique({
		where: {
			slug: params?.slug
		},
		include: {
			contentList: true
		}
	});

	return (
		<main>
			<section className='mx-auto max-w-sm'>
				{/* ito pinaka Card */}
				<div className='w-96 md:min-w-[32rem] p-4 min-h-96 border border-gray-300 rounded-lg flex flex-col justify-between dark:bg-slate-100 dark:text-slate-600 shadow-lg dark:shadow-gray-700'>
					<section>
						<h1 className='font-semibold text-xl uppercase'>
							{todolistData?.title}
						</h1>

						<div className='mt-3 space-y-1'>
							{todolistData?.contentList.map((item) => {
								return (
									<div
										key={item.id}
										className='flex justify-between items-center'
									>
										<p className='w-72 md:w-80 leading-5'>{item.list}</p>
										<BtnDeleteList id={item.id as string} />
									</div>
								);
							})}
						</div>
					</section>

					<section>
						<BtnCreate />
					</section>
				</div>
			</section>
			<ModalCreateList listId={todolistData?.id as string} />
		</main>
	);
}
