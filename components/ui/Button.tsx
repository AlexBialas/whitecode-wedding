type Props = {
  children: React.ReactNode;
};

export default function Button({ children }: Props) {
  return (
    <button className="rounded-full border border-[#C8A97E] px-8 py-4 text-xs uppercase tracking-[0.35em] transition hover:bg-[#C8A97E] hover:text-white">
      {children}
    </button>
  );
}
