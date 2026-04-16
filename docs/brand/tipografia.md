# Tipografia — Alunos Digitais

## Fontes

### Display: Fraunces (Google Fonts)
- **Família:** Fraunces, variable, optical size 9-144
- **URL:** `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,300;1,9..144,400`
- **Uso:** Todos os headings, números de destaque, badges de ano curricular
- **Característica:** Serifada variável com eixo óptico. Em itálico, comunica personalidade editorial. Em peso 700-800, comunica autoridade.

### Corpo: DM Sans (Google Fonts)
- **Família:** DM Sans, variable, optical size 9-40
- **URL:** `https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400`
- **Uso:** Corpo de texto, UI, labels, botões, navegação, formulários
- **Característica:** Sans-serif leve, legível em telas pequenas, boa performance em blocos longos

## Escala tipográfica

### Headings (Fraunces)
| Elemento | Tamanho | Peso | Letter-spacing | Uso |
|----------|---------|------|----------------|-----|
| Hero H1 | 46px | 700 | -0.04em | Título principal do hero |
| H2 de seção | 32px | 700 | -0.03em | Títulos de seção |
| H3 de card | 15px | 600 | -0.01em | Títulos de cards |
| Número de ano | 24px | 800 | -0.04em | Badge numérico nos year cards |
| Número hero | 32px | 700 | -0.04em | Métricas do hero (9, 36, 6, 8) |
| Subtítulo seção | 13px | 600 | 0.02em | Labels de segmento (Fundamental I) |

### Corpo (DM Sans)
| Elemento | Tamanho | Peso | Line-height | Uso |
|----------|---------|------|-------------|-----|
| Body | 15px | 400 | 1.72 | Parágrafos de seção |
| Body light | 15.5px | 300 | 1.72 | Subtexto do hero |
| Sub | 15px | 300 | 1.72 | Descrições sob H2 |
| Card body | 13px | 400 | 1.6 | Texto interno de cards |
| UI/Nav | 13px | 400-500 | 1 | Links de navegação, botões |
| Label | 12.5px | 500 | 1 | Labels de formulário |
| Eyebrow | 10.5px | 500 | 0.15em | Rótulos de seção (uppercase) |
| Small | 11px | 400-500 | 1.45 | Topics nos year cards |
| Pill | 11.5px | 500 | 1 | Badge do hero |
| Footer | 12.5px | 400 | 1 | Links do footer |
| Micro | 9.5px | 500 | 1 | Tags regulatórios, labels mínimos |

### Estilos especiais
| Estilo | Fonte | Tamanho | Peso | Uso |
|--------|-------|---------|------|-----|
| Hero accent | Fraunces italic | 46px | 400 | Palavra em destaque no H1 ("cidadania digital") |
| Step number | DM Sans | 10px | 700 | Numeração de etapas (01, 02...) com letter-spacing .12em |
| Regulatory label | DM Sans uppercase | 9.5px | 500 | "Aderência normativa", labels da reg-bar |

## Regras
- Hero H1 em `em` (itálico) usa peso 400 da Fraunces em cor teal-300
- Eyebrows são sempre uppercase com letter-spacing largo
- Nunca usar peso abaixo de 300 (fica fino demais em mobile)
- Números de métricas usam Fraunces 700 com letter-spacing negativo para compactar
