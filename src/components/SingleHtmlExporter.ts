import { JP_PROFILE_SUMMARY, MONTHLY_METRICS_DATA, CONTENT_PILLARS, TOP_POSTS_DATA, DEMOGRAPHICS_DATA } from '../data/profileData';

export function generateSingleHtmlPresentation(): string {
  const profile = JP_PROFILE_SUMMARY;
  const monthlyDataJson = JSON.stringify(MONTHLY_METRICS_DATA);
  const pillarsJson = JSON.stringify(CONTENT_PILLARS);
  const topPostsJson = JSON.stringify(TOP_POSTS_DATA);
  const demographicsJson = JSON.stringify(DEMOGRAPHICS_DATA);

  return `<!DOCTYPE html>
<html lang="pt-BR" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apresentação Analítica: @${profile.username} - João Paulo Córdoba</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Chart.js CDN for reliable standalone chart rendering -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .font-display {
      font-family: 'Playfair Display', serif;
    }
    .slide {
      display: none;
      opacity: 0;
      transition: opacity 0.35s ease-in-out;
    }
    .slide.active {
      display: flex;
      opacity: 1;
    }
    @media print {
      .no-print { display: none !important; }
      .slide { display: block !important; opacity: 1 !important; page-break-after: always; min-height: 100vh; }
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-slate-950">

  <!-- Header / Top Bar -->
  <header class="no-print bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-50 px-4 py-3 sm:px-6 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-full flex-shrink-0 bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-base select-none shadow-sm">
        J
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-slate-100 text-sm">@${profile.username}</span>
          <span class="bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">Relatório Oficial</span>
        </div>
        <p class="text-[11px] text-slate-400 font-medium">Criador de conteúdo</p>
      </div>
    </div>

    <!-- View Mode Switcher & Controls -->
    <div class="flex items-center gap-2 sm:gap-3">
      <div class="bg-slate-800/80 p-1 rounded-lg border border-slate-700 flex text-xs">
        <button id="btnViewSlides" class="px-3 py-1 rounded-md font-bold transition-all bg-amber-500 text-slate-950 shadow-sm">
          Apresentação de Slides
        </button>
      </div>

      <button onclick="window.print()" title="Imprimir / Salvar PDF" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition">
        <span>📄 Imprimir / PDF</span>
      </button>

      <button onclick="toggleFullscreen()" class="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs transition" title="Tela Cheia">
        ⛶
      </button>
    </div>
  </header>

  <!-- MAIN CONTAINER -->
  <main class="flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">

    <!-- ================= VIEW 1: SLIDES APRESENTAÇÃO ================= -->
    <div id="slidesContainer" class="flex-1 flex flex-col justify-between">

      <!-- SLIDE 1: CAPA & VISÃO GERAL -->
      <div class="slide active flex-col justify-center min-h-[75vh]" id="slide-1">
        <div class="grid lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
              <span>📊 APRESENTAÇÃO EXECUTIVA & PROPOSTA COMERCIAL</span>
            </div>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-display">
              Desempenho & Métricas <br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-amber-200">
                @${profile.username}
              </span>
            </h1>

            <p class="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Relatório analítico consolidado de <strong class="text-white">impressões, alcance, engajamento e visualizações comparativas</strong> (Feed vs Stories) de <strong class="text-amber-400">${profile.name}</strong>, empresário à frente do icônico Bar do Coronel e criador de conteúdo.
            </p>

            <!-- Quick Highlight Pills -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                <span class="text-[11px] text-slate-400 block font-medium">Seguidores</span>
                <span class="text-xl font-extrabold text-white">${profile.followers.toLocaleString('pt-BR')}</span>
              </div>
              <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                <span class="text-[11px] text-slate-400 block font-medium">Alcance Mensal Médio</span>
                <span class="text-xl font-extrabold text-amber-400">1.1M+</span>
              </div>
              <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                <span class="text-[11px] text-slate-400 block font-medium">Engajamento Médio</span>
                <span class="text-xl font-extrabold text-emerald-400">4.85%</span>
              </div>
              <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
                <span class="text-[11px] text-slate-400 block font-medium">Média Feed (Reels)</span>
                <span class="text-xl font-extrabold text-rose-400">45.8K</span>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a href="${profile.instagramUrl}" target="_blank" class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20">
                <span>Ver Perfil no Instagram ↗</span>
              </a>
              <button onclick="goToSlide(2)" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-xl text-sm transition">
                Iniciar Apresentação →
              </button>
            </div>
          </div>

          <!-- Profile Card Visual -->
          <div class="lg:col-span-5">
            <div class="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
              <div class="absolute -right-16 -top-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div class="flex items-center gap-4 mb-5">
                <div class="w-16 h-16 rounded-full flex-shrink-0 bg-amber-500/20 border-2 border-amber-500/40 shadow-lg flex items-center justify-center text-amber-400 font-black text-3xl select-none">
                  J
                </div>
                <div>
                  <h3 class="text-lg font-bold text-white">${profile.name}</h3>
                  <p class="text-xs text-amber-400 font-medium">@${profile.username}</p>
                  <p class="text-[11px] text-slate-400">${profile.location}</p>
                </div>
              </div>

              <div class="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 mb-4 text-xs text-slate-300 leading-relaxed">
                "${profile.bio}"
              </div>

              <div class="space-y-2.5 text-xs">
                <div class="flex justify-between items-center py-1.5 border-b border-slate-850">
                  <span class="text-slate-400">Nicho Principal:</span>
                  <span class="font-semibold text-slate-200">Humor, Gastronomia & Negócios</span>
                </div>
                <div class="flex justify-between items-center py-1.5 border-b border-slate-850">
                  <span class="text-slate-400">Empresário em:</span>
                  <span class="font-semibold text-amber-400">Bar do Coronel (SJC)</span>
                </div>
                <div class="flex justify-between items-center py-1.5 border-b border-slate-850">
                  <span class="text-slate-400">Destaque de Conteúdo:</span>
                  <span class="font-semibold text-slate-200">Esquetes com @ruka</span>
                </div>
                <div class="flex justify-between items-center py-1.5">
                  <span class="text-slate-400">Projeção Regional:</span>
                  <span class="font-semibold text-emerald-400">Líder Vale do Paraíba / SP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 2: IMPRESSÕES E ALCANCE -->
      <div class="slide flex-col justify-center min-h-[75vh]" id="slide-2">
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Métrica 01 • Volume & Inserção</span>
              <h2 class="text-3xl font-bold text-white">Análise de Impressões & Alcance</h2>
            </div>
            <div class="text-right">
              <span class="text-xs text-slate-400 block">Total Acumulado (Período)</span>
              <span class="text-lg font-bold text-amber-400">19.4M Impressões • 8.6M Alcance</span>
            </div>
          </div>

          <div class="grid lg:grid-cols-12 gap-6">
            <div class="lg:col-span-8 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <h3 class="text-sm font-semibold text-slate-300 mb-4 flex items-center justify-between">
                <span>Evolução Mensal: Impressões vs. Alcance Único</span>
                <span class="text-xs font-normal text-slate-400">Janeiro a Agosto</span>
              </h3>
              <div class="h-64 relative">
                <canvas id="chartReachImpressions"></canvas>
              </div>
            </div>

            <div class="lg:col-span-4 space-y-4">
              <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                <div class="text-xs text-slate-400 mb-1">Taxa de Não-Seguidores Alcançados</div>
                <div class="text-2xl font-bold text-emerald-400">74.2%</div>
                <p class="text-[11px] text-slate-400 mt-1">
                  Alto poder viral via Reels de humor (esquetes com a Ruka) atraindo audiência nova continuamente.
                </p>
              </div>

              <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                <div class="text-xs text-slate-400 mb-1">Média de Frequência de Exibição</div>
                <div class="text-2xl font-bold text-amber-400">2.25x</div>
                <p class="text-[11px] text-slate-400 mt-1">
                  Cada usuário único é exposto em média a 2.25 publicações/mês, gerando alto recall de marca.
                </p>
              </div>

              <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                <div class="text-xs text-slate-400 mb-1">Concentração Geográfica</div>
                <div class="text-sm font-semibold text-white">48.5% São José dos Campos</div>
                <div class="text-xs text-slate-400 mt-1">
                  19.2% SP Capital • 11.4% Jacareí • 8.1% Taubaté
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 3: MÉDIAS DE VISUALIZAÇÕES FEED VS STORIES (REQUISITO PRINCIPAL) -->
      <div class="slide flex-col justify-center min-h-[75vh]" id="slide-3">
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Métrica 02 • Núcleo Comparativo</span>
              <h2 class="text-3xl font-bold text-white">Visualizações: Média Feed vs. Stories</h2>
            </div>
            <div class="flex items-center gap-4 text-xs font-medium">
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> Média Feed: <strong>45.8K views</strong></span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Média Stories: <strong>9.2K views</strong></span>
            </div>
          </div>

          <div class="grid lg:grid-cols-12 gap-6">
            <div class="lg:col-span-8 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <h3 class="text-sm font-semibold text-slate-300 mb-4 flex items-center justify-between">
                <span>Comparativo Mensal de Médias de Visualizações (Jan a Ago)</span>
                <span class="text-xs font-normal text-slate-400">Visualizações por Publicação</span>
              </h3>
              <div class="h-64 relative">
                <canvas id="chartFeedVsStories"></canvas>
              </div>
            </div>

            <div class="lg:col-span-4 space-y-4">
              <div class="bg-gradient-to-br from-rose-950/40 to-slate-900 border border-rose-500/30 p-4 rounded-xl">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold text-rose-400 uppercase">Feed & Reels</span>
                  <span class="text-xs text-slate-400">Topo de Funil</span>
                </div>
                <div class="text-2xl font-black text-white mt-1">45.800 <span class="text-xs font-normal text-slate-400">views/méd</span></div>
                <p class="text-[11px] text-slate-300 mt-2 leading-relaxed">
                  Reels de humor com o Ruka alcançam picos de até <strong class="text-rose-400">485.000 visualizações</strong>, expandindo a base de seguidores orgânicos a custo zero.
                </p>
              </div>

              <div class="bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/30 p-4 rounded-xl">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold text-amber-400 uppercase">Stories Diários</span>
                  <span class="text-xs text-slate-400">Fundo de Funil & Venda</span>
                </div>
                <div class="text-2xl font-black text-white mt-1">9.200 <span class="text-xs font-normal text-slate-400">views/méd</span></div>
                <p class="text-[11px] text-slate-300 mt-2 leading-relaxed">
                  Taxa de retenção de <strong class="text-amber-400">13.4%</strong> da base total de seguidores assistindo diariamente os bastidores do Bar do Coronel.
                </p>
              </div>

              <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-xs text-slate-300">
                <span class="text-slate-400 block mb-1 font-medium">Relação Feed vs Stories:</span>
                <div class="flex items-center justify-between font-bold text-white">
                  <span>Proporção de Audiência:</span>
                  <span class="text-amber-400">5.0x no Feed</span>
                </div>
                <p class="text-[10px] text-slate-400 mt-1">
                  O Feed traz novos clientes para o Coronel e os Stories convertem em reservas e presença física.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 4: CONCLUSÕES E OPORTUNIDADES COMERCIAIS -->
      <div class="slide flex-col justify-center min-h-[75vh]" id="slide-4">
        <div class="space-y-6">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Mídia Kit & Recomendações Estratégicas</span>
            <h2 class="text-3xl font-bold text-white">Conclusões & Potencial Comercial</h2>
          </div>

          <div class="grid lg:grid-cols-3 gap-6">
            <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                🚀
              </div>
              <h3 class="font-bold text-white text-base">Autoridade Regional</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                @jpbcordoba é uma das maiores vozes do entretenimento e gastronomia do Vale do Paraíba, com mais de <strong class="text-white">68 mil seguidores hiper-engajados</strong> e 48.5% concentrados em São José dos Campos.
              </p>
            </div>

            <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div class="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg">
                🎯
              </div>
              <h3 class="font-bold text-white text-base">Taxa de Conversão Real</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                Com uma média de <strong class="text-amber-400">9.200 visualizações por story</strong>, o perfil possui público qualificado (25-44 anos, 69.4% da base) com poder aquisitivo para consumo e gastronomia.
              </p>
            </div>

            <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                💼
              </div>
              <h3 class="font-bold text-white text-base">Formatos de Parceria</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                Excelente fit para marcas de bebidas, alimentos, vestuário, concessionárias, serviços B2B, eventos e tecnologia através de esquetes cômicas orgânicas e publieditoriais nos stories.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 5: ESTUDO DE PRECIFICAÇÃO & PROPOSTA COMERCIAL (ASSAÍ ATACADISTA) -->
      <div class="slide flex-col justify-between" id="slide-5">
        <div class="py-2 space-y-6">
          <!-- Top Orange Proposal Header Banner -->
          <div class="bg-gradient-to-r from-[#d95700] via-[#ea580c] to-[#c2410c] p-6 sm:p-7 rounded-2xl shadow-2xl text-white relative overflow-hidden">
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div class="space-y-3 max-w-2xl">
                <div class="flex flex-wrap items-center gap-2.5">
                  <span class="bg-white text-[#d95700] text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                    ✨ Estudo de Precificação & Proposta Comercial
                  </span>
                  <span class="bg-black/30 text-amber-100 text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                    🏢 Cliente: Assaí Atacadista
                  </span>
                </div>

                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  Proposta: João Córdoba • 330 Mil Seguidores
                </h2>

                <p class="text-sm sm:text-base text-amber-100/95 font-medium leading-relaxed">
                  Contrato quadrimestral <strong class="text-white">(SET • OUT • NOV • DEZ)</strong> com entrega de <strong class="text-white">4 posts em formato REELS por mês</strong> (Total de 16 Reels).
                </p>
              </div>

              <!-- Value Box on Right -->
              <div class="bg-black/35 border border-white/25 p-5 rounded-2xl text-left lg:text-right w-full lg:w-auto flex-shrink-0 shadow-lg">
                <span class="text-[11px] uppercase font-bold tracking-wider text-amber-200 block mb-1">
                  VALOR SUGERIDO PARA FECHAMENTO
                </span>
                <div class="text-3xl sm:text-4xl font-black text-white flex items-baseline lg:justify-end gap-1.5">
                  R$ 6.800
                  <span class="text-sm font-normal text-amber-200">/ mês</span>
                </div>
                <span class="text-xs font-bold text-amber-300 block mt-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                  Total 4 Meses: R$ 27.200 (16 Reels)
                </span>
              </div>
            </div>
          </div>

          <!-- Main Recommended Package Card -->
          <div class="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 max-w-4xl mx-auto">
            <!-- Header -->
            <div class="space-y-1.5 pb-4 border-b border-slate-800">
              <h3 class="text-xl sm:text-2xl font-black text-white tracking-tight">
                Pacote Recomendado (Equilíbrio de Mercado)
              </h3>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Valor calibrado no ponto de equilíbrio do mercado para 330 mil seguidores com desconto de ~40% sobre a tabela avulsa.
              </p>
            </div>

            <!-- Price block -->
            <div class="space-y-1">
              <div class="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2">
                R$ 6.800
                <span class="text-base font-medium text-slate-400">/ mês</span>
              </div>
              <div class="text-sm font-semibold text-slate-200">
                Total do Contrato: <strong class="text-white">R$ 27.200</strong>
              </div>
              <div class="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 pt-1">
                <span>✓ Equivale a R$ 1.700 por vídeo Reels</span>
              </div>
            </div>

            <div class="border-t border-slate-800"></div>

            <!-- Deliverables Section -->
            <div class="space-y-3.5">
              <h4 class="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                ENTREGÁVEIS:
              </h4>

              <ul class="space-y-3">
                <li class="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30 text-xs">
                    ✓
                  </div>
                  <span class="leading-snug">
                    <strong class="text-white">4 Reels por mês no feed em Collab</strong> (16 Reels totais no período)
                  </span>
                </li>

                <li class="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30 text-xs">
                    ✓
                  </div>
                  <span class="leading-snug">
                    <strong class="text-white">Gravação presencial no Assaí</strong> com demonstração de produtos e ofertas da semana
                  </span>
                </li>

                <li class="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30 text-xs">
                    ✓
                  </div>
                  <span class="leading-snug">
                    <strong class="text-white">Menção e repostagem de suporte nos Stories</strong> nos dias de publicação dos vídeos
                  </span>
                </li>

                <li class="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30 text-xs">
                    ✓
                  </div>
                  <span class="leading-snug">
                    <strong class="text-white">Alinhamento prévio e aprovação de roteiros</strong> com a equipe de marketing do Assaí
                  </span>
                </li>
              </ul>
            </div>

            <div class="border-t border-slate-800"></div>

            <!-- Image Rights Section -->
            <div class="pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-850">
              <strong class="text-amber-400 font-bold">Direitos de Imagem:</strong>{' '}
              <span class="text-slate-300">
                Uso orgânico irrestrito + direito de repostagem em todas as redes do Assaí Atacadista.
              </span>
            </div>
          </div>

          <!-- Strategic Delivery Schedule (Setembro a Dezembro) -->
          <div class="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-2xl shadow-xl space-y-5">
            <!-- Header -->
            <div class="flex items-center gap-2.5 pb-2">
              <span class="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 font-bold">
                📅
              </span>
              <h3 class="text-base sm:text-lg font-bold text-white tracking-tight">
                Cronograma Estratégico de Entregas (Setembro a Dezembro)
              </h3>
            </div>

            <!-- 4 Columns for Sept, Oct, Nov, Dec -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- SETEMBRO -->
              <div class="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-black tracking-wider text-orange-400 uppercase">
                    SETEMBRO
                  </span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    4 Reels
                  </span>
                </div>
                <div class="text-xs font-bold text-white">
                  Lançamento & Economia Familiar
                </div>
                <ul class="space-y-1.5 text-[11px] text-slate-300">
                  <li class="leading-snug">• 1º Tour pelas melhores ofertas da loja</li>
                  <li class="leading-snug">• Dicas de compra em atacado vs varejo</li>
                  <li class="leading-snug">• Carrinho econômico da semana</li>
                  <li class="leading-snug">• Receita prática com produtos Assaí</li>
                </ul>
              </div>

              <!-- OUTUBRO -->
              <div class="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-black tracking-wider text-orange-400 uppercase">
                    OUTUBRO
                  </span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    4 Reels
                  </span>
                </div>
                <div class="text-xs font-bold text-white">
                  Primavera & Dia das Crianças
                </div>
                <ul class="space-y-1.5 text-[11px] text-slate-300">
                  <li class="leading-snug">• Compras especiais Dia das Crianças</li>
                  <li class="leading-snug">• Alimentos frescos & hortifrúti Assaí</li>
                  <li class="leading-snug">• Sobremesas econômicas e lanches</li>
                  <li class="leading-snug">• Ofertas de fim de mês imperdíveis</li>
                </ul>
              </div>

              <!-- NOVEMBRO -->
              <div class="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-black tracking-wider text-orange-400 uppercase">
                    NOVEMBRO
                  </span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    4 Reels
                  </span>
                </div>
                <div class="text-xs font-bold text-white">
                  Black Friday & Antecipação
                </div>
                <ul class="space-y-1.5 text-[11px] text-slate-300">
                  <li class="leading-snug">• Esquenta Black Friday Assaí</li>
                  <li class="leading-snug">• Bebidas e itens não perecíveis</li>
                  <li class="leading-snug">• Compras inteligentes para comerciantes</li>
                  <li class="leading-snug">• Cobertura do dia oficial da Black Friday</li>
                </ul>
              </div>

              <!-- DEZEMBRO (Highlighted) -->
              <div class="bg-amber-950/20 border-2 border-amber-500/70 p-4 rounded-xl space-y-3 shadow-lg shadow-amber-950/40">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-black tracking-wider text-amber-400 uppercase">
                    DEZEMBRO
                  </span>
                  <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    4 Reels
                  </span>
                </div>
                <div class="text-xs font-bold text-amber-200">
                  Festas de Fim de Ano & Natal
                </div>
                <ul class="space-y-1.5 text-[11px] text-amber-100/90">
                  <li class="leading-snug">• Ceia de Natal completa e econômica</li>
                  <li class="leading-snug">• Carnes, panetones e bebidas festivas</li>
                  <li class="leading-snug">• Preparativos para a virada de ano</li>
                  <li class="leading-snug">• Retrospectiva de economia no Assaí</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Recommendation Summary Banner -->
          <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-950/50 text-white font-bold text-lg">
                📄
              </div>
              <div class="space-y-0.5">
                <h4 class="text-xs sm:text-sm font-extrabold text-white tracking-wide uppercase">
                  RESUMO DA RECOMENDAÇÃO PARA O ASSAÍ ATACADISTA
                </h4>
                <p class="text-xs text-slate-300">
                  Fechamento sugerido: <strong class="text-amber-400 font-bold">R$ 6.800/mês</strong> <span class="text-slate-400">(R$ 27.200 no total de 4 meses por 16 Reels).</span>
                </p>
              </div>
            </div>

            <div class="self-stretch sm:self-auto flex items-center justify-center px-4 py-2 bg-slate-950 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold whitespace-nowrap shadow-sm">
              Excelente ROI para 329k de Audiência
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE NAVIGATION CONTROLS (BOTTOM) -->
      <div class="no-print pt-6 pb-2 border-t border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button onclick="prevSlide()" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1">
            ← Anterior
          </button>
          <button onclick="nextSlide()" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1">
            Próximo →
          </button>
        </div>

        <!-- Slide Indicators -->
        <div class="flex items-center gap-1.5">
          <button onclick="goToSlide(1)" class="w-3 h-3 rounded-full bg-amber-500 transition-all indicator" id="ind-1" title="Slide 1: Capa"></button>
          <button onclick="goToSlide(2)" class="w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all indicator" id="ind-2" title="Slide 2: Impressões e Alcance"></button>
          <button onclick="goToSlide(3)" class="w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all indicator" id="ind-3" title="Slide 3: Feed vs Stories"></button>
          <button onclick="goToSlide(4)" class="w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all indicator" id="ind-4" title="Slide 4: Recomendações"></button>
          <button onclick="goToSlide(5)" class="w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all indicator" id="ind-5" title="Slide 5: Proposta Assaí"></button>
        </div>

        <div class="text-xs text-slate-400 font-medium">
          Slide <span id="currentSlideNum" class="text-white font-bold">1</span> de <span class="text-slate-300">5</span>
        </div>
      </div>
    </div>


    <!-- ================= VIEW 2: PAINEL GERAL (DASHBOARD COMPLETO) ================= -->
    <div id="dashboardContainer" class="hidden space-y-8 pb-12">
      <!-- Top Profile Overview Bar -->
      <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[3px] flex-shrink-0">
              <img src="${profile.avatarUrl}" alt="${profile.name}" class="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-xl font-bold text-white">${profile.name}</h2>
                <a href="${profile.instagramUrl}" target="_blank" class="text-amber-400 hover:underline text-xs font-semibold">@${profile.username} ↗</a>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">${profile.category} • ${profile.location}</p>
              <p class="text-xs text-slate-300 mt-1 max-w-xl">${profile.bio}</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 text-center">
            <div class="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
              <span class="text-[10px] uppercase text-slate-400 font-bold block">Seguidores</span>
              <span class="text-lg font-black text-white">${profile.followers.toLocaleString('pt-BR')}</span>
            </div>
            <div class="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
              <span class="text-[10px] uppercase text-slate-400 font-bold block">Taxa Engajamento</span>
              <span class="text-lg font-black text-emerald-400">${profile.averageEngagementRate}%</span>
            </div>
            <div class="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
              <span class="text-[10px] uppercase text-slate-400 font-bold block">Média Feed</span>
              <span class="text-lg font-black text-rose-400">${(profile.averageFeedViews / 1000).toFixed(1)}k</span>
            </div>
            <div class="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
              <span class="text-[10px] uppercase text-slate-400 font-bold block">Média Stories</span>
              <span class="text-lg font-black text-amber-400">${(profile.averageStoriesViews / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Comparison Chart Block -->
      <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 class="text-lg font-bold text-white">Comparativo Mensal: Visualizações Médias Feed vs. Stories</h3>
            <p class="text-xs text-slate-400">Análise de consumo de conteúdo mês a mês no perfil @${profile.username}</p>
          </div>
        </div>
        <div class="h-80 relative">
          <canvas id="dashboardChartFeedStories"></canvas>
        </div>
      </div>

      <!-- Metric Cards Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span class="text-xs text-slate-400 uppercase font-bold">Impressões no Período</span>
          <div class="text-2xl font-black text-white mt-1">19.450.000</div>
          <span class="text-xs text-emerald-400 mt-2 block font-medium">↑ +18.4% vs semestre anterior</span>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span class="text-xs text-slate-400 uppercase font-bold">Alcance Único no Período</span>
          <div class="text-2xl font-black text-amber-400 mt-1">8.640.000</div>
          <span class="text-xs text-slate-300 mt-2 block font-medium">74.2% não-seguidores (Reels)</span>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span class="text-xs text-slate-400 uppercase font-bold">Interações Totais</span>
          <div class="text-2xl font-black text-rose-400 mt-1">418.000+</div>
          <span class="text-xs text-slate-300 mt-2 block font-medium">Curtidas, Comentários & Direct</span>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span class="text-xs text-slate-400 uppercase font-bold">Retenção de Stories</span>
          <div class="text-2xl font-black text-purple-400 mt-1">13.4%</div>
          <span class="text-xs text-slate-300 mt-2 block font-medium">9.2K visualizações diárias</span>
        </div>
      </div>

      <!-- Monthly Breakdown Table -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div class="p-5 border-b border-slate-800">
          <h3 class="font-bold text-white text-base">Tabela Consolidada de Métricas Mensais</h3>
          <p class="text-xs text-slate-400">Dados auditados de desempenho do perfil @${profile.username}</p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th class="p-3.5">Mês</th>
                <th class="p-3.5">Impressões</th>
                <th class="p-3.5">Alcance</th>
                <th class="p-3.5">Interações</th>
                <th class="p-3.5">Taxa Engajamento</th>
                <th class="p-3.5 text-rose-400">Média Feed</th>
                <th class="p-3.5 text-amber-400">Média Stories</th>
                <th class="p-3.5">Novos Seguidores</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800 text-slate-200">
              ${MONTHLY_METRICS_DATA.map(m => `
                <tr class="hover:bg-slate-850/50 transition">
                  <td class="p-3.5 font-bold text-white">${m.month}</td>
                  <td class="p-3.5">${m.impressoes.toLocaleString('pt-BR')}</td>
                  <td class="p-3.5 font-medium text-amber-300">${m.alcance.toLocaleString('pt-BR')}</td>
                  <td class="p-3.5">${m.interacoes.toLocaleString('pt-BR')}</td>
                  <td class="p-3.5 font-semibold text-emerald-400">${m.engajamentoRate}%</td>
                  <td class="p-3.5 font-bold text-rose-400">${m.feedAvgViews.toLocaleString('pt-BR')}</td>
                  <td class="p-3.5 font-bold text-amber-400">${m.storiesAvgViews.toLocaleString('pt-BR')}</td>
                  <td class="p-3.5 text-emerald-400">+${m.novosSeguidores.toLocaleString('pt-BR')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>

  </main>

  <!-- Script logic for charts, slides and views -->
  <script>
    const monthlyData = ${monthlyDataJson};
    const pillarsData = ${pillarsJson};
    let currentSlide = 1;
    const totalSlides = 5;
    let chartsInitialized = false;

    function goToSlide(n) {
      if (n < 1 || n > totalSlides) return;
      currentSlide = n;
      
      document.querySelectorAll('.slide').forEach((el, idx) => {
        if (idx + 1 === n) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });

      document.querySelectorAll('.indicator').forEach((btn, idx) => {
        if (idx + 1 === n) {
          btn.className = 'w-3 h-3 rounded-full bg-amber-500 transition-all indicator';
        } else {
          btn.className = 'w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all indicator';
        }
      });

      document.getElementById('currentSlideNum').innerText = n;
    }

    function nextSlide() {
      if (currentSlide < totalSlides) {
        goToSlide(currentSlide + 1);
      }
    }

    function prevSlide() {
      if (currentSlide > 1) {
        goToSlide(currentSlide - 1);
      }
    }

    document.addEventListener('keydown', (e) => {
      if (document.getElementById('slidesContainer').style.display !== 'none') {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
          nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          prevSlide();
        }
      }
    });

    function switchView(view) {
      const slides = document.getElementById('slidesContainer');
      const dash = document.getElementById('dashboardContainer');
      const btnSlides = document.getElementById('btnViewSlides');
      const btnDash = document.getElementById('btnViewDashboard');

      if (view === 'slides') {
        slides.style.display = 'flex';
        dash.style.display = 'none';
        btnSlides.className = 'px-3 py-1 rounded-md font-medium transition-all bg-amber-500 text-slate-950 shadow-sm';
        btnDash.className = 'px-3 py-1 rounded-md font-medium text-slate-300 hover:text-white transition-all';
      } else {
        slides.style.display = 'none';
        dash.style.display = 'block';
        btnDash.className = 'px-3 py-1 rounded-md font-medium transition-all bg-amber-500 text-slate-950 shadow-sm';
        btnSlides.className = 'px-3 py-1 rounded-md font-medium text-slate-300 hover:text-white transition-all';
      }
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }

    // Initialize Charts with Chart.js
    window.addEventListener('DOMContentLoaded', () => {
      const labels = monthlyData.map(m => m.shortMonth);
      const reachData = monthlyData.map(m => m.alcance / 1000);
      const impressionsData = monthlyData.map(m => m.impressoes / 1000);
      const feedViews = monthlyData.map(m => m.feedAvgViews / 1000);
      const storiesViews = monthlyData.map(m => m.storiesAvgViews / 1000);

      // Chart 1: Reach & Impressions (Slide 2)
      const ctx1 = document.getElementById('chartReachImpressions');
      if (ctx1) {
        new Chart(ctx1, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Impressões (k)',
                data: impressionsData,
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                fill: true,
                tension: 0.35,
                borderWidth: 3
              },
              {
                label: 'Alcance Único (k)',
                data: reachData,
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                fill: true,
                tension: 0.35,
                borderWidth: 2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: '#cbd5e1', font: { size: 11 } } }
            },
            scales: {
              x: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } },
              y: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } }
            }
          }
        });
      }

      // Chart 2: Engagement Pillars (Slide 3)
      const ctx2 = document.getElementById('chartEngagementPillars');
      if (ctx2) {
        new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: ['Esquetes Humor (Ruka)', 'Bar do Coronel', 'Podcast Aqui Acontece', 'Lifestyle & SJC'],
            datasets: [{
              label: 'Taxa de Engajamento (%)',
              data: [6.85, 4.60, 3.80, 3.40],
              backgroundColor: ['#f59e0b', '#f43f5e', '#6366f1', '#10b981'],
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 } } },
              y: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } }
            }
          }
        });
      }

      // Chart 3: Feed vs Stories (Slide 4)
      const ctx3 = document.getElementById('chartFeedVsStories');
      if (ctx3) {
        new Chart(ctx3, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Média Visualizações Feed / Reels (k)',
                data: feedViews,
                backgroundColor: '#f43f5e',
                borderRadius: 6
              },
              {
                label: 'Média Visualizações Stories (k)',
                data: storiesViews,
                backgroundColor: '#f59e0b',
                borderRadius: 6
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: '#cbd5e1', font: { size: 11 } } }
            },
            scales: {
              x: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } },
              y: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } }
            }
          }
        });
      }

      // Chart 4: Dashboard Feed vs Stories (Dashboard View)
      const ctx4 = document.getElementById('dashboardChartFeedStories');
      if (ctx4) {
        new Chart(ctx4, {
          type: 'bar',
          data: {
            labels: monthlyData.map(m => m.month),
            datasets: [
              {
                label: 'Visualizações Feed (Média/Post)',
                data: monthlyData.map(m => m.feedAvgViews),
                backgroundColor: '#f43f5e',
                borderRadius: 8
              },
              {
                label: 'Visualizações Stories (Média/Dia)',
                data: monthlyData.map(m => m.storiesAvgViews),
                backgroundColor: '#fbbf24',
                borderRadius: 8
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: '#cbd5e1', font: { size: 12 } } }
            },
            scales: {
              x: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } },
              y: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } }
            }
          }
        });
      }
    });
  </script>
</body>
</html>`;
}

export function downloadStandaloneHtmlFile(): void {
  const htmlContent = generateSingleHtmlPresentation();
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'apresentacao-instagram-jpbcordoba.html');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
