const QUESTIONS = [
  {
    id: 1,
    enunciado: "Cada tarefa precisa ter suas informações de execução armazenadas de forma independente para que o sistema consiga alternar entre elas corretamente. Para isso, o sistema operacional mantém uma estrutura específica chamada TCB (<em>Task Control Block</em>), que armazena os dados necessários para o gerenciamento e execução das tarefas. Considerando o papel da TCB em um sistema operacional, assinale a alternativa correta:",
    alternativas: [
      { letra: "a", texto: "A TCB é utilizada apenas em sistemas monothread, não sendo necessária em sistemas com múltiplas threads." },
      { letra: "b", texto: "A TCB armazena apenas informações compartilhadas entre todas as threads de um processo." },
      { letra: "c", texto: "A TCB armazena exclusivamente informações de arquivos abertos pela thread, sendo utilizada apenas pelo sistema de arquivos." },
      { letra: "d", texto: "A TCB contém informações como os valores dos registradores da CPU, contador de programa e estado da thread, sendo essencial para a troca de contexto" },
      { letra: "e", texto: "A TCB é responsável por gerenciar a memória virtual de todos os processos do sistema." }
    ],
    correta: "d",
    dica: "Pense no que o sistema operacional precisa salvar e restaurar para interromper uma thread e retomá-la depois exatamente de onde ela parou.",
    resumo: "A TCB guarda o contexto de execução individual de cada thread — registradores, contador de programa e estado — o que a torna essencial para a troca de contexto.",
    explicacao: "<p>A <strong>TCB (Task/Thread Control Block)</strong> é a estrutura que o sistema operacional mantém para cada thread, armazenando seu contexto privado: identificador da thread, valores dos registradores da CPU, contador de programa (PC), ponteiro de pilha e estado (pronta, executando, bloqueada). É com base nessa estrutura que ocorre a <em>troca de contexto</em> entre threads (Machado &amp; Maia; Tanenbaum).</p><ul><li><strong>a)</strong> Errada: é justamente em sistemas com múltiplas threads que a TCB é indispensável — existe uma TCB por thread.</li><li><strong>b)</strong> Errada: a TCB guarda informações <em>privadas</em> da thread; os recursos compartilhados (arquivos abertos, espaço de endereçamento) ficam associados ao processo (PCB).</li><li><strong>c)</strong> Errada: arquivos abertos são recursos do processo, gerenciados pela tabela de arquivos, não exclusivamente pela TCB.</li><li><strong>e)</strong> Errada: gerenciar memória virtual é papel do gerenciador de memória do SO, não da TCB.</li></ul>"
  },
  {
    id: 2,
    enunciado: "Julgue os itens seguintes, com relação ao Linux.<br>O escalonador de tarefas do Linux presente na versão 2.6 fornece afinidade de processador, balanceamento de carga e suporte para multiprocessamento simétrico por meio de algoritmo preemptivo embasado em prioridades. Dessa forma, quanto maior for a prioridade, maior será a quota de tempo fornecida.",
    alternativas: [
      { letra: "Certo", texto: "Certo" },
      { letra: "Errado", texto: "Errado" }
    ],
    correta: "Certo",
    dica: "Recorde como Silberschatz descreve o escalonador O(1) do kernel 2.6: preempção, prioridades e o que acontece com o <em>quantum</em> em cada faixa de prioridade.",
    resumo: "O escalonador do Linux 2.6 é preemptivo e baseado em prioridades, com suporte a SMP (afinidade de processador e balanceamento de carga), e atribui fatias de tempo maiores a processos de maior prioridade.",
    explicacao: "<p>Item <strong>certo</strong>. Segundo Silberschatz, o escalonador do kernel Linux 2.6 (conhecido como escalonador O(1)) é <strong>preemptivo</strong> e <strong>baseado em prioridades</strong>: ele mantém filas de processos prontos por prioridade e sempre executa o de maior prioridade. Oferece ainda suporte a <strong>SMP</strong> (multiprocessamento simétrico), com <strong>afinidade de processador</strong> — tendência de manter o processo na mesma CPU — e <strong>balanceamento de carga</strong> entre processadores. Além disso, a prioridade determina o tamanho da fatia de tempo: <strong>quanto maior a prioridade, maior o quantum (quota de tempo)</strong> atribuído.</p>"
  },
  {
    id: 3,
    enunciado: "No que se refere à arquitetura e às características dos sistemas operacionais, julgue os itens que se seguem.<br>Na arquitetura monolítica de sistemas operacionais, o núcleo do sistema fornece um número reduzido de serviços, como, por exemplo, gerenciamento de memória de baixo nível, comunicação entre processos e sincronização básica de processos, enquanto os demais serviços do sistema são disponibilizados em uma estrutura de camadas.",
    alternativas: [
      { letra: "Certo", texto: "Certo" },
      { letra: "Errado", texto: "Errado" }
    ],
    correta: "Errado",
    dica: "A frase descreve um núcleo <em>mínimo</em>, que fornece poucos serviços e deixa o restante fora dele. Qual arquitetura tem essa característica — monolítica ou micronúcleo?",
    resumo: "A descrição — núcleo reduzido com poucos serviços e os demais serviços fora dele — corresponde à arquitetura de micronúcleo (microkernel), não à monolítica.",
    explicacao: "<p>Item <strong>errado</strong>. Na arquitetura <strong>monolítica</strong>, <em>todos</em> os serviços do sistema operacional (gerenciamento de processos, memória, arquivos, drivers etc.) executam dentro do núcleo, em modo privilegiado — o núcleo é grande e completo, não reduzido.</p><p>A descrição do item — núcleo mínimo que oferece apenas gerenciamento de memória de baixo nível, comunicação entre processos (passagem de mensagens) e sincronização básica, com os demais serviços fora do núcleo — corresponde à arquitetura de <strong>micronúcleo (microkernel)</strong>, como o MINIX de Tanenbaum.</p>"
  },
  {
    id: 4,
    enunciado: "A respeito de arquitetura de hardware de servidores, julgue o item a seguir:<br>O registrador de endereços em memória tem tamanho igual ao dos endereços da memória e do barramento de endereços do sistema.",
    alternativas: [
      { letra: "Certo", texto: "Certo" },
      { letra: "Errado", texto: "Errado" }
    ],
    correta: "Certo",
    dica: "O registrador em questão é o MAR (<em>Memory Address Register</em>). Pense no que ele precisa armazenar para cada acesso à memória.",
    resumo: "O MAR (registrador de endereço de memória) precisa comportar um endereço completo, logo sua largura é igual à dos endereços de memória e do barramento de endereços.",
    explicacao: "<p>Item <strong>certo</strong>. O <strong>MAR</strong> (<em>Memory Address Register</em>) é o registrador que armazena o endereço da posição de memória a ser lida ou gravada. Como seu conteúdo é colocado diretamente no <strong>barramento de endereços</strong>, sua largura (em bits) deve ser igual ao tamanho dos endereços de memória e à largura desse barramento — por exemplo, 32 bits em um sistema com barramento de endereços de 32 bits.</p>"
  },
  {
    id: 5,
    enunciado: "Analise as seguintes afirmações, levando em conta as chamadas de sistemas usadas com semáforos, e assinale a opção verdadeira.<br><br>I. A chamada de sistema UP adiciona uma unidade ao valor corrente de um semáforo.<br>II. Se o valor do semáforo é zero, uma chamada de sistema DOWN não será completada e o processo será suspenso.<br>III. Quando um processo inicia a execução de uma chamada de sistema UP ou DOWN, nenhum outro processo terá acesso ao semáforo até que o processo complete a execução ou seja suspenso.",
    alternativas: [
      { letra: "a", texto: "Apenas I e II são verdadeiras." },
      { letra: "b", texto: "I, II e III são verdadeiras." },
      { letra: "c", texto: "Apenas I e III são verdadeiras." },
      { letra: "d", texto: "Apenas II e III são verdadeiras." },
      { letra: "e", texto: "I, II e III são falsas." }
    ],
    correta: "b",
    dica: "Relembre a definição clássica de semáforo de Dijkstra/Tanenbaum: o que DOWN e UP fazem com o valor e qual é a propriedade fundamental dessas operações (atomicidade).",
    resumo: "As três afirmações estão corretas: UP incrementa o semáforo, DOWN sobre valor zero suspende o processo, e ambas as operações são atômicas (executam de forma indivisível).",
    explicacao: "<p>Os semáforos, propostos por Dijkstra (1965), têm duas operações primitivas:</p><ul><li><strong>I — Verdadeira:</strong> <em>UP</em> incrementa o valor do semáforo em uma unidade; se houver processos dormindo nele, um deles é acordado.</li><li><strong>II — Verdadeira:</strong> <em>DOWN</em> verifica se o valor é maior que zero e o decrementa; se o valor for <strong>zero</strong>, a operação não é completada e o processo é suspenso (dorme) até que outro execute um UP.</li><li><strong>III — Verdadeira:</strong> DOWN e UP são implementadas como <strong>operações atômicas</strong> (ações indivisíveis) — tipicamente desabilitando interrupções ou usando instruções como TSL durante a execução. Nenhum outro processo acessa o semáforo até a operação terminar ou o processo ser suspenso.</li></ul><p>Como I, II e III são verdadeiras, a alternativa correta é a <strong>b</strong>.</p>"
  },
  {
    id: 6,
    enunciado: "Em relação a processos e threads, analise as assertivas abaixo e marque (V) para verdadeiro e (F) para falso:<br><br>( ) A grande diferença entre aplicações monothread e multithread está no uso do espaço de endereçamento.<br>( ) Em um ambiente monothread, cada processo pode responder a várias solicitações concorrentemente ou mesmo simultaneamente, caso haja mais de um processador.<br>( ) Os threads possuem seu próprio contexto de hardware, entretanto, compartilham o espaço de endereçamento com demais threads do processo.<br>( ) O conceito de thread foi introduzido na tentativa de reduzir o tempo gasto em criação, eliminação e troca de contexto de processos nas aplicações concorrentes.<br>( ) Threads modo (TMK) são implementadas diretamente pelo núcleo do sistema operacional, já as (TMU) são implementadas pela aplicação do usuário.<br><br>Assinale a alternativa que contém a sequência CORRETA:",
    alternativas: [
      { letra: "a", texto: "V – F – V – F – V." },
      { letra: "b", texto: "F – F – V – V – V." },
      { letra: "c", texto: "V – F – V – V – V." },
      { letra: "d", texto: "V – V – V – F – F." },
      { letra: "e", texto: "F – V – F – V – F." }
    ],
    correta: "c",
    dica: "A segunda assertiva descreve um processo atendendo várias solicitações ao mesmo tempo — isso é característica de ambiente multithread, não monothread.",
    resumo: "A sequência correta é V–F–V–V–V: o único item falso é o segundo, que descreve comportamento de ambiente multithread atribuído ao monothread.",
    explicacao: "<p>A sequência correta é <strong>V – F – V – V – V</strong>:</p><ul><li><strong>1 — V:</strong> a diferença fundamental entre aplicações monothread e multithread está no uso do espaço de endereçamento: no multithread, várias threads compartilham o mesmo espaço de endereçamento do processo.</li><li><strong>2 — F:</strong> em ambiente <em>monothread</em>, cada processo atende a apenas <strong>uma</strong> solicitação por vez; responder a várias solicitações concorrentemente é característica de ambiente <em>multithread</em>.</li><li><strong>3 — V:</strong> cada thread tem seu próprio contexto de hardware (registradores, PC, pilha), mas compartilha o espaço de endereçamento com as demais threads do processo.</li><li><strong>4 — V:</strong> threads foram introduzidas justamente para reduzir o custo de criação, eliminação e troca de contexto em comparação com processos (threads são \"leves\").</li><li><strong>5 — V:</strong> threads em modo kernel (TMK) são implementadas pelo núcleo do SO; threads em modo usuário (TMU) são implementadas por bibliotecas na aplicação do usuário (Machado &amp; Maia).</li></ul>"
  },
  {
    id: 7,
    enunciado: "No projeto de sistemas operacionais são utilizados escalonadores que empregam algoritmos que decidem sobre preemptibilidade, prioridades, tempos de execução e outras características de processos. No escalonamento usando o algoritmo Round-Robin,",
    alternativas: [
      { letra: "a", texto: "o processo que tem o prazo de execução mais curto é favorecido, medindo a diferença entre o tempo que um processo requer para finalizar e o tempo restante até atingir o seu prazo final." },
      { letra: "b", texto: "processos são despachados na ordem FIFO (First-in-First-Out), mas recebem uma quantidade limitada de tempo de processador denominada quantum." },
      { letra: "c", texto: "o escalonador ajusta dinamicamente o comportamento do processo, de tal forma que o próximo processo a obter o processador seja aquele que chegar à frente da fila de nível mais alto, que não estiver vazia, na rede de filas." },
      { letra: "d", texto: "a prioridade de cada processo é uma função não apenas do seu tempo de serviço, mas também do tempo que passou esperando pelo serviço." },
      { letra: "e", texto: "o escalonador seleciona o processo à espera com o menor tempo de execução estimado até a conclusão, reduzindo o tempo médio de espera, mas aumentando a variância dos tempos de resposta." }
    ],
    correta: "b",
    dica: "No Round-Robin não há análise de prioridade nem de tempo restante — há apenas uma fila e uma fatia de tempo fixa para cada processo.",
    resumo: "Round-Robin despacha processos em ordem FIFO, concedendo a cada um uma fatia limitada de CPU chamada quantum; esgotado o quantum, o processo volta ao fim da fila.",
    explicacao: "<p>O <strong>Round-Robin</strong> é um dos algoritmos mais simples e justos: os processos prontos ficam em uma <strong>fila circular FIFO</strong> e cada um recebe a CPU por um intervalo máximo chamado <strong>quantum</strong>. Se o processo não terminar no quantum, sofre preempção e vai para o fim da fila (Tanenbaum).</p><ul><li><strong>a)</strong> Descreve escalonamento orientado a <em>prazos</em> (deadline), típico de sistemas de tempo real.</li><li><strong>c)</strong> Descreve <em>filas multinível com realimentação</em> (múltiplas filas de prioridade).</li><li><strong>d)</strong> Descreve o algoritmo da <em>maior razão de resposta</em> (HRRN), em que a prioridade considera também o tempo de espera.</li><li><strong>e)</strong> Descreve o <em>SJF</em> (Shortest Job First), que escolhe o menor tempo estimado de execução.</li></ul>"
  },
  {
    id: 8,
    enunciado: "Em um sistema operacional típico de um computador, três processos se encontram na seguinte situação:<br>- o processo P1 envia uma mensagem ao Processo P2.<br>- o processo P2, ao receber a mensagem de P1, responde essa mensagem a P1.<br>- o processo P1, ao receber a mensagem de resposta de P2, responde a P2 com uma nova mensagem, e assim sucessivamente.<br>- o processo P3 se encontra bloqueado, situação da qual sairá apenas quando receber uma mensagem do processo P1.<br>Considerando que a prioridade do processo P3 é menor do que as prioridades dos processos P1 e P2, tem-se que",
    alternativas: [
      { letra: "a", texto: "a cada troca de mensagens entre P1 e P2 as respectivas prioridades automaticamente serão reduzidas, e quando elas forem inferior à do processo P3, esse será executado." },
      { letra: "b", texto: "ocorrerá uma situação conhecida como impasse (deadlock)." },
      { letra: "c", texto: "ocorrerá uma situação conhecida como inanição (starvation)." },
      { letra: "d", texto: "o processo P3 sairá dessa situação assim que uma interrupção qualquer ocorra." },
      { letra: "e", texto: "após passar 1 segundo bloqueado, o relógio de tempo real do sistema operacional automaticamente dará oportunidade de o processo P3 ser desbloqueado." }
    ],
    correta: "c",
    dica: "P1 e P2 continuam progredindo (trocando mensagens) indefinidamente — ninguém está parado esperando recurso do outro. P3, de prioridade menor, nunca é escolhido. Que problema é esse?",
    resumo: "Ocorre starvation (inanição): P1 e P2, de maior prioridade, seguem executando eternamente, e P3 — que só sai do bloqueio ao receber mensagem de P1 — nunca obtém CPU para progredir.",
    explicacao: "<p>A situação descrita é <strong>inanição (starvation)</strong>: como P1 e P2 trocam mensagens continuamente e têm prioridade maior que P3, o escalonador sempre os escolhe, e P3 permanece bloqueado/adormecido indefinidamente — um processo de baixa prioridade \"morre de fome\" diante de processos mais prioritários.</p><ul><li><strong>b)</strong> Não é <em>deadlock</em>: em deadlock os processos ficam <em>mutuamente bloqueados</em> esperando recursos uns dos outros e <em>nenhum</em> progride. Aqui P1 e P2 progridem normalmente — apenas P3 está prejudicado.</li><li><strong>a)</strong> O enunciado não indica mecanismo de <em>aging</em> (envelhecimento) que reduza prioridades automaticamente.</li><li><strong>d)</strong> Interrupções não desbloqueiam arbitrariamente um processo que espera mensagem.</li><li><strong>e)</strong> O relógio de tempo real não promove desbloqueio automático por tempo decorrido.</li></ul>"
  },
  {
    id: 9,
    enunciado: "Analise as afirmativas sobre o mecanismo de interrupção dos sistemas operacionais modernos.<br><br>I. As interrupções de I/O significam que uma saída foi concluída, que dados de entrada estão disponíveis ou que uma falha foi detectada.<br>II. O mecanismo de interrupção também é utilizado para manipular uma ampla gama de eventos, como a divisão por zero, o acesso a um endereço de memória protegido ou inexistente ou a tentativa de executar uma instrução privilegiada em modalidade de usuário.<br>III. Os eventos que disparam interrupções têm uma propriedade em comum: são ocorrências que induzem a placa-mãe a bloquear o barramento de dados para permitir que o sistema operacional execute uma rotina urgente.<br><br>Está correto o que se afirma APENAS em",
    alternativas: [
      { letra: "a", texto: "III" },
      { letra: "b", texto: "I e II." },
      { letra: "c", texto: "I" },
      { letra: "d", texto: "II e III." },
      { letra: "e", texto: "II" }
    ],
    correta: "b",
    dica: "I e II descrevem usos reais do mecanismo de interrupção (I/O e exceções/traps). Avalie se \"bloquear o barramento de dados\" é realmente o que define uma interrupção.",
    resumo: "I e II estão corretas; III está errada — a propriedade comum das interrupções é fazer a CPU suspender o fluxo atual e transferir o controle para uma rotina de tratamento (handler), não bloquear o barramento de dados.",
    explicacao: "<p><strong>I — Correta:</strong> controladores de dispositivos geram interrupções de I/O para sinalizar conclusão de saída, disponibilidade de dados de entrada ou falhas detectadas.</p><p><strong>II — Correta:</strong> o mesmo mecanismo trata exceções e traps: divisão por zero, acesso a endereço protegido/inexistente (falta de página, violação de acesso) e tentativa de executar instrução privilegiada em modo usuário (Tanenbaum).</p><p><strong>III — Errada:</strong> a propriedade comum dos eventos que disparam interrupções é fazer a <strong>CPU suspender a execução corrente e transferir o controle para uma rotina de tratamento</strong> (interrupt handler), localizada via vetor de interrupções. Não há \"bloqueio do barramento de dados pela placa-mãe\".</p><p>Logo, está correto apenas em <strong>I e II</strong> — alternativa <strong>b</strong>.</p>"
  },
  {
    id: 10,
    enunciado: "Uma pequena unidade de tempo denominada timeslice ou quantum é definida. Todos os processos são armazenados em uma fila FIFO circular. O escalonador da CPU percorre a fila, alocando a CPU para cada processo durante um quantum. Mais precisamente, o escalonador retira o primeiro processo da fila e procede à sua execução. Se o processo não termina após um quantum, ocorre uma preempção, e o processo é inserido no fim da fila. Se o processo termina antes de um quantum, a CPU é liberada para a execução de novos processos. Em ambos os casos, após a liberação da CPU, um novo processo é escolhido na fila. Novos processos são inseridos no fim da fila. A descrição acima refere-se ao algoritmo de escalonamento de processos",
    alternativas: [
      { letra: "a", texto: "por Prioridades." },
      { letra: "b", texto: "First-Come, First-Served." },
      { letra: "c", texto: "Shortest-Job-First." },
      { letra: "d", texto: "Filas em Vários Níveis." },
      { letra: "e", texto: "Round Robin." }
    ],
    correta: "e",
    dica: "Fila circular + fatia de tempo fixa (quantum) + preempção com retorno ao fim da fila é a definição clássica de um único algoritmo.",
    resumo: "A descrição — fila circular FIFO, quantum fixo e preempção com reinserção no fim da fila — é exatamente a do escalonamento Round Robin.",
    explicacao: "<p>O texto é a definição clássica de <strong>Round Robin</strong> (Silberschatz): fila circular de processos prontos, CPU alocada por um <em>quantum</em> e preempção ao fim da fatia, com o processo voltando ao fim da fila.</p><ul><li><strong>a)</strong> <em>Prioridades</em>: a escolha depende da prioridade de cada processo, não de uma fila única com quantum.</li><li><strong>b)</strong> <em>FCFS</em>: não há quantum nem preempção — o processo executa até terminar ou bloquear.</li><li><strong>c)</strong> <em>SJF</em>: escolhe o processo com o menor tempo de execução estimado.</li><li><strong>d)</strong> <em>Filas em vários níveis</em>: usa múltiplas filas com políticas diferentes, não uma única fila circular.</li></ul>"
  },
  {
    id: 11,
    enunciado: "Existem maneiras de controlar a sincronização de execução de processos, como por exemplo, quando um recurso único do sistema operacional necessita ser acessado por vários processos. Uma maneira clássica se dá pelo uso de semáforos, ou quando não é necessário efetuar contagem, uma versão simplificada, chamada de",
    alternativas: [
      { letra: "a", texto: "mutex." },
      { letra: "b", texto: "fork." },
      { letra: "c", texto: "sync." },
      { letra: "d", texto: "lock." },
      { letra: "e", texto: "block." }
    ],
    correta: "a",
    dica: "Quando a contagem não é necessária, usa-se um semáforo que só assume dois valores (0 e 1) — um semáforo binário, conhecido por um nome curto derivado de \"mutual exclusion\".",
    resumo: "Quando não é preciso contar, usa-se o mutex — um semáforo binário (0/1) que garante exclusão mútua no acesso ao recurso.",
    explicacao: "<p>O <strong>mutex</strong> (de <em>mutual exclusion</em>) é a versão simplificada do semáforo para quando não é necessária contagem: ele só assume os estados <em>bloqueado</em> e <em>desbloqueado</em>, garantindo que apenas um processo/thread acesse o recurso por vez (Tanenbaum).</p><ul><li><strong>b)</strong> <code>fork</code> é a chamada que cria um novo processo, não um mecanismo de sincronização.</li><li><strong>c)</strong> <code>sync</code> é a chamada que descarrega buffers para o disco.</li><li><strong>d)</strong> e <strong>e)</strong> \"lock\" e \"block\" descrevem operações/estados genéricos, não o nome da versão simplificada do semáforo.</li></ul>"
  },
  {
    id: 12,
    enunciado: "Quando um computador é multiprogramado, ele muitas vezes tem múltiplos processos ou threads que competem pela CPU ao mesmo tempo. Essa situação ocorre sempre que dois ou mais processos estão simultaneamente no estado pronto. Se uma CPU se encontrar disponível, deverá ser feita uma escolha de qual processo executar em seguida. A parte do sistema operacional que faz essa escolha é chamada",
    alternativas: [
      { letra: "a", texto: "stack pointer." },
      { letra: "b", texto: "escalonador." },
      { letra: "c", texto: "mecanismo de filas." },
      { letra: "d", texto: "thread de execução." },
      { letra: "e", texto: "barramento de dados." }
    ],
    correta: "b",
    dica: "Tanenbaum define explicitamente: \"a parte do sistema operacional que faz a escolha é chamada ...\" — é o componente que decide qual processo pronto ganha a CPU.",
    resumo: "A parte do SO que escolhe qual processo pronto recebe a CPU é o escalonador (scheduler); a política que ele usa é o algoritmo de escalonamento.",
    explicacao: "<p>Segundo Tanenbaum, quando vários processos estão prontos e uma CPU fica disponível, cabe ao <strong>escalonador</strong> (<em>scheduler</em>) escolher qual será executado em seguida, aplicando um <em>algoritmo de escalonamento</em>.</p><ul><li><strong>a)</strong> <em>Stack pointer</em> é um registrador da CPU que aponta para o topo da pilha.</li><li><strong>c)</strong> O mecanismo de filas é apenas a estrutura de dados que o escalonador utiliza.</li><li><strong>d)</strong> Thread é a unidade de execução escalonada, não quem escolhe.</li><li><strong>e)</strong> Barramento de dados é componente de hardware.</li></ul>"
  },
  {
    id: 13,
    enunciado: "Considere a figura abaixo que mostra a arquitetura do sistema operacional Linux.<br><br>A caixa:",
    figura: "img/q13.png",
    alternativas: [
      { letra: "a", texto: "II representa a camada que permite o acesso a recursos através da execução de chamadas feitas por processos. Tais chamadas são geradas por funções padrão suportadas pelo kernel. Dentre suas funções estão habilitar funções padrão como open, read, write e close e manter a comunicação entre as aplicações e o kernel." },
      { letra: "b", texto: "I é um processo que realiza modificações no kernel, permitindo que funcionalidades do Linux sejam habilitadas ou desabilitadas, conforme a necessidade. Tal processo gera ganho de performance, pois à medida que customiza o kernel, o usuário torna o Linux enxuto e adaptável." },
      { letra: "c", texto: "I é um processo que executa funções de leitura de comandos de entrada de um terminal, interpreta-os e gera novos processos, sempre que requisitados. É conhecido também como interpretador de comandos." },
      { letra: "d", texto: "II é um processo que realiza modificações no shell, permitindo que funcionalidades do Linux sejam habilitadas ou desabilitadas, conforme a necessidade. Tal processo gera ganho de performance, pois à medida que customiza o shell, o usuário torna o Linux enxuto e adaptável." },
      { letra: "e", texto: "I representa a camada responsável pela interface entre o hardware e as aplicações. Dentre suas funções encontram-se gerenciamento de I/O, manutenção do sistema de arquivos, gerenciamento de memória e swapping, controle da fila de processos, etc." }
    ],
    correta: "c",
    dica: "Na figura, I fica no mesmo nível das Aplicações, logo acima da Biblioteca de Funções Padrão — é o programa com o qual o usuário interage digitando comandos. II, junto ao Hardware, é o kernel.",
    resumo: "A caixa I é o shell — o interpretador de comandos que lê a entrada do terminal, interpreta os comandos e dispara novos processos. A caixa II, encostada no hardware, é o kernel.",
    explicacao: "<p>A figura mostra as camadas do Linux, de cima para baixo: <strong>Usuários → I / Aplicações → Biblioteca de Funções Padrão → II → Hardware</strong>.</p><ul><li><strong>I</strong> está no nível das aplicações, diretamente acessível ao usuário: é o <strong>shell</strong>, o interpretador de comandos — processo que lê comandos do terminal, interpreta-os e cria novos processos quando requisitado (alternativa <strong>c</strong>).</li><li><strong>II</strong>, imediatamente acima do hardware, é o <strong>kernel</strong>: responsável por gerenciamento de I/O, sistema de arquivos, memória e swapping, escalonamento de processos etc.</li><li><strong>a)</strong> Errada: descreve a <em>interface de chamadas de sistema</em> — que é a fronteira entre a biblioteca de funções padrão e o kernel —, mas afirma que isso seria a caixa II, quando II é o próprio kernel.</li><li><strong>e)</strong> Errada: as funções listadas (I/O, sistema de arquivos, memória, swapping, fila de processos) são da camada II (kernel), atribuídas incorretamente à caixa I.</li><li><strong>b)</strong> e <strong>d)</strong> Erradas: nem I nem II são \"processos que modificam\" kernel ou shell; a customização do kernel se dá por recompilação/módulos, não por um processo da camada de usuário representado na figura.</li></ul>"
  },
  {
    id: 14,
    enunciado: "O escalonador de processos é um componente central do sistema operacional e tem a função de",
    alternativas: [
      { letra: "a", texto: "determinar quando e por quanto tempo um processo é executado em um processador." },
      { letra: "b", texto: "permitir que os processos se comuniquem uns com os outros." },
      { letra: "c", texto: "determinar quando e como a memória é alocada a um processo e o que se faz quando a memória principal está cheia." },
      { letra: "d", texto: "atender às solicitações de entrada e saída dos processos." }
    ],
    correta: "a",
    dica: "O nome diz: ele <em>escalona</em> — decide a ordem e a duração do uso da CPU pelos processos prontos.",
    resumo: "O escalonador decide qual processo pronto recebe o processador, quando isso ocorre e por quanto tempo (quantum) ele permanece executando.",
    explicacao: "<p>O <strong>escalonador de processos</strong> decide <em>quando</em> e <em>por quanto tempo</em> cada processo usa o processador — escolhe o próximo processo da fila de prontos e determina sua fatia de tempo.</p><ul><li><strong>b)</strong> Comunicação entre processos (IPC) é função de mecanismos como pipes, mensagens e memória compartilhada.</li><li><strong>c)</strong> Alocação de memória e tratamento de memória cheia (swapping/paginação) são funções do <em>gerenciador de memória</em>.</li><li><strong>d)</strong> Solicitações de E/S são atendidas pelo <em>subsistema de E/S</em> e pelos drivers de dispositivo.</li></ul>"
  },
  {
    id: 15,
    enunciado: "Analise as afirmativas referentes aos conceitos de Sistemas Operacionais:<br><br>I – Condições de corrida são situações em que dois ou mais processos estão lendo ou gravando dados compartilhados ao mesmo tempo.<br>II – Exclusão mútua é uma estratégia para garantir que se um processo está utilizando um arquivo ou variável compartilhada, outros processos serão impedidos de acessar o mesmo arquivo ou variável ao mesmo tempo.<br>III – Exclusão mútua é uma das estratégias que controla o acesso a dados compartilhados, mas não consegue evitar que condições de corrida ocorram.<br><br>Está CORRETO o que se afirma em:",
    alternativas: [
      { letra: "a", texto: "I, II e III." },
      { letra: "b", texto: "I e II, apenas." },
      { letra: "c", texto: "III, apenas." },
      { letra: "d", texto: "I e III, apenas." },
      { letra: "e", texto: "II e III, apenas." }
    ],
    correta: "b",
    dica: "A exclusão mútua existe exatamente para impedir acessos simultâneos a dados compartilhados — compare isso com o que a afirmativa III diz sobre sua eficácia.",
    resumo: "I e II estão corretas; III está errada porque a exclusão mútua é justamente a estratégia que evita condições de corrida, impedindo acesso simultâneo a dados compartilhados.",
    explicacao: "<p><strong>I — Correta:</strong> <em>condição de corrida</em> (race condition) é a situação em que dois ou mais processos leem/gravam dados compartilhados concorrentemente e o resultado final depende da ordem de execução (Tanenbaum).</p><p><strong>II — Correta:</strong> <em>exclusão mútua</em> garante que, se um processo está usando uma variável/arquivo compartilhado (região crítica), os demais sejam impedidos de acessá-lo ao mesmo tempo.</p><p><strong>III — Errada:</strong> a exclusão mútua <em>consegue</em> evitar condições de corrida — essa é justamente sua finalidade. Controlando o acesso à região crítica, elimina-se a interleaving que causa resultados inconsistentes.</p>"
  },
  {
    id: 16,
    enunciado: "Em relação aos conceitos relacionados a processos em Sistemas Operacionais, considere o seguinte diagrama de estados, mostrando os três estados nos quais um processo pode se encontrar.<br><br>De acordo com o diagrama, analise as afirmativas a seguir:<br><br>I – Um processo pode estar nos estados \"Em execução\", \"Bloqueado\" e \"Pronto\".<br>II – A transição de número \"2\" ocorre quando o escalonador decide que o processo em execução foi executado por tempo suficiente e é o momento de deixar outro processo ter algum tempo de CPU.<br>III – A transição de número \"4\" ocorre quando o escalonador escolhe o processo que estava bloqueado para chegar à CPU e ser executado novamente.<br><br>Está CORRETO o que se afirma em:",
    figura: "img/q16.png",
    alternativas: [
      { letra: "a", texto: "I e II, apenas." },
      { letra: "b", texto: "I, II e III." },
      { letra: "c", texto: "I e III, apenas." },
      { letra: "d", texto: "I, apenas." },
      { letra: "e", texto: "II e III, apenas." }
    ],
    correta: "a",
    dica: "Observe no diagrama: a transição 4 vai de Bloqueado para Pronto — ela é disparada pelo <em>evento</em> que o processo aguardava (ex.: fim de uma E/S), não pelo escalonador. O escalonador só escolhe entre processos Prontos.",
    resumo: "I e II estão corretas; III está errada — a transição 4 (Bloqueado → Pronto) ocorre quando o evento aguardado acontece; o escalonador não escolhe processos bloqueados.",
    explicacao: "<p>O diagrama é o clássico modelo de três estados de Tanenbaum:</p><ul><li><strong>I — Correta:</strong> os três estados possíveis são <em>Em execução</em>, <em>Bloqueado</em> e <em>Pronto</em>.</li><li><strong>II — Correta:</strong> a transição <strong>2</strong> (Execução → Pronto) é a <em>preempção</em>: o escalonador decide que o processo já executou tempo suficiente e cede a CPU a outro processo.</li><li><strong>III — Errada:</strong> a transição <strong>4</strong> (Bloqueado → Pronto) ocorre quando <em>acontece o evento externo que o processo aguardava</em> (por exemplo, término de uma operação de E/S). O escalonador nunca escolhe um processo bloqueado para a CPU — a escolha do escalonador corresponde à transição <strong>3</strong> (Pronto → Execução), e um processo bloqueado nem sequer pode executar, pois logicamente não tem condições de prosseguir.</li></ul><p>As demais transições: <strong>1</strong> (Execução → Bloqueado) ocorre quando o processo se bloqueia aguardando um evento/E/S.</p>"
  },
  {
    id: 17,
    enunciado: "No Linux, um pipe é",
    alternativas: [
      { letra: "a", texto: "um processo zumbi." },
      { letra: "b", texto: "um tipo de variável de memória." },
      { letra: "c", texto: "um daemon." },
      { letra: "d", texto: "uma área de memória compartilhada." },
      { letra: "e", texto: "um canal entre dois processos." }
    ],
    correta: "e",
    dica: "Pense no que o operador \"|\" faz no shell: conecta a saída padrão de um processo à entrada padrão de outro.",
    resumo: "Um pipe é um canal unidirecional de comunicação entre dois processos: a saída padrão de um é ligada à entrada padrão do outro através de um buffer no kernel.",
    explicacao: "<p>No Linux/Unix, o <strong>pipe</strong> é um mecanismo de comunicação entre processos (IPC): um <strong>canal</strong> que liga a saída padrão (stdout) de um processo à entrada padrão (stdin) de outro, como em <code>cmd1 | cmd2</code>. Os dados passam por um buffer mantido pelo kernel.</p><ul><li><strong>a)</strong> Processo zumbi é um processo já terminado cujo pai ainda não leu seu status de saída.</li><li><strong>b)</strong> Pipe não é uma variável de memória.</li><li><strong>c)</strong> Daemon é um processo que executa em segundo plano prestando serviços.</li><li><strong>d)</strong> Memória compartilhada é outro mecanismo de IPC, no qual processos acessam a mesma região de memória — diferente do pipe, que é um fluxo sequencial via kernel.</li></ul>"
  },
  {
    id: 18,
    enunciado: "A threads é a unidade básica de utilização de CPU, sendo uma ferramenta importante para compartilhar recursos do sistema, bem como para melhorar a execução de programas.<br>Com relação a esse assunto afirma-se que:<br><br>I – Threads possibilitam reduzir a alocação de recursos do sistema, além de diminuir o overhead na criação, troca e eliminação de processos.<br>II – Threads em modo usuário são implementadas pelos usuários e não pelo sistema operacional. Apesar disso, tais threads são gerenciadas e sincronizadas pelo sistema operacional.<br>III – Threads em modo kernel são implementadas diretamente pelo núcleo do sistema operacional, através de chamadas a rotinas do sistema que oferecem todas as funções de gerenciamento e sincronização.<br><br>É correto apenas o que se afirma em",
    alternativas: [
      { letra: "a", texto: "I" },
      { letra: "b", texto: "I e III" },
      { letra: "c", texto: "II" },
      { letra: "d", texto: "III" },
      { letra: "e", texto: "I e II" }
    ],
    correta: "b",
    dica: "A afirmativa II se contradiz: se threads em modo usuário são implementadas pela aplicação (biblioteca), sem o SO saber que existem, quem as gerencia e sincroniza?",
    resumo: "I e III estão corretas; II está errada porque threads em modo usuário são gerenciadas e sincronizadas pela própria aplicação (biblioteca), sem conhecimento do núcleo do SO.",
    explicacao: "<p><strong>I — Correta:</strong> threads compartilham o espaço de endereçamento e os recursos do processo, reduzindo alocação de recursos e o overhead de criação, troca de contexto e eliminação em relação a processos (Machado &amp; Maia).</p><p><strong>II — Errada:</strong> threads em modo usuário (TMU) são implementadas por bibliotecas na aplicação e são <em>invisíveis ao núcleo</em> — justamente por isso são <strong>gerenciadas e sincronizadas pela própria aplicação</strong>, e não pelo sistema operacional. A afirmativa se autocontradiz ao dizer que o SO as gerencia.</p><p><strong>III — Correta:</strong> threads em modo kernel (TMK) são implementadas diretamente pelo núcleo, que oferece chamadas de sistema com todas as funções de gerenciamento e sincronização.</p>"
  },
  {
    id: 19,
    enunciado: "Quanto aos conceitos sobre Sistemas Operacionais conforme Varella (2019), analise as afirmativas a seguir e assinale a alternativa correta.<br><br>(1) O Shell é o responsável por gerenciar os processos e a memória.<br>(2) No Kernel é processado tanto as execuções como as interrupções.",
    alternativas: [
      { letra: "a", texto: "A afirmativa (1) é verdadeira, e a (2) é falsa" },
      { letra: "b", texto: "A afirmativa (2) é verdadeira, e a (1) é falsa" },
      { letra: "c", texto: "As afirmativas (1) e (2) são verdadeiras" },
      { letra: "d", texto: "As afirmativas (1) e (2) são falsas" }
    ],
    correta: "b",
    dica: "O shell é o interpretador de comandos — quem gerencia processos, memória e trata interrupções é o núcleo do sistema.",
    resumo: "A (1) é falsa — quem gerencia processos e memória é o kernel; o shell apenas interpreta comandos. A (2) é verdadeira — execuções e interrupções são tratadas no kernel.",
    explicacao: "<p><strong>(1) Falsa:</strong> o <em>shell</em> é o interpretador de comandos — a interface entre o usuário e o sistema. Quem gerencia processos e memória é o <strong>kernel</strong>.</p><p><strong>(2) Verdadeira:</strong> é no <em>kernel</em> que são processadas as execuções (escalonamento, chamadas de sistema) e tratadas as <strong>interrupções</strong> por meio das rotinas de tratamento.</p><p>Portanto, a afirmativa (2) é verdadeira e a (1) é falsa — alternativa <strong>b</strong>.</p>"
  },
  {
    id: 20,
    enunciado: "Quando um computador é multiprogramado, muitas vezes, tem múltiplos processos ou threads que competem pela CPU ao mesmo tempo. Essa situação ocorre sempre que dois ou mais processos estão em estado de pronto. Se somente uma CPU estiver disponível deverá ser feita uma escolha de qual processo será executado. (Tanenbaum, 2010)<br>Assinale a alternativa que identifica tal escolha.",
    alternativas: [
      { letra: "a", texto: "Algoritmo de escalonamento." },
      { letra: "b", texto: "Processo preemptivo" },
      { letra: "c", texto: "Autenticador." },
      { letra: "d", texto: "Escalonamento de processos." },
      { letra: "e", texto: "Escalonador." }
    ],
    correta: "e",
    dica: "O enunciado pergunta <em>quem</em> faz a escolha — o componente do SO —, não a regra nem a atividade. Tanenbaum diz: \"a parte do sistema operacional que faz a escolha é chamada...\".",
    resumo: "Quem faz a escolha é o escalonador (scheduler) — o componente do SO que decide qual processo pronto recebe a CPU.",
    explicacao: "<p>Tanenbaum escreve literalmente: \"a parte do sistema operacional que faz a escolha é chamada <strong>escalonador</strong>\" (<em>scheduler</em>).</p><ul><li><strong>d)</strong> \"Escalonamento de processos\" é o <em>ato/atividade</em> de escolher — o distrator mais tentador, mas o enunciado pede o componente que realiza a escolha.</li><li><strong>a)</strong> \"Algoritmo de escalonamento\" é a <em>regra/política</em> que o escalonador usa para decidir — outro distrator forte.</li><li><strong>b)</strong> \"Processo preemptivo\" refere-se a um modo de escalonamento que permite interromper o processo em execução.</li><li><strong>c)</strong> \"Autenticador\" não tem relação com a escolha de processos para a CPU.</li></ul>"
  },
  {
    id: 21,
    enunciado: "No que diz respeito à gerência de processos em sistemas operacionais, um termo é empregado para traduzir um problema que ocorre quando processos competem entre si. Existem quatro condições para sua ocorrência, listadas a seguir.<br><br>I. Condição de exclusão mútua. Em um determinado instante, cada recurso está em uma de duas situações: associado a um único processo ou disponível.<br>II. Condição de posse e espera. Processos que, em um determinado instante, retêm recursos concedidos anteriormente, podem requisitar novos recursos.<br>III. Condição de não preempção. Recursos concedidos previamente a um processo não podem ser tomados a força desse processo, eles devem ser explicitamente liberados pelo processo que os retém.<br>IV. Condição de espera circular. Deve existir um encadeamento circular de dois ou mais processos; cada um deles encontra-se à espera de um recurso que está sendo usado pelo membro seguinte dessa cadeia.<br><br>O termo é denominado",
    alternativas: [
      { letra: "a", texto: "padlock" },
      { letra: "b", texto: "multilock" },
      { letra: "c", texto: "ziplock" },
      { letra: "d", texto: "deadlock" }
    ],
    correta: "d",
    dica: "Essas quatro condições (exclusão mútua, posse e espera, não preempção e espera circular) são as clássicas condições de Coffman para um impasse.",
    resumo: "As quatro condições listadas são as condições de Coffman para deadlock (impasse): exclusão mútua, posse e espera, não preempção e espera circular.",
    explicacao: "<p>As quatro condições listadas são as condições necessárias (condições de Coffman, 1971) para a ocorrência de <strong>deadlock</strong> (impasse):</p><ul><li><strong>Exclusão mútua:</strong> cada recurso está associado a um único processo ou disponível.</li><li><strong>Posse e espera:</strong> processos que retêm recursos podem requisitar novos.</li><li><strong>Não preempção:</strong> recursos não podem ser tomados à força; devem ser liberados voluntariamente.</li><li><strong>Espera circular:</strong> cadeia circular de processos, cada um esperando recurso retido pelo seguinte.</li></ul><p>As demais alternativas (padlock, multilock, ziplock) são termos inventados.</p>"
  },
  {
    id: 22,
    enunciado: "Na maioria dos sistemas, os processos são executados de forma concorrente e podem ser gerados e destruídos dinamicamente. Com uma chamada de sistema do tipo fork podemos criar um novo processo em UNIX, ou CreateProcess() se for utilizado o Windows, por exemplo. Assim, indique a opção dentre da chamada de sistema de gerenciamento de processos que espera que um processo filho seja concluído.",
    alternativas: [
      { letra: "a", texto: "<code>pid = forkpid(pid, &amp;statloc, options)</code>." },
      { letra: "b", texto: "<code>pid = wait_pid(&amp;statloc, options)</code>." },
      { letra: "c", texto: "<code>pid = wait(pid, &amp;statloc, options)</code>." },
      { letra: "d", texto: "<code>pid = wait(pid, &amp;statloc)</code>." },
      { letra: "e", texto: "<code>pid = waitpid(pid, &amp;statloc, options)</code>." }
    ],
    correta: "e",
    dica: "No POSIX, a chamada que bloqueia o pai até um filho específico terminar recebe três argumentos: o pid do filho, o endereço da variável de status e as opções.",
    resumo: "A chamada POSIX que espera o término de um processo filho é waitpid(pid, &statloc, options) — recebe o pid do filho, o endereço do status de saída e opções.",
    explicacao: "<p>No UNIX/POSIX, a chamada que faz o processo pai esperar pela conclusão de um filho específico é <code>pid = waitpid(pid, &amp;statloc, options)</code>: o primeiro argumento é o pid do filho, o segundo é o endereço da variável que receberá o status de saída e o terceiro traz opções (por exemplo, <code>WNOHANG</code>) — alternativa <strong>e</strong>.</p><ul><li><strong>a)</strong> <code>forkpid</code> não existe; a chamada de criação é <code>fork()</code>, sem argumentos.</li><li><strong>b)</strong> <code>wait_pid</code> (com sublinhado) não é chamada POSIX.</li><li><strong>c)</strong> e <strong>d)</strong> <code>wait()</code> real não recebe pid nem opções — sua assinatura é <code>pid = wait(&amp;statloc)</code> e ela espera por <em>qualquer</em> filho.</li></ul>"
  },
  {
    id: 23,
    enunciado: "Em relação aos processadores de computadores, considerando a diferença entre núcleos e threads, assinale a alternativa correta.",
    alternativas: [
      { letra: "a", texto: "Núcleos são unidades físicas de processamento, enquanto threads são unidades lógicas para execução de tarefas." },
      { letra: "b", texto: "Threads são uma subdivisão física do processador, enquanto núcleos são unidades lógicas para execução de tarefas." },
      { letra: "c", texto: "Núcleos só podem executar uma tarefa por vez, enquanto threads podem executar múltiplas tarefas simultaneamente." },
      { letra: "d", texto: "Núcleos e threads são sinônimos e referem-se aos mesmos itens em um processador." },
      { letra: "e", texto: "Núcleos são responsáveis pelo armazenamento temporário de dados, enquanto threads são responsáveis pelo processamento desses dados." }
    ],
    correta: "a",
    dica: "Um dual-core tem duas unidades de hardware que executam código; uma thread é um fluxo de execução criado por software dentro de um processo.",
    resumo: "Núcleos (cores) são unidades físicas de processamento; threads são unidades lógicas — fluxos de execução de tarefas gerenciados por software.",
    explicacao: "<p><strong>Núcleos (cores)</strong> são unidades <em>físicas</em> de processamento — circuitos reais dentro do processador capazes de executar instruções. <strong>Threads</strong> são unidades <em>lógicas</em>: fluxos de execução de tarefas dentro de um processo, criados e escalonados por software.</p><ul><li><strong>b)</strong> Inverte os conceitos.</li><li><strong>c)</strong> Um núcleo com tecnologias como hyper-threading pode executar mais de um fluxo; e uma thread individual executa uma tarefa por vez.</li><li><strong>d)</strong> Não são sinônimos: núcleo é hardware, thread é fluxo de execução de software.</li><li><strong>e)</strong> Núcleos não são memória/armazenamento; executam instruções.</li></ul>"
  },
  {
    id: 24,
    enunciado: "As interrupções são decorrentes de eventos assíncronos, o que possibilita a ocorrência de múltiplas incidências simultâneas. Algumas interrupções podem ser ignoradas frente à ocorrência de outras. Essa característica corresponde a",
    alternativas: [
      { letra: "a", texto: "interrupções spooling." },
      { letra: "b", texto: "interrupções de buffer." },
      { letra: "c", texto: "interrupções prioritárias." },
      { letra: "d", texto: "interrupções mascaráveis." },
      { letra: "e", texto: "interrupções não mascaráveis." }
    ],
    correta: "d",
    dica: "Em arquitetura de computadores, interrupções que a CPU pode desabilitar/ignorar recebem um nome relacionado a \"máscara\" — pense no registrador de máscara de interrupções.",
    resumo: "Interrupções mascaráveis são as que podem ser ignoradas/desabilitadas pela CPU (via máscara de interrupções); as não mascaráveis (NMI) nunca podem ser ignoradas.",
    explicacao: "<p>As <strong>interrupções mascaráveis</strong> são aquelas que o processador pode <em>ignorar</em> — podem ser desabilitadas programaticamente por meio de uma máscara de interrupções (por exemplo, bits no registrador de flags), de modo que, frente à ocorrência de outras mais importantes ou em trechos críticos, elas não são atendidas.</p><ul><li><strong>e)</strong> Interrupções <em>não mascaráveis</em> (NMI) são exatamente o oposto: não podem ser ignoradas/desabilitadas (ex.: falhas graves de hardware).</li><li><strong>a)</strong> Spooling é técnica de gerenciamento de E/S (ex.: fila de impressão), não tipo de interrupção.</li><li><strong>b)</strong> \"Interrupções de buffer\" não é a classificação descrita.</li><li><strong>c)</strong> Embora existam níveis de prioridade de interrupção, a característica de \"poder ser ignorada\" é a definição de interrupção <em>mascarável</em>.</li></ul>"
  },
  {
    id: 25,
    enunciado: "Os sistemas operacionais atuais funcionam com suporte a um recurso, que utiliza o escalonamento de processos baseado em prioridades e totalmente gerenciado pelo sistema, constituindo um tipo de multitarefa muito estável.<br>Nesse esquema, cada aplicativo é protegido em uma área da memória e recebe uma prioridade, sendo que o sistema, e não o aplicativo, decide quando e onde vai ser executado. Como está isolado e protegido em uma determinada área mesmo que um programa faça algo errado, ele pode ser finalizado sem que o sistema caia.<br>Esse recurso é denominado multitarefa",
    alternativas: [
      { letra: "a", texto: "preemptiva." },
      { letra: "b", texto: "balanceada." },
      { letra: "c", texto: "cooperativa." },
      { letra: "d", texto: "particionada." }
    ],
    correta: "a",
    dica: "A pista-chave: \"o sistema, e não o aplicativo, decide quando\" executar — ou seja, o SO pode tirar a CPU do programa a qualquer momento.",
    resumo: "É a multitarefa preemptiva: o próprio sistema operacional controla quando e por quanto tempo cada aplicação usa a CPU, podendo interrompê-la (preempção) e finalizá-la sem derrubar o sistema.",
    explicacao: "<p>Na <strong>multitarefa preemptiva</strong>, o sistema operacional tem controle total sobre o escalonamento: atribui prioridades, decide quando cada aplicação executa e pode <em>preempcionar</em> (interromper) um programa a qualquer momento. Combinada à proteção de memória, uma aplicação com erro pode ser finalizada sem comprometer o sistema.</p><ul><li><strong>c)</strong> Na multitarefa <em>cooperativa</em>, é o próprio aplicativo que cede voluntariamente a CPU — se ele travar ou se recusar a ceder, o sistema inteiro pode congelar (era o modelo do Windows 3.x e do Mac OS clássico).</li><li><strong>b)</strong> e <strong>d)</strong> \"Balanceada\" e \"particionada\" não são os tipos clássicos de multitarefa.</li></ul>"
  },
  {
    id: 26,
    enunciado: "Quanto à memória virtual, julgue os itens a seguir.<br><br>I A técnica paginação por demanda não é usada nos sistemas de memória virtual.<br>II Uma das características da memória virtual é que ela permite que um processo crie uma região da memória que pode ser compartilhada com outro processo.<br>III Por meio da chamada de sistema fork ( ), a memória virtual pode permitir que as páginas sejam compartilhadas durante a criação do processo.<br><br>Assinale a alternativa correta.",
    alternativas: [
      { letra: "a", texto: "Apenas o item I está certo." },
      { letra: "b", texto: "Apenas os itens II e III estão certos." },
      { letra: "c", texto: "Apenas os itens I e II estão certos." },
      { letra: "d", texto: "Apenas os itens I e III estão certos." },
      { letra: "e", texto: "Apenas o item II está certo." }
    ],
    correta: "b",
    dica: "A paginação por demanda é justamente a técnica mais comum de implementar memória virtual — reavalie o item I com isso em mente.",
    resumo: "II e III estão certos: a memória virtual permite regiões compartilhadas entre processos e, no fork, as páginas podem ser compartilhadas (copy-on-write). I está errado — a paginação por demanda é a técnica clássica da memória virtual.",
    explicacao: "<p><strong>I — Errado:</strong> a <em>paginação por demanda</em> (demand paging) é <strong>a técnica clássica</strong> de implementação da memória virtual: as páginas só são carregadas na memória principal quando efetivamente referenciadas (Silberschatz).</p><p><strong>II — Certo:</strong> a memória virtual permite que um processo crie <strong>regiões de memória compartilhada</strong> acessíveis por outros processos — base para IPC por memória compartilhada.</p><p><strong>III — Certo:</strong> na chamada <code>fork()</code>, as páginas do processo pai podem ser <strong>compartilhadas</strong> com o filho durante a criação — técnica de <em>copy-on-write</em>, que evita duplicar a memória desnecessariamente.</p>"
  },
  {
    id: 27,
    enunciado: "Em sistemas Unix/Linux, o uso de <em>pipes</em> permite encadear comandos, fazendo com que a saída de um processo seja utilizada como entrada de outro. Considere o seguinte comando executado no terminal: <code>ps aux | grep firefox | wc -l</code>. Esse comando envolve múltiplos processos que se comunicam por meio de pipes criados pelo sistema operacional.",
    alternativas: [
      { letra: "a", texto: "O comando cria dois processos e um pipe, pois o último comando (wc -l) não necessita de entrada." },
      { letra: "b", texto: "O uso de pipes impede que os processos sejam executados concorrentemente." },
      { letra: "c", texto: "Os processos são executados de forma estritamente sequencial, aguardando o término completo de cada comando antes de iniciar o próximo." },
      { letra: "d", texto: "O sistema operacional cria apenas um processo, que executa todos os comandos em sequência." },
      { letra: "e", texto: "O comando cria três processos distintos, interligados por dois pipes, onde a saída de um é usada como entrada do próximo." }
    ],
    correta: "e",
    dica: "Conte os comandos separados por \"|\" e os próprios \"|\": cada comando vira um processo e cada \"|\" vira um pipe — e todos rodam ao mesmo tempo.",
    resumo: "O comando cria três processos (ps, grep, wc) conectados por dois pipes, executando concorrentemente — a saída de cada um alimenta a entrada do seguinte.",
    explicacao: "<p>Em <code>ps aux | grep firefox | wc -l</code>, o shell cria <strong>três processos</strong> (<code>ps</code>, <code>grep</code> e <code>wc</code>) e <strong>dois pipes</strong>: stdout de <code>ps</code> → stdin de <code>grep</code>, e stdout de <code>grep</code> → stdin de <code>wc</code>. Os três executam <em>concorrentemente</em>, comunicando-se pelos pipes criados pelo SO.</p><ul><li><strong>a)</strong> Errada: são três processos e dois pipes; <code>wc -l</code> precisa sim de entrada (ele conta as linhas recebidas do grep).</li><li><strong>b)</strong> e <strong>c)</strong> Erradas: os processos do pipeline executam <em>concorrentemente</em> — cada um consome a entrada conforme ela é produzida; não há impedimento nem execução estritamente sequencial.</li><li><strong>d)</strong> Errada: cada comando é um processo distinto.</li></ul>"
  },
  {
    id: 28,
    enunciado: "Observe a linha de comando a seguir.<br><code>$ mount | grep /dev/hda2</code><br><br>Essa linha de comando utiliza o operador \"|\" (pipe), que serve basicamente para",
    alternativas: [
      { letra: "a", texto: "encaminhar o conteúdo do comando mount para um arquivo em hda2." },
      { letra: "b", texto: "redirecionar a saída do comando mount." },
      { letra: "c", texto: "armazenar o conteúdo de hda2 no disco rígido." },
      { letra: "d", texto: "listar o dispositivo hda2, junto com o comando \"grep\"." }
    ],
    correta: "b",
    dica: "O \"|\" conecta a saída padrão do comando da esquerda à entrada padrão do comando da direita.",
    resumo: "O pipe redireciona a saída do comando mount para a entrada do grep, que filtra as linhas contendo /dev/hda2.",
    explicacao: "<p>O operador <code>|</code> (pipe) <strong>redireciona a saída padrão</strong> (stdout) do comando à esquerda para a <strong>entrada padrão</strong> (stdin) do comando à direita. Em <code>mount | grep /dev/hda2</code>, a listagem de sistemas de arquivos montados produzida por <code>mount</code> alimenta o <code>grep</code>, que exibe apenas as linhas contendo <code>/dev/hda2</code> — alternativa <strong>b</strong>.</p><ul><li><strong>a)</strong> O conteúdo vai para outro <em>comando</em> (grep), não para um arquivo.</li><li><strong>c)</strong> Nada é armazenado no disco.</li><li><strong>d)</strong> O pipe não \"lista o dispositivo\"; quem filtra as linhas é o grep, usando a saída do mount.</li></ul>"
  },
  {
    id: 29,
    enunciado: "As threads são suportadas por diversos sistemas operacionais modernos.<br>Cada thread",
    alternativas: [
      { letra: "a", texto: "não pode compartilhar as mesmas variáveis de um processo." },
      { letra: "b", texto: "utiliza a mesma pilha do processo que a criou." },
      { letra: "c", texto: "não pode voluntariamente desistir do uso da Unidade Central de Processamento, devendo sempre ser executada até o seu final." },
      { letra: "d", texto: "tem acesso à memória e aos recursos do processo ao qual pertence." },
      { letra: "e", texto: "não pode se replicar, pois, nessa situação, haveria a necessidade de duplicação de todo o processo." }
    ],
    correta: "d",
    dica: "As threads de um mesmo processo compartilham o espaço de endereçamento — cada uma só tem de privativo o contexto (registradores, PC e sua própria pilha).",
    resumo: "Cada thread tem acesso à memória e aos recursos do processo ao qual pertence — o que é compartilhado entre todas as threads do processo.",
    explicacao: "<p>Threads do mesmo processo <strong>compartilham o espaço de endereçamento, as variáveis globais, os arquivos abertos e demais recursos do processo</strong>; o que cada thread tem de privativo é seu contexto: registradores, contador de programa e sua <em>própria</em> pilha (Tanenbaum; Machado &amp; Maia).</p><ul><li><strong>a)</strong> Errada: threads compartilham as mesmas variáveis do processo — é aí que mora a vantagem (e o risco de condições de corrida).</li><li><strong>b)</strong> Errada: cada thread tem sua <em>própria</em> pilha, não a mesma pilha do processo.</li><li><strong>c)</strong> Errada: uma thread pode ceder voluntariamente a CPU (ex.: <code>thread_yield</code>) ou bloquear-se em E/S/sincronização.</li><li><strong>e)</strong> Errada: criar uma nova thread não exige duplicar o processo inteiro — justamente por isso threads são \"leves\".</li></ul>"
  },
  {
    id: 30,
    enunciado: "Em um sistema operacional que utiliza o algoritmo de escalonamento Round-Robin, o escalonador retirou o primeiro processo da fila circular de processos e concedeu-lhe a UCP para a sua execução. Caso esse processo não termine a sua execução após certo quantum de tempo,",
    alternativas: [
      { letra: "a", texto: "receberá mais um quantum extra, de forma que a sua execução se complete." },
      { letra: "b", texto: "ele apenas perderá a UCP caso o próximo processo presente na fila tenha prioridade superior à sua." },
      { letra: "c", texto: "um erro de sistema ocorrerá, pois esse tipo de algoritmo exige que o tempo de execução dos processos seja sempre inferior ao quantum." },
      { letra: "d", texto: "ele será abortado e terá que ser reiniciado quando novamente receber a UCP." },
      { letra: "e", texto: "uma preempção ocorrerá, e o processo será inserido no fim da fila circular de processos." }
    ],
    correta: "e",
    dica: "No Round-Robin o quantum é um limite rígido: acabou o tempo, a CPU é tomada — o que acontece com o processo depois disso?",
    resumo: "No Round-Robin, esgotado o quantum sem que o processo termine, ocorre preempção e o processo volta ao fim da fila circular, aguardando nova vez.",
    explicacao: "<p>No <strong>Round-Robin</strong>, cada processo recebe a UCP por no máximo um <em>quantum</em>. Se não terminar nesse intervalo, ocorre <strong>preempção</strong> — a UCP é retirada e o processo é <strong>reinserido no fim da fila circular</strong> de prontos, continuando de onde parou na próxima vez (Tanenbaum).</p><ul><li><strong>a)</strong> Não há quantum extra; a regra é estrita.</li><li><strong>b)</strong> Round-Robin não considera prioridades.</li><li><strong>c)</strong> Não gera erro — a preempção é o comportamento normal do algoritmo.</li><li><strong>d)</strong> O processo não é abortado nem reiniciado: ele é apenas suspenso e <em>retoma</em> a execução de onde parou.</li></ul>"
  },
  {
    id: 31,
    enunciado: "Em um sistema operacional que utiliza o algoritmo de escalonamento Round-Robin, o escalonador retirou o primeiro processo da fila circular de processos e concedeu-lhe a UCP para a sua execução. Caso esse processo não termine a sua execução após certo quantum de tempo,",
    alternativas: [
      { letra: "a", texto: "ele apenas perderá a UCP caso o próximo processo presente na fila tenha prioridade superior à sua." },
      { letra: "b", texto: "um erro de sistema ocorrerá, pois esse tipo de algoritmo exige que o tempo de execução dos processos seja sempre inferior ao quantum." },
      { letra: "c", texto: "ele será abortado e terá que ser reiniciado quando novamente receber a UCP." },
      { letra: "d", texto: "receberá mais um quantum extra, de forma que a sua execução se complete." },
      { letra: "e", texto: "uma preempção ocorrerá, e o processo será inserido no fim da fila circular de processos." }
    ],
    correta: "e",
    dica: "É a mesma situação da questão anterior: no Round-Robin, o fim do quantum sem término do processo dispara sempre a mesma ação do escalonador.",
    resumo: "Esgotado o quantum sem término do processo, o Round-Robin preempta a UCP e reinsere o processo no fim da fila circular de prontos.",
    explicacao: "<p>Mesma questão anterior com alternativas embaralhadas. No <strong>Round-Robin</strong>, se o processo não termina dentro do quantum, ocorre <strong>preempção</strong> e ele é colocado <strong>no fim da fila circular</strong> de processos prontos — alternativa <strong>e</strong>.</p><ul><li><strong>a)</strong> O algoritmo não compara prioridades.</li><li><strong>b)</strong> Não há erro de sistema — preempção é o comportamento esperado.</li><li><strong>c)</strong> O processo não é abortado; ele retoma de onde parou na próxima fatia.</li><li><strong>d)</strong> Não existe quantum extra.</li></ul>"
  }
];
