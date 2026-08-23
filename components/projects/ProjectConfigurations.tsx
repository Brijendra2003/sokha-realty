import { Home } from 'lucide-react';
import type { ProjectConfiguration } from '@/types';

export function ProjectConfigurations({ configurations }: { configurations: ProjectConfiguration[] }) {
  if (!configurations?.length) return null;

  return (
    <div id="configurations" className="scroll-mt-24">
      <h2 className="heading-md text-charcoal-800 dark:text-ivory-100 mb-6">Configurations &amp; Pricing</h2>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-charcoal-800 dark:bg-charcoal-900 text-white">
              <th className="text-left font-mono text-xs tracking-wider uppercase font-medium px-5 py-3.5">
                <span className="flex items-center gap-2"><Home className="w-3.5 h-3.5" /> Type</span>
              </th>
              <th className="text-left font-mono text-xs tracking-wider uppercase font-medium px-5 py-3.5">Carpet Area</th>
              <th className="text-right font-mono text-xs tracking-wider uppercase font-medium px-5 py-3.5">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ivory-200 dark:divide-charcoal-600">
            {configurations.map(c => (
              <tr key={c.type} className="hover:bg-ivory-50 dark:hover:bg-charcoal-800/50 transition-colors">
                <td className="px-5 py-4 font-display font-semibold text-charcoal-800 dark:text-ivory-100">
                  {c.type}
                </td>
                <td className="px-5 py-4 text-charcoal-600 dark:text-charcoal-300">{c.area}</td>
                <td className="px-5 py-4 text-right font-semibold text-gold-500">{c.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-charcoal-400 mt-3">
        * Prices are subject to change. GST and other charges applicable as per government norms.
      </p>
    </div>
  );
}
