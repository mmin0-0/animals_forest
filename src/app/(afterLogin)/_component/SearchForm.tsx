'use client';

import { SearchInput } from "@/app/_component/Input";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

type Props = {q?: string, pf?: string, f?: string};
export default function SearchForm({q, pf, f}: Props){
  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push(`/search?q=${e.currentTarget.search.value}`);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <SearchInput id="search" name="search" placeholder="검색어를 입력해주세요." defaultValue={q} />
        <input type="hidden" name="pf" defaultValue={pf} />
        <input type="hidden" name="f" defaultValue={f} />
      </form>
    </div>
  )
}