import React from 'react';

interface TextEditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
}

export const TextEditor = ({ onChange, value }: TextEditorProps) => {
    return (
        <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            onChange={onChange}
            value={value}
            placeholder="Write your comment here..."
        />
    );
};
