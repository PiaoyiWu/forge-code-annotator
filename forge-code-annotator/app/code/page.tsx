import fs from "fs";
import path from "path";
import { codeToHtml, codeToHast } from "shiki";
import FolderBar from "@/components/FolderBar";
import {toHtml} from "hast-util-to-html";

export default async function CodePage() {

    // move this to codeblock.tsx later

    const codePath = path.join(process.cwd(), "4421-robot-code-2026/CodePage.java");
    const dispCode = fs.readFileSync(codePath, "utf-8");

    const addTextColors = await codeToHtml(dispCode, {lang: "java", theme: "one-light"});
    const createHast = await codeToHast(dispCode,
        {lang: "java", theme: "one-light"}
    );

    const preTag = createHast.children[0] as any;
    const codeTag = preTag.children[0] as any;
    const lines = codeTag.children.filter((node:any) => (node.type === "element" && node.tagName === "span")) as any[];

    // code was written after FilePage (/[filepage]/page.tsx)
    return (
        <main className="flex flex-col h-screen max-h-screen overflow-hidden">
            <h1 className="font-bold p-4 text-5xl font-mono ml-5 flex-none">CODE</h1>
            <div className="min-h-0 flex flex-1 border-t border-black">
                <div className="h-full overflow-y-auto flex-none">
                    <FolderBar />
                </div>
                
                <div className="h-full overflow-y-auto border-l border-black bg-[#FAFAFA] text-xs p-10 min-w-0 flex-1 overflow-x-auto [&_pre]:w-max [&_pre]:min-w-full">
                    {lines.map((line, i) => {
                        const lineNumber = i + 1;
                        const lineToHTML = toHtml(line);

                        return (
                            <div key={lineNumber} data-linenumber={lineNumber} className="flex whitespace-pre">
                                <span className="text-gray-500 pr-2 min-w-8 select-none">{lineNumber}</span>
                                <span dangerouslySetInnerHTML={{__html: lineToHTML}} />

                            </div>
                        );
                    })}
                </div>

            </div>
        </main>
    );
}