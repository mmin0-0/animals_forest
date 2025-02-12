import Link from 'next/link';
import ImgWrap from '@/app/_component/ImgWrap';
import IntroImage from '../../../../public/images/intro.png';
import * as introStyle from '@/app/styles/pages/intro.css';
import { Typography } from '@/app/_component/Text';

export default function Main(){
  return (
    <introStyle.introContainer>
      <introStyle.introContInner>
        <ImgWrap className="introImg" src={IntroImage} alt="모여봐요 동물의숲 커뮤니티" />
        <div>
          <Typography as="h2" styleProps={{size: "xlarge", weight:"bold"}}>지금 일어나고 있는 일</Typography>
          <introStyle.introBtnWrap>
            <Typography as="h4" styleProps={{size: "medium", weight: "semiBold"}}>지금 가입하세요.</Typography>
            <Link href="/i/flow/signup">가입하기</Link>
            <Typography styleProps={{size:"medium", weight:"semiBold"}}>이미 도토리 카페에 가입하셨나요?</Typography>
            <Link href="/login">로그인</Link>
          </introStyle.introBtnWrap>
        </div>
      </introStyle.introContInner>
    </introStyle.introContainer>
  )
}