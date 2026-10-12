/* 1. EDITE AQUI: cada objeto é um projeto.
   Use site: "" se não houver site e imagem: "" para uma prévia genérica. */
const projetos = [
    {
        id: "wordloom",
        nome: "WordLoom",
        descricao: "Ferramenta para acompanhar metas de escrita.",
        status: "Projeto de aprendizado",
        tipo: "ESCRITA · METAS · SALVAMENTO LOCAL",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        imagem: "imagens/wordloom.svg",
        imagemAlt: "Ilustração da interface de escrita do WordLoom",
        contexto: "O WordLoom nasceu no começo da faculdade de ADS, como uma forma de testar na prática o que eu estava aprendendo. A ideia foi criar um espaço de escrita com acompanhamento de progresso.",
        recursos: ["Contagem de palavras e metas de escrita.", "Salvamento do texto no próprio navegador.", "Exportação do texto em arquivo .txt."],
        site: "https://trazendo.github.io/wordloom/",
        github: "https://github.com/trazendo/wordloom"
    },
    {
        id: "calvoshot",
        nome: "CalvoShot",
        descricao: "Extensão para compartilhar imagens e GIFs nos chats de lives.",
        status: "Extensão de navegador",
        tipo: "EXTENSÃO · IMAGENS · GIFS",
        tecnologias: ["JavaScript", "Kick", "Twitch", "YouTube Live"],
        imagem: "",
        imagemAlt: "",
        contexto: "O CalvoShot reúne o compartilhamento de imagens e GIFs nos chats da Kick, Twitch e YouTube Live em uma mesma extensão de navegador.",
        recursos: ["Compartilhamento de imagens e GIFs nos chats.", "Exibição de mídia entre usuários com a extensão.", "Suporte a Kick, Twitch e YouTube Live."],
        site: "",
        github: "https://github.com/Trazendo/calvoshot"
    }
];

/* 2. PROJETOS: preenche o modelo HTML e os atalhos na barra lateral. */
const lista = document.getElementById("lista-projetos");
const modelo = document.getElementById("modelo-projeto");
const atalhos = document.getElementById("atalhos-projetos");

function criarLink(texto, endereco) {
    const link = document.createElement("a");
    link.textContent = texto;
    link.href = endereco;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    // A seta usa o símbolo definido no HTML.
    const icone = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icone.classList.add("icone");
    icone.setAttribute("aria-hidden", "true");
    const simbolo = document.createElementNS("http://www.w3.org/2000/svg", "use");
    simbolo.setAttribute("href", "#icone-seta");
    icone.appendChild(simbolo);
    link.appendChild(icone);
    return link;
}

projetos.forEach((projeto, indice) => {
    const artigo = modelo.content.firstElementChild.cloneNode(true);
    artigo.id = projeto.id;
    artigo.querySelector(".nome-projeto").textContent = projeto.nome;
    artigo.querySelector(".descricao-projeto").textContent = projeto.descricao;
    artigo.querySelector(".numero-projeto").textContent = `PROJETO ${String(indice + 1).padStart(2, "0")}`;
    artigo.querySelector(".status-projeto").textContent = projeto.status || "Projeto pessoal";
    artigo.querySelector(".tipo-projeto").textContent = projeto.tipo || "";

    const imagem = artigo.querySelector(".imagem-projeto");
    if (projeto.imagem) {
        imagem.src = projeto.imagem;
        imagem.alt = projeto.imagemAlt || `Prévia de ${projeto.nome}`;
    } else {
        imagem.remove();
        artigo.querySelector(".previa-projeto").classList.add("sem-imagem");
    }

    (projeto.tecnologias || []).forEach((tecnologia) => {
        const item = document.createElement("li");
        item.textContent = tecnologia;
        artigo.querySelector(".tecnologias").appendChild(item);
    });

    const links = artigo.querySelector(".links-projeto");
    if (projeto.site) links.appendChild(criarLink("Ver site", projeto.site));
    if (projeto.github) links.appendChild(criarLink("Ver código", projeto.github));

    if (projeto.contexto) {
        artigo.querySelector(".contexto-projeto").textContent = projeto.contexto;
        (projeto.recursos || []).forEach((recurso) => {
            const item = document.createElement("li");
            item.textContent = recurso;
            artigo.querySelector(".recursos-projeto").appendChild(item);
        });
    } else {
        artigo.querySelector(".detalhes-projeto").remove();
    }

    lista.appendChild(artigo);
    const atalho = document.createElement("a");
    atalho.className = "atalho-projeto";
    atalho.href = `#${projeto.id}`;
    atalho.textContent = projeto.nome;
    atalhos.appendChild(atalho);
});

document.getElementById("contagem-projetos").textContent = `${projetos.length} ${projetos.length === 1 ? "projeto" : "projetos"}`;
document.getElementById("ano").textContent = new Date().getFullYear();

/* 3. MENU: recolhe no computador e abre como uma gaveta no celular. */
const botaoMenu = document.getElementById("alternar-menu");
const barraLateral = document.getElementById("barra-lateral");
const fundoMenu = document.getElementById("fundo-menu");
const telaPequena = window.matchMedia("(max-width: 900px)");
let menuAberto = !telaPequena.matches;

function atualizarMenu() {
    document.body.classList.toggle("menu-aberto", telaPequena.matches && menuAberto);
    document.body.classList.toggle("sidebar-fechada", !telaPequena.matches && !menuAberto);
    botaoMenu.setAttribute("aria-expanded", String(menuAberto));
    // O teclado não entra em uma barra lateral fechada.
    barraLateral.inert = !menuAberto;
    fundoMenu.hidden = !(telaPequena.matches && menuAberto);
}

function fecharMenu(devolverFoco = true) {
    menuAberto = false;
    atualizarMenu();
    if (devolverFoco) botaoMenu.focus();
}

botaoMenu.addEventListener("click", () => {
    menuAberto = !menuAberto;
    atualizarMenu();
    if (menuAberto && telaPequena.matches) document.getElementById("fechar-menu").focus();
});
document.getElementById("fechar-menu").addEventListener("click", () => fecharMenu());
fundoMenu.addEventListener("click", () => fecharMenu());

barraLateral.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        if (telaPequena.matches) fecharMenu();
    });
});
telaPequena.addEventListener("change", () => {
    menuAberto = !telaPequena.matches;
    atualizarMenu();
});
atualizarMenu();

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && menuAberto) fecharMenu();
    // Mantém a navegação pelo teclado dentro do menu aberto no celular.
    if (evento.key === "Tab" && menuAberto && telaPequena.matches) {
        const elementos = Array.from(barraLateral.querySelectorAll("a, button"));
        const primeiro = elementos[0];
        const ultimo = elementos[elementos.length - 1];
        if (evento.shiftKey && document.activeElement === primeiro) {
            evento.preventDefault(); ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
            evento.preventDefault(); primeiro.focus();
        }
    }
});

/* 4. ÍNDICE: destaca a seção em leitura e atualiza o texto do cabeçalho. */
const linksNavegacao = barraLateral.querySelectorAll(".navegacao a");
const secoes = Array.from(document.querySelectorAll("main > .secao"));
let quadroRolagem = null;

function atualizarSecao() {
    let atual = secoes[0];
    secoes.forEach((secao) => {
        if (secao.getBoundingClientRect().top <= 150) atual = secao;
    });
    linksNavegacao.forEach((link) => {
        const ativo = link.getAttribute("href") === `#${atual.id}`;
        link.classList.toggle("ativo", ativo);
        if (ativo) {
            link.setAttribute("aria-current", "location");
            document.getElementById("secao-atual").textContent = link.querySelector("span").textContent;
        } else {
            link.removeAttribute("aria-current");
        }
    });
    quadroRolagem = null;
}

window.addEventListener("scroll", () => {
    if (quadroRolagem === null) quadroRolagem = requestAnimationFrame(atualizarSecao);
}, { passive: true });
window.addEventListener("resize", atualizarSecao);
atualizarSecao();

/* 5. LUZ DO CURSOR: desligada para quem prefere menos movimento. */
const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
const mouseDisponivel = window.matchMedia("(hover: hover) and (pointer: fine)");
let quadroCursor = null;
let cursorX = 0;
let cursorY = 0;

window.addEventListener("pointermove", (evento) => {
    if (menosMovimento.matches || !mouseDisponivel.matches || evento.pointerType !== "mouse") return;
    cursorX = evento.clientX;
    cursorY = evento.clientY;
    if (quadroCursor !== null) return;
    quadroCursor = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${cursorX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${cursorY}px`);
        quadroCursor = null;
    });
}, { passive: true });

// Ícones sem endereço ficam prontos para edição, sem levar ao topo da página.
document.querySelectorAll('.redes-sociais a[href="#"]').forEach((link) => {
    link.addEventListener("click", (evento) => evento.preventDefault());
});
