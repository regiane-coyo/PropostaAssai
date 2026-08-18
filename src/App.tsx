import { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { PresentationSlides } from './components/PresentationSlides';
import { DashboardView } from './components/DashboardView';
import { TopPostsGallery } from './components/TopPostsGallery';
import { MediaKitCalculator } from './components/MediaKitCalculator';
import { JP_PROFILE_SUMMARY } from './data/profileData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'presentation' | 'dashboard' | 'posts' | 'mediakit'>('presentation');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Top Header Navigation */}
      <TopNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {currentTab === 'presentation' && (
          <PresentationSlides
            onGoToDashboard={() => setCurrentTab('dashboard')}
            onGoToMediaKit={() => setCurrentTab('mediakit')}
          />
        )}

        {currentTab === 'dashboard' && <DashboardView />}

        {currentTab === 'posts' && <TopPostsGallery />}

        {currentTab === 'mediakit' && <MediaKitCalculator />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Análise e Apresentação Executiva • Perfil Oficial <strong className="text-slate-400">@{JP_PROFILE_SUMMARY.username}</strong> ({JP_PROFILE_SUMMARY.name} • Reels & Conteúdo)
          </div>
          <div className="text-slate-500 text-[11px]">
            Dados consolidados de Impressões, Alcance, Engajamento e Médias Mensais Feed/Stories.
          </div>
        </div>
      </footer>
    </div>
  );
}
