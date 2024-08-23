import React from "react"
import { Editor } from "novel"
import { type Editor as TipTapEditor } from "@tiptap/core"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type NovelEditorProps = {
  setContent: any
  title: string
  content: string | undefined
}

export default function NovelEditor({
  setContent,
  content,
  title,
}: NovelEditorProps) {
  return (
    <div>
      <h2 className='pt-4 pb-3'>{title}</h2>
      <div>
        <Editor
          defaultValue={{
            type: "doc",
            content: [],
          }}
          onDebouncedUpdate={(editor?: TipTapEditor) => {
            setContent(editor?.getHTML())
          }}
          disableLocalStorage={true}
          className='bg-[#f1f7fd] dark:bg-slate-800 focus-visible:ring-neutral-600 dark:focus-visible:ring-neutral-600 max-w-[40vw]'
        />
      </div>
    </div>
  )
}
