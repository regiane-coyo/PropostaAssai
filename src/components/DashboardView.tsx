import { useState } from 'react';
import {
  Users,
  Eye,
  TrendingUp,
  Award,
  Flame,
  Calendar,
  Layers,
  MapPin,
  Clock,
  ArrowUpRight,
  Filter,
  BarChart2,
  CheckCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  JP_PROFILE_SUMMARY,
  MONTHLY_METRICS_DATA,
  CONTENT_PILLARS,
  DEMOGRAPHICS_DATA,
} from '../data/profileData';

const GENDER_COLORS = ['#38bdf8', '#f43f5e'];
const PILLAR_COLORS = ['#f59e0b', '#f43f5e', '#6366f1', '#10b981'];

export function DashboardView() {
  const profile = JP_PROFILE_SUMMARY;
  const [selectedMetricView, setSelectedMetricView] = useState<'feedVsStories' | 'reachVsImpressions' | 'engagement'>('feedVsStories');
  const [timeFilter, setTimeFilter] = useState<'6m' | '8m'>('8m');

  const displayedMonthlyData = timeFilter === '6m' ? MONTHLY_METRICS_DATA.slice(-6) : MONTHLY_METRICS_DATA;

  return (
    <div className="space-y-8 pb-12">
      {/* Profile Overview Card */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[3px] shadow-lg flex-shrink-0 relative">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" title="Perfil Ativo"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                  @{profile.username}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{profile.category} • {profile.location}</p>
              <p className="text-xs text-slate-300 mt-1 max-w-xl line-clamp-2">{profile.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Seguidores</span>
              <span className="text-lg font-black text-white">{profile.followers.toLocaleString('pt-BR')}</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Engajamento</span>
              <span className="text-lg font-black text-emerald-400">{profile.averageEngagementRate}%</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Média Feed</span>
              <span className="text-lg font-black text-rose-400">{(profile.averageFeedViews / 1000).toFixed(1)}k</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Média Stories</span>
              <span className="text-lg font-black text-amber-400">{(profile.averageStoriesViews / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytical Chart with Controls */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-amber-400" />
              <span>Painel Comparativo Mensal de Performance</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Visualização analítica de médias de consumo e volume de audiência
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Selector */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex text-xs">
              <button
                onClick={() => setSelectedMetricView('feedVsStories')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  selectedMetricView === 'feedVsStories'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Feed vs. Stories
              </button>
              <button
                onClick={() => setSelectedMetricView('reachVsImpressions')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  selectedMetricView === 'reachVsImpressions'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Alcance & Impressões
              </button>
              <button
                onClick={() => setSelectedMetricView('engagement')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  selectedMetricView === 'engagement'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Taxa de Engajamento
              </button>
            </div>

            {/* Time Filter */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex text-xs">
              <button
                onClick={() => setTimeFilter('8m')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition ${
                  timeFilter === '8m' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
                }`}
              >
                8 Meses
              </button>
              <button
                onClick={() => setTimeFilter('6m')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition ${
                  timeFilter === '6m' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Últimos 6M
              </button>
            </div>
          </div>
        </div>

        {/* Selected Chart Rendering */}
        <div className="h-80 w-full">
          {selectedMetricView === 'feedVsStories' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayedMonthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="shortMonth" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(value: any, name: any) => [
                    `${Number(value).toLocaleString('pt-BR')} visualizações`,
                    name === 'feedAvgViews' ? 'Média Feed (Reels/Post)' : name === 'storiesAvgViews' ? 'Média Stories Diários' : 'Reels Exclusivo'
                  ]}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '10px' }}
                  formatter={(value) => (
                    <span className="text-xs text-slate-300 font-medium">
                      {value === 'feedAvgViews' ? 'Média Feed (Reels & Carrossel)' : value === 'storiesAvgViews' ? 'Média Stories Diários' : value}
                    </span>
                  )}
                />
                <Bar dataKey="feedAvgViews" name="feedAvgViews" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                <Bar dataKey="storiesAvgViews" name="storiesAvgViews" fill="#fbbf24" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {selectedMetricView === 'reachVsImpressions' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayedMonthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorImpressoesDash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorAlcanceDash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="shortMonth" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(value: any, name: any) => [
                    `${Number(value).toLocaleString('pt-BR')}`,
                    name === 'impressoes' ? 'Impressões Totais' : 'Alcance Único'
                  ]}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '10px' }}
                  formatter={(value) => (
                    <span className="text-xs text-slate-300 font-medium">
                      {value === 'impressoes' ? 'Impressões Totais' : 'Alcance Único'}
                    </span>
                  )}
                />
                <Area type="monotone" dataKey="impressoes" name="impressoes" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorImpressoesDash)" />
                <Area type="monotone" dataKey="alcance" name="alcance" stroke="#38bdf8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAlcanceDash)" />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {selectedMetricView === 'engagement' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayedMonthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="shortMonth" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[3.5, 6.0]} tickFormatter={(val) => `${val}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(value: any) => [`${value}%`, 'Taxa de Engajamento']}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '10px' }}
                  formatter={() => <span className="text-xs text-slate-300 font-medium">Taxa de Engajamento (%)</span>}
                />
                <Line type="monotone" dataKey="engajamentoRate" name="engajamentoRate" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981' }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Demographics & Geographic Insights Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Geographic Distribution */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Concentração Geográfica</span>
            </h4>
            <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded">Vale do Paraíba / SP</span>
          </div>

          <div className="space-y-3">
            {DEMOGRAPHICS_DATA.topLocations.map((loc, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">{loc.city} ({loc.state})</span>
                  <span className="font-bold text-white">{loc.percentage}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500"
                    style={{ width: `${loc.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-[11px] text-slate-400">
            📍 Quase <strong className="text-slate-200">50% dos seguidores</strong> residem diretamente em São José dos Campos, maximizando o tráfego físico no Bar do Coronel.
          </div>
        </div>

        {/* Age Groups & Gender */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Users className="w-4 h-4 text-rose-400" />
              <span>Faixa Etária & Gênero</span>
            </h4>
            <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded">Público Ativo</span>
          </div>

          <div className="space-y-2.5">
            {DEMOGRAPHICS_DATA.ageGroups.map((age, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">{age.range}</span>
                  <span className="font-bold text-amber-400">{age.percentage}%</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full ${idx === 1 ? 'bg-rose-500' : 'bg-slate-600'}`}
                    style={{ width: `${age.percentage * 2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Gender Ratio */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-center">
            <div>
              <span className="text-xs text-slate-400 block">Homens</span>
              <span className="text-sm font-bold text-sky-400">56.4%</span>
            </div>
            <div className="w-px h-7 bg-slate-800"></div>
            <div>
              <span className="text-xs text-slate-400 block">Mulheres</span>
              <span className="text-sm font-bold text-rose-400">43.6%</span>
            </div>
          </div>
        </div>

        {/* Peak Hours & Best Timing */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Horários de Maior Atividade</span>
            </h4>
            <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded">Happy Hour / Noite</span>
          </div>

          <div className="space-y-3">
            {DEMOGRAPHICS_DATA.peakHours.map((peak, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">{peak.hour}</span>
                  <span className="font-bold text-emerald-400">{peak.activePercentage}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${peak.activePercentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-[11px] text-slate-400">
            ⏰ Pico máximo entre as <strong className="text-slate-200">18h e 22h</strong> de quarta a domingo, coincidindo com a abertura e fluxo noturno de bares e restaurantes.
          </div>
        </div>
      </div>

      {/* Complete Audit Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 className="font-bold text-white text-base">Tabela Consolidada de Métricas Mensais</h3>
            <p className="text-xs text-slate-400">Histórico detalhado do perfil @{profile.username}</p>
          </div>
          <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Período: 2026 Auditado
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Mês</th>
                <th className="p-4">Impressões</th>
                <th className="p-4">Alcance</th>
                <th className="p-4">Interações</th>
                <th className="p-4">Engajamento</th>
                <th className="p-4 text-rose-400">Média Feed</th>
                <th className="p-4 text-amber-400">Média Stories</th>
                <th className="p-4 text-emerald-400">Novos Seguidores</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              {MONTHLY_METRICS_DATA.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-850/60 transition">
                  <td className="p-4 font-bold text-white">{m.month}</td>
                  <td className="p-4 font-medium">{m.impressoes.toLocaleString('pt-BR')}</td>
                  <td className="p-4 font-medium text-sky-400">{m.alcance.toLocaleString('pt-BR')}</td>
                  <td className="p-4 font-medium">{m.interacoes.toLocaleString('pt-BR')}</td>
                  <td className="p-4 font-bold text-emerald-400">{m.engajamentoRate}%</td>
                  <td className="p-4 font-extrabold text-rose-400">{m.feedAvgViews.toLocaleString('pt-BR')}</td>
                  <td className="p-4 font-extrabold text-amber-400">{m.storiesAvgViews.toLocaleString('pt-BR')}</td>
                  <td className="p-4 font-bold text-emerald-400">+{m.novosSeguidores.toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
