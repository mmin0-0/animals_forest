'use client';
import * as modalStyle from '@/app/styles/component/modal.css';
import { Typography } from '@/app/_component/Text';
import { TextInput, PwInput } from '@/app/_component/Input';
import { Button, CloseButton } from '@/app/_component/Button';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage('');

    const result = await signIn('credentials', {
      username: id,
      password,
      redirect: false,
    });

    if (result?.error) {
      setMessage('아이디와 비밀번호가 일치하지 않습니다.');
      return;
    }
    router.replace('/home');
  };

  const onChangeId:ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword:ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <modalStyle.ModalWrap>
      <modalStyle.ModalCont>
        <modalStyle.ModalHeader>
          <Typography as="h4" styleProps={{ size: "large", weight: "semiBold" }}>로그인하세요.</Typography>
          <CloseButton />
        </modalStyle.ModalHeader>
        <form onSubmit={onSubmit}>
          <modalStyle.ModalBody>
            <modalStyle.InputContainer>
              <TextInput
                id="user_id"
                name="id"
                className="inputLabel"
                value={id}
                onChange={onChangeId} placeholder="아이디를 입력해주세요."
                required={true}
              >아이디</TextInput>
              <PwInput
                id="user_password"
                name="password"
                className="inputLabel"
                value={password}
                onChange={onChangePassword} placeholder="비밀번호를 입력해주세요."
                required={true}
              >비밀번호</PwInput>
            </modalStyle.InputContainer>
          </modalStyle.ModalBody>
          <modalStyle.ModalFooter>
            <modalStyle.ModalError>{message}</modalStyle.ModalError>
            <Button type="submit" styleProps={{ size: "large" }} className="btn-center" disabled={!id && !password}>로그인</Button>
          </modalStyle.ModalFooter>
        </form>
      </modalStyle.ModalCont>
    </modalStyle.ModalWrap>
  )
}