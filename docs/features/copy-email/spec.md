# Spec - E-mail com botão de copiar

## O que faz

Troca o botão "Enviar e-mail" (link `mailto:`) por um campo que mostra o endereço de e-mail com um botão "Copiar" ao lado, no hero e na seção Contato. Decidido em 2026-09-28 a partir da proposta de Contato do `wireframe/dark-layout.html`. Quem visita a partir de um computador sem cliente de e-mail configurado (caso comum com `mailto:`) consegue copiar o endereço com um clique e colar no webmail ou no ATS.

## Interface

- Campo (`CopyField`, em `src/ui/`): contêiner com borda `border-border`, fundo `bg-surface`, raio `radius.md`, altura igual à dos botões (`min-h-11`); endereço em mono (`text-sm`), selecionável; à direita, botão "Copiar" com ícone de cópia (SVG inline), `text-accent`.
- Ao copiar: o botão mostra "Copiado!" com ícone de ✓ por 2 s e volta; se a cópia falhar (navegador sem permissão), mostra "Não foi possível copiar" e o endereço continua selecionável para cópia manual.
- Hero: o campo toma o lugar do botão "Enviar e-mail", à esquerda de GitHub e LinkedIn; o botão do PDF continua à direita (a partir de `md`).
- Contato: o campo toma o lugar do botão com o e-mail; GitHub e LinkedIn continuam ao lado.
- No mobile (360px) o campo cabe inteiro sem cortar o endereço; os demais botões quebram para a linha de baixo.
- Não há mais botão de enviar e-mail nem `mailto:` no site. O currículo em PDF mantém o e-mail como link (`mailto:`), que é o esperado num documento.

## Acessibilidade

- Botão com nome acessível "Copiar e-mail" / "Copy email" (o texto visível "Copiar" fica dentro do nome).
- Resultado anunciado em `aria-live="polite"` ("E-mail copiado", "Não foi possível copiar").
- Sem JavaScript: o endereço aparece e pode ser selecionado; o botão não aparece (depende de JS).
- Foco visível no botão pelo teclado; alvo >= 44x44px de altura efetiva.

## Conteúdo

- Rótulos novos em `Content.ui` (`pt.ts` e `en.ts`): copiar, nome acessível, copiado, falha.
- Sai `Content.ui.emailCta` ("Enviar e-mail"), que deixa de ser usado.
- O endereço vem de `profile.email`.

## Critérios de aceite

- E2E: no hero e no Contato, clicar em "Copiar" coloca o e-mail na área de transferência e mostra "Copiado!"; nenhum link `mailto:` na página; sem overflow em 360px.
- Teste unitário do `CopyField`: sucesso, falha e volta ao estado inicial.
- Lighthouse continua >= 95.

## Fora de escopo

- Formulário de contato (não-objetivo do `PRD.md`).
- Os demais itens do wireframe (selo de disponibilidade, ícones de redes, links no footer).
