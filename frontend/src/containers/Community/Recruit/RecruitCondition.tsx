import { Datepicker } from "flowbite-react";

const RecruitCondition = () => {


  return (
		<>
			<div className='flex flex-row flex-wrap'>
				<div className='flex flex-col w-1/2 justify-center gap-3 p-3'>
					<div className='flex justify-start'>모집 구분</div>
					<select name='category' className='select'>
						<option value=''> 카테고리 선택</option>
						<option value='IT'>IT</option>
						<option value='인문'>인문</option>
						<option value='언어'>언어</option>
						<option value='사회'>사회</option>
						<option value='역사'>역사</option>
						<option value='과학'>과학</option>
						<option value='디자인'>디자인</option>
						<option value='교육'>교육</option>
						<option value='의예'>의예</option>
						<option value='예체능'>예체능</option>
						<option value='자기소개'>자기소개</option>
						<option value='자유주제'>자유주제</option>
					</select>
				</div>
				<div className='flex flex-col w-1/2 justify-center gap-3 p-3'>
					<div className='flex justify-start'>모집 인원</div>
					<select name='category' className='select'>
						<option value=''>인원 미정</option>
						<option value='1'>1명</option>
						<option value='2'>2명</option>
						<option value='3'>3명</option>
						<option value='4'>4명</option>
						<option value='5'>5명</option>
						<option value='6'>6명</option>
						<option value='7'>7명</option>
						<option value='8'>8명</option>
						<option value='9'>9명</option>
						<option value='10'>10명 이상</option>
					</select>
				</div>
				<div className='flex flex-col w-1/2 justify-center gap-3 p-3'>
					<div className='flex justify-start'>진행 기간</div>
					<select name='category' className='select'>
						<option value=''>기간 미정 ~ 6개월 이상</option>
						<option value='1'>1개월</option>
						<option value='2'>2개월</option>
						<option value='3'>3개월</option>
						<option value='4'>4개월</option>
						<option value='5'>5개월</option>
						<option value='6'>6개월</option>
						<option value='7'>장기</option>
					</select>
				</div>
				<div className='flex flex-col w-1/2 justify-center gap-3 p-3'>
					<div className='flex justify-start'>마감일</div>
					<Datepicker />
				</div>
			</div>
		</>
	);
}

export default RecruitCondition;