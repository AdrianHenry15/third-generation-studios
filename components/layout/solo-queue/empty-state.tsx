interface EmptyStateProps {
    icon?: string;
    title: string;
    description: string;
    actions?: React.ReactNode;
}

export function EmptyState({ icon = "🎵", title, description, actions }: EmptyStateProps) {
    return (
        <div className="text-center py-12 space-y-4">
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-neutral-400 max-w-md mx-auto">{description}</p>
            {actions && <div className="flex gap-4 justify-center mt-6">{actions}</div>}
        </div>
    );
}
