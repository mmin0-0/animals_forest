import { P, Strong } from '@/app/_component/Text';
import * as style from '@/app/styles/pages/rightSearchZone.css';
import { Hashtag } from '@/model/Hashtag';

type Props = {trend: Hashtag};
export default function Trend({trend}: Props){
  return (
    <style.TrendItem href={`/search?q=${encodeURIComponent(trend.title)}`}>
      <P styleProps={{size: 'xsmall'}}>실시간 트렌드</P>
      <Strong styleProps={{weight: "semiBold"}}>{trend.title}</Strong>
      <P styleProps={{size: 'xsmall'}}>{`${trend.count.toLocaleString()} posts`}</P>
    </style.TrendItem>
  )
}