type IconProps = {
  iconName: string,
  size?: string,
}
export default function Icon({ iconName, size }: IconProps) {
  return (
    <span className="material-symbols-outlined" style={{fontSize: size}}>
      {iconName}
    </span>
  )
}