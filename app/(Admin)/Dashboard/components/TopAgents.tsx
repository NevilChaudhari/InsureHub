import { topAgents } from '../data';

// Simple table showing top performing agents
export default function TopAgents() {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">Top Performing Agents</div>
        <div className="text-sm text-blue-600">View All</div>
      </div>
      <table className="w-full mt-3 text-sm">
        <tbody>
          {topAgents.map((a, i) => (
            <tr key={a.name} className="border-t">
              <td className="py-2">{i+1}</td>
              <td className="py-2">{a.name}</td>
              <td className="py-2 text-right">{a.dealers}</td>
              <td className="py-2 text-right">{a.contracts}</td>
              <td className="py-2 text-right">{a.premium}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
