# GestProTech landing

Direção visual baseada no vídeo fornecido: fundo escuro, composição centralizada, núcleo orbital com a marca e horizonte geométrico azul. As ilustrações são CSS/SVG locais; não foi copiado o vídeo nem assets de terceiros. Animações decorativas curtas respeitam prefers-reduced-motion.

## Conteúdo e contratação

- Valores regulares: src/Plans.tsx. À vista, cartão em 6x/8x com taxas incluídas e mensal com contrato.
- Oferta vigente: objeto OFERTA no topo de src/campaign.tsx. Atualização manual a cada fase e novo build/deploy. Não há preços futuros no código.
- Campanha visível desde 15/11, condições de 16 a 30/11. Expira em 01/12/2026 às 00:00 (-03:00).
- Seleção abre diálogo com valores e total; confirmação segue para WhatsApp com a escolha preenchida. Cadastro passa por análise da equipe.
- Não há cobrança nem envio automático de mensagem nesta landing.

## Validação

Build de produção e lint dos componentes ativos aprovados. qa-minimal.mjs verifica 375/1440 px, overflow, faixa, escolha no cartão, fechamento por Escape e expiração. Requer Playwright e Microsoft Edge; executar após servir dist em 127.0.0.1:5173.

As capturas e os quadros do vídeo ficam apenas no diretório local preview, fora do commit.
