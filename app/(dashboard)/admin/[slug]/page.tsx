import prisma from '@/lib/db';
import BtnCreate from '../../components/Button/BtnCreate';
import ModalCreateList from '../../components/Modal/ModalCreateList';

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
		<main className='min-h-screen pt-20'>
			<section>
				{/* Content */}
				<div className='w-96 md:min-w-[32rem] p-4 min-h-96 border border-gray-300 rounded-lg flex flex-col justify-between dark:bg-slate-100 dark:text-slate-600 shadow-lg dark:shadow-gray-700'>
					<div>
						<h1>{todolistData?.title}</h1>
						{todolistData?.contentList.map((item) => {
							return (
								<div key={item.id}>
									<p>{item.list}</p>
								</div>
							);
						})}
					</div>
					{/* Content Button */}
					<div>
						{/* create tast button */}
						<BtnCreate />
					</div>
				</div>
			</section>

			<ModalCreateList listId={todolistData?.id as string} />
		</main>
	);
}
