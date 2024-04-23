import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './containers/MainPage';
import Community from './containers/Community';
import MyPage from './containers/MyPage.tsx';
import Detail from './containers/Community/Detail/Detail.tsx';
import Essay from './containers/Essay/index.tsx';
import TextDetail from './containers/Essay/Detail/TextDetail.tsx';
import Recruit from './containers/Community/Recruit/index.tsx';
import { ViewerPage } from './containers/Viewer/ViewerPage.tsx';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/community' element={<Community />} />
					<Route path='/detail' element={<Detail />} />
					<Route path='/recruit' element={<Recruit />} />
					<Route path='/text' element={<TextDetail />} />
					<Route path='/essay' element={<Essay />} />
					<Route path='/mypage' element={<MyPage />} />
					<Route path='/viewer' element={<ViewerPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
