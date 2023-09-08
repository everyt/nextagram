//TODO: 반응형 웹으로 구성할 때,
//폰 화면은 ~768px, 태블릿은 ~1024px, 데스크탑은 1024~px라고 하네

//~1024px, 네비바가 작아지고 푸터바가 사라져

//즉 ~768px일때 네비바와 푸터바가 상하단에 위치해야 해
//이건 tailwind css를 어떻게 다르게 써야 할 텐데
//w-18 sm:w-50 lg:w-56' 이런 느낌으로

//기본 폰트 사이즈를 10pt로 주고 rem을 계산하면 쉬울 것 같네

//필요한 버튼은 10개, 다크모드는 색깔만 전환하면 되니까 11개?
//설정까지 12개?

//그럼 음. 링크 버튼이 아닌 경우엔 굳이 컴포넌트로 뺄 필요가 있나?
//인풋은 밸류를 주기 위해서 필요해.
//코드를 깔끔하게 유지하기 위해서 버튼 12개를 컴포넌트로 관리할 수 있을까?

//아예 애니메이션 재생시키고 다른거 띄워버리는거같은데???
// 아하 그래서 나올땐 새로 어라 아닌데
// 패딩이 되네 ㅋㅋㅋ

'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const [x, setX] = useState(0);
  const [scaleX, setScaleX] = useState(1);

  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    x === 0 ? setX(80) : setX(0);
  };

  return (
    <motion.div
      className='p-1 w-18 sm:w-50 lg:w-56 h-screen'
      animate={{ x, scaleX }}
      transition={{ ease: 'easeInOut', duration: 0.6 }}>
      <button onClick={handleClick}>왔다리갔다리</button>
      <div className='border-2 h-screen'></div>
    </motion.div>
  );
}
