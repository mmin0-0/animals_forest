'use client';
import * as modalStyle from '@/app/styles/component/modal.css';
import { Typography } from '@/app/_component/Text';
import { TextInput, PwInput, FileInput } from '@/app/_component/Input';
import { InputWrap, InputLabel } from '@/app/styles/component/input.css';
import { Button, CloseButton } from '@/app/_component/Button';
import onSubmit from '@/app/(beforeLogin)/_lib/signup';
import { useFormStatus, useFormState } from 'react-dom';

function showMessage(message: string | null | undefined) {
  if (message === 'no_id') {
    return '아이디를 입력하세요.';
  }
  if (message === 'no_name') {
    return '닉네임을 입력하세요.';
  }
  if (message === 'no_password') {
    return '비밀번호를 입력하세요.';
  }
  if (message === 'no_image') {
    return '이미지를 업로드하세요.';
  }
  if (message === 'user_exists') {
    return '이미 사용 중인 아이디입니다.';
  }
  if (message === 'nickname must be a string') {
    return '닉네임을 입력해 주세요.';
  }
  return message;
}

export default function SignupModal() {
  const [state, formAction] = useFormState(onSubmit, {message: null});
  const { pending } = useFormStatus();
  
  return (
    <modalStyle.ModalWrap>
      <modalStyle.ModalCont>
        <modalStyle.ModalHeader>
          <Typography as="h4" styleProps={{ size: "large", weight: "semiBold" }}>계정을 생성하세요.</Typography>
          <CloseButton />
        </modalStyle.ModalHeader>
        <form action={formAction}>
          <modalStyle.ModalBody>
            <modalStyle.InputContainer>
              <TextInput
                id="user_id"
                name="id"
                className="inputLabel"
                placeholder="아이디를 입력해주세요."
                required={true}
                defaultValue={state.id as string}
              >아이디</TextInput>
              <PwInput
                id="user_password"
                name="password"
                className="inputLabel"
                placeholder="비밀번호를 입력해주세요."
                required={true}
                defaultValue={state.password as string}
              >비밀번호</PwInput>
              <TextInput
                id="user_name"
                name="name"
                className="inputLabel"
                placeholder="닉네임을을 입력해주세요."
                required={true}
                defaultValue={state.nickname as string}
              >닉네임</TextInput>
              <InputWrap>
                <InputLabel htmlFor="user_profile">프로필</InputLabel>
                <FileInput
                  id="user_profile"
                  name="image"
                  accept="image/*"
                  required={true}
                  defaultValue={state.image as string} 
                />
              </InputWrap>
            </modalStyle.InputContainer>
          </modalStyle.ModalBody>
          <modalStyle.ModalFooter>
            <modalStyle.ModalError>{showMessage(state?.message)}</modalStyle.ModalError>
            <Button 
              type="submit" 
              styleProps={{ size: "large" }}
              className="btn-center"
              disabled={pending}
              >가입하기</Button>
          </modalStyle.ModalFooter>
        </form>
      </modalStyle.ModalCont>
    </modalStyle.ModalWrap>
  )
}