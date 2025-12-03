import { LucideIcon, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function PlaceholderPage({
  title,
  description,
  icon: Icon,
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-indigo-400" />
      </div>
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
        {title}
      </h1>
      <p className="text-[var(--foreground-muted)] mb-6 max-w-md">
        {description}
      </p>
      <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-xl">
        <Construction className="w-5 h-5" />
        <span className="text-sm font-medium">Coming Soon in Workshop Exercise</span>
      </div>
    </div>
  );
}
