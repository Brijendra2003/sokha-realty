import { Home } from 'lucide-react';
import type { ProjectConfiguration } from '@/types';
import { SubsectionHeading } from './SubsectionHeading';

export function ProjectConfigurations({ configurations }: { configurations: ProjectConfiguration[] }) {
  if (!configurations?.length) return null;

  return (
    <div id="configurations" className="scroll-anchor">
      <SubsectionHeading eyebrow="Layouts" title="Configurations & pricing" />

      {/* The table scrolls inside its own rounded shell so a narrow
          viewport never forces the page itself sideways. */}
      <div className="overflow-hidden rounded-[28px] border border-sand-300 bg-white shadow-soft dark:border-navy-600 dark:bg-navy-700">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-800 text-white dark:bg-navy-900">
                <th className="px-6 py-4 text-left font-mono text-2xs font-medium uppercase tracking-label">
                  <span className="flex items-center gap-2">
                    <Home className="h-3.5 w-3.5 text-champagne-400" /> Type
                  </span>
                </th>
                <th className="px-6 py-4 text-left font-mono text-2xs font-medium uppercase tracking-label">
                  Carpet Area
                </th>
                <th className="px-6 py-4 text-right font-mono text-2xs font-medium uppercase tracking-label">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-300 dark:divide-navy-600">
              {configurations.map(c => (
                <tr
                  key={c.type}
                  className="transition-colors hover:bg-champagne-50 dark:hover:bg-navy-800/60"
                >
                  <td className="px-6 py-5 font-display font-semibold text-navy-800 dark:text-sand-100">
                    {c.type}
                  </td>
                  <td className="px-6 py-5 font-body text-navy-600 dark:text-sand-300">
                    {c.area}
                  </td>
                  <td className="px-6 py-5 text-right font-display font-semibold text-champagne-700 dark:text-champagne-400">
                    {c.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 font-body text-xs text-navy-400 dark:text-sand-500">
        * Prices are subject to change. GST and other charges applicable as per government norms.
      </p>
    </div>
  );
}
