import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Link as LinkIcon,
    Image as ImageIcon,
    Quote,
    Undo,
    Redo,
    Eraser,
    Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    className?: string;
}

const RichTextEditor = ({
    value,
    onChange,
    label,
    placeholder = 'Digite o conteúdo aqui...',
    className
}: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline cursor-pointer',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg border shadow-sm max-w-full my-4',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder,
            }),
            CharacterCount,
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-2',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Update content if value changes externally (and is different)
    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            if (editor.getText() === '' && value === '') return;
            if (editor.isEmpty && value) {
                editor.commands.setContent(value);
            }
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL do link:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = () => {
        const url = window.prompt('URL da imagem:');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}

            <div className="border rounded-md bg-background shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/30 border-b sticky top-0 z-10">
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().chain().focus().undo().run()}
                            className="h-8 w-8 p-0"
                            title="Desfazer"
                        >
                            <Undo className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().chain().focus().redo().run()}
                            className="h-8 w-8 p-0"
                            title="Refazer"
                        >
                            <Redo className="h-4 w-4" />
                        </Button>
                    </div>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    <div className="flex items-center gap-1">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('bold')}
                            onPressedChange={() => editor.chain().focus().toggleBold().run()}
                            className="h-8 w-8 p-0"
                            aria-label="Negrito"
                        >
                            <Bold className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('italic')}
                            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                            className="h-8 w-8 p-0"
                            aria-label="Itálico"
                        >
                            <Italic className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('underline')}
                            onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                            className="h-8 w-8 p-0"
                            aria-label="Sublinhado"
                        >
                            <UnderlineIcon className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('strike')}
                            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                            className="h-8 w-8 p-0"
                            aria-label="Tachado"
                        >
                            <Strikethrough className="h-4 w-4" />
                        </Toggle>
                    </div>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    <div className="flex items-center gap-1">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('heading', { level: 1 })}
                            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className="h-8 w-8 p-0"
                            aria-label="Título 1"
                        >
                            <Heading1 className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('heading', { level: 2 })}
                            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className="h-8 w-8 p-0"
                            aria-label="Título 2"
                        >
                            <Heading2 className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('heading', { level: 3 })}
                            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className="h-8 w-8 p-0"
                            aria-label="Título 3"
                        >
                            <Heading3 className="h-4 w-4" />
                        </Toggle>
                    </div>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    <div className="flex items-center gap-1">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('bulletList')}
                            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                            className="h-8 w-8 p-0"
                            aria-label="Lista com marcadores"
                        >
                            <List className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('orderedList')}
                            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                            className="h-8 w-8 p-0"
                            aria-label="Lista numerada"
                        >
                            <ListOrdered className="h-4 w-4" />
                        </Toggle>
                    </div>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    <div className="flex items-center gap-1">
                        <Toggle
                            size="sm"
                            pressed={editor.isActive({ textAlign: 'left' })}
                            onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
                            className="h-8 w-8 p-0"
                            aria-label="Alinhar à esquerda"
                        >
                            <AlignLeft className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive({ textAlign: 'center' })}
                            onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
                            className="h-8 w-8 p-0"
                            aria-label="Centralizar"
                        >
                            <AlignCenter className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive({ textAlign: 'right' })}
                            onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
                            className="h-8 w-8 p-0"
                            aria-label="Alinhar à direita"
                        >
                            <AlignRight className="h-4 w-4" />
                        </Toggle>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive({ textAlign: 'justify' })}
                            onPressedChange={() => editor.chain().focus().setTextAlign('justify').run()}
                            className="h-8 w-8 p-0"
                            aria-label="Justificar"
                        >
                            <AlignJustify className="h-4 w-4" />
                        </Toggle>
                    </div>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={addLink}
                            className={cn("h-8 w-8 p-0", editor.isActive('link') && "bg-accent")}
                            title="Link"
                        >
                            <LinkIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={addImage}
                            className="h-8 w-8 p-0"
                            title="Imagem (URL)"
                        >
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Toggle
                            size="sm"
                            pressed={editor.isActive('blockquote')}
                            onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                            className="h-8 w-8 p-0"
                            aria-label="Citação"
                        >
                            <Quote className="h-4 w-4" />
                        </Toggle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            className="h-8 w-8 p-0"
                            title="Linha Horizontal"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editor.chain().focus().unsetAllMarks().run()}
                            className="h-8 w-8 p-0"
                            title="Limpar Formatação"
                        >
                            <Eraser className="h-4 w-4" />
                        </Button>
                    </div>
                </div>



                <EditorContent editor={editor} />
            </div>
            <p className="text-xs text-muted-foreground flex justify-between">
                <span>Selecione o texto para ver opções rápidas ou use a barra de ferramentas.</span>
                <span>
                    {editor.storage.characterCount?.words ? `${editor.storage.characterCount.words()} palavras` : ''}
                </span>
            </p>
        </div>
    );
};

export default RichTextEditor;
