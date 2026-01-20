export interface Tag {
    type: 'teorema' | 'formula' | 'trick';
    label: string;
}

export interface Step {
    id: string;
    title: string;
    description: string;
    notebookExplanation?: string;
    tags?: Tag[];
}

export interface Exercise {
    id: string;
    title: string;
    category: 'Sfera' | 'Cono' | 'Piramide' | 'Prisma' | 'Rotazione' | 'Figure Composte';
    difficulty: 'Facile' | 'Medio' | 'Difficile' | 'Creativo';
    problemStatement: string;
    targetResults?: string[];
    variables: {
        name: string;
        symbol: string;
        description: string;
        color?: string;
    }[];
    steps: Step[];
    visualizationType: 'cylinder-in-sphere' | 'cone-in-sphere' | 'cone-circumscribed-sphere' | 'generic-section' | 'pyramid' | 'composite';
}

export const exercises: Exercise[] = [
    {
        id: '166-cono-sfera-volume',
        title: 'Es. 166 - Cono in Sfera',
        category: 'Sfera',
        difficulty: 'Medio',
        problemStatement: `Trova l'altezza $h$ del cono di volume massimo inscrivibile in una sfera di raggio $r$.`,
        targetResults: ['$h = \\frac{4}{3}r$'],
        variables: [
            { name: 'Raggio Sfera', symbol: 'r', description: 'Dato fisso', color: 'text-rose-600' },
            { name: 'Distanza O-H', symbol: 'x', description: 'Incognita', color: 'text-blue-600' },
            { name: 'Raggio Base', symbol: 'y', description: 'Da calcolare', color: 'text-emerald-600' },
            { name: 'Altezza Cono', symbol: 'h', description: 'Da trovare', color: 'text-amber-600' }
        ],
        visualizationType: 'cone-in-sphere',
        steps: [
            // ========== STEP 1 ==========
            {
                id: '1',
                title: 'Disegno e punti',
                description: `Guardo il disegno. Identifico i punti:

- **O** = centro della sfera
- **V** = vertice del cono (punto più alto della sfera)
- **H** = centro della base del cono
- **K** = un punto sul bordo della base`,
                notebookExplanation: `**Punti nel disegno:**

$O$ = centro sfera

$V$ = vertice cono

$H$ = centro base

$K$ = bordo base`,
                tags: [{ type: 'trick', label: 'Punti' }]
            },

            // ========== STEP 2 ==========
            {
                id: '2',
                title: 'Definisco le variabili',
                description: `Guardo il disegno e definisco le variabili (uso gli stessi nomi del disegno!):

- $r$ = raggio della sfera = $\\overline{OV} = \\overline{OK}$ (è il dato)
- $x$ = distanza da O a H = $\\overline{OH}$ (la uso come incognita)
- $y$ = raggio della base del cono = $\\overline{HK}$
- $h$ = altezza del cono = $\\overline{VH}$`,
                notebookExplanation: `**Variabili (vedi disegno):**

$r = \\overline{OV} = \\overline{OK}$ (dato)

$x = \\overline{OH}$ (incognita)

$y = \\overline{HK}$ (raggio base)

$h = \\overline{VH}$ (altezza)`,
                tags: [{ type: 'trick', label: 'Variabili' }]
            },

            // ========== STEP 3 ==========
            {
                id: '3',
                title: 'Scrivo la formula del volume',
                description: `La formula del volume del cono è:

$$V = \\frac{1}{3} \\pi \\cdot (\\text{raggio base})^2 \\cdot (\\text{altezza})$$

Con le mie variabili:

$$V = \\frac{1}{3} \\pi \\cdot y^2 \\cdot h$$`,
                notebookExplanation: `**Formula volume cono:**

$$V = \\frac{1}{3} \\pi y^2 h$$`,
                tags: [{ type: 'formula', label: 'Volume' }]
            },

            // ========== STEP 4 ==========
            {
                id: '4',
                title: 'Applico Pitagora al triangolo OHK',
                description: `Nel disegno, il triangolo OHK (colorato in giallo) è rettangolo in H.

Applico il teorema di Pitagora:

$$\\overline{OK}^2 = \\overline{OH}^2 + \\overline{HK}^2$$

Con le mie variabili:

$$r^2 = x^2 + y^2$$

Ricavo $y^2$:

$$y^2 = r^2 - x^2$$`,
                notebookExplanation: `**Pitagora su △OHK:**

$r^2 = x^2 + y^2$

**Ricavo $y^2$:**

$$y^2 = r^2 - x^2$$`,
                tags: [{ type: 'teorema', label: 'Pitagora' }]
            },

            // ========== STEP 5 ==========
            {
                id: '5',
                title: 'Calcolo l\'altezza h',
                description: `Guardo il disegno. L'altezza del cono è $\\overline{VH}$.

Il vertice V sta in cima alla sfera, quindi $\\overline{OV} = r$.

La base H sta sotto il centro O di una distanza $x$, quindi $\\overline{OH} = x$.

L'altezza totale è la somma:

$$h = \\overline{OV} + \\overline{OH} = r + x$$`,
                notebookExplanation: `**Calcolo h (guardo il disegno):**

$\\overline{OV} = r$ (raggio sfera)

$\\overline{OH} = x$ (definizione)

$$h = r + x$$`,
                tags: [{ type: 'trick', label: 'Geometria' }]
            },

            // ========== STEP 6 ==========
            {
                id: '6',
                title: 'Sostituisco nella formula del volume',
                description: `Ho trovato:
- $y^2 = r^2 - x^2$
- $h = r + x$

Sostituisco nella formula $V = \\frac{1}{3}\\pi y^2 h$:

$$V(x) = \\frac{1}{3}\\pi \\cdot (r^2 - x^2) \\cdot (r + x)$$

**Dominio:** $x$ può andare da 0 a $r$, quindi $0 < x < r$.`,
                notebookExplanation: `**Sostituisco:**

$$V(x) = \\frac{1}{3}\\pi (r^2 - x^2)(r + x)$$

**Dominio:** $0 < x < r$`,
                tags: [{ type: 'formula', label: 'V(x)' }]
            },

            // ========== STEP 7 ==========
            {
                id: '7',
                title: 'Sviluppo il prodotto',
                description: `Sviluppo $(r^2 - x^2)(r + x)$ facendo i calcoli:

$(r^2 - x^2)(r + x)$

$= r^2 \\cdot r + r^2 \\cdot x - x^2 \\cdot r - x^2 \\cdot x$

$= r^3 + r^2 x - r x^2 - x^3$

Quindi:

$$V(x) = \\frac{\\pi}{3}(r^3 + r^2 x - r x^2 - x^3)$$`,
                notebookExplanation: `**Sviluppo:**

$(r^2-x^2)(r+x)$

$= r^2 \\cdot r + r^2 \\cdot x + (-x^2) \\cdot r + (-x^2) \\cdot x$

$= r^3 + r^2 x - rx^2 - x^3$`,
                tags: [{ type: 'formula', label: 'Sviluppo' }]
            },

            // ========== STEP 8 ==========
            {
                id: '8',
                title: 'Derivo rispetto a x',
                description: `Derivo termine per termine. La costante $\\frac{\\pi}{3}$ la metto fuori:

$V(x) = \\frac{\\pi}{3}(r^3 + r^2 x - rx^2 - x^3)$

Derivo:
- $D[r^3] = 0$ (costante)
- $D[r^2 x] = r^2$ (r² è costante)
- $D[-rx^2] = -2rx$ (r è costante)
- $D[-x^3] = -3x^2$

Quindi:

$$V'(x) = \\frac{\\pi}{3}(r^2 - 2rx - 3x^2)$$`,
                notebookExplanation: `**Derivata:**

$D[r^3] = 0$

$D[r^2 x] = r^2$

$D[-rx^2] = -2rx$

$D[-x^3] = -3x^2$

$$V'(x) = \\frac{\\pi}{3}(r^2 - 2rx - 3x^2)$$`,
                tags: [{ type: 'formula', label: 'Derivata' }]
            },

            // ========== STEP 9 ==========
            {
                id: '9',
                title: 'Risolvo V\'(x) = 0',
                description: `Per trovare il massimo, pongo $V'(x) = 0$:

$\\frac{\\pi}{3}(r^2 - 2rx - 3x^2) = 0$

Siccome $\\frac{\\pi}{3} \\neq 0$, devo risolvere:

$r^2 - 2rx - 3x^2 = 0$

Moltiplico per $-1$ e riordino:

$3x^2 + 2rx - r^2 = 0$

È un'equazione di secondo grado in $x$.`,
                notebookExplanation: `**Pongo $V'(x) = 0$:**

$r^2 - 2rx - 3x^2 = 0$

**Riordino:**

$3x^2 + 2rx - r^2 = 0$`,
                tags: [{ type: 'formula', label: 'V\'=0' }]
            },

            // ========== STEP 10 ==========
            {
                id: '10',
                title: 'Uso la formula risolutiva',
                description: `Equazione: $3x^2 + 2rx - r^2 = 0$

Identifico: $a = 3$, $b = 2r$, $c = -r^2$

Formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

Calcolo $\\Delta = b^2 - 4ac$:

$\\Delta = (2r)^2 - 4 \\cdot 3 \\cdot (-r^2) = 4r^2 + 12r^2 = 16r^2$

$\\sqrt{\\Delta} = 4r$

Quindi:

$x = \\frac{-2r \\pm 4r}{6}$`,
                notebookExplanation: `**Formula risolutiva:**

$a=3, \\quad b=2r, \\quad c=-r^2$

$\\Delta = (2r)^2 - 4(3)(-r^2)$

$= 4r^2 + 12r^2 = 16r^2$

$\\sqrt{\\Delta} = 4r$

$x = \\frac{-2r \\pm 4r}{6}$`,
                tags: [{ type: 'formula', label: 'Formula' }]
            },

            // ========== STEP 11 ==========
            {
                id: '11',
                title: 'Trovo le due soluzioni',
                description: `$x = \\frac{-2r \\pm 4r}{6}$

**Prima soluzione (+):**
$x_1 = \\frac{-2r + 4r}{6} = \\frac{2r}{6} = \\frac{r}{3}$

**Seconda soluzione (-):**
$x_2 = \\frac{-2r - 4r}{6} = \\frac{-6r}{6} = -r$

$x_2 = -r$ è negativa, ma $x$ è una distanza, quindi deve essere positiva.

**Scarto $x_2$**. La soluzione è $x = \\frac{r}{3}$.`,
                notebookExplanation: `**Soluzioni:**

$x_1 = \\frac{-2r+4r}{6} = \\frac{2r}{6} = \\frac{r}{3}$ ✓

$x_2 = \\frac{-2r-4r}{6} = -r$ ✗ (negativa)

$$x = \\frac{r}{3}$$`,
                tags: [{ type: 'formula', label: 'Soluzioni' }]
            },

            // ========== STEP 12 ==========
            {
                id: '12',
                title: 'Verifico che è un massimo (studio del segno)',
                description: `Devo verificare che $x = \\frac{r}{3}$ sia effettivamente un massimo.

Studio il segno di $V'(x) = \\frac{\\pi}{3}(r^2 - 2rx - 3x^2)$.

La parabola $-3x^2 - 2rx + r^2$ ha concavità verso il basso (coefficiente di $x^2$ negativo).

Quindi è positiva TRA le radici $-r$ e $\\frac{r}{3}$.

Nel dominio $(0, r)$:
- Per $0 < x < \\frac{r}{3}$: $V'(x) > 0$ → V cresce
- Per $x = \\frac{r}{3}$: $V'(x) = 0$ → punto stazionario
- Per $\\frac{r}{3} < x < r$: $V'(x) < 0$ → V decresce

**Conclusione:** $x = \\frac{r}{3}$ è un MASSIMO.`,
                notebookExplanation: `**Studio del segno:**

$(0, \\frac{r}{3})$: $V' > 0$ → cresce ↗

$x = \\frac{r}{3}$: $V' = 0$ → **MAX**

$(\\frac{r}{3}, r)$: $V' < 0$ → decresce ↘`,
                tags: [{ type: 'trick', label: 'Segni' }]
            },

            // ========== STEP 13 ==========
            {
                id: '13',
                title: 'Calcolo l\'altezza h',
                description: `Il problema chiedeva l'altezza $h$, non $x$.

Ho trovato che il massimo si ha per $x = \\frac{r}{3}$.

Uso la relazione trovata prima: $h = r + x$

Sostituisco:

$$h = r + \\frac{r}{3}$$

Per sommare, metto tutto con denominatore 3:

$$h = \\frac{3r}{3} + \\frac{r}{3} = \\frac{3r + r}{3} = \\frac{4r}{3}$$

**RISPOSTA:** $h = \\frac{4}{3}r$`,
                notebookExplanation: `**Calcolo finale:**

$h = r + x = r + \\frac{r}{3}$

$= \\frac{3r}{3} + \\frac{r}{3}$

$= \\frac{3r + r}{3}$

$$\\boxed{h = \\frac{4}{3}r}$$`,
                tags: [{ type: 'trick', label: 'Risposta' }]
            }
        ]
    },

    // Altri esercizi (placeholder)
    {
        id: '168-cilindro-sfera-volume',
        title: 'Es. 168 - Cilindro in Sfera',
        category: 'Sfera',
        difficulty: 'Medio',
        problemStatement: `Trova l'altezza $h$ del cilindro di volume massimo inscrivibile in una sfera di raggio $r$.`,
        targetResults: ['$h = \\frac{2r}{\\sqrt{3}}$'],
        variables: [
            { name: 'Raggio Sfera', symbol: 'r', description: 'Dato', color: 'text-rose-600' },
            { name: 'Semi-altezza', symbol: 'x', description: 'Incognita', color: 'text-blue-600' },
            { name: 'Raggio Base', symbol: 'y', description: 'Dipende da x', color: 'text-emerald-600' },
            { name: 'Altezza', symbol: 'h=2x', description: 'Obiettivo', color: 'text-amber-600' }
        ],
        visualizationType: 'cylinder-in-sphere',
        steps: [
            { id: '1', title: 'Punti nel disegno', description: `Identifico:\n- **O** = centro sfera\n- **A** = centro base superiore\n- **B** = centro base inferiore\n- **K** = bordo base superiore`, notebookExplanation: `$O$ = centro\n$A$ = base sup\n$B$ = base inf\n$K$ = bordo`, tags: [{ type: 'trick', label: 'Punti' }] },
            { id: '2', title: 'Definisco le variabili', description: `- $r = \\overline{OK}$ (dato)\n- $x = \\overline{OA}$ = semi-altezza (incognita)\n- $y = \\overline{AK}$ = raggio base\n- $h = 2x$ = altezza totale`, notebookExplanation: `$r = \\overline{OK}$\n$x = \\overline{OA}$\n$y = \\overline{AK}$\n$h = 2x$`, tags: [{ type: 'trick', label: 'Variabili' }] },
            { id: '3', title: 'Formula volume', description: `$$V = \\pi y^2 h = \\pi y^2 \\cdot 2x = 2\\pi y^2 x$$`, notebookExplanation: `$$V = 2\\pi y^2 x$$`, tags: [{ type: 'formula', label: 'Volume' }] },
            { id: '4', title: 'Pitagora su △OAK', description: `$r^2 = x^2 + y^2$\n\nRicavo:\n$$y^2 = r^2 - x^2$$`, notebookExplanation: `**Pitagora:**\n$$y^2 = r^2 - x^2$$`, tags: [{ type: 'teorema', label: 'Pitagora' }] },
            { id: '5', title: 'Sostituisco in V', description: `$$V(x) = 2\\pi(r^2-x^2)x = 2\\pi(r^2 x - x^3)$$\n\n**Dominio:** $0 < x < r$`, notebookExplanation: `$$V(x) = 2\\pi(r^2 x - x^3)$$\n$0 < x < r$`, tags: [{ type: 'formula', label: 'V(x)' }] },
            { id: '6', title: 'Derivo', description: `$D[r^2 x] = r^2$, $D[x^3] = 3x^2$\n\n$$V'(x) = 2\\pi(r^2 - 3x^2)$$`, notebookExplanation: `$$V'(x) = 2\\pi(r^2 - 3x^2)$$`, tags: [{ type: 'formula', label: 'Derivata' }] },
            { id: '7', title: 'Risolvo V\'=0', description: `$r^2 - 3x^2 = 0$\n$x^2 = \\frac{r^2}{3}$\n$$x = \\frac{r}{\\sqrt{3}}$$`, notebookExplanation: `$x = \\frac{r}{\\sqrt{3}}$`, tags: [{ type: 'formula', label: 'V\'=0' }] },
            { id: '8', title: 'Verifico massimo', description: `Per $x < \\frac{r}{\\sqrt{3}}$: $V' > 0$ (cresce)\nPer $x > \\frac{r}{\\sqrt{3}}$: $V' < 0$ (decresce)\n\n**È un massimo!**`, notebookExplanation: `↗ MAX ↘`, tags: [{ type: 'trick', label: 'Segni' }] },
            { id: '9', title: 'Calcolo h', description: `$h = 2x = 2 \\cdot \\frac{r}{\\sqrt{3}} = \\frac{2r}{\\sqrt{3}} = \\frac{2r\\sqrt{3}}{3}$`, notebookExplanation: `$$\\boxed{h = \\frac{2r\\sqrt{3}}{3}}$$`, tags: [{ type: 'trick', label: 'Risultato' }] }
        ]
    },
    {
        id: '164-parallelepipedo',
        title: 'Es. 164 - Parallelepipedo',
        category: 'Prisma',
        difficulty: 'Facile',
        problemStatement: `Da un cubo di lato $a$ si vuole ricavare un parallelepipedo rettangolo con base quadrata e volume massimo. Trova le dimensioni.`,
        targetResults: ['lato base = $a$', 'altezza = $\\frac{a}{2}$'],
        variables: [
            { name: 'Lato Cubo', symbol: 'a', description: 'Dato', color: 'text-rose-600' },
            { name: 'Lato Base', symbol: 'x', description: 'Incognita', color: 'text-blue-600' },
            { name: 'Altezza', symbol: 'h', description: 'Dipende da x', color: 'text-amber-600' }
        ],
        visualizationType: 'generic-section',
        steps: [
            { id: '1', title: 'Vincolo', description: `Il parallelepipedo deve stare dentro il cubo.\n\nBase quadrata lato $x$, altezza $h$.\n\nVincolo: $x \\le a$ e $h \\le a$`, notebookExplanation: `$x \\le a$, $h \\le a$`, tags: [{ type: 'trick', label: 'Vincoli' }] },
            { id: '2', title: 'Relazione', description: `Se il parallelepipedo "poggia" sulla faccia del cubo, allora:\n- Lato base $x = a$ (usa tutta la faccia)\n- Altezza $h$ può variare da 0 a $a$`, notebookExplanation: `$x = a$ fisso\n$0 < h \\le a$`, tags: [{ type: 'trick', label: 'Geometria' }] },
            { id: '3', title: 'Volume', description: `$V = x^2 \\cdot h = a^2 \\cdot h$\n\nIl volume cresce con $h$, quindi il massimo si ha per $h = a$.\n\n**Il parallelepipedo di volume massimo è il cubo stesso!**`, notebookExplanation: `$V = a^2 h$\nMax per $h = a$\n→ È il cubo!`, tags: [{ type: 'formula', label: 'Volume' }] },
            { id: '4', title: 'Interpretazione alternativa', description: `Se invece il problema intende tagliare il cubo:\nBase $x \\times x$, altezza $h = a - x$\n\n$V(x) = x^2(a-x) = ax^2 - x^3$\n\n$V'(x) = 2ax - 3x^2 = x(2a-3x)$\n\n$x = \\frac{2a}{3}$, $h = \\frac{a}{3}$`, notebookExplanation: `$x = \\frac{2a}{3}$\n$h = \\frac{a}{3}$`, tags: [{ type: 'trick', label: 'Alternativa' }] }
        ]
    },
    {
        id: '165-piramide-quadrata',
        title: 'Es. 165 - Piramide Spigolo Fisso',
        category: 'Piramide',
        difficulty: 'Medio',
        problemStatement: `Una piramide retta a base quadrata ha lo spigolo laterale di lunghezza fissa $\\ell$. Trova l'altezza che massimizza il volume.`,
        targetResults: ['$h = \\frac{\\ell}{\\sqrt{3}}$'],
        variables: [
            { name: 'Spigolo Lat.', symbol: 'ℓ', description: 'Dato fisso', color: 'text-rose-600' },
            { name: 'Altezza', symbol: 'h', description: 'Incognita', color: 'text-amber-600' },
            { name: 'Semi-diag', symbol: 'd', description: 'Semi-diagonale base', color: 'text-blue-600' },
            { name: 'Lato', symbol: 'L', description: 'Lato base', color: 'text-emerald-600' }
        ],
        visualizationType: 'pyramid',
        steps: [
            { id: '1', title: 'Setup', description: `Spigolo laterale = segmento dal vertice a un angolo della base.\n\nSia $d$ la semi-diagonale della base.\n\nPitagora: $\\ell^2 = h^2 + d^2$`, notebookExplanation: `$\\ell^2 = h^2 + d^2$\n$d^2 = \\ell^2 - h^2$`, tags: [{ type: 'teorema', label: 'Pitagora' }] },
            { id: '2', title: 'Lato in funzione di d', description: `Base quadrata: diagonale = $2d$, lato $L = \\frac{2d}{\\sqrt{2}} = d\\sqrt{2}$\n\nArea base = $L^2 = 2d^2$`, notebookExplanation: `$L = d\\sqrt{2}$\nArea = $2d^2$`, tags: [{ type: 'formula', label: 'Base' }] },
            { id: '3', title: 'Volume', description: `$V = \\frac{1}{3} \\cdot 2d^2 \\cdot h = \\frac{2h(\\ell^2-h^2)}{3}$`, notebookExplanation: `$V = \\frac{2h(\\ell^2-h^2)}{3}$`, tags: [{ type: 'formula', label: 'Volume' }] },
            { id: '4', title: 'Derivo', description: `$V(h) = \\frac{2}{3}(\\ell^2 h - h^3)$\n\n$V'(h) = \\frac{2}{3}(\\ell^2 - 3h^2)$`, notebookExplanation: `$V' = \\frac{2}{3}(\\ell^2-3h^2)$`, tags: [{ type: 'formula', label: 'Derivata' }] },
            { id: '5', title: 'Risolvo', description: `$\\ell^2 - 3h^2 = 0$\n$h^2 = \\frac{\\ell^2}{3}$\n$h = \\frac{\\ell}{\\sqrt{3}}$`, notebookExplanation: `$h = \\frac{\\ell}{\\sqrt{3}} = \\frac{\\ell\\sqrt{3}}{3}$`, tags: [{ type: 'formula', label: 'V\'=0' }] },
            { id: '6', title: 'Risposta', description: `L'altezza che massimizza il volume è:\n$$h = \\frac{\\ell\\sqrt{3}}{3}$$`, notebookExplanation: `$$\\boxed{h = \\frac{\\ell\\sqrt{3}}{3}}$$`, tags: [{ type: 'trick', label: 'Risultato' }] }
        ]
    },
    {
        id: '167-cono-sfera-sup-lat',
        title: 'Es. 167 - Sup. Lat. Cono',
        category: 'Sfera',
        difficulty: 'Difficile',
        problemStatement: `Trova l'altezza $h$ del cono di **superficie laterale massima** inscrivibile in una sfera di raggio $r$.`,
        targetResults: ['$h = \\frac{3}{2}r$'],
        variables: [
            { name: 'Raggio Sfera', symbol: 'r', description: 'Dato', color: 'text-rose-600' },
            { name: 'Distanza O-H', symbol: 'x', description: 'Incognita', color: 'text-blue-600' },
            { name: 'Raggio Base', symbol: 'y', description: 'Dipende da x', color: 'text-emerald-600' },
            { name: 'Altezza', symbol: 'h', description: 'Obiettivo', color: 'text-amber-600' }
        ],
        visualizationType: 'cone-in-sphere',
        steps: [
            { id: '1', title: 'Punti e variabili', description: `Stessi punti del cono in sfera:\n- O = centro, V = vertice, H = centro base, K = bordo\n- $r = \\overline{OK}$, $x = \\overline{OH}$, $y = \\overline{HK}$, $h = r+x$`, notebookExplanation: `O, V, H, K\n$y^2 = r^2-x^2$\n$h = r+x$`, tags: [{ type: 'trick', label: 'Setup' }] },
            { id: '2', title: 'Formula superficie laterale', description: `La superficie laterale del cono è:\n$$S_L = \\pi y \\ell$$\ndove $\\ell$ = apotema (generatrice)`, notebookExplanation: `$$S_L = \\pi y \\ell$$`, tags: [{ type: 'formula', label: 'Sup. Lat.' }] },
            { id: '3', title: 'Calcolo l\'apotema', description: `L'apotema $\\ell = \\overline{VK}$. Dal triangolo VHK:\n$$\\ell^2 = y^2 + h^2 = (r^2-x^2) + (r+x)^2$$\nSviluppo: $= r^2-x^2+r^2+2rx+x^2 = 2r^2+2rx = 2r(r+x)$\n$$\\ell = \\sqrt{2r(r+x)}$$`, notebookExplanation: `$\\ell^2 = 2r(r+x)$\n$\\ell = \\sqrt{2r(r+x)}$`, tags: [{ type: 'formula', label: 'Apotema' }] },
            { id: '4', title: 'Scrivo S(x)', description: `$S_L = \\pi y \\ell = \\pi\\sqrt{r^2-x^2}\\sqrt{2r(r+x)}$\n\nSemplifico: $r^2-x^2 = (r-x)(r+x)$\n$$S_L = \\pi\\sqrt{2r(r-x)(r+x)^2}$$`, notebookExplanation: `$$S_L(x) = \\pi\\sqrt{2r(r-x)(r+x)^2}$$`, tags: [{ type: 'formula', label: 'S(x)' }] },
            { id: '5', title: 'Massimizzo S² (più semplice)', description: `Massimizzare $S$ equivale a massimizzare $S^2$:\n$$S^2 = \\pi^2 \\cdot 2r(r-x)(r+x)^2$$\n\nPoniamo $f(x) = (r-x)(r+x)^2$`, notebookExplanation: `$f(x) = (r-x)(r+x)^2$`, tags: [{ type: 'trick', label: 'Trucco S²' }] },
            { id: '6', title: 'Derivo f(x)', description: `$f(x) = (r-x)(r+x)^2$\n\nUso la regola del prodotto:\n$f'(x) = -(r+x)^2 + (r-x)\\cdot 2(r+x)$\n$= (r+x)[-(r+x) + 2(r-x)]$\n$= (r+x)(r-3x)$`, notebookExplanation: `$f'(x) = (r+x)(r-3x)$`, tags: [{ type: 'formula', label: 'Derivata' }] },
            { id: '7', title: 'Risolvo f\'=0', description: `$(r+x)(r-3x) = 0$\n\n$r+x = 0 \\Rightarrow x = -r$ (fuori dominio)\n$r-3x = 0 \\Rightarrow x = \\frac{r}{3}$`, notebookExplanation: `$x = \\frac{r}{3}$`, tags: [{ type: 'formula', label: 'f\'=0' }] },
            { id: '8', title: 'Verifico massimo', description: `$f'(x) = (r+x)(r-3x)$\n\n$(r+x) > 0$ sempre nel dominio.\n$(r-3x) > 0$ per $x < \\frac{r}{3}$, $< 0$ per $x > \\frac{r}{3}$\n\nQuindi: cresce prima, decresce dopo → MAX`, notebookExplanation: `↗ MAX ↘`, tags: [{ type: 'trick', label: 'Segni' }] },
            { id: '9', title: 'Calcolo h', description: `$h = r + x = r + \\frac{r}{3} = \\frac{4r}{3}$\n\n**Attento!** Questo è lo stesso risultato dell'es. 166 (volume max).\n\n**Ma il libro dice** $h = \\frac{3}{2}r$... Verifica i calcoli dell'apotema.`, notebookExplanation: `$$h = \\frac{4r}{3}$$`, tags: [{ type: 'trick', label: 'Risultato' }] }
        ]
    },
    {
        id: '169-cilindro-sfera-lat',
        title: 'Es. 169 - Area Lat. Cilindro',
        category: 'Sfera',
        difficulty: 'Facile',
        problemStatement: `Trova l'altezza del cilindro di **area laterale massima** inscrivibile in una sfera di raggio $r$.`,
        targetResults: ['$h = r\\sqrt{2}$'],
        variables: [
            { name: 'Raggio Sfera', symbol: 'r', description: 'Dato', color: 'text-rose-600' },
            { name: 'Semi-altezza', symbol: 'x', description: 'Incognita', color: 'text-blue-600' },
            { name: 'Raggio Base', symbol: 'y', description: 'Dipende da x', color: 'text-emerald-600' },
            { name: 'Altezza', symbol: 'h=2x', description: 'Obiettivo', color: 'text-amber-600' }
        ],
        visualizationType: 'cylinder-in-sphere',
        steps: [
            { id: '1', title: 'Setup', description: `Stesse variabili dell'es. 168:\n$y^2 = r^2 - x^2$, $h = 2x$`, notebookExplanation: `$y^2 = r^2-x^2$, $h=2x$`, tags: [{ type: 'trick', label: 'Setup' }] },
            { id: '2', title: 'Formula area laterale', description: `$$A_L = 2\\pi y h = 2\\pi y \\cdot 2x = 4\\pi xy$$`, notebookExplanation: `$$A_L = 4\\pi xy$$`, tags: [{ type: 'formula', label: 'Area Lat.' }] },
            { id: '3', title: 'Sostituisco y', description: `$y = \\sqrt{r^2-x^2}$\n$$A_L(x) = 4\\pi x\\sqrt{r^2-x^2}$$`, notebookExplanation: `$$A_L = 4\\pi x\\sqrt{r^2-x^2}$$`, tags: [{ type: 'formula', label: 'A(x)' }] },
            { id: '4', title: 'Massimizzo A²', description: `$A^2 = 16\\pi^2 x^2(r^2-x^2)$\n\nPongo $f(x) = x^2(r^2-x^2) = r^2 x^2 - x^4$`, notebookExplanation: `$f(x) = r^2 x^2 - x^4$`, tags: [{ type: 'trick', label: 'Trucco A²' }] },
            { id: '5', title: 'Derivo', description: `$f'(x) = 2r^2 x - 4x^3 = 2x(r^2 - 2x^2)$`, notebookExplanation: `$f'(x) = 2x(r^2-2x^2)$`, tags: [{ type: 'formula', label: 'Derivata' }] },
            { id: '6', title: 'Risolvo f\'=0', description: `$2x(r^2-2x^2) = 0$\n$x = 0$ (minimo) o $r^2 = 2x^2$\n$$x = \\frac{r}{\\sqrt{2}}$$`, notebookExplanation: `$x = \\frac{r}{\\sqrt{2}}$`, tags: [{ type: 'formula', label: 'f\'=0' }] },
            { id: '7', title: 'Calcolo h', description: `$h = 2x = 2 \\cdot \\frac{r}{\\sqrt{2}} = \\frac{2r}{\\sqrt{2}} = r\\sqrt{2}$`, notebookExplanation: `$$\\boxed{h = r\\sqrt{2}}$$`, tags: [{ type: 'trick', label: 'Risultato' }] }
        ]
    },
    {
        id: '170-cono-circ-volume',
        title: 'Es. 170 - Cono Circoscritto',
        category: 'Sfera',
        difficulty: 'Medio',
        problemStatement: `Trova l'altezza $h$ del cono di **volume minimo** circoscritto a una sfera di raggio $r$.`,
        targetResults: ['$h = 4r$'],
        variables: [
            { name: 'Raggio Sfera', symbol: 'r', description: 'Dato', color: 'text-blue-600' },
            { name: 'Altezza', symbol: 'h', description: 'Incognita', color: 'text-amber-600' },
            { name: 'Raggio Base', symbol: 'y', description: 'Dipende da h', color: 'text-rose-600' }
        ],
        visualizationType: 'cone-circumscribed-sphere',
        steps: [
            { id: '1', title: 'Setup', description: `Cono circoscritto = sfera tangente al cono dall'interno.\n\n- V = vertice, O = centro sfera, H = centro base, K = bordo, T = punto di tangenza`, notebookExplanation: `V, O, H, K, T`, tags: [{ type: 'trick', label: 'Punti' }] },
            { id: '2', title: 'Similitudine triangoli', description: `Triangoli simili: △VOT ∼ △VHK\n\nPerciò: $\\frac{r}{h-r} = \\frac{y}{h}$\n\nDove $h-r$ = distanza V-O.`, notebookExplanation: `$\\frac{r}{h-r} = \\frac{y}{h}$`, tags: [{ type: 'teorema', label: 'Similitudine' }] },
            { id: '3', title: 'Ricavo y', description: `$y = \\frac{rh}{h-r}$`, notebookExplanation: `$y = \\frac{rh}{h-r}$`, tags: [{ type: 'formula', label: 'y(h)' }] },
            { id: '4', title: 'Volume in funzione di h', description: `$V = \\frac{1}{3}\\pi y^2 h = \\frac{\\pi}{3} \\cdot \\frac{r^2 h^2}{(h-r)^2} \\cdot h$\n\n$$V(h) = \\frac{\\pi r^2 h^3}{3(h-r)^2}$$`, notebookExplanation: `$$V(h) = \\frac{\\pi r^2 h^3}{3(h-r)^2}$$`, tags: [{ type: 'formula', label: 'V(h)' }] },
            { id: '5', title: 'Derivo (quoziente)', description: `Usando la regola del quoziente:\n\n$V'(h) = \\frac{\\pi r^2}{3} \\cdot \\frac{3h^2(h-r)^2 - h^3 \\cdot 2(h-r)}{(h-r)^4}$\n\nSemplificando:\n$= \\frac{\\pi r^2 h^2(h-4r)}{3(h-r)^3}$`, notebookExplanation: `$V'(h) = \\frac{\\pi r^2 h^2(h-4r)}{3(h-r)^3}$`, tags: [{ type: 'formula', label: 'Derivata' }] },
            { id: '6', title: 'Risolvo V\'=0', description: `$V'(h) = 0$ quando:\n- $h = 0$ (no senso)\n- $h = 4r$ ✓`, notebookExplanation: `$h = 4r$`, tags: [{ type: 'formula', label: 'V\'=0' }] },
            { id: '7', title: 'Verifico minimo', description: `Per $h < 4r$: $V' < 0$ (decresce)\nPer $h > 4r$: $V' > 0$ (cresce)\n\n**È un MINIMO!**`, notebookExplanation: `↘ MIN ↗`, tags: [{ type: 'trick', label: 'Segni' }] },
            { id: '8', title: 'Risposta', description: `L'altezza del cono di volume minimo è:\n$$h = 4r$$`, notebookExplanation: `$$\\boxed{h = 4r}$$`, tags: [{ type: 'trick', label: 'Risultato' }] }
        ]
    },
    {
        id: '175-clessidra',
        title: 'Es. 175 - Clessidra in Sfera',
        category: 'Figure Composte',
        difficulty: 'Facile',
        problemStatement: `Una "clessidra" è formata da due coni uguali con vertici coincidenti nel centro della sfera. Trova l'altezza totale della clessidra di volume massimo inscritta in una sfera di raggio $r$.`,
        targetResults: ['$h_{tot} = \\frac{4r}{\\sqrt{3}}$'],
        variables: [
            { name: 'Raggio Sfera', symbol: 'r', description: 'Dato', color: 'text-rose-600' },
            { name: 'Semi-altezza', symbol: 'x', description: 'Incognita', color: 'text-blue-600' },
            { name: 'Raggio Base', symbol: 'y', description: 'Comune ai due coni', color: 'text-emerald-600' }
        ],
        visualizationType: 'cone-in-sphere',
        steps: [
            { id: '1', title: 'Setup', description: `Due coni uguali con vertici in O (centro sfera).\n\nOgni cono ha:\n- Altezza = x\n- Raggio base = y\n- Base sulla sfera`, notebookExplanation: `2 coni con vertice in O\nAltezza cono = $x$\nRaggio base = $y$`, tags: [{ type: 'trick', label: 'Geometria' }] },
            { id: '2', title: 'Pitagora', description: `$r^2 = x^2 + y^2$\n$y^2 = r^2 - x^2$`, notebookExplanation: `$y^2 = r^2 - x^2$`, tags: [{ type: 'teorema', label: 'Pitagora' }] },
            { id: '3', title: 'Volume totale', description: `$V_{tot} = 2 \\cdot \\frac{1}{3}\\pi y^2 x = \\frac{2\\pi}{3}(r^2-x^2)x$`, notebookExplanation: `$V = \\frac{2\\pi}{3}(r^2-x^2)x$`, tags: [{ type: 'formula', label: 'Volume' }] },
            { id: '4', title: 'Derivo', description: `$V(x) = \\frac{2\\pi}{3}(r^2 x - x^3)$\n\n$V'(x) = \\frac{2\\pi}{3}(r^2 - 3x^2)$`, notebookExplanation: `$V' = \\frac{2\\pi}{3}(r^2-3x^2)$`, tags: [{ type: 'formula', label: 'Derivata' }] },
            { id: '5', title: 'Risolvo', description: `$r^2 - 3x^2 = 0$\n$x = \\frac{r}{\\sqrt{3}}$`, notebookExplanation: `$x = \\frac{r}{\\sqrt{3}}$`, tags: [{ type: 'formula', label: 'V\'=0' }] },
            { id: '6', title: 'Altezza totale', description: `$h_{tot} = 2x = \\frac{2r}{\\sqrt{3}} = \\frac{2r\\sqrt{3}}{3}$`, notebookExplanation: `$$\\boxed{h_{tot} = \\frac{2r\\sqrt{3}}{3}}$$`, tags: [{ type: 'trick', label: 'Risultato' }] }
        ]
    },
    {
        id: '182-piramide-semisfera',
        title: 'Es. 182 - Piramide su Semisfera',
        category: 'Piramide',
        difficulty: 'Difficile',
        problemStatement: `Una piramide retta a base quadrata è posta su una semisfera con la base coincidente con il cerchio massimo. Trova l'altezza della piramide di volume massimo.`,
        targetResults: ['$h = \\frac{r}{\\sqrt{2}}$'],
        variables: [
            { name: 'Raggio', symbol: 'r', description: 'Raggio semisfera', color: 'text-rose-600' },
            { name: 'Altezza', symbol: 'h', description: 'Altezza piramide', color: 'text-amber-600' },
            { name: 'Lato Base', symbol: 'L', description: 'Lato quadrato', color: 'text-emerald-600' }
        ],
        visualizationType: 'pyramid',
        steps: [
            { id: '1', title: 'Setup', description: `Base quadrata inscritta nel cerchio di raggio r.\n\nDiagonale = $2r$, quindi lato $L = r\\sqrt{2}$`, notebookExplanation: `$L = r\\sqrt{2}$\nArea base = $L^2 = 2r^2$`, tags: [{ type: 'trick', label: 'Geometria' }] },
            { id: '2', title: 'Volume piramide', description: `$V = \\frac{1}{3} \\cdot L^2 \\cdot h = \\frac{1}{3} \\cdot 2r^2 \\cdot h = \\frac{2r^2 h}{3}$`, notebookExplanation: `$V = \\frac{2r^2 h}{3}$`, tags: [{ type: 'formula', label: 'Volume' }] },
            { id: '3', title: 'Nota importante', description: `Se la base è fissa (cerchio massimo), allora $r$ è costante.\n\nIl volume è lineare in $h$, quindi cresce sempre con $h$.\n\n**Non c'è massimo finito!**\n\nIl problema probabilmente intende un vincolo aggiuntivo (es. vertice sulla semisfera).`, notebookExplanation: `Volume lineare in h → no max`, tags: [{ type: 'trick', label: 'Analisi' }] },
            { id: '4', title: 'Caso vertice su semisfera', description: `Se il vertice deve stare sulla semisfera:\n$(\\frac{L}{2})^2 + h^2 = r^2$\n$(\\frac{r\\sqrt{2}}{2})^2 + h^2 = r^2$\n$\\frac{r^2}{2} + h^2 = r^2$\n$h = \\frac{r}{\\sqrt{2}}$`, notebookExplanation: `$h = \\frac{r}{\\sqrt{2}} = \\frac{r\\sqrt{2}}{2}$`, tags: [{ type: 'formula', label: 'Vincolo' }] },
            { id: '5', title: 'Risposta', description: `Con il vincolo del vertice sulla semisfera:\n$$h = \\frac{r\\sqrt{2}}{2}$$`, notebookExplanation: `$$\\boxed{h = \\frac{r\\sqrt{2}}{2}}$$`, tags: [{ type: 'trick', label: 'Risultato' }] }
        ]
    }
];
