'use client';
import React from "react";
import { ChangeEventHandler } from "react";
import { InputWrap, InputGroup, Eye } from "@/app/styles/component/input.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

type RadioInputProps = {
  text?: string,
  id: string,
  className?: string,
  name: string,
  value?: string,
  defaultChecked?: boolean,
  onChange?: ChangeEventHandler<HTMLInputElement>
}
export const RadioInput = ({ text, id, name, className, value, defaultChecked, onChange }: RadioInputProps) => {
  return (
    <InputWrap>
      <input type="radio" name={name} id={id} value={value} defaultChecked={defaultChecked} onChange={onChange} />
      <label htmlFor={id} className={className}>{text}</label>
    </InputWrap>
  )
};

type SearchInputProps = {
  id: string,
  name?: string,
  placeholder?: string,
  defaultValue?: string
};
export const SearchInput = ({ id, name, placeholder, defaultValue }: SearchInputProps) => {
  return (
    <InputWrap>
      <input type="search" name={name} id={id} defaultValue={defaultValue} placeholder={placeholder} />
      <label className="hide" htmlFor="search">search</label>
      <i>
        <svg width={20} viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path
              d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
          </g>
        </svg>
      </i>
    </InputWrap>
  )
};

type TextInputProps = {
  children: React.ReactNode,
  id: string,
  name?: string,
  className?: string,
  defaultValue?: string,
  value?: string,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  placeholder?: string,
  required?: boolean
};

export const TextInput = ({ children, id, name, className, defaultValue, value, onChange, placeholder, required }: TextInputProps) => {
  return (
    <InputWrap>
      <label htmlFor={id} className={className}>{children}</label>
      <input type="text" id={id} name={name} value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder} required={required} />
    </InputWrap>
  )
};

type PwInputProps = {
  children: React.ReactNode,
  id: string,
  name?: string,
  className?: string,
  defaultValue?: string,
  value?: string,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  placeholder?: string,
  required?: boolean
};
export const PwInput = ({ children, id, name, className, defaultValue, value, onChange, placeholder, required }: PwInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleEye = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputWrap>
      <label htmlFor={id} className={className}>{children}</label>
      <InputGroup>
        <input type={showPassword ? 'text' : 'password'} id={id} name={name} value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder} required={required} />
        <Eye onClick={toggleEye}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </Eye>
      </InputGroup>
    </InputWrap>
  )
};

type FileInputProps = {
  id: string,
  name: string,
  defaultValue?: string,
  accept?: string,
  multiple?: boolean,
  hidden?: boolean,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  required?: boolean,
};
export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ id, name, accept, multiple = false, hidden = false, onChange, required, defaultValue }, ref) => {
    return (
      <input
        type="file"
        id={id}
        name={name}
        accept={accept}
        multiple={multiple}
        hidden={hidden}
        ref={ref}
        onChange={onChange}
        required={required}
        defaultValue={defaultValue}
      />
    );
  }
);
FileInput.displayName = "FileInput";

type TextAreaProps = {
  id: string,
  name: string,
  value?: string,
  onChange?: ChangeEventHandler<HTMLTextAreaElement>,
  placeholder?: string
};
export const TextArea = ({id, name, value, onChange, placeholder}:TextAreaProps) => {
  return (
    <InputWrap>
      <label htmlFor={id} className="hide">{id}</label>
      <textarea name={name} id={id} placeholder={placeholder} onChange={onChange} value={value} />
    </InputWrap>
  )
};