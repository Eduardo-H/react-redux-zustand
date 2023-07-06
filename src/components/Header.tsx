import { useAppSelector } from '../store';
import { useCurrentLesson } from '../store/slices/player';

export function Header() {
  const { currentModule, currentLesson } = useCurrentLesson();
  const isCourseLoading = useAppSelector(state => state.player.isLoading);
  
  if (isCourseLoading) {
    return <h1 className="text-2xl fotn-bold">Loading...</h1>
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl fotn-bold">
        {currentLesson?.title}
      </h1>

      <span className="text-sm text-zinc-400">
        Module "{currentModule?.title}"
      </span>
    </div>
  )
}