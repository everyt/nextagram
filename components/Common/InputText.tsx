'use client';

import { useState } from 'react';

type Props = {
  type?: string;
  className?: string;
  placeholder?: string;
  onChange: ({ value }: { value: string }) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
};

export default function Input({
  type = 'text',
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

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setText(value);
    onChange({ value });
  };

  return (
    <input
      type={type}
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
