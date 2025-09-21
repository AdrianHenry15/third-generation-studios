// Define theme options
const themeOptions = [
  { label: "Light", value: "light", color: "bg-white border" },
  { label: "Dark", value: "dark", color: "bg-neutral-900 border" },
  {
    label: "System",
    value: "system",
    color: "bg-gradient-to-r from-neutral-900 via-white to-neutral-900 border",
  },
]

// Theme selector component
const ThemeSelector = ({
  theme,
  setTheme,
}: {
  theme: string
  setTheme: (theme: string) => void
}) => (
  <div className="py-3">
    <span className="block text-xs text-neutral-300 mb-1">Theme</span>
    <div className="flex gap-4 mt-1">
      {themeOptions.map((opt) => (
        <button
          key={opt.value}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none ${opt.color} ${theme === opt.value ? "ring-2 ring-green-500 border-green-500" : "border-neutral-300 dark:border-neutral-700"}`}
          aria-label={opt.label}
          onClick={() => setTheme(opt.value)}>
          {theme === opt.value && (
            <span className="block w-3 h-3 rounded-full bg-green-500" />
          )}
        </button>
      ))}
    </div>
    <span className="block mt-2 text-xs text-neutral-400">
      {themeOptions.find((t) => t.value === theme)?.label} mode
    </span>
  </div>
)

export default ThemeSelector
