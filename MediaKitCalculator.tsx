import { useState, FormEvent } from 'react';
import { JP_PROFILE_SUMMARY } from '../data/profileData';
import { Calculator, Sparkles, Check, Send, Download, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadStandaloneHtmlFile } from './SingleHtmlExporter';

export function MediaKitCalculator() {
  const profile = JP_PROFILE_SUMMARY;

  const [reelsCount, setReelsCount] = useState<number>(2);
  const [storiesSets, setStoriesSets] = useState<number>(4);
  const [includeBarActivation, setIncludeBarActivation] = useState<boolean>(true);
  const [includePodcast, setIncludePodcast] = useState<boolean>(false);
  const [proposalSent, setProposalSent] = useState<boolean>(false);

  // Estimates based on audited averages for @jpbcordoba
  const avgReelsViews = profile.averageReelsViews; // ~62.4k
  const avgStoriesViews = profile.averageStoriesViews; // ~9.2k

  const totalEstimatedViews = (reelsCount * avgReelsViews) + (storiesSets * avgStoriesViews * 3) + (includePodcast ? 35000 : 0);
  const totalEstimatedReach = Math.round(totalEstimatedViews * 0.72);
  const totalEstimatedEngagements = Math.round(totalEstimatedViews * 0.052);

  // Estimated media value (R$)
  const baseReelsPrice = 3200; // per comedy skit / reels
  const baseStoriesSetPrice = 950; // per set of 3 stories
  const activationPrice = includeBarActivation ? 2500 : 0;
  const podcastPrice = includePodcast ? 2800 : 0;

  const totalEstimatedInvestment = (reelsCount * baseReelsPrice) + (storiesSets * baseStoriesSetPrice) + activationPrice + podcastPrice;
  const estimatedCpm = ((totalEstimatedInvestment / totalEstimatedViews) * 1000).toFixed(2);

  const handleApplyPreset = (preset: 'starter' | 'viral' | 'assai' | 'full') => {
    if (preset === 'starter') {
      setReelsCount(1);
      setStoriesSets(2);
      setIncludeBarActivation(false);
      setIncludePodcast(false);
    } else if (preset === 'viral') {
      setReelsCount(2);
      setStoriesSets(4);
      setIncludeBarActivation(true);
      setIncludePodcast(false);
    } else if (preset === 'assai') {
      setReelsCount(4);
      setStoriesSets(0);
      setIncludeBarActivation(false);
      setIncludePodcast(false);
    } else {
      setReelsCount(4);
      setStoriesSets(8);
      setIncludeBarActivation(true);
      setIncludePodcast(true);
    }
  };

  const handleSendProposal = (e: FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    setProposalSent(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
          <Sparkles className="w-3 h-3" />
          <span>MÍDIA KIT & SIMULADOR COMERCIAL</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Simulador de Entrega de Campanhas para Marcas</h2>
        <p className="text-xs text-slate-400 mt-1">
          Calcule a estimativa de entrega de alcance, visualizações e investimento para parcerias com @{profile.username}
        </p>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-medium mr-1">Pacotes Rápidos:</span>
          <button
            onClick={() => handleApplyPreset('assai')}
            className="px-3 py-1 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-lg text-xs font-bold transition shadow-sm flex items-center gap-1"
          >
            🏢 Proposta Assaí (4 Reels/mês • R$ 6.800)
          </button>
          <button
            onClick={() => handleApplyPreset('starter')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition"
          >
            Presença Local (1 Reels + 2 Stories)
          </button>
          <button
            onClick={() => handleApplyPreset('viral')}
            className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition"
          >
            ⭐ Viral Humor + Bar do Coronel
          </button>
          <button
            onClick={() => handleApplyPreset('full')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition"
          >
            Campanha 360 (Feed + Stories + Podcast)
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Form Controls */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Configurar Entregáveis da Campanha</span>
          </h3>

          {/* Reels Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200">Reels / Esquetes Cômicas no Feed:</span>
              <span className="font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                {reelsCount} {reelsCount === 1 ? 'vídeo' : 'vídeos'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              value={reelsCount}
              onChange={(e) => setReelsCount(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <p className="text-[11px] text-slate-400">
              Média estimada: ~{((reelsCount * avgReelsViews) / 1000).toFixed(0)}k visualizações no Feed.
            </p>
          </div>

          {/* Stories Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200">Sequências de Stories (3 telas com link/cupom):</span>
              <span className="font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                {storiesSets} {storiesSets === 1 ? 'sequência' : 'sequências'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={storiesSets}
              onChange={(e) => setStoriesSets(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <p className="text-[11px] text-slate-400">
              Média estimada: ~{((storiesSets * avgStoriesViews * 3) / 1000).toFixed(0)}k visualizações em Stories.
            </p>
          </div>

          {/* Toggle Options */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition">
              <div className="pr-4">
                <span className="font-semibold text-white text-xs block">Ativação Física no Bar do Coronel</span>
                <span className="text-[11px] text-slate-400">Exibição de produto / cardápio ou evento de degustação presencial em SJC</span>
              </div>
              <input
                type="checkbox"
                checked={includeBarActivation}
                onChange={(e) => setIncludeBarActivation(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition">
              <div className="pr-4">
                <span className="font-semibold text-white text-xs block">Merchandising no Podcast "Aqui Acontece"</span>
                <span className="text-[11px] text-slate-400">Citação de patrocínio e inserção de vinheta nos episódios no YouTube/Instagram</span>
              </div>
              <input
                type="checkbox"
                checked={includePodcast}
                onChange={(e) => setIncludePodcast(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Output Simulator & Quote */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider block mb-1">
              Resultados Estimados
            </span>
            <h3 className="text-xl font-bold text-white">Projeção de Entrega da Campanha</h3>

            {/* Estimated Metrics Cards */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-medium block">Visualizações Totais</span>
                <span className="text-xl font-black text-white">{(totalEstimatedViews / 1000).toFixed(0)}k</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-medium block">Alcance Único Estimado</span>
                <span className="text-xl font-black text-amber-400">{(totalEstimatedReach / 1000).toFixed(0)}k</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-medium block">Interações Esperadas</span>
                <span className="text-xl font-black text-rose-400">{(totalEstimatedEngagements / 1000).toFixed(1)}k</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-medium block">CPM Estimado</span>
                <span className="text-xl font-black text-emerald-400">R$ {estimatedCpm}</span>
              </div>
            </div>

            {/* Total Estimated Investment */}
            <div className="mt-5 p-4 bg-slate-950/90 border border-amber-500/30 rounded-xl">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                <span>Investimento Estimado de Mídia:</span>
                <span className="text-amber-400 font-semibold">Tabela Promocional</span>
              </div>
              <div className="text-3xl font-black text-white">
                R$ {totalEstimatedInvestment.toLocaleString('pt-BR')}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Inclui roteiro personalizado com Ruka, gravação, edição e relatórios pós-campanha.
              </p>
            </div>
          </div>

          {/* Action / Proposal */}
          {proposalSent ? (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold">
                ✓
              </div>
              <h4 className="text-sm font-bold text-white">Simulação Salva com Sucesso!</h4>
              <p className="text-xs text-slate-300">
                Você pode baixar a apresentação completa em HTML único para anexar na sua proposta comercial.
              </p>
              <button
                onClick={downloadStandaloneHtmlFile}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Apresentação .HTML</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleSendProposal}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <span>Gerar Proposta Comercial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
