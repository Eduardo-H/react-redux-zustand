import { ChevronDown } from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';

import { Lesson } from './Lesson';
import { useStore } from '../zustand-store';

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const { lessons, currentModuleIndex, currentLessonIndex, play } = useStore(store => {
      return {
        lessons: store.course?.modules[moduleIndex].lessons,
        currentModuleIndex: store.currentModuleIndex,
        currentLessonIndex: store.currentLessonIndex,
        play: store.play
      }
    }
  );

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          { moduleIndex + 1 }
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">
            { amountOfLessons } { amountOfLessons === 1 ? 'class' : 'classes' }
          </span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 transition-transform group-data-[state=open]:rotate-180" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {
            lessons && (
              lessons.map((lesson, lessonIndex) => (
                <Lesson 
                  key={lesson.id} 
                  title={lesson.title} 
                  duration={lesson.duration} 
                  onPlay={() => play([moduleIndex, lessonIndex])}
                  isCurrent={
                    currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex
                  } 
                />
              ))
            )
          }
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}