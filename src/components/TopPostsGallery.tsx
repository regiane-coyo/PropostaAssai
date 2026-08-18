import { useState } from 'react';
import { TOP_POSTS_DATA, JP_PROFILE_SUMMARY } from '../data/profileData';
import { TopPost } from '../types';
import { Heart, MessageCircle, Share2, Bookmark, Eye, TrendingUp, Sparkles, Filter } from 'lucide-react';

export function TopPostsGallery() {
  const [filterType, setFilterType] = useState<string>('all');
  const profile = JP_PROFILE_SUMMARY;

  const filteredPosts = filterType === 'all'
    ? TOP_POSTS_DATA
    : TOP_POSTS_DATA.filter(p => p.type.toLowerCase() === filterType.toLowerCase());

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
            <Sparkles className="w-3 h-3" />
            <span>AUDITORIA DE CONTEÚDO</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Top Publicações & Casos Virais</h2>
          <p className="text-xs text-slate-400 mt-1">
            Análise das publicações com maior taxa de compartilhamento, visualizações e retenção em @{profile.username}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterType === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos ({TOP_POSTS_DATA.length})
          </button>
          <button
            onClick={() => setFilterType('reels')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterType === 'reels' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Reels / Vídeos
          </button>
          <button
            onClick={() => setFilterType('carrossel')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterType === 'carrossel' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Carrosséis
          </button>
          <button
            onClick={() => setFilterType('story')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterType === 'story' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Stories
          </button>
        </div>
      </div>

      {/* Posts Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all group"
          >
            <div>
              {/* Type Badge & Date */}
              <div className="flex justify-between items-center mb-3">
                <span
                  className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                    post.type === 'Reels'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      : post.type === 'Carrossel'
                      ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}
                >
                  {post.type}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">{post.date}</span>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-white text-sm sm:text-base leading-snug group-hover:text-amber-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{post.description}</p>
            </div>

            {/* Metrics Breakdown */}
            <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
              {/* Big Highlight: Views & Engagement */}
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Visualizações</span>
                  <span className="text-base font-black text-white">{post.views.toLocaleString('pt-BR')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Engajamento</span>
                  <span className="text-base font-black text-emerald-400">{post.engagement}%</span>
                </div>
              </div>

              {/* Reaction breakdown icons */}
              <div className="grid grid-cols-4 gap-1 text-center text-slate-400 text-[11px] pt-1">
                <div className="flex flex-col items-center">
                  <Heart className="w-3.5 h-3.5 text-rose-500 mb-0.5" />
                  <span className="font-bold text-slate-200">{(post.likes / 1000).toFixed(1)}k</span>
                </div>
                <div className="flex flex-col items-center">
                  <MessageCircle className="w-3.5 h-3.5 text-purple-400 mb-0.5" />
                  <span className="font-bold text-slate-200">{post.comments}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Share2 className="w-3.5 h-3.5 text-amber-400 mb-0.5" />
                  <span className="font-bold text-amber-300">{(post.shares / 1000).toFixed(1)}k</span>
                </div>
                <div className="flex flex-col items-center">
                  <Bookmark className="w-3.5 h-3.5 text-emerald-400 mb-0.5" />
                  <span className="font-bold text-slate-200">{post.saves}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
