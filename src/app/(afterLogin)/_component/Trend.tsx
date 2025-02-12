import { Typography } from '@/app/_component/Text';
import * as style from '@/app/styles/pages/rightSearchZone.css';
import { Hashtag } from '@/model/Hashtag';

type Props = {trend: Hashtag};
export default function Trend({trend}: Props){
  return (
    <style.TrendItem href={`/search?q=${encodeURIComponent(trend.title)}`}>
      <Typography styleProps={{size: 'small'}}>실시간 트렌드</Typography>
      <Typography as="strong" styleProps={{weight: 'semiBold'}}>{trend.title}</Typography>
      <Typography styleProps={{size: 'small'}}>{`${trend.count.toLocaleString()} posts`}</Typography>
    </style.TrendItem>
  )
}