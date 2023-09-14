type Props = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

export default function DropDownButton({
  children,
  className,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full content-center whitespace-nowrap rounded-lg p-3 hover:bg-stone-100 ${className}`}
    >
      {children}
    </button>
  );
}
