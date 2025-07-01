"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

const studyContent: { [key: string]: { title: string; content: string[] } } = {
  legislacao: {
    title: "Legislação Específica e Geral",
    content: [
      "1. Constituição do Estado do Paraná - Princípios Fundamentais: A Constituição Estadual estabelece como fundamentos a soberania popular, a cidadania, a dignidade da pessoa humana, os valores sociais do trabalho e da livre iniciativa, e o pluralismo político. Estes princípios orientam toda a organização política e administrativa do Estado.",

      "2. Organização do Poder Legislativo Estadual: A Assembleia Legislativa do Paraná é composta por deputados estaduais eleitos pelo sistema proporcional. Possui competências para legislar sobre matérias de interesse estadual, fiscalizar o Poder Executivo, julgar as contas do Governador e aprovar o orçamento estadual.",

      "3. Processo Legislativo Estadual: As leis estaduais seguem processo específico com iniciativa (Governador, deputados, Tribunal de Justiça, Procuradoria-Geral), discussão e votação na Assembleia, sanção ou veto do Governador, e eventual derrubada do veto pelo Legislativo.",

      "4. Poder Executivo Estadual: O Governador é o chefe do Poder Executivo, auxiliado pelo Vice-Governador e Secretários de Estado. Possui atribuições administrativas, de execução das leis, iniciativa legislativa em matérias específicas e poder regulamentar.",

      "5. Organização do Poder Judiciário no Paraná: O TJPR é o órgão de cúpula do Judiciário estadual, composto por desembargadores. Abaixo estão os juízes de direito nas comarcas, organizadas por entrância (inicial, intermediária, final) conforme complexidade e movimento processual.",

      "6. Estrutura das Comarcas: As comarcas são divididas territorialmente e podem ter varas especializadas (cível, criminal, família, fazenda pública, juizados especiais). A competência é definida pela matéria, valor da causa e território.",

      "7. Garantias da Magistratura Estadual: Os juízes possuem vitaliciedade (após 2 anos), inamovibilidade (não podem ser removidos sem consentimento, salvo interesse público) e irredutibilidade de subsídios, garantindo independência funcional.",

      "8. Estatuto dos Servidores - Conceitos Básicos: Servidor público é a pessoa legalmente investida em cargo público. Cargo público é o conjunto de atribuições e responsabilidades previstas na estrutura organizacional, criado por lei, com denominação própria e vencimento pago pelos cofres públicos.",

      "9. Provimento de Cargos Públicos: Nomeação (forma originária, depende de concurso para cargos efetivos), ascensão (progressão na carreira), readaptação (investidura em cargo compatível com deficiência superveniente), reversão (retorno do aposentado), reintegração (retorno do demitido ilegalmente), recondução (retorno ao cargo anterior), aproveitamento (retorno do servidor em disponibilidade).",

      "10. Concurso Público: Exigência constitucional para provimento de cargos efetivos. Deve ser de provas ou provas e títulos, com igualdade de condições, publicidade, prazo de validade (até 2 anos, prorrogável uma vez por igual período), reserva de vagas para deficientes.",

      "11. Estágio Probatório: Período de 3 anos durante o qual o servidor é avaliado quanto à aptidão e capacidade para o desempenho do cargo. Aprovação gera estabilidade. Reprovação leva à exoneração.",

      "12. Estabilidade do Servidor: Adquirida após 3 anos de efetivo exercício e aprovação em avaliação de desempenho. Servidor estável só perde o cargo por sentença judicial transitada em julgado, processo administrativo disciplinar com ampla defesa, ou avaliação periódica de desempenho insatisfatória.",

      "13. Remuneração dos Servidores: Composta por vencimento (retribuição pelo exercício do cargo) e vantagens (adicionais, gratificações, indenizações). Princípios: irredutibilidade, teto remuneratório, isonomia, revisão geral anual.",

      "14. Adicionais e Gratificações: Adicional por tempo de serviço (quinquênios), noturno, de insalubridade, de periculosidade, de atividade penosa. Gratificações por função, produtividade, qualificação. Indenizações por ajuda de custo, diárias, transporte.",

      "15. Férias dos Servidores: Direito a 30 dias consecutivos por ano de exercício, com remuneração acrescida de 1/3. Podem ser parceladas em até 3 períodos. Vedada acumulação por mais de 2 períodos. Conversão em pecúnia limitada.",

      "16. Licenças dos Servidores: Para tratamento de saúde (própria ou pessoa da família), gestante, paternidade, adoção, para tratar de interesses particulares (sem remuneração), para capacitação, para atividade política, para mandato eletivo.",

      "17. Afastamentos e Disponibilidade: Afastamento para exercício de mandato eletivo, para estudo ou missão no exterior, para servir em organismo internacional. Disponibilidade com remuneração proporcional quando extinto o cargo ou declarada desnecessidade.",

      "18. Aposentadoria dos Servidores: Por invalidez permanente, compulsória aos 75 anos, voluntária (por idade e tempo de contribuição). Regras de transição da EC 103/2019. Paridade e integralidade para servidores com direito adquirido.",

      "19. Pensão por Morte: Devida aos dependentes do servidor falecido. Valor correspondente à totalidade dos proventos ou remuneração. Reversão entre beneficiários. Cessação por morte, casamento, união estável, maioridade (salvo invalidez).",

      "20. Deveres dos Servidores: Exercer com zelo as atribuições, ser leal às instituições, observar normas legais e regulamentares, cumprir ordens superiores (salvo manifestamente ilegais), atender prontamente ao público, levar irregularidades ao conhecimento da autoridade superior, zelar pela economia do material, guardar sigilo, manter conduta compatível com a moralidade administrativa, ser assíduo e pontual.",

      "21. Proibições aos Servidores: Ausentar-se do serviço durante expediente sem prévia autorização, retirar documento ou objeto da repartição sem autorização, recusar fé a documentos públicos, opor resistência injustificada ao andamento de documento, promover manifestação de apreço ou desapreço no recinto da repartição, cometer pessoa estranha à repartição para atribuições de servidor, coagir ou aliciar subordinados, manter sob chefia imediata cônjuge ou parente até 2º grau, valer-se do cargo para lograr proveito pessoal, participar de gerência de empresa privada, atuar como procurador junto a repartições públicas (salvo em causa própria), receber propina ou presente de interessado em processo, praticar usura, pleitear como procurador junto a repartição onde tem exercício.",

      "22. Acumulação de Cargos: Vedada, salvo quando houver compatibilidade de horários: dois cargos de professor, dois cargos privativos de profissionais de saúde com profissões regulamentadas, um cargo de professor com outro técnico ou científico. Proibida acumulação de proventos com remuneração, salvo cargos acumuláveis na atividade.",

      "23. Regime Disciplinar - Penalidades: Advertência (por escrito, infrações leves), suspensão (até 90 dias, infrações médias, com perda da remuneração), demissão (infrações graves, com perda do cargo), cassação de aposentadoria ou disponibilidade (quando a infração for punível com demissão), destituição de cargo em comissão.",

      "24. Processo Administrativo Disciplinar: Instauração por portaria, comissão de 3 servidores estáveis, fases de instrução (20 dias prorrogáveis), defesa (10 dias), relatório (20 dias). Julgamento pela autoridade competente em 20 dias. Prazo total de 60 dias prorrogável por igual período.",

      "25. Sindicância: Procedimento sumário para apuração de irregularidade no serviço público. Prazo de 30 dias prorrogável. Pode resultar em arquivamento, aplicação de penalidade de advertência ou suspensão até 30 dias, ou instauração de PAD.",

      "26. Prescrição Disciplinar: Em 5 anos para infrações puníveis com demissão, cassação ou destituição. Em 2 anos para suspensão. Em 180 dias para advertência. Interrompe-se com abertura de sindicância ou instauração de PAD.",

      "27. Regimento Interno do TJPR - Composição: O Tribunal Pleno é composto por todos os desembargadores. O Órgão Especial é formado pelos 25 desembargadores mais antigos. As Seções Cíveis e Criminais são especializadas por matéria.",

      "28. Competência do Tribunal Pleno: Eleger os órgãos diretivos, processar e julgar originariamente ações diretas de inconstitucionalidade, representações por inconstitucionalidade, conflitos de competência entre órgãos do Tribunal, mandados de segurança contra atos do Governador, crimes comuns de Governador e Vice-Governador.",

      "29. Competência do Órgão Especial: Exercer atribuições administrativas e jurisdicionais delegadas pelo Tribunal Pleno, eleger desembargadores para composição de órgãos, processar e julgar ações rescisórias, reclamações, conflitos de competência entre juízes.",

      "30. Câmaras Cíveis e Criminais: Julgam apelações, agravos, embargos infringentes, habeas corpus, mandados de segurança, conflitos de competência entre juízes de primeira instância. Composição de 3 desembargadores, decisão por maioria.",

      "31. Sessões de Julgamento: Públicas, salvo casos de sigilo legal. Ordem de julgamento por antiguidade de distribuição. Sustentação oral pelos advogados. Proclamação do resultado. Lavratura de acórdão pelo relator ou revisor vencedor.",

      "32. Distribuição de Processos: Por sorteio eletrônico, observando especialização das câmaras e impedimentos/suspeições. Prevenção do relator em casos conexos. Redistribuição em caso de impedimento superveniente.",

      "33. CODJ - Organização Judiciária: Divisão do território estadual em comarcas, termos e distritos judiciários. Comarca é a base territorial da organização judiciária. Termo é a subdivisão da comarca. Distrito é a menor unidade territorial.",

      "34. Classificação das Comarcas: Entrância inicial (menor movimento processual e complexidade), intermediária (movimento médio) e final ou especial (maior movimento e complexidade). Critérios: população, movimento forense, número de eleitores, receita tributária.",

      "35. Competência das Varas: Vara cível (ações de natureza cível em geral), criminal (crimes e contravenções), família (casamento, união estável, filiação, alimentos, guarda), fazenda pública (ações contra entes públicos), juizados especiais (causas de menor complexidade).",

      "36. Juizados Especiais Cíveis: Competência para causas até 40 salários mínimos, exceto as de natureza alimentar, falimentar, fiscal, interesse da Fazenda Pública. Procedimento oral, simples, informal, econômico e célere.",

      "37. Juizados Especiais Criminais: Competência para infrações de menor potencial ofensivo (pena máxima não superior a 2 anos). Institutos despenalizadores: composição civil, transação penal, suspensão condicional do processo.",

      "38. Serviços Auxiliares da Justiça: Escrivães (fé pública, documentação dos atos), oficiais de justiça (cumprimento de mandados), contadores (cálculos), partidores (divisões), depositários (guarda de bens), avaliadores (estimativa de valores).",

      "39. Código de Ética - Princípios Fundamentais: Independência (decisões baseadas na lei e consciência), imparcialidade (tratamento igualitário das partes), integridade (conduta ilibada), propriedade (comportamento adequado), igualdade (não discriminação), competência e diligência (conhecimento e dedicação).",

      "40. Deveres Éticos dos Magistrados: Cumprir e fazer cumprir as disposições legais, exercer atividade jurisdicional com excelência, tratar com urbanidade as partes, advogados e servidores, ser pontual no exercício da função, manter-se informado sobre questões jurídicas, participar de atividades de aperfeiçoamento.",

      "41. Vedações Éticas: Exercer atividade político-partidária, receber custas ou participação em processo, exercer advocacia, exercer comércio ou participar de sociedade comercial (salvo como acionista ou quotista), exercer atividade de direção ou técnica de empresa privada.",

      "42. Conduta Social dos Magistrados: Manter conduta irrepreensível na vida pública e particular, não frequentar lugares incompatíveis com o decoro da função, ser discreto em manifestações públicas, evitar situações que comprometam a dignidade da magistratura.",

      "43. Regulamento Administrativo - Estrutura Organizacional: Presidência, Vice-Presidência, Corregedoria-Geral da Justiça, Escola da Magistratura, Secretaria-Geral, Diretorias especializadas (Administrativa, Financeira, de Tecnologia, de Recursos Humanos).",

      "44. Competências da Presidência: Representar o Tribunal, dirigir os serviços administrativos, superintender a aplicação do orçamento, nomear e exonerar servidores, conceder licenças e férias, aplicar penalidades disciplinares, expedir atos normativos.",

      "45. Corregedoria-Geral da Justiça: Fiscalizar os serviços judiciários de primeira instância, realizar correições e inspeções, instaurar sindicâncias e PADs contra magistrados, expedir provimentos normativos, decidir sobre remoções e promoções.",

      "46. Gestão Orçamentária e Financeira: Elaboração da proposta orçamentária, execução do orçamento aprovado, controle de gastos, prestação de contas ao TCE, licitações e contratos, gestão patrimonial, controle interno.",

      "47. Gestão de Pessoas: Concursos públicos, provimento e vacância, desenvolvimento de pessoal, avaliação de desempenho, progressão funcional, benefícios e vantagens, regime disciplinar, saúde e segurança do trabalho.",

      "48. LGPD - Conceitos Fundamentais: Dado pessoal (informação relacionada a pessoa identificada ou identificável), dado sensível (origem racial, convicção religiosa, opinião política, saúde, vida sexual), tratamento (operação com dados), controlador (quem decide sobre o tratamento), operador (quem realiza o tratamento), titular (pessoa a quem se referem os dados).",

      "49. Princípios da LGPD: Finalidade (propósitos legítimos e específicos), adequação (compatibilidade com finalidades), necessidade (limitação ao mínimo necessário), livre acesso (garantia de consulta), qualidade dos dados (exatidão e atualização), transparência (informações claras), segurança (medidas técnicas e administrativas), prevenção (adoção de medidas preventivas), não discriminação (vedação de fins discriminatórios), responsabilização (demonstração da adoção de medidas eficazes).",

      "50. Bases Legais para Tratamento: Consentimento do titular, cumprimento de obrigação legal, execução de políticas públicas, realização de estudos por órgãos de pesquisa, execução de contrato, exercício regular de direitos, proteção da vida, tutela da saúde, interesses legítimos do controlador, proteção do crédito.",

      "51. Direitos do Titular dos Dados: Confirmação da existência de tratamento, acesso aos dados, correção de dados incompletos ou inexatos, anonimização ou eliminação de dados desnecessários, portabilidade a outro fornecedor, eliminação dos dados tratados com consentimento, informação sobre compartilhamento, revogação do consentimento.",

      "52. Tratamento de Dados pelo Poder Público: Deve ser realizado para atendimento de finalidade pública, na persecução do interesse público, com indicação da base legal, informação das hipóteses de compartilhamento, comunicação à ANPD.",

      "53. Segurança e Boas Práticas: Medidas técnicas e administrativas para proteger dados contra acessos não autorizados, situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão. Plano de resposta a incidentes.",

      "54. Incidente de Segurança: Comunicação à ANPD e ao titular em prazo razoável, com descrição da natureza dos dados afetados, informações sobre os titulares envolvidos, medidas técnicas e de segurança utilizadas, riscos relacionados ao incidente, motivos da demora na comunicação.",

      "55. ANPD - Autoridade Nacional: Órgão da administração pública federal integrante da Presidência da República. Competências: zelar pela proteção dos dados pessoais, elaborar diretrizes, fiscalizar e aplicar sanções, promover conhecimento sobre proteção de dados, cooperar com autoridades nacionais e estrangeiras.",

      "56. Sanções da LGPD: Advertência, multa simples (até 2% do faturamento, limitada a R$ 50 milhões por infração), multa diária, publicização da infração, bloqueio dos dados, eliminação dos dados, suspensão parcial ou total do banco de dados.",

      "57. LAI - Direito de Acesso: Qualquer pessoa, natural ou jurídica, pode apresentar pedido de acesso a informações aos órgãos e entidades públicas. Não é necessário apresentar motivos determinantes da solicitação.",

      "58. Transparência Ativa: Divulgação de informações de interesse público, independentemente de solicitações: estrutura organizacional, competências, legislação, programas e ações, dados gerais para acompanhamento de programas, licitações, contratos, convênios, transferências de recursos.",

      "59. Transparência Passiva: Atendimento a pedidos específicos de informação. Prazo de 20 dias, prorrogável por mais 10. Resposta deve conter informação ou justificativa da negativa. Recurso em caso de negativa ou não atendimento.",

      "60. Informações Sigilosas: Ultrassecreta (25 anos), secreta (15 anos), reservada (5 anos). Classificação deve ser justificada. Desclassificação automática ou por provocação. Comissão Mista de Reavaliação de Informações.",

      "61. Exceções ao Acesso: Informações pessoais (salvo interesse público ou consentimento), informações sigilosas, informações que possam comprometer segurança do Presidente e autoridades, atividades de inteligência, operações militares.",

      "62. Recursos na LAI: Primeira instância (autoridade hierarquicamente superior), segunda instância (autoridade máxima do órgão), terceira instância (CGU para órgãos federais, órgãos equivalentes nos demais entes).",

      "63. Sanções por Descumprimento: Condutas ilícitas: recusar-se a fornecer informação, retardar deliberadamente o fornecimento, fornecer informação incorreta, utilizar indevidamente informação sigilosa, divulgar informação sigilosa, impor sigilo à informação para beneficiar interesse particular, ocultar da revisão informação sigilosa desclassificada, destruir documentos para ocultar informação.",

      "64. Responsabilidades dos Servidores: Assegurar cumprimento das normas, orientar sobre procedimentos, informar sobre tramitação de documentos, proteger informação sigilosa, assegurar disponibilidade, autenticidade e integridade das informações.",
    ],
  },
  constitucional: {
    title: "Noções de Direito Constitucional",
    content: [
      "1. Conceito de Constituição: A Constituição é a lei fundamental e suprema de um Estado, que organiza seus elementos essenciais: povo, território, governo e finalidade. Estabelece a estrutura do Estado, organiza o exercício do poder político e enuncia os direitos e garantias fundamentais.",

      "2. Supremacia Constitucional: A Constituição ocupa o vértice do sistema jurídico, sendo fundamento de validade de todas as demais normas. Nenhuma lei ou ato normativo pode contrariá-la. Daí decorre o controle de constitucionalidade das leis.",

      "3. Estrutura da Constituição Federal de 1988: Preâmbulo (não tem força normativa), 9 Títulos (250 artigos no corpo permanente), Ato das Disposições Constitucionais Transitórias (114 artigos), mais de 100 Emendas Constitucionais aprovadas desde 1988.",

      "4. Elementos Orgânicos da Constituição: Normas que regulam a estrutura do Estado e do poder. Exemplos: organização dos Poderes (Títulos IV, V, VI), organização do Estado (Título III), organização da defesa do Estado (Título V, Capítulo III).",

      "5. Elementos Limitativos: Normas que limitam a ação dos poderes públicos, estabelecendo direitos e garantias fundamentais. Exemplo principal: Título II (Dos Direitos e Garantias Fundamentais), que inclui direitos individuais, coletivos, sociais, nacionalidade e direitos políticos.",

      "6. Elementos Socioideológicos: Normas que revelam o compromisso da Constituição com determinados valores sociais e ideológicos. Exemplos: princípios da ordem econômica (Título VII), da ordem social (Título VIII), proteção ao meio ambiente.",

      "7. Elementos de Estabilização Constitucional: Normas destinadas a assegurar a solução de conflitos constitucionais, a defesa da Constituição e do Estado. Exemplos: controle de constitucionalidade, estado de defesa e sítio, intervenção federal.",

      "8. Elementos Formais de Aplicabilidade: Normas que estabelecem regras de aplicação da Constituição. Exemplos: preâmbulo, disposições constitucionais transitórias, processo de emenda à Constituição.",

      "9. Classificação quanto à Origem: Constituições outorgadas (impostas unilateralmente pelo governante) e promulgadas ou democráticas (elaboradas por representantes do povo). A CF/88 é promulgada, elaborada pela Assembleia Nacional Constituinte.",

      "10. Classificação quanto à Forma: Constituições escritas (codificadas em documento único) e não escritas ou costumeiras (baseadas em costumes, jurisprudência, leis esparsas). A CF/88 é escrita.",

      "11. Classificação quanto ao Conteúdo: Constituições materiais (apenas matérias essencialmente constitucionais) e formais (todas as normas insertas no texto constitucional). A CF/88 é formal.",

      "12. Classificação quanto à Extensão: Constituições sintéticas ou concisas (textos enxutos) e analíticas ou prolixas (textos extensos e detalhados). A CF/88 é analítica, com 250 artigos no corpo permanente.",

      "13. Classificação quanto à Estabilidade: Constituições rígidas (processo de alteração mais dificultoso), flexíveis (alteração por processo legislativo comum), semirrígidas (parte rígida, parte flexível). A CF/88 é rígida.",

      "14. Classificação quanto à Dogmática: Constituições dogmáticas (elaboradas em momento específico, refletindo ideologia dominante) e históricas (formadas lentamente ao longo do tempo). A CF/88 é dogmática.",

      "15. Classificação quanto à Finalidade: Constituições-garantia (limitam o poder estatal), constituições-balanço (descrevem organização política existente), constituições-dirigente (estabelecem programas e fins para o Estado). A CF/88 tem caráter dirigente.",

      "16. Poder Constituinte Originário: Poder de elaborar uma nova Constituição. Características: inicial (inaugura nova ordem jurídica), ilimitado juridicamente (não se subordina ao direito anterior), incondicionado (não segue forma pré-estabelecida), permanente (não se esgota com seu exercício).",

      "17. Titularidade do Poder Constituinte: Pertence ao povo, que o exerce através de seus representantes eleitos para uma Assembleia Nacional Constituinte. No Brasil, a CF/88 foi elaborada pelo Congresso Nacional investido de poderes constituintes.",

      "18. Poder Constituinte Derivado Reformador: Poder de modificar a Constituição através de emendas constitucionais. Está sujeito a limitações: formais (procedimento específico), temporais (não há no Brasil), circunstanciais (estado de sítio, defesa, intervenção federal), materiais (cláusulas pétreas).",

      "19. Procedimento de Emenda Constitucional: Iniciativa (1/3 dos membros da Câmara ou Senado, Presidente da República, mais da metade das Assembleias Legislativas), discussão e votação (dois turnos em cada Casa, 3/5 dos votos), promulgação (pelas Mesas da Câmara e Senado).",

      "20. Cláusulas Pétreas: Limitações materiais ao poder de reforma. Não pode ser objeto de deliberação proposta de emenda tendente a abolir: forma federativa de Estado, voto direto, secreto, universal e periódico, separação dos Poderes, direitos e garantias individuais.",

      "21. Poder Constituinte Derivado Revisor: Poder de revisão constitucional previsto no ADCT. Foi exercido em 1993-1994, resultando em 6 emendas de revisão. Exauriu-se, não podendo mais ser exercido.",

      "22. Poder Constituinte Derivado Decorrente: Poder dos Estados-membros de elaborar suas próprias Constituições. Deve observar os princípios da Constituição Federal (princípios constitucionais sensíveis, estabelecidos, extensíveis).",

      "23. Fundamentos da República Federativa do Brasil: Soberania (poder supremo do Estado), cidadania (participação política), dignidade da pessoa humana (valor supremo), valores sociais do trabalho e da livre iniciativa (fundamentos da ordem econômica), pluralismo político (diversidade de ideias e partidos).",

      "24. Parágrafo Único do Art. 1º: 'Todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos desta Constituição.' Consagra a democracia representativa e participativa.",

      "25. Objetivos Fundamentais da República: Construir uma sociedade livre, justa e solidária; garantir o desenvolvimento nacional; erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais; promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.",

      "26. Princípios das Relações Internacionais: Independência nacional, prevalência dos direitos humanos, autodeterminação dos povos, não-intervenção, igualdade entre os Estados, defesa da paz, solução pacífica dos conflitos, repúdio ao terrorismo e ao racismo, cooperação entre os povos para o progresso da humanidade, concessão de asilo político.",

      "27. Integração Latino-Americana: A República Federativa do Brasil buscará a integração econômica, política, social e cultural dos povos da América Latina, visando à formação de uma comunidade latino-americana de nações.",

      "28. Direito à Vida: Direito fundamental inviolável, que abrange o direito de nascer, de viver e de ter vida digna. Vedação à pena de morte (salvo em caso de guerra declarada). Discussões sobre aborto, eutanásia, pesquisas com células-tronco.",

      "29. Direito à Liberdade: Liberdade de locomoção (ir, vir e permanecer), de pensamento (vedado o anonimato), de expressão intelectual, artística, científica e de comunicação, de consciência e crença, de exercício de cultos religiosos, de reunião, de associação.",

      "30. Direito à Igualdade: Igualdade formal (todos são iguais perante a lei) e material (tratar desigualmente os desiguais na medida de suas desigualdades). Vedação de discriminação. Ações afirmativas para grupos vulneráveis.",

      "31. Direito à Segurança: Proteção estatal contra ameaças à integridade física, moral e patrimonial. Segurança pública como dever do Estado e direito e responsabilidade de todos. Legítima defesa e estado de necessidade.",

      "32. Direito à Propriedade: Garantia do direito de propriedade, que deve atender à sua função social. Possibilidade de desapropriação por necessidade ou utilidade pública, ou por interesse social, mediante justa e prévia indenização em dinheiro.",

      "33. Inviolabilidade do Domicílio: 'A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.'",

      "34. Inviolabilidade das Comunicações: Sigilo da correspondência e das comunicações telegráficas, de dados e telefônicas, salvo, no último caso, por ordem judicial, nas hipóteses e na forma que a lei estabelecer para fins de investigação criminal ou instrução processual penal.",

      "35. Liberdade de Informação: Direito de receber dos órgãos públicos informações de interesse particular, coletivo ou geral, que serão prestadas no prazo da lei, sob pena de responsabilidade, ressalvadas aquelas cujo sigilo seja imprescindível à segurança da sociedade e do Estado.",

      "36. Princípio da Legalidade: Ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei. Para o particular, tudo que não está proibido é permitido. Para a Administração Pública, só é permitido fazer o que a lei autoriza.",

      "37. Direito de Petição: Direito de petição aos Poderes Públicos em defesa de direitos ou contra ilegalidade ou abuso de poder. Direito à obtenção de certidões em repartições públicas, para defesa de direitos e esclarecimento de situações de interesse pessoal.",

      "38. Devido Processo Legal: Ninguém será privado da liberdade ou de seus bens sem o devido processo legal. Garantia de processo justo, com observância das normas processuais e dos direitos fundamentais.",

      "39. Contraditório e Ampla Defesa: Aos litigantes, em processo judicial ou administrativo, e aos acusados em geral são assegurados o contraditório e ampla defesa, com os meios e recursos a ela inerentes.",

      "40. Juiz Natural: Ninguém será processado nem sentenciado senão pela autoridade competente. Vedação de tribunal de exceção. Garantia de julgamento por juiz previamente estabelecido em lei.",

      "41. Presunção de Inocência: Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória. Ônus da prova cabe à acusação. Direito ao silêncio.",

      "42. Irretroatividade da Lei Penal: A lei penal não retroagirá, salvo para beneficiar o réu. Garantia de segurança jurídica em matéria criminal.",

      "43. Individualização da Pena: A pena deve ser individualizada, considerando as circunstâncias do crime e a personalidade do criminoso. Vedação de penas de morte (salvo guerra), perpétuas, de trabalhos forçados, de banimento e cruéis.",

      "44. Inafastabilidade da Jurisdição: A lei não excluirá da apreciação do Poder Judiciário lesão ou ameaça a direito. Direito de acesso à justiça. Monopólio da jurisdição pelo Poder Judiciário.",

      "45. Coisa Julgada e Direito Adquirido: A lei não prejudicará o direito adquirido, o ato jurídico perfeito e a coisa julgada. Proteção da segurança jurídica e estabilidade das relações sociais.",

      "46. Habeas Corpus: Conceder-se-á habeas corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de locomoção, por ilegalidade ou abuso de poder. Remédio constitucional gratuito.",

      "47. Mandado de Segurança: Conceder-se-á mandado de segurança para proteger direito líquido e certo, não amparado por habeas corpus ou habeas data, quando o responsável pela ilegalidade ou abuso de poder for autoridade pública ou agente de pessoa jurídica no exercício de atribuições do Poder Público.",

      "48. Mandado de Segurança Coletivo: Pode ser impetrado por partido político com representação no Congresso Nacional, organização sindical, entidade de classe ou associação legalmente constituída e em funcionamento há pelo menos um ano, em defesa dos interesses de seus membros ou associados.",

      "49. Mandado de Injunção: Conceder-se-á mandado de injunção sempre que a falta de norma regulamentadora torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania.",

      "50. Habeas Data: Conceder-se-á habeas data para assegurar o conhecimento de informações relativas à pessoa do impetrante, constantes de registros ou bancos de dados de entidades governamentais ou de caráter público, bem como para a retificação de dados, quando não se prefira fazê-lo por processo sigiloso, judicial ou administrativo.",

      "51. Ação Popular: Qualquer cidadão é parte legítima para propor ação popular que vise a anular ato lesivo ao patrimônio público ou de entidade de que o Estado participe, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural, ficando o autor, salvo comprovada má-fé, isento de custas judiciais e do ônus da sucumbência.",

      "52. Direitos Sociais: Educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência social, proteção à maternidade e à infância, assistência aos desamparados. São direitos fundamentais de segunda geração.",

      "53. Direitos dos Trabalhadores Urbanos e Rurais: Relação de emprego protegida contra despedida arbitrária, seguro-desemprego, FGTS, salário mínimo, irredutibilidade salarial, 13º salário, remuneração do trabalho noturno superior à do diurno, participação nos lucros, salário-família, duração do trabalho normal não superior a 8 horas diárias e 44 semanais, jornada de 6 horas para trabalho realizado em turnos ininterruptos de revezamento, repouso semanal remunerado, férias anuais remuneradas com pelo menos 1/3 a mais que o salário normal, licença à gestante (120 dias) e paternidade, aviso prévio, redução dos riscos inerentes ao trabalho, adicional de remuneração para atividades penosas, insalubres ou perigosas, aposentadoria, assistência gratuita aos filhos e dependentes desde o nascimento até 5 anos em creches e pré-escolas, reconhecimento das convenções e acordos coletivos de trabalho, proteção em face da automação, seguro contra acidentes de trabalho, direito de greve, liberdade de associação profissional ou sindical.",

      "54. Nacionalidade Brasileira Nata: Nascidos na República Federativa do Brasil, ainda que de pais estrangeiros, desde que estes não estejam a serviço de seu país; nascidos no estrangeiro, de pai brasileiro ou mãe brasileira, desde que qualquer deles esteja a serviço da República Federativa do Brasil; nascidos no estrangeiro de pai brasileiro ou de mãe brasileira, desde que sejam registrados em repartição brasileira competente ou venham a residir na República Federativa do Brasil e optem, em qualquer tempo, depois de atingida a maioridade, pela nacionalidade brasileira.",

      "55. Naturalização: Originários de países de língua portuguesa, mediante residência por um ano ininterrupto e idoneidade moral; estrangeiros de qualquer nacionalidade, residentes na República Federativa do Brasil há mais de quinze anos ininterruptos e sem condenação penal, desde que requeiram a nacionalidade brasileira.",

      "56. Perda da Nacionalidade: Cancelamento da naturalização, por sentença judicial, em virtude de atividade nociva ao interesse nacional; aquisição de outra nacionalidade, salvo nos casos de reconhecimento de nacionalidade originária pela lei estrangeira ou imposição de naturalização, pela norma estrangeira, ao brasileiro residente em estado estrangeiro, como condição para permanência em seu território ou para o exercício de direitos civis.",

      "57. Cargos Privativos de Brasileiro Nato: Presidente e Vice-Presidente da República, Presidente da Câmara dos Deputados, Presidente do Senado Federal, Ministro do Supremo Tribunal Federal, carreira diplomática, oficial das Forças Armadas, Ministro de Estado da Defesa.",

      "58. Direitos Políticos: Soberania popular exercida pelo sufrágio universal e pelo voto direto e secreto, com valor igual para todos, e, nos termos da lei, mediante plebiscito, referendo e iniciativa popular.",

      "59. Alistamento Eleitoral e Voto: Obrigatórios para os maiores de dezoito anos; facultativos para os analfabetos, os maiores de setenta anos e os maiores de dezesseis e menores de dezoito anos.",

      "60. Condições de Elegibilidade: Nacionalidade brasileira, pleno exercício dos direitos políticos, alistamento eleitoral, domicílio eleitoral na circunscrição, filiação partidária, idade mínima (35 anos para Presidente, Vice-Presidente e Senador; 30 anos para Governador e Vice-Governador; 21 anos para Deputado Federal, Estadual ou Distrital, Prefeito, Vice-Prefeito e juiz de paz; 18 anos para Vereador).",

      "61. Inelegibilidades: Lei complementar estabelecerá outros casos de inelegibilidade e os prazos de sua cessação, a fim de proteger a probidade administrativa, a moralidade para exercício de mandato considerada vida pregressa do candidato, e a normalidade e legitimidade das eleições contra a influência do poder econômico ou o abuso do exercício de função, cargo ou emprego na administração direta ou indireta.",

      "62. Perda ou Suspensão dos Direitos Políticos: Cancelamento da naturalização por sentença transitada em julgado; incapacidade civil absoluta; condenação criminal transitada em julgado, enquanto durarem seus efeitos; recusa de cumprir obrigação a todos imposta ou prestação alternativa; improbidade administrativa.",

      "63. Partidos Políticos: Liberdade de criação, fusão, incorporação e extinção, resguardados a soberania nacional, o regime democrático, o pluripartidarismo, os direitos fundamentais da pessoa humana. Autonomia para definir estrutura interna, organização e funcionamento e para adotar critérios de escolha e regime de suas coligações eleitorais. Acesso gratuito ao rádio e à televisão. Funcionamento parlamentar de acordo com a lei. Recebimento de recursos do fundo partidário e acesso gratuito ao rádio e à televisão.",

      "64. Forma de Estado: Federação - união indissolúvel dos Estados e Municípios e do Distrito Federal. Autonomia política, administrativa e financeira dos entes federados.",

      "65. Forma de Governo: República - temporariedade dos mandatos, eletividade dos governantes, responsabilidade política dos governantes.",

      "66. Sistema de Governo: Presidencialismo - concentração das funções de Chefe de Estado e Chefe de Governo na figura do Presidente da República.",

      "67. Regime de Governo: Democrático - poder emana do povo, que o exerce diretamente ou por meio de representantes eleitos.",

      "68. Autonomia dos Entes Federados: Auto-organização (elaborar suas próprias constituições/leis orgânicas), autogoverno (eleger seus próprios governantes), autoadministração (administrar seus próprios negócios), autolegislação (elaborar suas próprias leis dentro de sua competência).",

      "69. Bens da União: Recursos naturais da plataforma continental e da zona econômica exclusiva; mar territorial; terrenos de marinha e seus acrescidos; ilhas fluviais e lacustres nas zonas limítrofes com outros países; praias marítimas; ilhas oceânicas e as costeiras; recursos minerais; cavidades naturais subterrâneas e sítios arqueológicos e pré-históricos; terras tradicionalmente ocupadas pelos índios.",

      "70. Competência Privativa da União: Legislar sobre direito civil, comercial, penal, processual, eleitoral, agrário, marítimo, aeronáutico, espacial e do trabalho; desapropriação; requisições civis e militares; águas, energia, informática, telecomunicações e radiodifusão; serviço postal; sistema monetário; política de crédito, câmbio, seguros e transferência de valores; comércio exterior e interestadual; diretrizes da política nacional de transportes; regime dos portos, navegação lacustre, fluvial, marítima, aérea e aeroespacial; trânsito e transporte; jazidas, minas, outros recursos minerais e metalurgia; nacionalidade, cidadania e naturalização; populações indígenas; emigração e imigração, entrada, extradição e expulsão de estrangeiros; organização do sistema nacional de emprego; organização judiciária, do Ministério Público do Distrito Federal e dos Territórios e da Defensoria Pública dos Territórios; sistema estatístico, sistema cartográfico e de geologia nacionais; sistemas de poupança, captação e garantia da poupança popular; sistemas de consórcios e sorteios; normas gerais de organização, efetivos, material bélico, garantias, convocação e mobilização das polícias militares e corpos de bombeiros militares; competência da polícia federal e das polícias rodoviária e ferroviária federais; seguridade social; diretrizes e bases da educação nacional; registros públicos; atividades nucleares de qualquer natureza; normas para colaboração entre a União e os Estados, o Distrito Federal e os Municípios; criação, funcionamento e processo do juizado de pequenas causas; procedimento em matéria processual; previdência social, proteção e defesa da saúde; assistência jurídica e Defensoria pública; proteção e integração social das pessoas portadoras de deficiência; proteção à infância e à juventude; organização, garantias, direitos e deveres das polícias civis.",
    ],
  },
  administrativo: {
    title: "Noções de Direito Administrativo",
    content: [
      "1. Conceito de Direito Administrativo: Ramo do direito público que disciplina a função administrativa do Estado e a organização e funcionamento da Administração Pública, bem como as relações entre esta e os administrados.",

      "2. Regime Jurídico-Administrativo: Conjunto de princípios e regras que conferem à Administração Pública prerrogativas (poderes especiais) e a sujeitam a sujeições (restrições especiais) em face do interesse público.",

      "3. Princípio da Supremacia do Interesse Público: A Administração pode impor sacrifícios aos interesses particulares em nome do interesse coletivo. Não é absoluto, devendo ser ponderado com os direitos fundamentais.",

      "4. Princípio da Indisponibilidade do Interesse Público: O interesse público não pertence ao administrador, que não pode dispor dele livremente. Deve atuar sempre vinculado à finalidade pública.",

      "5. Princípio da Legalidade Administrativa: A Administração só pode fazer o que a lei permite ou autoriza. Diferencia-se da legalidade para o particular (pode fazer tudo que a lei não proíbe).",

      "6. Princípio da Impessoalidade: A Administração deve atuar sem discriminação, visando sempre ao interesse público. Vedação ao nepotismo, favorecimento pessoal e promoção pessoal de agentes públicos.",

      "7. Princípio da Moralidade: A Administração deve atuar com ética, probidade, honestidade e bons costumes. Vai além da legalidade, exigindo comportamento ético.",

      "8. Princípio da Publicidade: Os atos administrativos devem ser públicos, transparentes, salvo casos de sigilo previsto em lei. Condição de eficácia dos atos administrativos.",

      "9. Princípio da Eficiência: A Administração deve buscar o melhor desempenho possível, otimizando recursos e resultados. Inclui economicidade, celeridade e qualidade dos serviços.",

      "10. Princípio da Razoabilidade e Proporcionalidade: Os atos administrativos devem ser adequados, necessários e proporcionais aos fins que se destinam. Controle da discricionariedade administrativa.",

      "11. Princípio da Motivação: A Administração deve indicar os fundamentos de fato e de direito que levaram à prática do ato administrativo. Permite controle da legalidade e legitimidade.",

      "12. Princípio da Autotutela: A Administração pode rever seus próprios atos, anulando os ilegais e revogando os inconvenientes ou inoportunos. Súmulas 346 e 473 do STF.",

      "13. Princípio da Segurança Jurídica: Proteção da confiança legítima e estabilidade das relações jurídicas. Limita a autotutela administrativa quando há boa-fé do administrado.",

      "14. Princípio da Continuidade dos Serviços Públicos: Os serviços públicos não podem parar, devem ser prestados de forma contínua. Exceções: emergência, inadimplemento do usuário, caso fortuito ou força maior.",

      "15. Poder Regulamentar: Competência da Administração para expedir atos normativos (decretos, regulamentos, instruções normativas) para dar fiel execução às leis. Não pode inovar na ordem jurídica.",

      "16. Poder Hierárquico: Poder de organizar internamente a Administração, distribuir e escalonar funções, dar ordens, fiscalizar, avocar e delegar competências, rever atos dos subordinados.",

      "17. Poder Disciplinar: Poder de aplicar penalidades aos servidores públicos e demais pessoas sujeitas à disciplina administrativa. Decorre da hierarquia e da supremacia especial.",

      "18. Poder de Polícia: Atividade administrativa que limita ou disciplina direito, interesse ou liberdade, regula a prática de ato ou abstenção de fato, em razão de interesse público concernente à segurança, higiene, ordem, costumes, disciplina da produção e do mercado, exercício de atividades econômicas dependentes de concessão ou autorização do Poder Público, tranquilidade pública ou respeito à propriedade e aos direitos individuais ou coletivos.",

      "19. Atributos do Poder de Polícia: Discricionariedade (margem de escolha quanto à oportunidade e conveniência), autoexecutoriedade (execução direta sem prévia autorização judicial), coercibilidade (uso da força para fazer cumprir).",

      "20. Polícia Administrativa e Judiciária: Polícia administrativa (preventiva, incide sobre bens, direitos e atividades) e polícia judiciária (repressiva, incide sobre pessoas, apura infrações penais).",

      "21. Uso e Abuso de Poder: Uso regular (exercício legítimo dentro dos limites legais) e abuso de poder (desvio de finalidade - fim diverso do público, ou excesso de poder - além dos limites legais).",

      "22. Discricionariedade e Vinculação: Atos vinculados (lei não deixa margem de escolha) e discricionários (lei confere margem de escolha quanto à oportunidade, conveniência ou conteúdo).",

      "23. Mérito Administrativo: Juízo de oportunidade e conveniência na prática de atos discricionários. Em regra, não é passível de controle judicial, salvo quando há violação aos princípios constitucionais.",

      "24. Centralização Administrativa: Execução de atividades administrativas pela própria Administração central (União, Estados, Municípios), através de seus órgãos.",

      "25. Descentralização por Outorga: Transferência da titularidade e execução de serviço público para pessoa jurídica criada pelo Estado (autarquia, fundação pública, empresa pública, sociedade de economia mista).",

      "26. Descentralização por Delegação: Transferência apenas da execução de serviço público para particular (concessionário, permissionário, autorizatário), mantendo o Estado a titularidade.",

      "27. Concentração e Desconcentração: Concentração (centralização de competências em órgão superior) e desconcentração (distribuição interna de competências, criação de órgãos especializados).",

      "28. Administração Direta: Conjunto de órgãos que integram as pessoas jurídicas políticas (União, Estados, DF, Municípios), aos quais foi atribuída competência para exercer atividades administrativas.",

      "29. Órgãos Públicos: Unidades de atuação integrantes da estrutura da Administração direta e indireta. Não possuem personalidade jurídica própria. Classificação: quanto à posição estatal, estrutura, atuação funcional.",

      "30. Administração Indireta: Conjunto de pessoas jurídicas de direito público ou privado que, vinculadas à Administração direta, têm competência para exercer atividades administrativas.",

      "31. Autarquias: Pessoas jurídicas de direito público, criadas por lei específica, com capacidade de autoadministração, para exercer atividades típicas da Administração Pública. Patrimônio próprio, autonomia administrativa e financeira.",

      "32. Fundações Públicas: Pessoas jurídicas de direito público (fundações autárquicas) ou privado, criadas para desenvolver atividades não lucrativas e de interesse público, como educação, cultura, pesquisa.",

      "33. Empresas Públicas: Pessoas jurídicas de direito privado, com capital exclusivamente público, criadas para explorar atividade econômica ou prestar serviço público. Podem adotar qualquer forma societária.",

      "34. Sociedades de Economia Mista: Pessoas jurídicas de direito privado, com capital misto (público e privado), sob controle acionário do Estado, criadas para explorar atividade econômica ou prestar serviço público. Forma de sociedade anônima.",

      "35. Regime Jurídico das Empresas Estatais: Submetem-se ao regime jurídico próprio das empresas privadas, inclusive quanto aos direitos e obrigações civis, comerciais, trabalhistas e tributários. Exceções previstas na Constituição e leis específicas.",

      "36. Controle da Administração Indireta: Supervisão ministerial (tutela administrativa), controle finalístico, não hierárquico. Não há subordinação, mas vinculação aos órgãos da Administração direta.",

      "37. Conceito de Ato Administrativo: Declaração do Estado ou de quem o represente, que produz efeitos jurídicos imediatos, com observância da lei, sob regime jurídico de direito público e sujeita a controle pelo Poder Judiciário.",

      "38. Requisitos dos Atos Administrativos: Competência (poder legal para praticar o ato), finalidade (resultado que a Administração quer alcançar), forma (modo de exteriorização), motivo (situação de fato e de direito que autoriza a prática), objeto (efeito jurídico imediato).",

      "39. Competência Administrativa: Poder-dever de agir, irrenunciável, intransferível (salvo delegação e avocação), imprescritível. Pode ser delegada quando não exclusiva, não for privativa de órgão ou autoridade, não se tratar de competência recursal.",

      "40. Finalidade do Ato Administrativo: Sempre o interesse público. Finalidade específica (prevista em lei para cada ato) e finalidade geral (interesse público). Desvio de finalidade vicia o ato.",

      "41. Forma do Ato Administrativo: Modo pelo qual o ato se exterioriza. Em regra, forma escrita. Exceções: sinais convencionais (trânsito), ordens verbais (situações urgentes). Silêncio administrativo pode ter significado jurídico.",

      "42. Motivo do Ato Administrativo: Situação de direito ou de fato que determina ou autoriza a realização do ato. Teoria dos motivos determinantes: a validade do ato se vincula aos motivos indicados como seu fundamento.",

      "43. Objeto do Ato Administrativo: Efeito jurídico imediato que o ato produz. Deve ser lícito, possível, certo e moral. Conteúdo do ato administrativo.",

      "44. Presunção de Legitimidade e Veracidade: Os atos administrativos presumem-se legítimos e verdadeiros até prova em contrário. Presunção relativa (juris tantum). Inverte o ônus da prova.",

      "45. Imperatividade: Os atos administrativos se impõem a terceiros, independentemente de sua concordância. Poder extroverso. Nem todos os atos possuem este atributo (atos enunciativos, negociais).",

      "46. Autoexecutoriedade: A Administração pode executar seus atos por si mesma, sem necessidade de prévia autorização judicial. Nem todos os atos possuem este atributo (cobrança de multa).",

      "47. Tipicidade: Para cada finalidade que a Administração pretende alcançar existe um ato definido em lei. Decorre do princípio da legalidade.",

      "48. Classificação dos Atos Administrativos: Quanto aos destinatários (gerais ou individuais), quanto ao alcance (internos ou externos), quanto ao grau de liberdade (vinculados ou discricionários), quanto à formação (simples, complexos ou compostos).",

      "49. Atos Normativos: Contêm comandos gerais e abstratos visando à correta aplicação da lei. Decretos regulamentares, instruções normativas, regimentos, resoluções, deliberações.",

      "50. Atos Ordinatórios: Disciplinam o funcionamento da Administração e a conduta funcional de seus agentes. Instruções, circulares, avisos, portarias, ordens de serviço, ofícios, despachos.",

      "51. Atos Negociais: Contêm declaração de vontade da Administração coincidente com a pretensão do particular. Licenças, autorizações, permissões, aprovações, admissões, vistos, homologações, dispensas, renúncias.",

      "52. Atos Enunciativos: Contêm declaração de conhecimento da Administração sobre determinada situação. Certidões, atestados, pareceres, apostilas.",

      "53. Atos Punitivos: Contêm sanção imposta pela Administração àqueles que infringem disposições legais. Multa, interdição, destruição de objetos, embargo de obra, demissão, suspensão.",

      "54. Licença: Ato vinculado e definitivo pelo qual a Administração faculta àquele que preencha os requisitos legais o exercício de uma atividade. Direito subjetivo do interessado.",

      "55. Autorização: Ato discricionário e precário pelo qual a Administração faculta ao particular o uso de bem público ou o exercício de atividade material. Interesse predominantemente privado.",

      "56. Permissão: Ato discricionário e precário pelo qual a Administração faculta ao particular a execução de serviço público ou utilização de bem público. Interesse predominantemente público.",

      "57. Extinção dos Atos Administrativos: Cumprimento dos efeitos, desaparecimento do sujeito ou objeto, retirada (anulação, revogação, cassação, caducidade, contraposição).",

      "58. Anulação: Retirada do ato administrativo por razões de ilegalidade. Efeitos ex tunc (retroativos). Poder-dever da Administração. Controle judicial. Súmula 473 do STF.",

      "59. Revogação: Retirada do ato administrativo por razões de conveniência e oportunidade. Efeitos ex nunc (não retroativos). Privativa da Administração. Só para atos discricionários.",

      "60. Cassação: Retirada do ato administrativo porque o beneficiário descumpriu condições que deveriam permanecer atendidas. Efeitos ex nunc.",

      "61. Caducidade: Retirada do ato administrativo por superveniência de norma jurídica que torna inadmissível a situação antes permitida. Efeitos ex nunc.",

      "62. Contraposição: Retirada do ato administrativo por emissão de outro ato com efeitos contrapostos. Efeitos ex nunc.",

      "63. Convalidação: Correção de vício sanável do ato administrativo para que produza seus efeitos regulares. Só para vícios de competência e forma. Efeitos ex tunc.",

      "64. Conceito de Responsabilidade Civil do Estado: Obrigação de reparar danos causados a terceiros por agentes públicos no exercício de suas funções ou a pretexto de exercê-las.",

      "65. Evolução da Responsabilidade Estatal: Teoria da irresponsabilidade, teoria civilista (responsabilidade subjetiva), teoria da culpa administrativa, teoria do risco administrativo (responsabilidade objetiva), teoria do risco integral.",

      "66. Responsabilidade Objetiva do Estado: Art. 37, § 6º da CF/88. Basta a prova do dano e do nexo causal entre a conduta do agente e o dano. Não se discute culpa ou dolo do Estado. Teoria do risco administrativo.",

      "67. Requisitos da Responsabilidade Estatal: Conduta (ação ou omissão) de agente público, dano (patrimonial ou moral), nexo causal entre a conduta e o dano. Desnecessária a prova de culpa ou dolo.",

      "68. Excludentes da Responsabilidade: Caso fortuito, força maior, culpa exclusiva da vítima ou de terceiro. Rompem o nexo causal.",

      "69. Responsabilidade por Omissão: Em regra, responsabilidade subjetiva (culpa anônima ou falta do serviço). Exceção: omissão específica (dever de agir e não o faz), responsabilidade objetiva.",

      "70. Direito de Regresso: A Administração pode ajuizar ação de regresso contra o agente público que causou o dano, se comprovado dolo ou culpa. Independe da condenação do Estado.",

      "71. Ação de Indenização: Prescreve em 5 anos a ação para pleitear indenização contra a Fazenda Pública. Termo inicial: data do evento danoso.",

      "72. Improbidade Administrativa: Atos que causam enriquecimento ilícito, prejuízo ao erário ou atentam contra os princípios da Administração Pública. Sanções: perda da função, suspensão dos direitos políticos, multa, proibição de contratar com o Poder Público.",

      "73. Lei nº 8.429/92 (LIA): Disciplina os atos de improbidade administrativa. Alterações da Lei nº 14.230/21: exigência de dolo específico para a configuração da improbidade.",

      "74. Enriquecimento Ilícito: Auferir qualquer tipo de vantagem patrimonial indevida em razão do cargo, mandato, função, emprego ou atividade pública.",

      "75. Prejuízo ao Erário: Causar dano ou dilapidação ao patrimônio público, por ação ou omissão, dolosa ou culposa.",

      "76. Atentado aos Princípios: Violar os deveres de honestidade, imparcialidade, legalidade e lealdade às instituições.",

      "77. Sanções da LIA: Variação conforme o tipo de improbidade. Perda dos bens acrescidos ilicitamente, ressarcimento integral do dano, perda da função pública, suspensão dos direitos políticos, multa civil, proibição de contratar com o Poder Público.",

      "78. Processo Administrativo Disciplinar (PAD): Instrumento para apurar infrações e aplicar sanções aos servidores públicos. Garantia do contraditório e ampla defesa.",

      "79. Fases do PAD: Instauração (portaria), instrução (produção de provas), defesa (prazo para o servidor se manifestar), relatório (conclusão da comissão), julgamento (decisão da autoridade competente).",

      "80. Sindicância: Procedimento preliminar e sumário para apurar irregularidades. Pode resultar em PAD ou arquivamento.",

      "81. Lei nº 8.666/93 (Lei de Licitações): Estabelece normas gerais sobre licitações e contratos administrativos. Revogada pela Lei nº 14.133/21.",

      "82. Lei nº 14.133/21 (Nova Lei de Licitações): Moderniza e simplifica os procedimentos licitatórios. Prioriza o planejamento, a transparência e o controle.",

      "83. Princípios da Licitação: Legalidade, impessoalidade, moralidade, igualdade, publicidade, probidade administrativa, vinculação ao instrumento convocatório, julgamento objetivo, desenvolvimento nacional sustentável.",

      "84. Modalidades de Licitação: Concorrência, concurso, leilão, pregão, diálogo competitivo.",

      "85. Tipos de Licitação: Menor preço, melhor técnica, técnica e preço, maior lance (leilão).",

      "86. Dispensa e Inexigibilidade: Hipóteses em que a licitação é dispensada (valor, emergência) ou inexigível (fornecedor exclusivo, notória especialização).",

      "87. Contratos Administrativos: Acordos firmados entre a Administração Pública e particulares para a realização de obras, serviços, compras, alienações, locações.",

      "88. Cláusulas Exorbitantes: Prerrogativas da Administração nos contratos administrativos: alteração unilateral, rescisão unilateral, fiscalização, aplicação de sanções.",

      "89. Equilíbrio Econômico-Financeiro: Direito do contratado de manter as condições originais do contrato, em caso de alteração unilateral ou fato superveniente.",

      "90. Agentes Públicos: Pessoas que exercem função pública, de forma permanente ou transitória, remunerada ou gratuita.",

      "91. Classificação dos Agentes: Agentes políticos (mandato eletivo), servidores públicos (estatutários), empregados públicos (celetistas), temporários, particulares em colaboração.",

      "92. Servidores Públicos: Regidos por estatuto próprio. Estabilidade após 3 anos de efetivo exercício.",

      "93. Empregados Públicos: Regidos pela Consolidação das Leis do Trabalho (CLT). Não possuem estabilidade.",

      "94. Temporários: Contratados por tempo determinado para atender necessidade temporária de excepcional interesse público.",

      "95. Responsabilidade dos Agentes: Civil (danos a terceiros), administrativa (infrações disciplinares), penal (crimes).",

      "96. Acumulação de Cargos: Vedada, salvo exceções constitucionais (professor, saúde, técnico/científico).",

      "97. Regime Previdenciário: Próprio dos servidores públicos (RPPS) ou geral (RGPS).",

      "98. Bens Públicos: Imóveis e móveis pertencentes à União, Estados, Municípios e suas autarquias e fundações.",

      "99. Classificação dos Bens: De uso comum do povo, de uso especial, dominicais.",

      "100. Características dos Bens: Inalienabilidade, impenhorabilidade, imprescritibilidade.",
    ],
  },
  civil: {
    title: "Noções de Direito Civil",
    content: [
      "1. Lei de Introdução às Normas do Direito Brasileiro - Regula vigência, aplicação, conflitos de leis no tempo e espaço. Integração por analogia, costumes e princípios gerais. Proteção ao ato jurídico perfeito, direito adquirido e coisa julgada.",
      "2. Pessoas Naturais - Personalidade inicia com nascimento com vida. Capacidade de direito (ser titular) e de fato (exercer direitos). Incapacidade absoluta (menores de 16 anos - representados) e relativa (16-18 anos, ébrios habituais, pródigos - assistidos). Direitos da personalidade: vida, honra, imagem, nome, intimidade.",
      "3. Pessoas Jurídicas - Entidades com personalidade própria. Direito público (União, Estados, autarquias) e privado (associações, sociedades, fundações). Desconsideração da personalidade em casos de abuso (desvio de finalidade, confusão patrimonial).",
      "4. Domicílio - Sede jurídica da pessoa. Voluntário (escolha livre), necessário (determinado por lei), de eleição (contratual). Local onde responde por obrigações e exerce direitos.",
      "5. Bens - Imóveis (solo e incorporações naturais/artificiais) e móveis. Fungíveis/infungíveis, consumíveis/inconsumíveis, divisíveis/indivisíveis, singulares/coletivos, principais/acessórios, públicos/particulares.",
      "6. Fatos Jurídicos - Negócios jurídicos (declaração de vontade para produzir efeitos desejados) com requisitos: agente capaz, objeto lícito, forma legal. Defeitos: vícios de consentimento (erro, dolo, coação) e sociais (fraude, simulação). Atos lícitos e ilícitos.",
      "7. Prescrição e Decadência - Prescrição: perda da pretensão (ação) por inércia, pode ser suspensa/interrompida. Decadência: perda do próprio direito potestativo, não se suspende/interrompe. Prazos: regra geral 10 anos (prescrição), específicos conforme o direito.",
      "8. Estatuto da Pessoa Idosa - Pessoa com 60+ anos. Direitos fundamentais: vida, saúde, educação, cultura, trabalho, previdência, habitação, transporte. Prioridade no atendimento, proteção contra violência, crimes específicos.",
      "9. Estatuto da Pessoa com Deficiência - Impedimento de longo prazo que obstrui participação social. Princípios: inclusão, igualdade, não discriminação, acessibilidade. A deficiência não é mais causa de incapacidade civil. Curatela e tomada de decisão apoiada.",
    ],
  },
  "processual-civil": {
    title: "Noções de Direito Processual Civil",
    content: [
      "1. Normas Fundamentais - Princípios: devido processo legal, contraditório, ampla defesa, cooperação, boa-fé, razoável duração, publicidade, inafastabilidade. Aplicação da lei processual no tempo e espaço.",
      "2. Jurisdição e Ação - Jurisdição: poder-dever estatal de aplicar o direito ao caso concreto. Ação: direito de provocar o Judiciário. Limites da jurisdição nacional e cooperação internacional (cartas rogatórias, auxílio direto).",
      "3. Competência - Critérios: valor, matéria, pessoa, territorial, funcional. Absoluta (matéria, funcional - não pode ser modificada) e relativa (valor, territorial - pode ser modificada por vontade das partes ou foro de eleição).",
      "4. Sujeitos do Processo - Partes (autor, réu), procuradores (advogados), litisconsórcio (pluralidade de partes), intervenção de terceiros (assistência, denunciação da lide, chamamento ao processo), MP (fiscal da lei ou parte), Advocacia Pública.",
      "5. Atos Processuais - Forma (liberdade, salvo exigência legal), tempo (dias úteis), lugar, prazos (contagem, preclusão, suspensão/interrupção), comunicações (citação, intimação), nulidades, distribuição, valor da causa.",
      "6. Tutela Provisória - Urgência (antecipada - satisfativa, cautelar - assecuratória) requer perigo de dano. Evidência (prova forte, precedentes, abuso do direito de defesa) não requer perigo.",
      "7. Procedimento Comum - Petição inicial, improcedência liminar, audiência de conciliação/mediação, contestação, reconvenção, revelia (presunção relativa de veracidade), saneamento, julgamento antecipado, instrução, provas, sentença, coisa julgada.",
      "8. Recursos - Apelação (sentença), agravo de instrumento (interlocutórias), embargos de declaração (omissão, contradição, obscuridade), recurso especial (STJ - lei federal), extraordinário (STF - Constituição), agravo interno.",
      "9. Juizados Especiais Cíveis - Princípios: oralidade, simplicidade, informalidade, economia, celeridade. Competência: até 40 salários mínimos. Fases: conciliação, instrução, julgamento. Recurso inominado para Turmas Recursais.",
      "10. Juizados da Fazenda Pública - Causas contra entes públicos até 60 salários mínimos. Pagamento por precatório ou RPV. Procedimento adaptado da Lei 9.099/95.",
    ],
  },
  penal: {
    title: "Noções de Direito Penal",
    content: [
      "1. Princípios - Legalidade (nullum crimen sine lege), anterioridade, irretroatividade da lei maléfica, culpabilidade, intervenção mínima, fragmentariedade, lesividade, humanidade das penas, proporcionalidade, individualização.",
      "2. Aplicação da Lei Penal - Tempo: teoria da atividade, lei nova benéfica retroage, maléfica não. Espaço: territorialidade (regra), extraterritorialidade (casos específicos). Pessoas: imunidades, foro privilegiado.",
      "3. Crime - Fato típico (conduta, resultado, nexo causal, tipicidade) + antijurídico (contrário ao direito) + culpável (reprovável). Excludentes de ilicitude: legítima defesa, estado de necessidade, estrito cumprimento do dever legal, exercício regular de direito.",
      "4. Imputabilidade - Capacidade de entender o caráter ilícito e determinar-se conforme esse entendimento. Inimputáveis: menores de 18 anos, doentes mentais, embriaguez completa fortuita. Semi-imputáveis: perturbação mental, embriaguez incompleta.",
      "5. Concurso de Pessoas - Autoria, coautoria, participação. Concurso de Crimes: material (várias condutas, várias infrações - soma das penas), formal (uma conduta, vários resultados - pena do mais grave aumentada), continuado (mesma espécie, condições semelhantes - uma pena aumentada).",
      "6. Extinção da Punibilidade - Morte, anistia, graça, indulto, abolitio criminis, prescrição (perda do direito de punir pelo tempo), decadência, perempção, retratação, perdão do ofendido, ANPP.",
      "7. Crimes contra Administração Pública - Peculato (apropriação de bem público), concussão (exigir vantagem), corrupção passiva (solicitar/receber vantagem), corrupção ativa (oferecer vantagem), prevaricação (retardar/omitir ato por interesse pessoal), desacato.",
      "8. Lei do Abuso de Autoridade - Crimes praticados por agentes públicos com dolo específico (causar dano, obter benefício, capricho). Condutas: prisão sem justa causa, violação de direitos, constrangimento. Ação penal pública incondicionada.",
      "9. Legislação Especial - Crimes de preconceito (discriminação racial/religiosa), hediondos (regime mais rigoroso, progressão dificultada), Lei Maria da Penha (violência doméstica contra mulher, medidas protetivas), Lei de Drogas (tráfico como hediondo, uso sem prisão).",
    ],
  },
  "processual-penal": {
    title: "Noções de Direito Processual Penal",
    content: [
      "1. Princípios e Sistemas - Devido processo legal, contraditório, ampla defesa, presunção de inocência, juiz natural, publicidade. Sistema acusatório (separação das funções de acusar, defender e julgar) adotado no Brasil.",
      "2. Inquérito Policial - Procedimento administrativo, inquisitivo, preparatório da ação penal. Características: inquisitivo, discricionário, oficial, sigiloso. Finalidade: apurar materialidade e autoria. Indiciamento, arquivamento pelo juiz a pedido do MP.",
      "3. Acordo de Não Persecução Penal - Crimes sem violência/grave ameaça, pena mínima inferior a 4 anos. Requisitos: confissão, não reincidência, personalidade compatível. Condições: reparar dano, serviços comunitários, prestação pecuniária.",
      "4. Ação Penal - Pública incondicionada (regra - MP), condicionada à representação (manifestação da vítima), condicionada à requisição (Ministro da Justiça). Privada: exclusiva ou subsidiária da pública. Ação civil ex delicto para reparação de danos.",
      "5. Jurisdição e Competência - Lugar da infração (regra), matéria (comum estadual/federal, militar, eleitoral), pessoa (foro privilegiado), conexão e continência (ligação entre crimes/réus).",
      "6. Provas - Finalidade: formar convencimento do juiz. Princípios: contraditório, livre convencimento motivado, nemo tenetur se detegere. Meios: perícia, interrogatório, confissão, testemunhas, documentos, indícios. Provas ilícitas são inadmissíveis.",
      "7. Medidas Cautelares Pessoais - Prisão em flagrante (qualquer pessoa pode efetuar), temporária (inquérito, crimes graves, 5+5 dias), preventiva (qualquer fase, fumus + periculum). Medidas alternativas: comparecimento periódico, monitoramento eletrônico, fiança.",
      "8. Liberdade Provisória - Direito de responder em liberdade quando ausentes requisitos da preventiva, mediante ou sem fiança conforme a gravidade do crime.",
      "9. Procedimentos - Comum ordinário (pena ≥4 anos), sumário (2-4 anos), sumaríssimo/JECrim (≤2 anos - infrações de menor potencial ofensivo, transação penal, suspensão condicional do processo).",
      "10. Recursos e Ações - Apelação (sentença), RESE (interlocutórias específicas), embargos declaratórios, especial/extraordinário. Habeas corpus (liberdade de locomoção), revisão criminal (rever condenação transitada em julgado em favor do réu).",
      "11. Execução Penal - Regimes: fechado (segurança máxima/média), semiaberto (colônia agrícola/industrial), aberto (casa de albergado). Progressão (requisitos: tempo + comportamento), regressão (falta grave), livramento condicional, remição por trabalho/estudo.",
    ],
  },
}

export default function StudyPage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params.module as string
  const [currentSection, setCurrentSection] = useState(0)
  const [studyCompleted, setStudyCompleted] = useState(false)

  const content = studyContent[moduleId]

  if (!content) {
    return <div>Módulo não encontrado</div>
  }

  const handleNext = () => {
    if (currentSection < content.content.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      setStudyCompleted(true)
      // Marcar como estudado no localStorage
      const savedProgress = localStorage.getItem("study-progress")
      const progress = savedProgress ? JSON.parse(savedProgress) : {}

      if (!progress[moduleId]) {
        progress[moduleId] = {
          studied: false,
          questionsAnswered: 0,
          correctAnswers: 0,
          totalQuestions: moduleId === "legislacao" ? 6 : 5,
        }
      }

      progress[moduleId].studied = true
      localStorage.setItem("study-progress", JSON.stringify(progress))
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  if (studyCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl">Estudo Concluído!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-gray-600">
                Você concluiu o estudo do módulo <strong>{content.title}</strong>.
              </p>
              <p className="text-gray-600">Agora você pode praticar com as questões para testar seus conhecimentos.</p>
              <div className="flex gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao Início
                  </Button>
                </Link>
                <Link href={`/quiz/${moduleId}`}>
                  <Button>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Fazer Questões
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-blue-500" />
              <div>
                <CardTitle className="text-2xl">{content.title}</CardTitle>
                <p className="text-gray-600">
                  Seção {currentSection + 1} de {content.content.length}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-lg leading-relaxed">{content.content[currentSection]}</p>
            </div>

            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={handlePrevious} disabled={currentSection === 0}>
                Anterior
              </Button>

              <div className="text-sm text-gray-500">
                {currentSection + 1} / {content.content.length}
              </div>

              <Button onClick={handleNext}>
                {currentSection === content.content.length - 1 ? "Concluir" : "Próximo"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
