import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="Ada" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/96?img=32" alt="Mara" />
        <AvatarFallback>MA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
