export function Input({ className = "", ...props }) {
  return (
    <input
      className={`
        block w-full rounded-md bg-black/10 border-2 border-black/20 px-3 
        py-1.5 placeholder:text-gray-400 sm:text-sm/6 focus:outline-none
        ${className}
      `.trim()}
      {...props}
    />
  );
}