let dadosSNUC = [];
let dadosFlorestal = [];
let temasFlorestais = [];
let termosGlossario = [];
let grupoAtual = 'Todos';
let grupoFlorestalAtual = 'Todos';
let filtroGlossarioAtual = 'Todos';

const informacoesLegais = {
    'Estação Ecológica': { dominio: 'Público', visitação: 'Apenas educacional, conforme plano de manejo ou regulamento.', governanca: 'Conselho consultivo' },
    'Reserva Biológica': { dominio: 'Público', visitação: 'Apenas educacional, conforme regulamento.', governanca: 'Conselho consultivo' },
    'Parque Nacional': { dominio: 'Público', visitação: 'Permitida conforme plano de manejo e regulamento.', governanca: 'Conselho consultivo' },
    'Monumento Natural': { dominio: 'Público ou privado compatível', visitação: 'Permitida conforme plano de manejo e regulamento.', governanca: 'Conselho consultivo' },
    'Refúgio de Vida Silvestre': { dominio: 'Público ou privado compatível', visitação: 'Permitida conforme plano de manejo e regulamento.', governanca: 'Conselho consultivo' },
    'Área de Proteção Ambiental (APA)': { dominio: 'Público ou privado', visitação: 'Regulada pelo órgão gestor ou pelo proprietário, conforme o domínio.', governanca: 'Conselho' },
    'Área de Relevante Interesse Ecológico (ARIE)': { dominio: 'Público ou privado', visitação: 'Conforme normas da unidade e do domínio.', governanca: 'Gestão conforme ato de criação' },
    'Floresta Nacional': { dominio: 'Público', visitação: 'Permitida conforme normas de manejo.', governanca: 'Conselho consultivo' },
    'Reserva Extrativista': { dominio: 'Público, com uso concedido', visitação: 'Permitida se compatível com os interesses locais e o plano de manejo.', governanca: 'Conselho deliberativo' },
    'Reserva de Fauna': { dominio: 'Público', visitação: 'Pode ser permitida conforme o manejo.', governanca: 'Gestão conforme ato de criação' },
    'Reserva de Desenvolvimento Sustentável': { dominio: 'Público', visitação: 'Permitida e incentivada se compatível com os interesses locais e o plano de manejo.', governanca: 'Conselho deliberativo' },
    'RPPN': { dominio: 'Privado, com perpetuidade', visitação: 'Permitida conforme o plano de manejo e as regras da reserva.', governanca: 'Gestão pelo proprietário' }
};

async function carregarDadosSNUC() {
    try {
        const resposta = await fetch('snuc_categorias.json');
        if (!resposta.ok) throw new Error(`Erro de rede: ${resposta.status}`);
        dadosSNUC = await resposta.json();
        renderizarCards(dadosSNUC);
    } catch (erro) {
        console.error("Falha ao carregar os dados do SNUC:", erro);
        document.getElementById('dashboard-snuc').innerHTML =
            "<p>Erro ao carregar as unidades de conservação.</p>";
    }
}

async function carregarDadosFlorestal() {
    try {
        const resposta = await fetch('codigo_florestal.json');
        if (!resposta.ok) throw new Error(`Erro de rede: ${resposta.status}`);
        dadosFlorestal = await resposta.json();
        renderizarCardsFlorestal(dadosFlorestal);
    } catch (erro) {
        console.error("Falha ao carregar os dados do Código Florestal:", erro);
        document.getElementById('dashboard-florestal').innerHTML =
            '<p>Erro ao carregar os instrumentos do Código Florestal.</p>';
    }
}

async function carregarTemasFlorestais() {
    try {
        const resposta = await fetch('codigo_florestal_temas.json');
        if (!resposta.ok) throw new Error(`Erro de rede: ${resposta.status}`);
        temasFlorestais = await resposta.json();
        renderizarTemasFlorestais();
    } catch (erro) {
        console.error("Falha ao carregar os temas complementares:", erro);
        document.getElementById('lista-temas-florestais').innerHTML =
            '<p>Erro ao carregar o aprofundamento do Código Florestal.</p>';
    }
}

async function carregarGlossario() {
    try {
        const resposta = await fetch('glossario.json');
        if (!resposta.ok) throw new Error(`Erro de rede: ${resposta.status}`);
        termosGlossario = (await resposta.json()).map(item => ({ ...item, area: item.area || classificarTermo(item) }));
        renderizarGlossario(termosGlossario);
    } catch (erro) {
        console.error("Falha ao carregar o glossário:", erro);
        document.getElementById('lista-glossario').innerHTML = '<p>Erro ao carregar o glossário.</p>';
    }
}

function classificarTermo(item) {
    const texto = `${item.termo} ${item.definicao} ${item.contexto}`.toLowerCase();
    if (/snuc|unidade de conservação|proteção integral|uso sustentável|plano de manejo|zona de amortecimento|corredor ecológico|mosaico|biosfera|fauna silvestre/.test(texto)) return 'SNUC';
    if (/marinha|bentôn|macroalg|fitobent|costeira|manguezal|maré|ecossistema marinho/.test(texto)) return 'Ecologia marinha';
    if (/campo|coleta|levantamento|substrato|campanha|observação/.test(texto)) return 'Pesquisa e campo';
    return 'Direito ambiental';
}

function renderizarCards(dados) {
    const container = document.getElementById('dashboard-snuc');
    container.innerHTML = '';

    document.getElementById('resultado-filtro').textContent = `${dados.length} ${dados.length === 1 ? 'categoria encontrada' : 'categorias encontradas'}`;

    dados.forEach(item => {
        const card = document.createElement('div');
        const classeGrupo = item.grupo === 'Proteção Integral' ? 'card-protecao' : 'card-uso';
        const legal = informacoesLegais[item.categoria] || {};
        card.className = `card ${classeGrupo}`;

        card.innerHTML = `
            <h3>${item.categoria}</h3>
            <span class="badge ${classeGrupo}">${item.grupo}</span>
            <div class="card-conteudo">
                <p><strong>Objetivo Principal:</strong><br>${item.objetivo}</p>
                <p><strong>Permitido:</strong><br>${item.uso_permitido}</p>
                <p><strong>Proibido:</strong><br>${item.uso_proibido}</p>
                <dl class="metadados">
                    <div><dt>Domínio</dt><dd>${legal.dominio || 'Conforme legislação específica'}</dd></div>
                    <div><dt>Visitação</dt><dd>${legal.visitação || 'Conforme plano de manejo'}</dd></div>
                    <div><dt>Governança</dt><dd>${legal.governanca || 'Conforme ato de criação'}</dd></div>
                </dl>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderizarCardsFlorestal(dados) {
    const container = document.getElementById('dashboard-florestal');
    container.innerHTML = '';
    document.getElementById('resultado-florestal').textContent = `${dados.length} ${dados.length === 1 ? 'instrumento encontrado' : 'instrumentos encontrados'}`;

    dados.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card card-florestal';
        card.innerHTML = `
            <h3>${item.categoria}</h3>
            <span class="badge badge-florestal">${item.grupo}</span>
            <div class="card-conteudo">
                <p><strong>Objetivo:</strong><br>${item.objetivo}</p>
                <p><strong>Exemplos:</strong><br>${item.exemplos || 'Conforme a situação e a localização do imóvel.'}</p>
                <p><strong>Permitido:</strong><br>${item.uso_permitido}</p>
                <p><strong>Restrição:</strong><br>${item.uso_proibido}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderizarTemasFlorestais() {
    const container = document.getElementById('lista-temas-florestais');
    container.innerHTML = temasFlorestais.map(tema => `
        <details class="tema-florestal">
            <summary>${tema.titulo}</summary>
            <p>${tema.resumo}</p>
            <ul>${tema.pontos.map(ponto => `<li>${ponto}</li>`).join('')}</ul>
            <a href="../Codigo_florestal/${encodeURIComponent(tema.fonte)}" target="_blank" rel="noopener">Abrir fonte em PDF</a>
        </details>
    `).join('');
}

function renderizarGlossario(termos) {
    const container = document.getElementById('lista-glossario');
    document.getElementById('resultado-glossario').textContent = `${termos.length} ${termos.length === 1 ? 'termo encontrado' : 'termos encontrados'}`;
    container.innerHTML = termos.map(item => `
        <article class="termo-glossario">
            <h3>${item.termo}</h3>
            <span class="badge badge-glossario">${item.area || 'Direito ambiental'}</span>
            <p>${item.definicao}</p>
            <span>${item.contexto}</span>
        </article>
    `).join('');
}

function aplicarFiltrosGlossario() {
    const termo = document.getElementById('busca-glossario').value.trim().toLowerCase();
    const filtrados = termosGlossario.filter(item => {
        const texto = `${item.termo} ${item.definicao} ${item.contexto}`.toLowerCase();
        const correspondeTexto = !termo || texto.includes(termo);
        const correspondeArea = filtroGlossarioAtual === 'Todos' || item.area === filtroGlossarioAtual;
        return correspondeTexto && correspondeArea;
    });
    renderizarGlossario(filtrados);
}

function filtrarCategorias(grupoDesejado) {
    grupoAtual = grupoDesejado;
    aplicarFiltros();
}

function aplicarFiltros() {
    const termo = document.getElementById('busca-categoria').value.trim().toLowerCase();
    const filtrados = dadosSNUC.filter(item => {
        const correspondeGrupo = grupoAtual === 'Todos' || item.grupo === grupoAtual;
        const correspondeBusca = !termo || `${item.categoria} ${item.objetivo}`.toLowerCase().includes(termo);
        return correspondeGrupo && correspondeBusca;
    });
    renderizarCards(filtrados);
}

function filtrarFlorestal(grupoDesejado) {
    grupoFlorestalAtual = grupoDesejado;
    aplicarFiltrosFlorestal();
}

function aplicarFiltrosFlorestal() {
    const termo = document.getElementById('busca-florestal').value.trim().toLowerCase();
    const filtrados = dadosFlorestal.filter(item => {
        const correspondeGrupo = grupoFlorestalAtual === 'Todos' || item.grupo === grupoFlorestalAtual;
        const correspondeBusca = !termo || `${item.categoria} ${item.objetivo}`.toLowerCase().includes(termo);
        return correspondeGrupo && correspondeBusca;
    });
    renderizarCardsFlorestal(filtrados);
}

function ativarAba(nomeAba) {
    document.querySelectorAll('.aba').forEach(botao => {
        const ativa = botao.dataset.aba === nomeAba;
        botao.classList.toggle('ativa', ativa);
        botao.setAttribute('aria-selected', String(ativa));
        botao.tabIndex = ativa ? 0 : -1;
    });
    document.querySelectorAll('.painel-aba').forEach(painel => {
        const ativo = painel.dataset.painel === nomeAba;
        painel.classList.toggle('ativa', ativo);
        painel.hidden = !ativo;
    });
}

function navegarAbas(evento) {
    const abas = [...document.querySelectorAll('.aba')];
    const indiceAtual = abas.indexOf(evento.currentTarget);
    const deslocamento = evento.key === 'ArrowRight' || evento.key === 'ArrowDown' ? 1 : -1;
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(evento.key)) return;
    evento.preventDefault();
    const proximoIndice = evento.key === 'Home' ? 0 : evento.key === 'End' ? abas.length - 1 : (indiceAtual + deslocamento + abas.length) % abas.length;
    abas[proximoIndice].focus();
    ativarAba(abas[proximoIndice].dataset.aba);
}

function aplicarTema(tema) {
    const modoClaro = tema === 'light';
    document.documentElement.dataset.theme = modoClaro ? 'light' : 'dark';
    const botaoTema = document.getElementById('alternar-tema');
    botaoTema.setAttribute('aria-pressed', String(modoClaro));
    botaoTema.textContent = modoClaro ? 'Modo escuro' : 'Modo claro';
    botaoTema.setAttribute('aria-label', modoClaro ? 'Ativar modo escuro' : 'Ativar modo claro');
}

function alternarTema() {
    const temaAtual = document.documentElement.dataset.theme || 'dark';
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    localStorage.setItem('tema-preferido', novoTema);
    aplicarTema(novoTema);
}

window.onload = () => {
    aplicarTema(localStorage.getItem('tema-preferido') || 'dark');
    document.getElementById('alternar-tema').addEventListener('click', alternarTema);
    Promise.all([
        carregarDadosSNUC(),
        carregarDadosFlorestal(),
        carregarTemasFlorestais(),
        carregarGlossario()
    ]);
    document.getElementById('busca-categoria').addEventListener('input', aplicarFiltros);
    document.getElementById('busca-florestal').addEventListener('input', aplicarFiltrosFlorestal);
    document.getElementById('busca-glossario').addEventListener('input', aplicarFiltrosGlossario);
    document.getElementById('filtro-glossario').addEventListener('change', evento => {
        filtroGlossarioAtual = evento.target.value;
        aplicarFiltrosGlossario();
    });
    document.querySelectorAll('.aba').forEach(botao => {
        botao.tabIndex = botao.classList.contains('ativa') ? 0 : -1;
        botao.addEventListener('click', () => ativarAba(botao.dataset.aba));
        botao.addEventListener('keydown', navegarAbas);
    });
    ativarAba('introducao');
};