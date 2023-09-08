type inputProps = {
  children: React.ReactNode;
  className: string;
  handleInputFile?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

type divProps = inputProps & {
  handleDropFile: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleClose: () => void;
};

const div = ({
  children,
  className,
  handleDropFile,
  handleDragOver,
  handleClose,
}: divProps) => {
  return (
    <div
      className={className}
      onDrop={handleDropFile}
      onDragOver={handleDragOver}
      onClick={handleClose}
    >
      {children}
    </div>
  );
};
type divType = { div: typeof div };

const input = ({ children, className, handleInputFile }: inputProps) => {
  return (
    <>
      <input
        id='input_file'
        type='file'
        className='hidden'
        onChange={handleInputFile}
      />
      <label
        htmlFor='input_file'
        className={className}
      >
        {children}
      </label>
    </>
  );
};
type inputType = { input: typeof input };

export const Upload: divType & inputType = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

Upload.div = div;
Upload.input = input;
