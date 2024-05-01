import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './containers/MainPage';
import Community from './containers/Community';
import MyPage from './containers/MyPage.tsx';
import Detail from './containers/Community/Detail/Detail.tsx';
import Essay from './containers/Essay/index.tsx';
import TextDetail from './containers/Essay/Detail/TextDetail.tsx';
import Recruit from './containers/Community/Recruit/index.tsx';
import { ViewerPage } from './containers/Viewer/ViewerPage.tsx';
import Group from './containers/Group/index.tsx';
import Challenge from './containers/Challenge/index.tsx';
import { KakaoCallback } from './containers/MainPage/Login/KaKao.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NaverCallback } from './containers/MainPage/Login/Naver.tsx';
import { GoogleCallback } from './containers/MainPage/Login/Google.tsx';
import ReadDetail from './containers/MyPage.tsx/Read/ReadDetail.tsx';
import GroupDetail from './containers/MyPage.tsx/Group/GroupDeatail.tsx';
import ReadDetailModal from './components/ReadDetailModal.tsx';
import Essay02 from './containers/Essay/test02.tsx';
import Essay01 from './containers/Essay/original.tsx';
function App() {
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path='/community' element={<Community />} />
						<Route path='/detail' element={<Detail />} />
						<Route path='/challenge' element={<Challenge />} />
						<Route path='/recruit' element={<Recruit />} />
						<Route path='/text' element={<TextDetail />} />
						<Route path='/essay' element={<Essay01 />} />
						<Route path='/group' element={<Group />} />
						<Route path='/mypage' element={<MyPage />} />
						<Route path='/mypage/read' element={<ReadDetail />} />
						<Route path='/mypage/group' element={<GroupDetail />} />
						<Route path='/viewer' element={<ViewerPage />} />
						<Route path='/summary' element={<ReadDetailModal />} />
						<Route path='/readit' element={<KakaoCallback />} />
						<Route path='/login/oauth2/code/naver' element={<NaverCallback />} />
						<Route path='/lobby' element={<GoogleCallback />} />
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
}

export default App;
