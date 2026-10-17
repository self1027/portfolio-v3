# Revisão do portfólio

Objetivo: permitir que recrutadores identifiquem a especialidade, encontrem experiência concreta e avancem para código, estudos de caso ou contato.

## Direção e argumento

Taste Skill: **Type and nothing else**, seed `438053253`. Um redraw do hero: o nome recortado proposto inicialmente prejudicava identificação e leitura no celular. A composição foi adaptada para exibir nome completo, cargo, evidência e currículo na primeira tela.

Ideia: o trabalho de digitalização de registros de Murilo passa a organizar a apresentação do portfólio, do problema operacional à decisão de dados e à implantação. O visitante pode ampliar as interfaces reais e diagramas e seguir diretamente para a implementação relevante.

Inventário usado: Livro; Vigilância Sanitária de Andradina; registros antes em papel; protocolos por ano/número; Sequelize/MySQL; implantação municipal em Linux/Nginx/PM2; pipeline do Integra; avatar Libras; buffers e Web Worker do ASCII; estado autoritativo do Infinity; dois currículos; interfaces reais dos projetos.

| Parte da página | Afirmação e prova |
| --- | --- |
| Abertura | Backend com Node.js/TypeScript, projeto municipal e acesso ao currículo. |
| Projetos | Quatro decisões diferentes, com interface, case e repositório. |
| Do requisito à operação | Responsabilidades reais no Livro ligadas à arquitetura. |
| Experiência | Histórico existente, com responsabilidades completas em expansão nativa. |
| Stack | Competências ligadas a implementação; inventário complementar preservado. |
| GitHub | Seleção explícita de repositórios públicos para revisão técnica. |
| Contato | Email acionável, endereço copiável, LinkedIn e feedback de erro. |

Recursos: Taste Skill, Web Design Guidelines e análise Vercel do Awesome DESIGN.md, adaptada à identidade existente. Nenhuma fotografia de banco ou imagem gerada foi adicionada. As quatro capturas pertencem ao material existente do projeto; os diagramas foram redesenhados em SVG a partir dos fluxos descritos.

## Revisão independente

O subagente `tech_lead_recruiter` examinou todos os componentes, inclusive o que seria preservado, questionou as decisões e revisou capturas de desktop, celular, tema claro, tema escuro e case. Não editou os arquivos. As decisões e correções foram implementadas pelo agente principal.

| Componente ou módulo | Decisão incorporada após revisão |
| --- | --- |
| Header | Navegação simples; PT/EN, tema, Escape e retorno do foco no menu. |
| Hero | Nome/cargo legíveis, prova operacional e currículo; retirado perfil fictício em código. |
| ProjectGrid / ProjectCard | Livro destacado; três projetos com decisões diferentes e capturas reais. |
| ImpactHighlights | Responsabilidades do Livro ligadas ao case; sem estatísticas decorativas. |
| ExperienceTimeline | Antes das skills; quatro responsabilidades visíveis e demais preservadas em details. |
| SkillsSection | Evidências navegáveis e inventário suplementar derivado dos dados originais. |
| GithubSection | Curadoria estática, sem API de últimos repositórios ou fallback falsamente sincronizado. |
| ContactCTA | Retirado formulário que apenas abria mailto; mantidos email, cópia e LinkedIn. |
| Footer | Encerramento com nome, canais e volta ao início; respeito a movimento reduzido. |
| SectionHeader | Hierarquia maior e sem etiquetas repetidas. |
| CaseStudyLayout | Resumo, interface, navegação interna, conteúdo completo e snippets localizados. |
| CodeBlock | Texto e feedback localizados, contraste fixo e erros de clipboard visíveis. |
| ArchitectureImage | Botão nativo para imagens e região rolável para diagramas. |
| TechnicalDiagrams | Textos PT/EN, descrições acessíveis, marcadores únicos e fluxos qualificados. |
| ImageLightbox | Foco contido/restaurado, fundo inert, Escape e rolagem por teclado. |
| App / Router | Skip link, hash e histórico reais, foco ao navegar, metadados por case e página inexistente. |
| Tema / CSS / HTML | Contraste, color-scheme, tema inicial, movimento reduzido e margens para âncoras. |
| Dados | Retiradas garantias jurídicas, de zero downtime, de precisão e de sandbox não demonstradas. |

## Verificação

- `npm run lint`: passou.
- `npm run build`: passou.
- `git diff --check`: passou.
- `node scripts/check-portfolio.mjs http://127.0.0.1:4173`: **159 checks no build de produção passaram**. Vite preview deve estar ativo.
- Larguras: 1440, 768, 390 e 320 px. Idiomas: PT/EN. Temas: claro/escuro, incluindo acionamento do controle.
- Rotas diretas dos cinco cases, hash/history, foco, skip link, teclado no menu e no modal, rolagem horizontal do diagrama, clipboard com sucesso/erro, PDFs reais e movimento reduzido verificados.
- Taste lint: zero falhas. Taste inspector em 1440/768/390: zero falhas; três avisos na home.
- O inspector foi executado também com `prefers-reduced-motion: no-preference` explicitamente emulado. O Windows desta sessão prefere movimento reduzido, que foi testado separadamente e respeitado.

Os quatro previews passaram de 2.789.115 bytes em PNG para 462.642 bytes em WebP, redução de **83,4%** no total desses arquivos. Os originais foram preservados. Esse número não representa uma medição da velocidade de carregamento.

## Crítica visual

ROUND 1

Seen in one second: nome e especialidade backend.
Idea (one sentence): o sistema municipal fornece a evidência que organiza a apresentação profissional.
Live thing: ampliação das interfaces e diagramas, com leitura e navegação acessíveis.
Layout words by section: hero=tipográfico / projetos=editorial / responsabilidades=campo de cor / experiência=cronologia / stack=lista / GitHub=índice / contato=convite.
Scores: design 7,5 · usability 8 · creativity 7 · content 8 → overall 7,7.
Caps applied: nenhuma; apenas capturas reais existentes foram usadas.
Top three problems:
1. Foco automático criava um retângulo no nome na primeira carga. Corrigido para não roubar foco inicial.
2. Foco do título ao navegar para um case criava outra caixa. Mantido foco com sublinhado visível no heading.
3. Home detalhava a ressalva de benchmark no resultado do Livro. Ressalva movida ao case, mantendo estimativa na home.

ROUND 2

Seen in one second: Murilo Dias, backend com Node.js/TypeScript.
Idea (one sentence): experiência operacional acompanhada por escolhas de engenharia e acesso ao código.
Live thing: interfaces/diagramas ampliáveis com controle por teclado.
Layout words by section: hero=tipográfico / projetos=editorial / responsabilidades=campo de cor / experiência=cronologia / stack=lista / GitHub=índice / contato=convite.
Scores: design 8 · usability 8,5 · creativity 7 · content 8,5 → overall 8,1.
Caps applied: nenhuma.
Top three observations:
1. Escala de tipos maior que a preferência de cinco tamanhos da skill; títulos fluidos e metadados contribuem para o aviso. Permanece uma oportunidade de simplificação.
2. A paleta quente existente foi preservada, embora o inspector a sinalize. Contraste e temas foram verificados.
3. Sem vídeo: não havia gravação demonstrativa no projeto; não foi usada filmagem genérica sem relação com o trabalho.

As notas são avaliação editorial interna, não pontuação de Lighthouse ou certificação de acessibilidade.

## Limites e disponibilidade

O subagente verificou os cinco repositórios públicos e as demos Livro e ASCII com HTTP 200. Integra e Infinity excederam 12 segundos em duas tentativas na rede desta sessão; causa não confirmada. Os estudos e links de código continuam disponíveis. Não houve alteração da infraestrutura dessas demos.

As estimativas e o histórico foram herdados dos dados do portfólio. Não houve auditoria independente dos resultados operacionais ou benchmarks dos outros projetos. Snippets são apresentados como recortes explicativos, com os limites relevantes descritos. Nenhuma senioridade, cliente, empresa ou resultado novo foi criado.

As alterações são locais. Nenhuma publicação ou deploy foi realizado.
