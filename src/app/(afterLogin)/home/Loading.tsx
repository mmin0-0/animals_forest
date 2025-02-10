import * as style from '@/app/styles/pages/home.css';

export default function Loading() {
  return (
    <div className={style.LoadingWrap}>
      <svg className={style.Loader} height="100%" viewBox="0 0 32 32" width={40} >
      <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{stroke: 'rgb(0, 160, 95)', opacity: 0.2}}></circle>
      <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{stroke: 'rgb(0, 160, 95)', strokeDasharray: 80, strokeDashoffset: 60}}></circle>
      </svg>
    </div>
  )
}