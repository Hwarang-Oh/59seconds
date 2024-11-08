import clsx from 'clsx';

type ToggleProps = {
  pressed: boolean;
  onPressedChange: () => void;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
};

export function Toggle({
  pressed,
  onPressedChange,
  size = 'lg',
  children,
}: Readonly<ToggleProps>) {
  const paddingClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
  };

  return (
    <button
      type="button"
      className={clsx(
        'border rounded hover:bg-gray-200 transition',
        paddingClasses[size],
        pressed ? 'bg-gray-300' : 'bg-transparent'
      )}
      onClick={onPressedChange}
    >
      {children}
    </button>
  );
}
