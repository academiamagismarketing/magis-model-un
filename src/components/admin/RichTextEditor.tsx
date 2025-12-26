import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Heading3,
    Undo,
    Redo,
    RemoveFormatting
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    id?: string;
    className?: string;
}

const RichTextEditor = ({
    value,
    onChange,
    label,
    placeholder,
    id,
    className
}: RichTextEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Initialize content
    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            // Only update if content is significantly different to avoid cursor jumping
            // This is a simple check; for production might need more robust diffing
            if (editorRef.current.innerHTML === '' || value === '') {
                editorRef.current.innerHTML = value;
            }
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const ToolbarButton = ({
        icon: Icon,
        command,
        arg,
        title
    }: {
        icon: any,
        command: string,
        arg?: string,
        title: string
    }) => (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => execCommand(command, arg)}
            title={title}
        >
            <Icon className="h-4 w-4" />
        </Button>
    );

    return (
        <div className={cn("space-y-2", className)}>
            {label && <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
            <div className="border rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex items-center gap-1 p-1 border-b bg-muted/20">
                    <ToolbarButton icon={Bold} command="bold" title="Negrito" />
                    <ToolbarButton icon={Italic} command="italic" title="Itálico" />
                    <div className="w-px h-4 bg-border mx-1" />
                    <ToolbarButton icon={Heading2} command="formatBlock" arg="<h2>" title="Título 2" />
                    <ToolbarButton icon={Heading3} command="formatBlock" arg="<h3>" title="Título 3" />
                    <div className="w-px h-4 bg-border mx-1" />
                    <ToolbarButton icon={List} command="insertUnorderedList" title="Lista com marcadores" />
                    <ToolbarButton icon={ListOrdered} command="insertOrderedList" title="Lista numerada" />
                    <div className="w-px h-4 bg-border mx-1" />
                    <ToolbarButton icon={RemoveFormatting} command="removeFormat" title="Limpar formatação" />
                </div>
                <div
                    id={id}
                    ref={editorRef}
                    className="min-h-[300px] p-4 focus:outline-none prose max-w-none dark:prose-invert"
                    contentEditable
                    onInput={handleInput}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    data-placeholder={placeholder}
                    dangerouslySetInnerHTML={{ __html: value }} // Initial render
                />
            </div>
            <p className="text-sm text-muted-foreground">
                Use a barra de ferramentas para formatar o texto.
            </p>
        </div>
    );
};

export default RichTextEditor;
