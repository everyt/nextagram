import { useCallback } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  boolean: boolean;
  handleClose: (ev: React.MouseEvent<HTMLElement>) => void;
};

export default function Modal({
  children,
  className,
  boolean,
  handleClose,
}: Props) {
  const preventClick = useCallback((ev: React.MouseEvent<HTMLElement>) => {
    ev.stopPropagation();
  }, []);

  return (
    <>
      {boolean && (
        <div
          className='fixed z-50 flex h-screen w-screen items-center justify-center bg-black/50'
          onClick={handleClose}
        >
          <div className={className} onClick={preventClick}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
