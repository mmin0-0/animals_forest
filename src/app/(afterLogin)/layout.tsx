import { ReactNode } from "react";
import * as style from '@/app/styles/component/afterLayout.css';
import Header from "@/app/(afterLogin)/_component/Header";
import RightSearchZone from "@/app/(afterLogin)/_component/RightSearchZone";
import RQProvider from "@/app/(afterLogin)/_component/RQProvider";

type Props = {
  children: ReactNode,
  modal: ReactNode
}
export default function AfterLoginLayout({ children, modal }: Props) {
  return (
    <style.Wrapper>
      <Header />
      <RQProvider>
        <style.ContainerWrap>
          <style.WrapInner>
            <style.Container>{children}</style.Container>
            <style.FixMenu>
              <RightSearchZone />
            </style.FixMenu>
          </style.WrapInner>
        </style.ContainerWrap>
        {modal}
      </RQProvider>
    </style.Wrapper>
  )
}