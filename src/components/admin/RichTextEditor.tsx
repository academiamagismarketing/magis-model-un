import React, { useEffect, useRef, useState, useCallback } from 'react';
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
    RemoveFormatting,
    Link,
    Quote
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
    const isInitializedRef = useRef(false);

    // Initialize content only once or when value changes externally
    useEffect(() => {
        if (editorRef.current) {
            // Only set innerHTML if the editor is empty or value is being set externally
            const currentContent = editorRef.current.innerHTML;
            if (!isInitializedRef.current || (currentContent === '' && value !== '')) {
                editorRef.current.innerHTML = value || '';
                isInitializedRef.current = true;
            } else if (!isFocused && value !== currentContent) {
                // Update only when not focused and content differs
                editorRef.current.innerHTML = value || '';
            }
        }
    }, [value, isFocused]);

    const handleInput = useCallback(() => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            // Avoid updating if content is the same to prevent cursor jumping
            if (html !== value) {
                onChange(html);
            }
        }
    }, [onChange, value]);

    const execCommand = useCallback((command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        // Trigger input handler after command
        handleInput();
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, [handleInput]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        // Handle common keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    execCommand('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    execCommand('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    execCommand('underline');
                    break;
            }
        }
    }, [execCommand]);

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
            className="h-8 w-8 p-0 hover:bg-muted"
            onClick={(e) => {
                e.preventDefault();
                execCommand(command, arg);
            }}
            title={title}
        >
            <Icon className="h-4 w-4" />
        </Button>
    );

    return (
        <div className={cn("space-y-2", className)}>
            {label && <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
            <div className={cn(
                "border rounded-md bg-background transition-all",
                isFocused && "ring-2 ring-ring ring-offset-2"
            )}>
                <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30">
                    <ToolbarButton icon={Bold} command="bold" title="Negrito (Ctrl+B)" />
                    <ToolbarButton icon={Italic} command="italic" title="Itálico (Ctrl+I)" />
                    <div className="w-px h-5 bg-border mx-1" />
                    <ToolbarButton icon={Heading2} command="formatBlock" arg="h2" title="Título 2" />
                    <ToolbarButton icon={Heading3} command="formatBlock" arg="h3" title="Título 3" />
                    <div className="w-px h-5 bg-border mx-1" />
                    <ToolbarButton icon={List} command="insertUnorderedList" title="Lista com marcadores" />
                    <ToolbarButton icon={ListOrdered} command="insertOrderedList" title="Lista numerada" />
                    <div className="w-px h-5 bg-border mx-1" />
                    <ToolbarButton icon={Quote} command="formatBlock" arg="blockquote" title="Citação" />
                    <ToolbarButton icon={RemoveFormatting} command="removeFormat" title="Limpar formatação" />
                </div>
                <div
                    id={id}
                    ref={editorRef}
                    className={cn(
                        "min-h-[300px] p-4 focus:outline-none",
                        "prose prose-sm max-w-none dark:prose-invert",
                        "prose-headings:font-semibold prose-h2:text-xl prose-h3:text-lg",
                        "prose-p:my-2 prose-ul:my-2 prose-ol:my-2",
                        !value && !isFocused && "text-muted-foreground"
                    )}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        handleInput(); // Ensure final content is saved
                    }}
                    data-placeholder={placeholder || "Digite o conteúdo aqui..."}
                    style={{
                        minHeight: '300px',
                        wordBreak: 'break-word'
                    }}
                />
            </div>
            <p className="text-xs text-muted-foreground">
                Use a barra de ferramentas ou atalhos: Ctrl+B (negrito), Ctrl+I (itálico)
            </p>
        </div>
    );
};

export default RichTextEditor;
