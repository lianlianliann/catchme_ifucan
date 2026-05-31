import { createContext, useContext } from 'react';

type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

export function Tabs({
  value,
  onValueChange,
  children
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 flex-wrap border-b border-[#1a3a2a] pb-4">
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.value === value;

  return (
    <button
      onClick={() => context.onValueChange(value)}
      className={`
        px-4 py-2 text-xs tracking-[3px] transition-all
        border rounded-sm
        ${isActive
          ? 'bg-[#1D9E75] text-[#050d0a] border-[#1D9E75] font-bold'
          : 'bg-[#0d2016] text-[#1D9E75] border-[#1D9E75] hover:bg-[#1D9E75] hover:text-[#050d0a]'
        }
      `}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.value !== value) return null;

  return <div>{children}</div>;
}
