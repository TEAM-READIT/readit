export const ViewerPage = () => {
	return (
		<>
			<div className="relative flex">
                <div className="relative flex flex-col w-4/5 h-screen">
					<div className="relative flex w-full h-2/3">
						<div className="relative flex flex-col w-1/5 h-full">
							<div className="w-full h-5/6 bg-yellow-100"></div>
							<div className="w-full h-1/6 bg-red-400"></div>
						</div>
						<div className="w-4/5 h-full bg-green-500"></div>
					</div>
					<div className="w-full h-1/3 bg-orange-500"></div>
				</div>
				<div className="w-1/5 h-screen bg-primary-500"></div>
            </div>
		</>
	);
};
