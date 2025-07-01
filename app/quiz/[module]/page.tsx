"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questionBank: { [key: string]: Question[] } = {
  legislacao: [
    {
      id: 1,
      question:
        "Segundo a Lei 16.024/2008 (Estatuto dos Servidores do Poder Judiciário do Paraná), qual das alternativas apresenta corretamente as formas de provimento de cargos públicos e suas características específicas?",
      options: [
        "Nomeação (originária), ascensão (progressão funcional), readaptação (limitação superveniente), reversão (retorno de aposentado), reintegração (anulação de demissão), recondução (retorno ao cargo anterior) e aproveitamento (fim da disponibilidade)",
        "Apenas nomeação por concurso público, sendo vedadas todas as demais formas de provimento",
        "Nomeação, promoção, transferência e remoção como únicas formas legais de provimento",
        "Contratação temporária, nomeação e designação para função gratificada",
      ],
      correct: 0,
      explanation:
        "A Lei 16.024/2008 estabelece sete formas de provimento: nomeação (forma originária que depende de concurso para cargos efetivos), ascensão (progressão na carreira), readaptação (investidura em cargo compatível com limitação física/mental superveniente), reversão (retorno do aposentado por invalidez quando cessada a causa), reintegração (retorno do servidor ilegalmente demitido), recondução (retorno ao cargo anteriormente ocupado) e aproveitamento (retorno do servidor em disponibilidade).",
    },
    {
      id: 2,
      question:
        "De acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018), quais são os princípios que devem nortear o tratamento de dados pessoais pelo Poder Judiciário, especialmente considerando o princípio da transparência?",
      options: [
        "Apenas finalidade, adequação e necessidade, sendo dispensados os demais princípios para o Poder Público",
        "Finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização",
        "Somente legalidade, impessoalidade, moralidade, publicidade e eficiência",
        "Exclusivamente transparência e segurança, por se tratar de órgão público",
      ],
      correct: 1,
      explanation:
        "O art. 6º da LGPD estabelece dez princípios fundamentais para o tratamento de dados pessoais: finalidade (propósitos legítimos e específicos), adequação (compatibilidade com finalidades), necessidade (limitação ao mínimo), livre acesso (garantia de consulta), qualidade dos dados (exatidão e atualização), transparência (informações claras), segurança (medidas técnicas), prevenção (medidas preventivas), não discriminação (vedação de fins discriminatórios) e responsabilização (demonstração de medidas eficazes).",
    },
    {
      id: 3,
      question:
        "Conforme a Lei 12.527/2011 (Lei de Acesso à Informação), qual é o procedimento correto para classificação de informações sigilosas no âmbito do Poder Judiciário e quais são os prazos máximos de sigilo?",
      options: [
        "Classificação livre pelo servidor, com prazos indefinidos",
        "Ultrassecreta (25 anos), secreta (15 anos) e reservada (5 anos), com classificação fundamentada e possibilidade de desclassificação",
        "Apenas informações reservadas (10 anos), sendo vedada classificação superior",
        "Sigilo perpétuo para informações relacionadas à segurança do Estado",
      ],
      correct: 1,
      explanation:
        "A LAI estabelece três graus de classificação: ultrassecreta (máximo 25 anos), secreta (máximo 15 anos) e reservada (máximo 5 anos). A classificação deve ser fundamentada, indicando o prazo de sigilo e a autoridade responsável. Há possibilidade de desclassificação automática pelo decurso do prazo ou por provocação, garantindo que o sigilo não seja perpétuo.",
    },
    {
      id: 4,
      question:
        "O Código de Ética e Conduta do Poder Judiciário do Paraná, baseado na Resolução CNJ 60/2008, estabelece vedações específicas aos magistrados. Qual das condutas abaixo NÃO constitui vedação ética?",
      options: [
        "Exercer atividade político-partidária ou manifestar preferência eleitoral",
        "Participar de atividades de aperfeiçoamento e capacitação profissional",
        "Receber custas ou participação em processo sob sua responsabilidade",
        "Exercer advocacia perante qualquer juízo ou tribunal",
      ],
      correct: 1,
      explanation:
        "A participação em atividades de aperfeiçoamento e capacitação profissional não apenas é permitida, como é um dever ético do magistrado manter-se atualizado. As demais opções constituem vedações expressas: exercício de atividade político-partidária, recebimento de custas ou participação em processo, e exercício da advocacia são incompatíveis com a função jurisdicional e comprometem a imparcialidade.",
    },
    {
      id: 5,
      question:
        "Segundo o Regimento Interno do TJPR, qual é a competência específica do Órgão Especial em relação ao Tribunal Pleno, considerando a estrutura organizacional do Tribunal?",
      options: [
        "Julgar apenas recursos criminais de competência originária",
        "Exercer atribuições administrativas e jurisdicionais delegadas pelo Tribunal Pleno, processar ações rescisórias e conflitos de competência",
        "Substituir integralmente o Tribunal Pleno em todas as suas competências",
        "Atuar exclusivamente em questões disciplinares de magistrados",
      ],
      correct: 1,
      explanation:
        "O Órgão Especial, composto pelos 25 desembargadores mais antigos, exerce competências delegadas pelo Tribunal Pleno, incluindo atribuições administrativas e jurisdicionais específicas como processamento de ações rescisórias, julgamento de conflitos de competência entre juízes, e outras matérias que não sejam de competência privativa do Pleno, otimizando o funcionamento do Tribunal.",
    },
    {
      id: 6,
      question:
        "No âmbito da Constituição do Estado do Paraná, como se organiza a separação de poderes e qual é o mecanismo de controle recíproco entre eles, especialmente no que tange ao Poder Judiciário?",
      options: [
        "Separação absoluta sem qualquer forma de controle entre os poderes",
        "Independência e harmonia entre Legislativo, Executivo e Judiciário, com sistema de freios e contrapesos incluindo controle de constitucionalidade pelo TJPR",
        "Supremacia do Poder Executivo sobre os demais poderes estaduais",
        "Subordinação do Judiciário estadual ao Poder Legislativo",
      ],
      correct: 1,
      explanation:
        "A Constituição Estadual adota o princípio da separação dos poderes com independência e harmonia entre eles, estabelecendo sistema de freios e contrapesos. O TJPR exerce controle de constitucionalidade das leis estaduais e municipais em face da Constituição Estadual, o Legislativo fiscaliza o Executivo e julga suas contas, e o Executivo possui iniciativa legislativa e poder de veto, garantindo equilíbrio entre os poderes.",
    },
    {
      id: 7,
      question:
        "Conforme a Lei 16.024/2008, quais são os requisitos específicos para a concessão de licença para tratamento de saúde de servidor do Poder Judiciário e qual é o procedimento para sua prorrogação?",
      options: [
        "Simples requerimento do servidor, sem necessidade de comprovação médica",
        "Inspeção médica oficial, com possibilidade de prorrogação mediante nova inspeção, observando-se o prazo máximo de 24 meses em período de 48 meses",
        "Apenas atestado médico particular, sem limitação de prazo",
        "Decisão discricionária da chefia imediata",
      ],
      correct: 1,
      explanation:
        "A licença para tratamento de saúde exige inspeção médica oficial que comprove a incapacidade para o trabalho. Pode ser prorrogada mediante nova inspeção médica, respeitando o limite de 24 meses consecutivos ou não, em um período de 48 meses. Ultrapassado esse prazo, o servidor deve ser submetido à junta médica para avaliação de aposentadoria por invalidez.",
    },
    {
      id: 8,
      question:
        "De acordo com a LGPD (Lei 13.709/2018), qual é o procedimento obrigatório em caso de incidente de segurança que comprometa dados pessoais no âmbito do Poder Judiciário?",
      options: [
        "Comunicação apenas interna, sem necessidade de notificação externa",
        "Comunicação à ANPD e ao titular dos dados em prazo razoável, com descrição detalhada do incidente, dados afetados e medidas adotadas",
        "Notificação exclusiva ao Conselho Nacional de Justiça",
        "Comunicação apenas se houver dano efetivo comprovado",
      ],
      correct: 1,
      explanation:
        "O art. 48 da LGPD determina que o controlador deve comunicar à ANPD e ao titular a ocorrência de incidente de segurança que possa acarretar risco ou dano relevante aos titulares. A comunicação deve ser feita em prazo razoável e conter: descrição da natureza dos dados afetados, informações sobre os titulares envolvidos, medidas técnicas e de segurança utilizadas, riscos relacionados ao incidente e motivos da demora na comunicação, se for o caso.",
    },
    {
      id: 9,
      question:
        "Segundo a Lei 12.527/2011 (LAI), qual é o procedimento recursal específico para casos de negativa de acesso à informação no âmbito do Poder Judiciário estadual?",
      options: [
        "Recurso único ao Supremo Tribunal Federal",
        "Primeira instância (autoridade hierarquicamente superior), segunda instância (autoridade máxima do órgão), terceira instância (órgão equivalente à CGU no estado)",
        "Apenas recurso administrativo interno, sem possibilidade de revisão externa",
        "Recurso direto ao Conselho Nacional de Justiça",
      ],
      correct: 1,
      explanation:
        "A LAI estabelece sistema recursal em três instâncias: primeira (autoridade hierarquicamente superior à que negou o acesso), segunda (autoridade máxima do órgão ou entidade), e terceira (para órgãos federais é a CGU, para estados e municípios são órgãos equivalentes criados para essa finalidade). No Poder Judiciário estadual, a terceira instância seria o órgão estadual competente ou, na sua ausência, aplicam-se as regras gerais do ente federativo.",
    },
    {
      id: 10,
      question:
        "No Código de Organização e Divisão Judiciárias do Paraná (CODJ), quais são os critérios específicos para classificação das comarcas em entrâncias e qual é a implicação prática dessa classificação?",
      options: [
        "Apenas critério populacional, sem outras considerações",
        "População, movimento forense, número de eleitores, receita tributária e arrecadação, determinando a complexidade das causas e progressão na carreira da magistratura",
        "Exclusivamente localização geográfica",
        "Apenas volume de processos criminais",
      ],
      correct: 1,
      explanation:
        "O CODJ estabelece critérios múltiplos para classificação das comarcas: população, movimento forense, número de eleitores, receita tributária e arrecadação. Essa classificação determina a entrância (inicial, intermediária, final/especial) que define a complexidade das causas que podem tramitar na comarca e serve como critério para progressão na carreira da magistratura, já que a promoção segue a ordem crescente de entrâncias.",
    },
  ],
  constitucional: [
    {
      id: 1,
      question:
        "Segundo o art. 1º da Constituição Federal de 1988, quais são os fundamentos da República Federativa do Brasil e como eles se relacionam com o princípio democrático estabelecido no parágrafo único do mesmo artigo?",
      options: [
        "Soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa, pluralismo político, consagrando que todo poder emana do povo",
        "Apenas soberania e cidadania, com poder concentrado no Estado",
        "Legalidade, impessoalidade, moralidade, publicidade e eficiência",
        "Independência nacional, integridade territorial e autodeterminação",
      ],
      correct: 0,
      explanation:
        "O art. 1º da CF/88 estabelece cinco fundamentos: soberania (poder supremo do Estado), cidadania (participação política ativa), dignidade da pessoa humana (valor supremo e nuclear), valores sociais do trabalho e da livre iniciativa (base da ordem econômica), e pluralismo político (diversidade de ideias). O parágrafo único consagra que 'todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente', estabelecendo a democracia representativa e participativa.",
    },
    {
      id: 2,
      question:
        "Conforme o art. 5º, LXVIII da CF/88, o habeas corpus tem seu campo de aplicação delimitado. Qual é a abrangência específica deste remédio constitucional e suas limitações em relação a outros instrumentos de proteção?",
      options: [
        "Protege qualquer direito fundamental violado por autoridade pública",
        "Protege exclusivamente a liberdade de locomoção contra violência ou coação ilegal ou abusiva, não abrangendo direitos patrimoniais ou outros direitos",
        "Aplica-se apenas a crimes contra a vida",
        "Substitui qualquer ação judicial em matéria criminal",
      ],
      correct: 1,
      explanation:
        "O habeas corpus (art. 5º, LXVIII) tem campo específico: protege a liberdade de locomoção (direito de ir, vir e permanecer) contra violência ou coação por ilegalidade ou abuso de poder. Não se aplica a direitos patrimoniais, multas, sanções administrativas que não afetem a locomoção, ou outros direitos fundamentais que possuem remédios próprios (mandado de segurança, habeas data).",
    },
    {
      id: 3,
      question:
        "Segundo o art. 60 da CF/88, quais são as limitações materiais (cláusulas pétreas) ao poder de reforma constitucional e qual é o fundamento teórico dessas limitações?",
      options: [
        "Não existem limitações materiais, podendo a Constituição ser totalmente reformada",
        "Forma federativa de Estado, voto direto, secreto, universal e periódico, separação dos Poderes, direitos e garantias individuais - protegendo a identidade constitucional",
        "Apenas os direitos sociais são protegidos contra emenda",
        "Somente a forma republicana de governo é imutável",
      ],
      correct: 1,
      explanation:
        "O art. 60, §4º estabelece quatro cláusulas pétreas: I) forma federativa de Estado; II) voto direto, secreto, universal e periódico; III) separação dos Poderes; IV) direitos e garantias individuais. Essas limitações protegem a identidade constitucional e os elementos essenciais do Estado Democrático de Direito, impedindo que o poder constituinte derivado destrua os fundamentos básicos da ordem constitucional.",
    },
    {
      id: 4,
      question:
        "De acordo com o art. 37 da CF/88, quais são os princípios expressos da Administração Pública e como o princípio da eficiência, incluído pela EC 19/98, modificou o paradigma administrativo brasileiro?",
      options: [
        "Legalidade, impessoalidade, moralidade, publicidade e eficiência (LIMPE), introduzindo a busca por resultados e qualidade na gestão pública",
        "Apenas legalidade e moralidade são princípios constitucionais expressos",
        "Supremacia do interesse público e indisponibilidade são os únicos princípios",
        "Hierarquia, disciplina e unidade de comando",
      ],
      correct: 0,
      explanation:
        "O art. 37, caput estabelece os princípios LIMPE: Legalidade (só fazer o que a lei permite), Impessoalidade (tratamento igualitário, vedação ao nepotismo), Moralidade (ética e probidade), Publicidade (transparência) e Eficiência (incluído pela EC 19/98). A eficiência introduziu o paradigma gerencial, exigindo otimização de recursos, celeridade, qualidade dos serviços e foco em resultados, superando o modelo puramente burocrático.",
    },
    {
      id: 5,
      question:
        "Segundo o art. 5º, LXIX da CF/88, o mandado de segurança possui requisitos específicos para sua concessão. Quais são esses requisitos e como se diferencia do habeas corpus e habeas data?",
      options: [
        "Protege qualquer direito, sem requisitos específicos",
        "Protege direito líquido e certo, não amparado por habeas corpus ou habeas data, contra autoridade pública ou agente de pessoa jurídica no exercício de atribuições públicas",
        "Aplica-se apenas a servidores públicos",
        "Substitui qualquer ação contra o Poder Público",
      ],
      correct: 1,
      explanation:
        "O mandado de segurança (art. 5º, LXIX) exige: 1) direito líquido e certo (certo, determinado, comprovado documentalmente); 2) que não seja amparado por habeas corpus (liberdade de locomoção) ou habeas data (informações pessoais); 3) ato de autoridade pública ou agente de pessoa jurídica no exercício de atribuições públicas; 4) ilegalidade ou abuso de poder. Diferencia-se por proteger direitos diversos da locomoção e informações pessoais.",
    },
    {
      id: 6,
      question:
        "Conforme os arts. 14 e 15 da CF/88, quais são as condições de elegibilidade e as causas de perda ou suspensão dos direitos políticos, considerando o sistema democrático brasileiro?",
      options: [
        "Apenas nacionalidade brasileira e idade mínima são requisitos",
        "Nacionalidade brasileira, pleno exercício dos direitos políticos, alistamento eleitoral, domicílio eleitoral, filiação partidária, idade mínima; perda/suspensão por cancelamento de naturalização, incapacidade civil absoluta, condenação criminal, recusa de obrigação legal, improbidade administrativa",
        "Somente alfabetização e renda mínima",
        "Não há requisitos específicos para elegibilidade",
      ],
      correct: 1,
      explanation:
        "Art. 14, §3º estabelece condições de elegibilidade: nacionalidade brasileira, pleno exercício dos direitos políticos, alistamento eleitoral, domicílio eleitoral na circunscrição, filiação partidária, idade mínima variável por cargo. Art. 15 prevê perda/suspensão por: cancelamento de naturalização por sentença, incapacidade civil absoluta, condenação criminal transitada em julgado, recusa de cumprir obrigação a todos imposta ou prestação alternativa, improbidade administrativa.",
    },
    {
      id: 7,
      question:
        "Segundo o art. 102 da CF/88, qual é a competência originária do Supremo Tribunal Federal e como ela se relaciona com sua função de guardião da Constituição?",
      options: [
        "Apenas julgar recursos extraordinários",
        "Processar e julgar ações diretas de inconstitucionalidade, ações declaratórias de constitucionalidade, ADPF, crimes comuns de autoridades com foro privilegiado, conflitos federativos, entre outras competências que asseguram a supremacia constitucional",
        "Somente questões criminais de alta complexidade",
        "Apenas conflitos entre Poderes da União",
      ],
      correct: 1,
      explanation:
        "O art. 102, I do STF estabelece competências que materializam sua função de guardião da Constituição: ADI, ADC, ADPF (controle concentrado), crimes comuns do Presidente, Vice-Presidente, membros do Congresso, Ministros, PGR (foro privilegiado), conflitos entre União e Estados, habeas corpus contra atos do Presidente, Tribunais Superiores, litígios entre Estados estrangeiros e União/Estados, extradição, homologação de sentenças estrangeiras, entre outras que asseguram a supremacia constitucional.",
    },
    {
      id: 8,
      question:
        "De acordo com o art. 18 da CF/88, como se organiza a federação brasileira e quais são as características da autonomia dos entes federados?",
      options: [
        "União centralizada com Estados subordinados",
        "União indissolúvel de Estados, Municípios e Distrito Federal, com autonomia política (autogoverno), administrativa (autoadministração), legislativa (autolegislação) e financeira",
        "Apenas Estados possuem autonomia",
        "Confederação de Estados independentes",
      ],
      correct: 1,
      explanation:
        "O art. 18 estabelece que a organização político-administrativa compreende União, Estados, DF e Municípios, todos autônomos. A autonomia federativa abrange: política (eleger governantes), administrativa (organizar serviços), legislativa (elaborar leis dentro da competência), financeira (arrecadar e aplicar recursos). A federação é indissolúvel (vedação de secessão) e cooperativa (repartição de competências e colaboração entre entes).",
    },
    {
      id: 9,
      question:
        "Conforme o art. 5º, XXXV da CF/88 (princípio da inafastabilidade da jurisdição), qual é o alcance desta garantia e como ela se relaciona com o acesso à justiça?",
      options: [
        "Apenas litígios criminais podem ser levados ao Judiciário",
        "A lei não excluirá da apreciação do Poder Judiciário lesão ou ameaça a direito, garantindo acesso universal à justiça, incluindo tutela preventiva e reparatória",
        "Somente após esgotamento da via administrativa",
        "Apenas para quem pode pagar custas judiciais",
      ],
      correct: 1,
      explanation:
        "O art. 5º, XXXV consagra a inafastabilidade da jurisdição: 'a lei não excluirá da apreciação do Poder Judiciário lesão ou ameaça a direito'. Garante: 1) acesso universal à justiça; 2) tutela preventiva (ameaça) e reparatória (lesão); 3) vedação de exigência de esgotamento da via administrativa; 4) monopólio da jurisdição pelo Judiciário; 5) direito à tutela jurisdicional adequada, tempestiva e efetiva.",
    },
    {
      id: 10,
      question:
        "Segundo o art. 93 da CF/88, quais são as garantias da magistratura e qual é sua finalidade no sistema de separação de poderes?",
      options: [
        "Apenas estabilidade no cargo",
        "Vitaliciedade, inamovibilidade e irredutibilidade de subsídios, assegurando independência funcional para exercício imparcial da jurisdição",
        "Somente foro privilegiado",
        "Apenas aposentadoria especial",
      ],
      correct: 1,
      explanation:
        "O art. 93 estabelece três garantias da magistratura: 1) vitaliciedade (perda do cargo apenas por sentença judicial transitada em julgado); 2) inamovibilidade (não remoção sem consentimento, salvo interesse público mediante decisão do tribunal por maioria absoluta); 3) irredutibilidade de subsídios (proteção contra diminuição remuneratória). Essas garantias asseguram independência funcional necessária para exercício imparcial da jurisdição e manutenção do equilíbrio entre os Poderes.",
    },
  ],
  administrativo: [
    {
      id: 1,
      question:
        "Segundo a doutrina de Celso Antônio Bandeira de Mello, como o princípio da supremacia do interesse público se relaciona com os direitos fundamentais e qual é o entendimento atual sobre sua aplicação?",
      options: [
        "O interesse público sempre prevalece absolutamente sobre qualquer direito individual",
        "Deve haver ponderação entre interesse público e direitos fundamentais, aplicando-se a proporcionalidade e razoabilidade, sem supremacia absoluta",
        "Os direitos individuais sempre prevalecem sobre o interesse coletivo",
        "Não existe hierarquia entre interesse público e privado",
      ],
      correct: 1,
      explanation:
        "A doutrina moderna, especialmente pós-constitucional, reconhece que a supremacia do interesse público não é absoluta. Deve haver ponderação com os direitos fundamentais, aplicando-se os princípios da proporcionalidade e razoabilidade. O STF tem entendido que não há supremacia a priori, mas necessidade de compatibilização entre interesse público e direitos fundamentais, considerando o caso concreto e a dignidade da pessoa humana como valor supremo.",
    },
    {
      id: 2,
      question:
        "De acordo com a Lei 8.429/92, alterada pela Lei 14.230/21, quais são os elementos subjetivos exigidos para caracterização dos atos de improbidade administrativa e como isso impactou a aplicação da lei?",
      options: [
        "Apenas culpa é suficiente para todos os tipos de improbidade",
        "Dolo específico para todos os tipos de improbidade, exigindo-se vontade livre e consciente de praticar o ato ímprobo",
        "Responsabilidade objetiva, independente de dolo ou culpa",
        "Apenas dolo genérico para enriquecimento ilícito",
      ],
      correct: 1,
      explanation:
        "A Lei 14.230/21 alterou significativamente a LIA, exigindo dolo específico para todos os tipos de improbidade (enriquecimento ilícito, prejuízo ao erário, violação de princípios). Não basta mais a culpa ou dolo genérico; é necessário demonstrar que o agente teve vontade livre e consciente de praticar o ato ímprobo, conhecendo sua ilicitude. Isso reduziu drasticamente o número de condenações e exigiu maior rigor probatório.",
    },
    {
      id: 3,
      question:
        "Conforme a Lei 14.133/21 (Nova Lei de Licitações), quais são as modalidades licitatórias previstas e qual é a principal inovação em relação à legislação anterior?",
      options: [
        "Manteve as modalidades da Lei 8.666/93 sem alterações",
        "Pregão, concorrência, concurso, leilão e diálogo competitivo, extinguindo convite e tomada de preços, priorizando o pregão eletrônico",
        "Apenas pregão e concorrência",
        "Criou apenas o diálogo competitivo como nova modalidade",
      ],
      correct: 1,
      explanation:
        "A Lei 14.133/21 estabeleceu cinco modalidades: pregão (preferencial), concorrência, concurso, leilão e diálogo competitivo (inovação). Extinguiu convite e tomada de preços, simplificando o sistema. O pregão eletrônico tornou-se preferencial para bens e serviços comuns. O diálogo competitivo permite discussão prévia com licitantes para soluções inovadoras em contratações complexas, representando a principal inovação da nova lei.",
    },
    {
      id: 4,
      question:
        "Segundo a teoria dos atos administrativos, quais são os atributos específicos e como a autoexecutoriedade se manifesta na prática administrativa?",
      options: [
        "Apenas presunção de legitimidade existe como atributo",
        "Presunção de legitimidade/veracidade, imperatividade, autoexecutoriedade e tipicidade, sendo a autoexecutoriedade a possibilidade de execução direta sem prévia autorização judicial",
        "Somente imperatividade e tipicidade",
        "Todos os atos possuem todos os atributos sempre",
      ],
      correct: 1,
      explanation:
        "Os atos administrativos possuem quatro atributos: 1) presunção de legitimidade/veracidade (presunção relativa de legalidade e verdade); 2) imperatividade (imposição a terceiros); 3) autoexecutoriedade (execução direta sem prévia autorização judicial, quando há previsão legal ou urgência); 4) tipicidade (correspondência a figura legal). Nem todos os atos possuem todos os atributos - atos negociais não têm imperatividade, cobrança de multa não tem autoexecutoriedade.",
    },
    {
      id: 5,
      question:
        "De acordo com o art. 37, §6º da CF/88, como funciona a responsabilidade civil objetiva do Estado e qual é o procedimento para o direito de regresso?",
      options: [
        "Responsabilidade subjetiva do Estado e objetiva do agente",
        "Responsabilidade objetiva do Estado (teoria do risco administrativo) e subjetiva do agente, com direito de regresso mediante comprovação de dolo ou culpa",
        "Responsabilidade objetiva tanto do Estado quanto do agente",
        "Irresponsabilidade estatal",
      ],
      correct: 1,
      explanation:
        "O art. 37, §6º estabelece responsabilidade objetiva do Estado (teoria do risco administrativo): basta dano e nexo causal, sem necessidade de prova de culpa estatal. O agente responde subjetivamente. O Estado tem direito de regresso contra o agente mediante comprovação de dolo ou culpa deste, independentemente da condenação estatal. A ação regressiva prescreve em 5 anos e pode ser ajuizada mesmo antes da condenação do Estado.",
    },
    {
      id: 6,
      question:
        "Conforme a doutrina do poder de polícia, quais são seus atributos específicos e como se diferencia a polícia administrativa da polícia judiciária?",
      options: [
        "Não há diferença entre polícia administrativa e judiciária",
        "Discricionariedade, autoexecutoriedade e coercibilidade; polícia administrativa é preventiva (incide sobre bens/atividades), polícia judiciária é repressiva (incide sobre pessoas/crimes)",
        "Apenas coercibilidade como atributo",
        "Polícia administrativa só atua em crimes",
      ],
      correct: 1,
      explanation:
        "O poder de polícia possui três atributos: 1) discricionariedade (margem de escolha quanto à oportunidade/conveniência); 2) autoexecutoriedade (execução direta, sem prévia autorização judicial); 3) coercibilidade (uso da força para fazer cumprir). Polícia administrativa é preventiva, incide sobre bens, direitos e atividades (licenças, fiscalizações). Polícia judiciária é repressiva, incide sobre pessoas, apura infrações penais (inquéritos, prisões).",
    },
    {
      id: 7,
      question:
        "Segundo a Lei 9.784/99 (Processo Administrativo Federal), quais são os princípios específicos do processo administrativo e como se aplicam à Administração Pública?",
      options: [
        "Apenas legalidade e moralidade",
        "Legalidade, finalidade, motivação, razoabilidade, proporcionalidade, moralidade, ampla defesa, contraditório, segurança jurídica, interesse público, eficiência",
        "Somente contraditório e ampla defesa",
        "Apenas os princípios constitucionais gerais",
      ],
      correct: 1,
      explanation:
        "A Lei 9.784/99, art. 2º estabelece princípios específicos: legalidade, finalidade, motivação, razoabilidade, proporcionalidade, moralidade, ampla defesa, contraditório, segurança jurídica, interesse público, eficiência. Estes princípios orientam todo o processo administrativo, garantindo direitos dos administrados e legitimidade da atuação administrativa, sendo aplicáveis subsidiariamente aos demais entes federativos.",
    },
    {
      id: 8,
      question:
        "De acordo com a teoria da descentralização administrativa, como se diferenciam a descentralização por outorga e por delegação, e quais são suas implicações jurídicas?",
      options: [
        "Não há diferença entre outorga e delegação",
        "Outorga transfere titularidade e execução (criação de entidades da administração indireta), delegação transfere apenas execução (concessão/permissão a particulares)",
        "Outorga é apenas para particulares",
        "Delegação sempre transfere titularidade",
      ],
      correct: 1,
      explanation:
        "Descentralização por outorga: transfere titularidade e execução do serviço público para pessoa jurídica criada pelo Estado (autarquias, fundações, empresas públicas, sociedades de economia mista). Descentralização por delegação: transfere apenas a execução para particular (concessionários, permissionários), mantendo o Estado a titularidade. A outorga é mais estável, a delegação é precária e pode ser revogada unilateralmente.",
    },
    {
      id: 9,
      question:
        "Conforme a Súmula 473 do STF, como se manifesta o princípio da autotutela administrativa e quais são seus limites?",
      options: [
        "Administração não pode rever seus atos",
        "Administração pode anular atos ilegais e revogar atos inconvenientes/inoportunos, observando direitos adquiridos e segurança jurídica",
        "Apenas o Judiciário pode anular atos administrativos",
        "Autotutela é ilimitada no tempo",
      ],
      correct: 1,
      explanation:
        "A Súmula 473 do STF consagra a autotutela: 'A administração pode anular seus próprios atos, quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos; ou revogá-los, por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos, e ressalvada, em todos os casos, a apreciação judicial.' Limites: direitos adquiridos, boa-fé, segurança jurídica, prazo decadencial (5 anos - Lei 9.784/99).",
    },
    {
      id: 10,
      question:
        "Segundo a Lei 8.112/90 e jurisprudência do STF, como funciona o regime de acumulação de cargos públicos e quais são as exceções constitucionais?",
      options: [
        "Acumulação livre de qualquer cargo público",
        "Vedação geral com exceções: dois cargos de professor, dois de profissional de saúde, um de professor com outro técnico/científico, desde que haja compatibilidade de horários",
        "Apenas servidores federais podem acumular",
        "Acumulação permitida apenas com autorização judicial",
      ],
      correct: 1,
      explanation:
        "O art. 37, XVI da CF/88 veda acumulação remunerada de cargos públicos, salvo: a) dois cargos de professor; b) dois cargos privativos de profissionais de saúde com profissões regulamentadas; c) um cargo de professor com outro técnico ou científico. Exige-se compatibilidade de horários e observância do teto remuneratório. A jurisprudência do STF é rigorosa na interpretação das exceções, exigindo efetivo exercício das atividades.",
    },
  ],
  civil: [
    {
      id: 1,
      question:
        "Conforme o art. 2º do Código Civil e a teoria da personalidade jurídica, como se adquire a personalidade civil e qual é a proteção conferida ao nascituro?",
      options: [
        "Personalidade inicia-se com a concepção",
        "Personalidade civil inicia-se com o nascimento com vida, mas a lei põe a salvo os direitos do nascituro desde a concepção",
        "Apenas com o registro civil",
        "Somente com a maioridade civil",
      ],
      correct: 1,
      explanation:
        "O art. 2º do CC estabelece que a personalidade civil inicia-se com o nascimento com vida, mas ressalva que 'a lei põe a salvo, desde a concepção, os direitos do nascituro.' Isso significa que o nascituro tem expectativa de direitos (direitos eventuais) que se consolidam com o nascimento com vida, como direitos sucessórios, alimentos gravídicos, danos morais por morte do genitor.",
    },
    {
      id: 2,
      question:
        "De acordo com os arts. 11 a 21 do Código Civil, quais são as características dos direitos da personalidade e como se resolve o conflito entre eles?",
      options: [
        "São renunciáveis e transmissíveis",
        "São intransmissíveis e irrenunciáveis, não podendo sofrer limitação voluntária, salvo nos casos previstos em lei, resolvendo-se conflitos por ponderação",
        "Podem ser livremente negociados",
        "Aplicam-se apenas após a morte",
      ],
      correct: 1,
      explanation:
        "Os direitos da personalidade (arts. 11-21 CC) são intransmissíveis e irrenunciáveis, não podendo seu exercício sofrer limitação voluntária, salvo casos previstos em lei. Incluem direito ao nome, à imagem, à honra, à privacidade, à integridade física e moral. Em caso de conflito entre direitos da personalidade, aplica-se a técnica da ponderação, considerando o caso concreto e a proporcionalidade.",
    },
    {
      id: 3,
      question:
        "Segundo os arts. 189 e 205 do Código Civil, como se diferenciam prescrição e decadência, e quais são suas consequências práticas?",
      options: [
        "São institutos idênticos com os mesmos efeitos",
        "Prescrição extingue a pretensão (direito de ação), pode ser suspensa/interrompida; decadência extingue o direito potestativo, não se suspende/interrompe",
        "Prescrição é apenas para direitos reais",
        "Decadência só se aplica a direitos contratuais",
      ],
      correct: 1,
      explanation:
        "Prescrição (art. 189): extinção da pretensão (direito de exigir judicialmente) pelo decurso do tempo, pode ser suspensa/interrompida, prazo geral de 10 anos (art. 205). Decadência: extinção do próprio direito potestativo pelo decurso do tempo, não se suspende/interrompe, prazos específicos em lei. A prescrição gera exceção, a decadência pode ser declarada de ofício.",
    },
    {
      id: 4,
      question:
        "Conforme o art. 79 do Código Civil e a classificação dos bens, como se caracterizam os bens imóveis e qual é a importância dessa distinção?",
      options: [
        "Apenas terrenos são bens imóveis",
        "Solo e tudo quanto se lhe incorpora natural ou artificialmente, determinando regime jurídico específico (registro, usucapião, garantias)",
        "Somente construções são imóveis",
        "Classificação sem relevância jurídica",
      ],
      correct: 1,
      explanation:
        "O art. 79 define bens imóveis como 'o solo e tudo quanto se lhe incorpora natural ou artificialmente.' Incluem-se árvores, construções, plantações. A distinção é fundamental: imóveis exigem registro público, têm prazos diferenciados de usucapião, podem ser objeto de hipoteca, têm regime sucessório específico, competência territorial para ações, entre outras consequências jurídicas relevantes.",
    },
    {
      id: 5,
      question:
        "De acordo com a Lei 10.741/03 (Estatuto do Idoso), quais são os direitos fundamentais da pessoa idosa e qual é o sistema de proteção estabelecido?",
      options: [
        "Apenas direito à saúde",
        "Direitos à vida, saúde, alimentação, educação, cultura, esporte, lazer, trabalho, cidadania, liberdade, dignidade, respeito, convivência familiar, com proteção integral e prioridade absoluta",
        "Somente direitos previdenciários",
        "Apenas proteção contra violência",
      ],
      correct: 1,
      explanation:
        "O Estatuto do Idoso (pessoa com 60+ anos) estabelece proteção integral com direitos fundamentais amplos: vida, saúde, alimentação, educação, cultura, esporte, lazer, trabalho, cidadania, liberdade, dignidade, respeito, convivência familiar e comunitária. Garante prioridade absoluta, atendimento preferencial, gratuidade de transporte, meia-entrada, crimes específicos, medidas de proteção.",
    },
    {
      id: 6,
      question:
        "Conforme a Lei 13.146/15 (Estatuto da Pessoa com Deficiência), como foi alterado o regime de incapacidades no Código Civil e quais são as implicações práticas?",
      options: [
        "Manteve o regime anterior sem alterações",
        "Deficiência não é mais causa de incapacidade civil, criando-se a tomada de decisão apoiada e modificando-se a curatela para atos patrimoniais",
        "Apenas criou novos direitos sociais",
        "Deficiência continua gerando incapacidade absoluta",
      ],
      correct: 1,
      explanation:
        "A Lei 13.146/15 revolucionou o regime: deficiência não é mais causa de incapacidade civil. Criou a tomada de decisão apoiada (art. 1.783-A CC) como medida preferencial. A curatela ficou restrita a atos patrimoniais e negociais, não mais existenciais. Pessoas com deficiência mental/intelectual podem casar, votar, adotar, trabalhar, sendo a curatela excepcional e proporcional às necessidades.",
    },
    {
      id: 7,
      question:
        "Segundo os arts. 104 e 166 do Código Civil, quais são os requisitos de validade dos negócios jurídicos e as consequências de sua ausência?",
      options: [
        "Apenas capacidade das partes",
        "Agente capaz, objeto lícito, possível, determinado ou determinável, forma prescrita ou não defesa em lei; ausência gera nulidade absoluta ou relativa",
        "Somente forma escrita",
        "Apenas objeto lícito",
      ],
      correct: 1,
      explanation:
        "Art. 104 CC estabelece três requisitos: I) agente capaz; II) objeto lícito, possível, determinado ou determinável; III) forma prescrita ou não defesa em lei. A ausência gera: nulidade absoluta (art. 166 - vício grave, não convalida, qualquer interessado pode alegar) ou anulabilidade (art. 171 - vício menos grave, convalida, só partes podem alegar, prazo decadencial).",
    },
    {
      id: 8,
      question:
        "De acordo com os arts. 138 a 165 do Código Civil, como se classificam os vícios dos negócios jurídicos e quais são seus efeitos?",
      options: [
        "Apenas erro e dolo existem como vícios",
        "Vícios de consentimento (erro, dolo, coação, estado de perigo, lesão) e vícios sociais (fraude contra credores, simulação), gerando anulabilidade",
        "Todos os vícios geram nulidade absoluta",
        "Vícios não afetam a validade dos negócios",
      ],
      correct: 1,
      explanation:
        "Vícios de consentimento (arts. 138-156): erro, dolo, coação, estado de perigo, lesão - afetam a manifestação de vontade. Vícios sociais (arts. 158-165): fraude contra credores, simulação - prejudicam terceiros. Todos geram anulabilidade (prazo decadencial de 4 anos), salvo simulação absoluta que gera nulidade absoluta. Podem ser sanados por confirmação expressa ou tácita.",
    },
    {
      id: 9,
      question:
        "Conforme os arts. 70 a 78 do Código Civil, como se classificam os bens quanto à reciprocidade e qual é a importância da distinção entre principais e acessórios?",
      options: [
        "Classificação sem relevância prática",
        "Principais (existem por si) e acessórios (dependem dos principais), aplicando-se o princípio de que o acessório segue o principal",
        "Apenas bens principais existem juridicamente",
        "Todos os bens são acessórios",
      ],
      correct: 1,
      explanation:
        "Arts. 92-97 CC: bens principais existem por si (casa), acessórios dependem dos principais (porta da casa). Princípio: acessório segue o principal (art. 92). Espécies de acessórios: frutos (rendimentos - naturais, industriais, civis), produtos (diminuem a substância), benfeitorias (melhoramentos - necessárias, úteis, voluptuárias), pertenças (destinadas ao uso do principal).",
    },
    {
      id: 10,
      question:
        "Segundo o art. 927 do Código Civil e a teoria da responsabilidade civil, como se caracteriza a responsabilidade objetiva e subjetiva, e quando cada uma se aplica?",
      options: [
        "Apenas responsabilidade subjetiva existe no direito civil",
        "Responsabilidade subjetiva (regra - exige culpa), objetiva (exceção - independe de culpa, baseada no risco), aplicando-se conforme atividade e dano",
        "Somente responsabilidade objetiva é válida",
        "Não há diferença entre responsabilidade objetiva e subjetiva",
      ],
      correct: 1,
      explanation:
        "Art. 927 CC: regra é responsabilidade subjetiva (exige dolo ou culpa). Parágrafo único: responsabilidade objetiva quando atividade normalmente desenvolvida implica risco para terceiros. Objetiva também em: relações de consumo, danos ambientais, acidentes de trabalho, transporte, produtos defeituosos. Na objetiva, basta dano e nexo causal; na subjetiva, exige-se também culpa ou dolo.",
    },
  ],
  "processual-civil": [
    {
      id: 1,
      question:
        "Conforme o art. 1º do CPC/2015, como o princípio do contraditório se manifesta no processo civil contemporâneo e qual é sua relação com a cooperação processual?",
      options: [
        "Contraditório é apenas o direito de defesa",
        "Contraditório compreende informação (ciência) e participação (influência na decisão), relacionando-se com cooperação para construção participativa da decisão judicial",
        "Aplica-se apenas ao réu",
        "É sinônimo de ampla defesa",
      ],
      correct: 1,
      explanation:
        "O contraditório no CPC/2015 tem dupla dimensão: informação (direito de ciência dos atos processuais) e participação (direito de influenciar na formação da decisão). Relaciona-se com o princípio da cooperação (art. 6º), exigindo que o juiz dialogue com as partes, evite decisões-surpresa, esclareça dúvidas e promova o esclarecimento de questões de fato e de direito.",
    },
    {
      id: 2,
      question:
        "De acordo com os arts. 42 a 69 do CPC/2015, como se determina a competência absoluta e relativa, e quais são as consequências de sua violação?",
      options: [
        "Toda competência pode ser prorrogada",
        "Competência absoluta (matéria, funcional) não pode ser prorrogada, deve ser declarada de ofício, gera nulidade; relativa (territorial, valor) pode ser prorrogada, arguida por exceção",
        "Não há diferença entre competência absoluta e relativa",
        "Apenas a competência territorial é relevante",
      ],
      correct: 1,
      explanation:
        "Competência absoluta (matéria, funcional): não pode ser prorrogada, deve ser declarada de ofício a qualquer tempo, gera nulidade absoluta dos atos decisórios. Competência relativa (territorial, valor): pode ser prorrogada pela vontade das partes ou foro de eleição, deve ser arguida por exceção de incompetência no prazo da contestação, sob pena de prorrogação.",
    },
    {
      id: 3,
      question:
        "Segundo os arts. 300 a 311 do CPC/2015, quais são os requisitos para concessão de tutela provisória de urgência e como se diferencia da tutela de evidência?",
      options: [
        "Apenas perigo de dano é necessário",
        "Tutela de urgência exige probabilidade do direito e perigo de dano ou risco ao resultado útil; tutela de evidência exige apenas probabilidade do direito qualificada",
        "Tutela de evidência sempre exige perigo",
        "Não há diferença entre tutela de urgência e evidência",
      ],
      correct: 1,
      explanation:
        "Tutela de urgência (art. 300): exige probabilidade do direito (fumus boni iuris) + perigo de dano ou risco ao resultado útil do processo (periculum in mora). Pode ser antecipada (satisfativa) ou cautelar (assecuratória). Tutela de evidência (art. 311): exige apenas probabilidade do direito qualificada (evidência), sem necessidade de perigo, em casos específicos como abuso do direito de defesa.",
    },
    {
      id: 4,
      question:
        "Conforme os arts. 994 a 1.008 do CPC/2015, qual é o sistema recursal brasileiro e como funciona o princípio da taxatividade dos recursos?",
      options: [
        "Recursos podem ser criados livremente pelas partes",
        "Sistema taxativo com recursos típicos: apelação, agravo de instrumento, embargos de declaração, recursos para tribunais superiores, cada um com cabimento específico",
        "Apenas apelação existe como recurso",
        "Qualquer decisão pode ser impugnada por qualquer recurso",
      ],
      correct: 1,
      explanation:
        "O sistema recursal é taxativo (numerus clausus): apelação (sentenças), agravo de instrumento (decisões interlocutórias específicas), embargos de declaração (omissão, contradição, obscuridade), recurso ordinário, especial (STJ), extraordinário (STF), agravo interno, embargos de divergência. Cada recurso tem cabimento, prazo e procedimento específicos, não podendo ser substituídos entre si.",
    },
    {
      id: 5,
      question:
        "De acordo com a Lei 9.099/95, quais são os princípios específicos dos Juizados Especiais Cíveis e como eles influenciam o procedimento?",
      options: [
        "Aplicam-se as regras do CPC integralmente",
        "Oralidade, simplicidade, informalidade, economia processual e celeridade, permitindo flexibilização procedimental para efetividade",
        "Apenas o princípio da legalidade se aplica",
        "Somente a celeridade é relevante",
      ],
      correct: 1,
      explanation:
        "A Lei 9.099/95, art. 2º estabelece princípios específicos: oralidade (preferência pela palavra falada), simplicidade (procedimentos descomplicados), informalidade (flexibilização formal), economia processual (menor custo e esforço), celeridade (rapidez). Estes princípios permitem adaptações procedimentais, dispensa de advogado até 20 SM, conciliação obrigatória, instrução concentrada.",
    },
    {
      id: 6,
      question:
        "Segundo os arts. 369 a 380 do CPC/2015, como funciona o sistema de distribuição do ônus da prova e quando é possível sua inversão?",
      options: [
        "Ônus da prova sempre cabe ao autor",
        "Autor prova fato constitutivo, réu prova fato impeditivo, modificativo ou extintivo; inversão possível por convenção, decisão judicial fundamentada ou lei",
        "Réu sempre deve provar sua defesa",
        "Não existe distribuição do ônus da prova",
      ],
      correct: 1,
      explanation:
        "Art. 373 CPC: autor deve provar fato constitutivo de seu direito, réu deve provar fato impeditivo, modificativo ou extintivo do direito do autor. Inversão possível: por convenção das partes (desde que não recaia sobre direito indisponível), por decisão judicial fundamentada (quando verossímil alegação ou hipossuficiência), ou por previsão legal (CDC, relações de consumo).",
    },
    {
      id: 7,
      question:
        "Conforme os arts. 485 a 508 do CPC/2015, quais são as hipóteses de resolução do mérito e como se diferencia da extinção sem resolução do mérito?",
      options: [
        "Toda extinção resolve o mérito",
        "Resolução do mérito (art. 487): procedência, improcedência, parcial procedência; extinção sem mérito (art. 485): vícios processuais, fazendo coisa julgada material ou formal",
        "Não há diferença entre as modalidades de extinção",
        "Apenas a procedência resolve o mérito",
      ],
      correct: 1,
      explanation:
        "Art. 487 (resolução do mérito): procedência, improcedência, parcial procedência, reconhecimento da prescrição/decadência, transação/acordo - fazem coisa julgada material. Art. 485 (extinção sem mérito): inépcia, ilegitimidade, falta de interesse, impossibilidade jurídica - fazem coisa julgada formal, permitindo repropositura da ação corrigindo o vício.",
    },
    {
      id: 8,
      question:
        "De acordo com os arts. 139 e 357 do CPC/2015, quais são os poderes-deveres do juiz na condução do processo e como se manifesta o saneamento compartilhado?",
      options: [
        "Juiz tem apenas poderes decisórios",
        "Juiz deve assegurar igualdade, prevenir/reprimir atos contrários à dignidade da justiça, determinar medidas indutivas/coercitivas, promovendo saneamento compartilhado com as partes",
        "Juiz é apenas espectador do processo",
        "Saneamento é ato exclusivo do juiz",
      ],
      correct: 1,
      explanation:
        "Art. 139 CPC estabelece poderes-deveres do juiz: assegurar igualdade de tratamento, prevenir/reprimir atos atentatórios à dignidade da justiça, determinar medidas indutivas, coercitivas, mandamentais ou sub-rogatórias. Art. 357: saneamento compartilhado, ouvindo as partes sobre questões processuais e materiais, fixando pontos controvertidos, decidindo questões processuais pendentes.",
    },
    {
      id: 9,
      question:
        "Conforme a Lei 12.153/09 (Juizados da Fazenda Pública), qual é a competência específica e como se diferencia dos Juizados Especiais Cíveis comuns?",
      options: [
        "Competência idêntica aos Juizados Especiais Cíveis",
        "Causas contra Fazenda Pública até 60 salários mínimos, excluindo ações de interesse geral, mandamentais, execução fiscal, com procedimento adaptado",
        "Apenas causas criminais contra agentes públicos",
        "Competência ilimitada contra entes públicos",
      ],
      correct: 1,
      explanation:
        "Lei 12.153/09: competência para causas cíveis contra Fazenda Pública até 60 SM (maior que JEC comum - 40 SM). Exclui: ações de interesse geral, mandado de segurança, ação de desapropriação, execução fiscal, ações sobre improbidade administrativa. Procedimento adaptado da Lei 9.099/95, com pagamento por precatório/RPV, prazo diferenciado para contestação.",
    },
    {
      id: 10,
      question:
        "Segundo os arts. 1.029 a 1.041 do CPC/2015, quais são os requisitos específicos do recurso extraordinário e como funciona a repercussão geral?",
      options: [
        "Recurso extraordinário tem cabimento livre",
        "Cabível contra acórdão que contrarie/negue vigência à Constituição, declare inconstitucionalidade ou julgue válida lei contestada; exige repercussão geral (relevância econômica, política, social ou jurídica)",
        "Apenas questões de direito federal são cabíveis",
        "Repercussão geral é irrelevante",
      ],
      correct: 1,
      explanation:
        "Art. 1.029 CPC: RE cabível quando acórdão: a) contrariar dispositivo da Constituição; b) declarar inconstitucionalidade de tratado/lei federal; c) julgar válida lei/ato local contestado em face da Constituição; d) julgar válida aplicação de direito local em face de lei federal. Exige repercussão geral (art. 1.035): questões relevantes do ponto de vista econômico, político, social ou jurídico, que ultrapassem interesses subjetivos.",
    },
  ],
  penal: [
    {
      id: 1,
      question:
        "Conforme o art. 1º do Código Penal e o princípio da legalidade estrita, como se manifesta o nullum crimen sine lege e quais são suas implicações na aplicação da lei penal?",
      options: [
        "Analogia é sempre permitida em direito penal",
        "Não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal, vedando analogia in malam partem e exigindo lei formal",
        "Costumes podem criar crimes",
        "Decretos podem definir crimes",
      ],
      correct: 1,
      explanation:
        "O princípio da legalidade penal (art. 1º CP, art. 5º, XXXIX CF) tem quatro aspectos: lex scripta (lei escrita), lex stricta (vedação à analogia in malam partem), lex praevia (anterioridade) e lex certa (determinação/taxatividade). Somente lei em sentido formal pode criar crimes e penas, vedando-se analogia prejudicial ao réu, costumes incriminadores e tipos penais vagos.",
    },
    {
      id: 2,
      question:
        "De acordo com os arts. 14 a 18 do Código Penal, como se caracteriza a tentativa e quais são as teorias aplicáveis para sua punição?",
      options: [
        "Tentativa sempre tem a mesma pena do crime consumado",
        "Tentativa ocorre quando iniciada a execução não se consuma por circunstâncias alheias à vontade do agente, com pena diminuída de 1/3 a 2/3",
        "Tentativa é apenas cogitação do crime",
        "Preparação já caracteriza tentativa",
      ],
      correct: 1,
      explanation:
        "Art. 14 CP: tentativa quando, iniciada a execução, o crime não se consuma por circunstâncias alheias à vontade do agente. Elementos: início da execução (não mera preparação), não consumação, circunstâncias alheias à vontade. Pena: diminuída de 1/3 a 2/3 (art. 14, parágrafo único). Teorias: objetiva (resultado alcançado) e subjetiva (periculosidade da conduta) - Brasil adota mista.",
    },
    {
      id: 3,
      question:
        "Conforme os arts. 23 a 25 do Código Penal, quais são as excludentes de ilicitude e como se diferenciam quanto aos seus requisitos específicos?",
      options: [
        "Apenas legítima defesa",
        "Legítima defesa, estado de necessidade, estrito cumprimento do dever legal, exercício regular de direito, cada qual com requisitos específicos",
        "Somente estado de necessidade",
        "Excludentes não existem no direito penal",
      ],
      correct: 1,
      explanation:
        "Art. 23 CP: excludentes de ilicitude (justificantes): legítima defesa (agressão injusta, atual/iminente, moderação), estado de necessidade (perigo atual, inevitabilidade, bem sacrificado menor valor), estrito cumprimento do dever legal (servidor público), exercício regular de direito (prática desportiva). Ausência de dolo/culpa (dirimente) não é excludente de ilicitude.",
    },
    {
      id: 4,
      question:
        "De acordo com os arts. 26 a 28 do Código Penal, como se caracteriza a inimputabilidade e quais são suas consequências jurídicas?",
      options: [
        "Inimputáveis são punidos normalmente",
        "Doença mental/desenvolvimento incompleto/retardado que impede entendimento/vontade, isentando de pena (absolvição imprópria com medida de segurança)",
        "Embriaguez voluntária sempre isenta de pena",
        "Menores de 21 anos são inimputáveis",
      ],
      correct: 1,
      explanation:
        "Art. 26 CP: inimputável por doença mental ou desenvolvimento incompleto/retardado, incapaz de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento. Consequência: isenção de pena (absolvição imprópria), com aplicação de medida de segurança (internação ou tratamento ambulatorial). Semi-imputável (capacidade diminuída): pena reduzida de 1/3 a 2/3.",
    },
    {
      id: 5,
      question:
        "Segundo os arts. 29 e 30 do Código Penal, como se caracteriza a participação e qual é a relevância da comunicabilidade das circunstâncias?",
      options: [
        "Participação é irrelevante",
        "Participação é conduta de quem concorre para o crime sem praticar a conduta típica, com pena menor; circunstâncias incomunicáveis são as pessoais",
        "Todos respondem pelo mesmo crime",
        "Participação tem a mesma pena da autoria",
      ],
      correct: 1,
      explanation:
        "Art. 29 CP: partícipe é quem concorre para o crime de outrem sem praticar a conduta típica (instigação, auxílio material/moral). Pena: menor que a do autor. Art. 30: incomunicáveis as circunstâncias e condições pessoais, salvo se elementares do crime (ex: ser funcionário público no peculato). Circunstâncias objetivas (tempo, lugar, modo de execução) comunicam-se.",
    },
    {
      id: 6,
      question:
        "Conforme os arts. 33 a 47 do Código Penal, quais são as espécies de penas e como se diferenciam quanto à sua aplicação?",
      options: [
        "Apenas pena de prisão existe",
        "Privativas de liberdade (reclusão, detenção), restritivas de direitos (prestação de serviços, interdição temporária de direitos, limitação de fim de semana), multa",
        "Multa é a única pena",
        "Não há diferentes tipos de pena",
      ],
      correct: 1,
      explanation:
        "Art. 32 CP: penas privativas de liberdade (reclusão - regime inicial fechado, semiaberto ou aberto; detenção - regime inicial semiaberto ou aberto), restritivas de direitos (substitutivas - prestação de serviços à comunidade, interdição temporária de direitos, limitação de fim de semana), multa (valor fixado em dias-multa). Penas alternativas (restritivas de direitos) substituem a privativa de liberdade.",
    },
    {
      id: 7,
      question:
        "De acordo com os arts. 59 a 68 do Código Penal, como se realiza a dosimetria da pena e quais são as fases do sistema trifásico?",
      options: [
        "Pena é aplicada aleatoriamente",
        "1ª fase (circunstâncias judiciais - art. 59), 2ª fase (agravantes/atenuantes), 3ª fase (causas de aumento/diminuição), fixando a pena base, provisória e definitiva",
        "Apenas a reincidência é considerada",
        "Pena é sempre a mesma para todos os crimes",
      ],
      correct: 1,
      explanation:
        "Sistema trifásico (art. 68 CP): 1ª fase - pena-base (art. 59 - culpabilidade, antecedentes, conduta social, personalidade, motivos, circunstâncias, consequências, comportamento da vítima); 2ª fase - pena provisória (agravantes/atenuantes); 3ª fase - pena definitiva (causas de aumento/diminuição). Juiz motiva cada fase, fixando a pena justa e proporcional ao caso concreto.",
    },
    {
      id: 8,
      question:
        "Conforme os arts. 121 a 154-B do Código Penal, quais são os crimes contra a pessoa e como se diferenciam quanto ao bem jurídico tutelado?",
      options: [
        "Apenas homicídio é crime contra a pessoa",
        "Vida (homicídio, aborto, infanticídio), integridade física (lesão corporal, rixa), honra (calúnia, difamação, injúria), liberdade individual (ameaça, sequestro, cárcere privado), inviolabilidade de domicílio, cada qual com elementos específicos",
        "Crimes contra a pessoa não existem",
        "Todos os crimes são iguais",
      ],
      correct: 1,
      explanation:
        "Crimes contra a pessoa (Título I CP): vida (homicídio, induzimento ao suicídio, aborto, infanticídio), integridade física (lesão corporal, periclitação da vida/saúde), honra (calúnia, difamação, injúria), liberdade individual (ameaça, sequestro, cárcere privado, violação de domicílio), inviolabilidade de correspondência/comunicações. Cada crime protege um bem jurídico específico e tem elementos próprios.",
    },
    {
      id: 9,
      question:
        "De acordo com os arts. 155 a 183 do Código Penal, quais são os crimes contra o patrimônio e como se diferenciam quanto ao elemento subjetivo?",
      options: [
        "Apenas furto é crime contra o patrimônio",
        "Furto, roubo, extorsão, apropriação indébita, estelionato, receptação, dano, cada qual com elemento subjetivo específico (dolo, finalidade)",
        "Crimes contra o patrimônio não existem",
        "Todos os crimes são culposos",
      ],
      correct: 1,
      explanation:
        "Crimes contra o patrimônio (Título II CP): furto (subtrair coisa alheia móvel), roubo (subtrair com violência/grave ameaça), extorsão (constranger com violência/grave ameaça), apropriação indébita (apropriar-se de coisa alheia), estelionato (obter vantagem ilícita induzindo em erro), receptação (adquirir coisa produto de crime), dano (destruir coisa alheia). Cada crime exige dolo específico.",
    },
    {
      id: 10,
      question:
        "Conforme os arts. 312 a 359-H do Código Penal, quais são os crimes contra a Administração Pública e como se classificam quanto ao sujeito ativo?",
      options: [
        "Apenas corrupção é crime contra a Administração Pública",
        "Praticados por funcionário público (peculato, concussão, corrupção passiva, prevaricação) ou particular (corrupção ativa, resistência, desobediência, desacato), cada qual com elementos específicos",
        "Crimes contra a Administração Pública não existem",
        "Todos os crimes são praticados por funcionários públicos",
      ],
      correct: 1,
      explanation:
        "Crimes contra a Administração Pública (Título XI CP): praticados por funcionário público (peculato, concussão, corrupção passiva, prevaricação, abandono de função) ou por particular (corrupção ativa, resistência, desobediência, desacato, tráfico de influência). Classificam-se em crimes funcionais (exigem qualidade de funcionário público) e crimes comuns (podem ser praticados por qualquer pessoa).",
    },
  ],
}

export default function QuizPage({ params }: { params: { module: string } }) {
  const moduleId = params.module as string
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)

  const questions = questionBank[moduleId] || []
  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    let count = 0
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correct) {
        count++
      }
    }
    setCorrectAnswersCount(count)
  }, [userAnswers, questions])

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setUserAnswers(newAnswers)
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    setShowExplanation(false)
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setShowExplanation(false)
  }

  const isAnswerCorrect = userAnswers[currentQuestionIndex] === currentQuestion?.correct

  const allQuestionsAnswered = userAnswers.length === questions.length

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800">Quiz de {moduleId}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Progress value={(currentQuestionIndex + 1) * (100 / questions.length)} className="mb-4" />
          <div className="mb-4">
            <p className="text-gray-700">
              Pergunta {currentQuestionIndex + 1} de {questions.length}
            </p>
          </div>
          {currentQuestion ? (
            <>
              <div className="mb-6">
                <p className="text-xl font-semibold text-gray-800">{currentQuestion.question}</p>
              </div>
              <div className="grid gap-4">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start ${
                      userAnswers[currentQuestionIndex] === index
                        ? "bg-blue-500 text-white hover:bg-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleAnswer(index)}
                    disabled={userAnswers[currentQuestionIndex] !== undefined}
                  >
                    {option}
                    {userAnswers[currentQuestionIndex] === index &&
                      (isAnswerCorrect ? (
                        <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="ml-auto h-5 w-5 text-red-500" />
                      ))}
                  </Button>
                ))}
              </div>
              {showExplanation && (
                <div className="mt-6">
                  <p className="text-gray-600">
                    <strong>Explicação:</strong> {currentQuestion.explanation}
                  </p>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <Button onClick={handleNextQuestion} className="mt-4">
                      Próxima Pergunta
                    </Button>
                  ) : (
                    <div className="mt-4 flex justify-between">
                      <Link href="/" passHref>
                        <Button variant="secondary" asChild>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Voltar para Início
                        </Button>
                      </Link>
                      <Button onClick={handleRestartQuiz}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reiniciar Quiz
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-red-500">Nenhuma pergunta encontrada.</p>
          )}
          {allQuestionsAnswered && (
            <div className="mt-6 text-center">
              <p className="text-xl font-semibold text-green-600">Quiz Concluído!</p>
              <p className="text-gray-700">
                Você acertou {correctAnswersCount} de {questions.length} perguntas.
              </p>
              <Link href="/" passHref>
                <Button variant="secondary" asChild className="mt-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para Início
                </Button>
              </Link>
              <Button onClick={handleRestartQuiz} className="mt-4 ml-2">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reiniciar Quiz
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
