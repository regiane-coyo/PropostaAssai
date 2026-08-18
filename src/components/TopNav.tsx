import { useState } from 'react';
import { Download, ExternalLink, Maximize, Minimize, Presentation, Check } from 'lucide-react';
import { JP_PROFILE_SUMMARY } from '../data/profileData';
import { downloadStandaloneHtmlFile } from './SingleHtmlExporter';

interface TopNavProps {
  currentTab: 'presentation' | 'dashboard' | 'mediakit' | 'posts';
  onTabChange: (tab: 'presentation' | 'dashboard' | 'mediakit' | 'posts') => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function TopNav({ currentTab, onTabChange, isFullscreen, onToggleFullscreen }: TopNavProps) {
  const profile = JP_PROFILE_SUMMARY;
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    downloadStandaloneHtmlFile();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Profile Branding */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex-shrink-0 bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-lg select-none shadow-sm">
              J
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-100 text-sm tracking-tight whitespace-nowrap">{profile.name}</h1>
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-0.5 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 transition-colors whitespace-nowrap"
                  title="Abrir Reels de @jpbcordoba no Instagram"
                >
                  @{profile.username}
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Criador de conteúdo
              </p>
            </div>
          </div>

          {/* Quick Mobile Download & Fullscreen icons */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={handleDownload}
              className="p-2 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 rounded-lg text-xs"
              title="Baixar HTML Único"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onToggleFullscreen}
              className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Only Presentation Slides */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 w-full md:w-auto overflow-x-auto justify-center md:justify-start">
          <button
            onClick={() => onTabChange('presentation')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Apresentação de Slides</span>
          </button>
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={handleDownload}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              downloaded
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/10'
            }`}
            title="Exportar apresentação completa em um arquivo único HTML + JS autônomo"
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>HTML Baixado!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Único Arquivo .HTML</span>
              </>
            )}
          </button>

          <button
            onClick={onToggleFullscreen}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs transition"
            title={isFullscreen ? 'Sair de Tela Cheia' : 'Apresentar em Tela Cheia (F11)'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
