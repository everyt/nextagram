type inputProps = {
  children: React.ReactNode;
  className: string;
  handleInputFile: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

type divProps = {
  children: React.ReactNode;
  className: string;
  handleDropFile: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (ev: React.DragEvent<HTMLDivElement>) => void;
};

const div = ({
  children,
  className,
  handleDropFile,
  handleDragOver,
}: divProps) => {
  return (
    <div
      className={className}
      onDrop={handleDropFile}
      onDragOver={handleDragOver}
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
      <label htmlFor='input_file' className={className}>
        {children}
      </label>
    </>
  );
};
type inputType = { input: typeof input };

const upload: divType & inputType = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return { children };
};

upload.div = div;
upload.input = input;

export default upload;
