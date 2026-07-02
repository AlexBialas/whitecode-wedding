type Props = {
  overline: string;
  title: string;
  description?: string;
  center?: boolean;
};

export default function SectionTitle({
  overline,
  title,
  description,
  center = false,
}: Props) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">
        {overline}
      </p>

      <div
        className={`mt-5 h-px w-16 bg-[#C8A97E] ${center ? "mx-auto" : ""}`}
      />

      <h2 className="mt-8 font-heading text-5xl leading-tight md:text-7xl">
        {title}
      </h2>

      {description && (
        <p className="mt-8 max-w-xl leading-8 text-neutral-600">
          {description}
        </p>
      )}
    </div>
  );
}
