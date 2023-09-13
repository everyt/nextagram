import { TextareaHTMLAttributes, useState } from 'react';

type Props = {
  className?: string;
  placeholder?: string;
  onChange: ({ value }: { value: string }) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (ev: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  value?: string;
  disabled?: boolean;
};

export default function Textarea({
  className,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  value = '',
  disabled = false,
}: Props) {
  const [text, setText] = useState(value);

  const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = ev.target;
    setText(value);
    onChange({ value });
  };

  return (
    <textarea
      value={text}
      className={className}
      placeholder={placeholder}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      disabled={disabled}
    />
  );
}
