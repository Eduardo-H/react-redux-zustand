import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

import { useCurrentLesson, useStore } from '../zustand-store';

import { Header } from '../components/Header';
import { Video } from '../components/Video';
import { Module } from '../components/Module';

export function Player() {
  const { course, load } = useStore(store => {
    return {
      course: store.course,
      load: store.load
    }
  });

  const { currentLesson } = useCurrentLesson();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (currentLesson) {
      document.title = currentLesson.title;
    }
  }, [currentLesson]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-[1100px] gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />  
            Leave feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-auto scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {
              course?.modules && (
                course.modules.map((module, index) => (
                  <Module 
                    key={module.id} 
                    moduleIndex={index} 
                    title={module.title} 
                    amountOfLessons={module.lessons.length} 
                  />
                ))
              )
            }
          </aside>
        </main>
      </div>
    </div>
  );
}