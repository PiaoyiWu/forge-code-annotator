'use client'

import { useState } from "react";
import Link from "next/link";
import {FaFolder} from "react-icons/fa";
import {FaFile} from "react-icons/fa";
import {FaJava} from "react-icons/fa";

export default function FolderBar() {

    interface FileTreeFormatNode {
        name: string;
        type: "file" | "folder";
        children?: FileTreeFormatNode[];
    }

    const FileTreeFormatNode: FileTreeFormatNode = {
        name: "src/main/robot",
        type: "folder",
        children: [
            {
                name: "commands",
                type: "folder",
                children: [
                    {name: "autoHoodAngleOffsetCommand.java", type: "file"},
                    {name: "PivotDownCommand.java", type: "file"},
                    {name: "PivotUpCommand.java", type: "file"},
                    {name: "ShootCommand.java", type: "file"},
                    {name: "StopShooterCommand.java", type: "file"},
                    {name: "TemplateCommand.java", type: "file"},
                    
                ]
            },
            {
                name: "generated",
                type: "folder",
                children: [
                    {name: "TunerConstants.java", type: "file"},
                ]
            },
            {
                name: "subsystems",
                type: "folder",
                children: [
                    {name: "CommandSwerveDrivetrain.java", type: "file"},
                    {name: "IndexerSubsystem.java", type: "file"},
                    {name: "IntakeSubsystem.java", type: "file"},
                    {name: "LightSubsystem.java", type: "file"},
                    {name: "PivotSubsystem.java", type: "file"},
                    {name: "TurretShooterSubsystem.java", type: "file"},
                ]
            },
            {name: "Constants.java", type: "file"},
            {name: "LimelightHelpers.java", type: "file"},
            {name: "Main.java", type: "file"},
            {name: "Robot.java", type: "file"},
            {name: "RobotContainer.java", type: "file"},
        ]
    };

    const fatNavLinkAnimationClass = "cursor-pointer text-gray-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-150 hover:after:w-full"

    const fatNavLinkAnimationClassBlue = "flex cursor-pointer text-blue-800"


    function TreeNode({ fileTreeFormatNode } : { fileTreeFormatNode: FileTreeFormatNode }) {

        const [open, setOpen] = useState(true);
        const toggle = () => setOpen(bool => !bool);

        if (fileTreeFormatNode.type == "file") {

            return (
                <Link href={`/code/files/${fileTreeFormatNode.name.replace(".java", "")}`}>
                
                <div className="flex">
                    <FaJava size={14} color="#e06900" className="pr-1" />
                    <span className={fatNavLinkAnimationClass}>{fileTreeFormatNode.name}</span>
                </div>
                </Link>
            )

        } else {
            return (
                <div>
                    <div onClick={toggle} className={fatNavLinkAnimationClassBlue}>
                        <FaFolder size={18} color="blue" className="pr-1" />
                        <span>/{fileTreeFormatNode.name}</span>

                    </div>

                    {open && (
                        <div className="ml-5 border-l pl-2">
                            {fileTreeFormatNode.children?.map(child => (<TreeNode key={child.name} fileTreeFormatNode={child}/>))}
                        </div>
                    )}
                </div>
            )
        }

        // top ten recursive functions all time



    }

    return (
        <main>
            <div className="p-10 sticky top-10">
                <TreeNode fileTreeFormatNode={FileTreeFormatNode} />
            </div>
        </main>
    );
}