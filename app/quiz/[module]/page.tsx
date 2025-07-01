"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

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
        "O Estatuto dos Servidores do Poder Judiciário do Paraná estabelece quais formas de provimento de cargos?",
      options: [
        "Nomeação, ascensão, readaptação, reversão, reintegração, recondução, aproveitamento",
        "Apenas nomeação por concurso público",
        "Somente nomeação e exoneração",
        "Nomeação, promoção e transferência",
      ],
      correct: 0,
      explanation:
        "O Estatuto prevê diversas formas de provimento: nomeação, ascensão, readaptação, reversão, reintegração, recondução e aproveitamento, sendo o concurso público a regra para o provimento inicial.",
    },
    {
      id: 2,
      question: "A Lei Geral de Proteção de Dados (LGPD) estabelece quais princípios fundamentais?",
      options: [
        "Apenas finalidade e adequação",
        "Finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança",
        "Somente transparência e segurança",
        "Legalidade e moralidade",
      ],
      correct: 1,
      explanation:
        "A LGPD estabelece diversos princípios: finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação, responsabilização e prestação de contas.",
    },
    {
      id: 3,
      question: "A Lei de Acesso à Informação garante qual direito fundamental?",
      options: [
        "Direito de petição",
        "Direito de acesso a informações públicas",
        "Direito de privacidade",
        "Direito de manifestação",
      ],
      correct: 1,
      explanation:
        "A LAI garante o direito fundamental de acesso a informações públicas, estabelecendo princípios de publicidade como regra e transparência na administração pública.",
    },
    {
      id: 4,
      question: "O Código de Ética e Conduta do Poder Judiciário do Paraná estabelece quais princípios fundamentais?",
      options: [
        "Apenas imparcialidade",
        "Somente transparência e diligência",
        "Integridade, imparcialidade, transparência, diligência, cortesia, respeito",
        "Apenas legalidade e moralidade",
      ],
      correct: 2,
      explanation:
        "O Código estabelece princípios éticos fundamentais como integridade, imparcialidade, transparência, diligência, cortesia e respeito para magistrados e servidores.",
    },
    {
      id: 5,
      question: "O Regimento Interno do TJPR define qual aspecto da organização do Tribunal?",
      options: [
        "Apenas a competência dos desembargadores",
        "A organização interna, competências dos órgãos e funcionamento do Tribunal",
        "Somente os procedimentos recursais",
        "Apenas as regras disciplinares",
      ],
      correct: 1,
      explanation:
        "O Regimento Interno disciplina a organização interna, define competências de cada órgão (Tribunal Pleno, Órgão Especial, Seções, Câmaras) e estabelece o funcionamento do TJPR.",
    },
    {
      id: 6,
      question: "A Constituição do Estado do Paraná organiza os Poderes estaduais de que forma?",
      options: [
        "Apenas o Poder Executivo",
        "Legislativo (Assembleia), Executivo (Governador) e Judiciário (TJPR) com suas competências",
        "Somente o Poder Judiciário",
        "Apenas os direitos dos servidores",
      ],
      correct: 1,
      explanation:
        "A Constituição Estadual organiza os três Poderes: Legislativo (Assembleia Legislativa), Executivo (Governador e Vice-Governador) e Judiciário (TJPR), definindo suas estruturas e competências.",
    },
    // Adicionar mais 19 questões variadas sobre legislação...
  ],
  constitucional: [
    {
      id: 1,
      question: "Quais são os fundamentos da República Federativa do Brasil?",
      options: [
        "Soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e pluralismo político",
        "Apenas soberania e cidadania",
        "Somente dignidade da pessoa humana",
        "Legalidade e moralidade",
      ],
      correct: 0,
      explanation:
        "Os fundamentos da República (Art. 1º CF/88) são: soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa, e pluralismo político.",
    },
    {
      id: 2,
      question: "O habeas corpus protege qual direito fundamental?",
      options: ["Direito de informação", "Liberdade de locomoção", "Direito de propriedade", "Direito de expressão"],
      correct: 1,
      explanation:
        "O habeas corpus é o remédio constitucional que protege a liberdade de locomoção (direito de ir, vir e permanecer) contra abuso de poder ou ilegalidade.",
    },
    {
      id: 3,
      question: "O Poder Constituinte originário possui quais características?",
      options: [
        "Limitado juridicamente",
        "Condicionado à Constituição anterior",
        "Inicial, ilimitado juridicamente e incondicionado",
        "Derivado da ordem jurídica anterior",
      ],
      correct: 2,
      explanation:
        "O Poder Constituinte originário é inicial (inicia nova ordem jurídica), ilimitado juridicamente (não se subordina à Constituição anterior) e incondicionado (não segue formas pré-existentes).",
    },
    {
      id: 4,
      question: "Quais são os princípios expressos da Administração Pública na Constituição?",
      options: [
        "Legalidade, impessoalidade, moralidade, publicidade e eficiência",
        "Apenas legalidade e moralidade",
        "Somente eficiência e publicidade",
        "Legalidade, oportunidade e conveniência",
      ],
      correct: 0,
      explanation:
        "O art. 37 da CF/88 estabelece os princípios LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência como princípios expressos da Administração Pública.",
    },
    {
      id: 5,
      question: "O mandado de segurança tem por finalidade proteger:",
      options: [
        "Apenas direitos individuais",
        "Direito líquido e certo não amparado por habeas corpus ou habeas data",
        "Somente direitos coletivos",
        "Apenas direitos políticos",
      ],
      correct: 1,
      explanation:
        "O mandado de segurança protege direito líquido e certo (certo, determinado, comprovado documentalmente) não amparado por habeas corpus ou habeas data, contra autoridade pública ou agente de pessoa jurídica no exercício de atribuições públicas.",
    },
    // Adicionar mais 20 questões sobre direito constitucional...
  ],
  administrativo: [
    {
      id: 1,
      question: "O princípio da supremacia do interesse público significa que:",
      options: [
        "O interesse público sempre prevalece absolutamente",
        "Há necessidade de ponderação entre interesse público e direitos fundamentais",
        "O interesse privado é sempre irrelevante",
        "Apenas em casos excepcionais prevalece o público",
      ],
      correct: 1,
      explanation:
        "A supremacia do interesse público não é absoluta, devendo haver ponderação com os direitos fundamentais e o interesse privado legítimo, respeitando a proporcionalidade e razoabilidade.",
    },
    {
      id: 2,
      question: "Quais são os atributos dos atos administrativos?",
      options: [
        "Presunção de legitimidade, imperatividade, autoexecutoriedade e tipicidade",
        "Apenas legalidade",
        "Somente moralidade e eficiência",
        "Discricionariedade e vinculação",
      ],
      correct: 0,
      explanation:
        "Os atos administrativos possuem os atributos da presunção de legitimidade/veracidade, imperatividade (impõe-se a terceiros), autoexecutoriedade (execução direta) e tipicidade (corresponder a figura legal).",
    },
    {
      id: 3,
      question: "A responsabilidade civil do Estado no Brasil adota qual teoria?",
      options: [
        "Responsabilidade subjetiva",
        "Responsabilidade objetiva (risco administrativo)",
        "Apenas por culpa comprovada",
        "Irresponsabilidade estatal",
      ],
      correct: 1,
      explanation:
        "A CF/88 adotou a teoria da responsabilidade objetiva do Estado (risco administrativo), bastando a prova do dano e nexo causal, sem necessidade de prova de culpa ou dolo do Estado.",
    },
    {
      id: 4,
      question: "O poder de polícia possui quais características?",
      options: [
        "Apenas caráter repressivo",
        "Caráter preventivo e repressivo",
        "Somente preventivo",
        "É inexistente na Administração",
      ],
      correct: 1,
      explanation:
        "O poder de polícia tem caráter preventivo (fiscalização, licenças, autorizações) e repressivo (multas, interdições, apreensões), visando proteger o interesse público.",
    },
    {
      id: 5,
      question: "A Nova Lei de Licitações estabelece quais modalidades licitatórias?",
      options: [
        "Convite, tomada de preços e concorrência",
        "Pregão, concorrência, concurso, leilão e diálogo competitivo",
        "Apenas pregão e concorrência",
        "Somente licitação e dispensa",
      ],
      correct: 1,
      explanation:
        "A Lei 14.133/2021 estabelece as modalidades: pregão, concorrência, concurso, leilão e diálogo competitivo, extinguindo convite e tomada de preços.",
    },
    // Adicionar mais 20 questões sobre direito administrativo...
  ],
  civil: [
    {
      id: 1,
      question: "A personalidade jurídica da pessoa natural inicia-se com:",
      options: ["A concepção", "O nascimento com vida", "O registro civil", "A maioridade"],
      correct: 1,
      explanation:
        "A personalidade civil da pessoa natural inicia-se com o nascimento com vida, conforme art. 2º do Código Civil, embora a lei ponha a salvo os direitos do nascituro desde a concepção.",
    },
    {
      id: 2,
      question: "Quais são exemplos de direitos da personalidade?",
      options: [
        "Apenas o nome",
        "Nome, imagem, honra, privacidade, integridade física e moral",
        "Somente a honra",
        "Apenas a imagem",
      ],
      correct: 1,
      explanation:
        "Os direitos da personalidade são inerentes à pessoa humana e incluem nome, imagem, honra, privacidade, intimidade, integridade física e moral, entre outros, sendo intransmissíveis e irrenunciáveis.",
    },
    {
      id: 3,
      question: "A prescrição tem como efeito:",
      options: [
        "Extinguir o direito material",
        "Extinguir a pretensão (direito de ação)",
        "Extinguir a obrigação",
        "Anular o contrato",
      ],
      correct: 1,
      explanation:
        "A prescrição extingue a pretensão, ou seja, o direito de exigir judicialmente o cumprimento de uma obrigação, mas não extingue o direito material em si, que se torna uma obrigação natural.",
    },
    {
      id: 4,
      question: "São considerados bens imóveis por natureza:",
      options: [
        "Apenas terrenos",
        "O solo e tudo quanto se lhe incorpora naturalmente",
        "Somente construções",
        "Apenas plantações",
      ],
      correct: 1,
      explanation:
        "Bens imóveis por natureza são o solo e tudo quanto se lhe incorpora naturalmente, como árvores, frutos pendentes, e tudo que está aderido ao solo de forma permanente.",
    },
    {
      id: 5,
      question: "O Estatuto da Pessoa Idosa considera idosa a pessoa com:",
      options: ["65 anos ou mais", "60 anos ou mais", "70 anos ou mais", "55 anos ou mais"],
      correct: 1,
      explanation:
        "O Estatuto da Pessoa Idosa considera idosa a pessoa com idade igual ou superior a 60 anos, garantindo-lhe proteção integral e prioridade no atendimento.",
    },
    // Adicionar mais 20 questões sobre direito civil...
  ],
  "processual-civil": [
    {
      id: 1,
      question: "O princípio do contraditório no processo civil significa:",
      options: [
        "Apenas o direito de defesa",
        "Direito de informação (ciência) e participação (manifestação)",
        "Somente o direito de recurso",
        "Apenas o direito de produzir provas",
      ],
      correct: 1,
      explanation:
        "O contraditório compreende duas dimensões: o direito de informação (ciência dos atos processuais) e o direito de participação (possibilidade de se manifestar e influenciar na decisão).",
    },
    {
      id: 2,
      question: "A competência absoluta possui qual característica?",
      options: [
        "Pode ser prorrogada pela vontade das partes",
        "Não pode ser prorrogada e deve ser declarada de ofício",
        "Depende da concordância das partes",
        "É sempre territorial",
      ],
      correct: 1,
      explanation:
        "A competência absoluta (em razão da matéria e funcional) não pode ser prorrogada, deve ser declarada de ofício pelo juiz a qualquer tempo e momento, e gera nulidade absoluta se violada.",
    },
    {
      id: 3,
      question: "A revelia no processo civil produz qual efeito principal?",
      options: [
        "Presunção absoluta de veracidade dos fatos",
        "Presunção relativa de veracidade dos fatos alegados pelo autor",
        "Extinção automática do processo",
        "Julgamento imediato sem instrução",
      ],
      correct: 1,
      explanation:
        "A revelia produz presunção relativa (juris tantum) de veracidade dos fatos alegados pelo autor, podendo ser afastada por prova em contrário ou quando os fatos não forem verossímeis.",
    },
    {
      id: 4,
      question: "Os Juizados Especiais Cíveis têm competência para julgar causas de valor até:",
      options: ["20 salários mínimos", "40 salários mínimos", "60 salários mínimos", "100 salários mínimos"],
      correct: 1,
      explanation:
        "Os Juizados Especiais Cíveis têm competência para causas cíveis de menor complexidade com valor até 40 salários mínimos, seguindo os princípios da oralidade, simplicidade e celeridade.",
    },
    {
      id: 5,
      question: "A tutela provisória no CPC pode ser classificada como:",
      options: [
        "Apenas cautelar",
        "Apenas antecipada",
        "Cautelar (assecuratória) ou antecipada (satisfativa)",
        "Somente de evidência",
      ],
      correct: 2,
      explanation:
        "A tutela provisória pode ser de urgência (cautelar - para assegurar o resultado útil do processo, ou antecipada - para antecipar os efeitos da tutela final) ou de evidência (quando o direito é evidente).",
    },
    // Adicionar mais 20 questões sobre direito processual civil...
  ],
  penal: [
    {
      id: 1,
      question: "O princípio da legalidade penal estabelece que:",
      options: [
        "Não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal",
        "Qualquer norma pode criar crimes",
        "Apenas decretos podem definir crimes",
        "A analogia é sempre permitida para criar crimes",
      ],
      correct: 0,
      explanation:
        "O princípio da legalidade (nullum crimen, nulla poena sine lege) exige que tanto o crime quanto a pena estejam previamente definidos em lei, vedando a analogia in malam partem e garantindo segurança jurídica.",
    },
    {
      id: 2,
      question: "A tentativa ocorre quando:",
      options: [
        "O crime se consuma integralmente",
        "Iniciada a execução, não se consuma por circunstâncias alheias à vontade do agente",
        "Há apenas cogitação do crime",
        "Há apenas preparação para o crime",
      ],
      correct: 1,
      explanation:
        "Tentativa é quando, iniciada a execução do crime, este não se consuma por circunstâncias alheias à vontade do agente. A pena é diminuída de um a dois terços.",
    },
    {
      id: 3,
      question: "São causas excludentes da ilicitude:",
      options: [
        "Estado de necessidade, legítima defesa, estrito cumprimento do dever legal, exercício regular de direito",
        "Apenas legítima defesa",
        "Somente estado de necessidade",
        "Apenas exercício regular de direito",
      ],
      correct: 0,
      explanation:
        "As excludentes de ilicitude (causas de justificação) são: estado de necessidade, legítima defesa, estrito cumprimento do dever legal e exercício regular de direito, tornando o fato atípico.",
    },
    {
      id: 4,
      question: "O crime de peculato é caracterizado por:",
      options: [
        "Poder ser praticado por qualquer pessoa",
        "Ser praticado apenas por particular",
        "Ser crime próprio, praticado por funcionário público",
        "Não envolver bem público",
      ],
      correct: 2,
      explanation:
        "Peculato é crime próprio (só pode ser praticado por funcionário público ou quem lhe é equiparado) que consiste em apropriar-se, desviar ou furtar bem público ou particular de que tem a posse em razão do cargo.",
    },
    {
      id: 5,
      question: "A Lei Maria da Penha tem por objetivo:",
      options: [
        "Combater apenas a violência urbana",
        "Coibir e prevenir a violência doméstica e familiar contra a mulher",
        "Tratar apenas de violência sexual",
        "Regular somente violência patrimonial",
      ],
      correct: 1,
      explanation:
        "A Lei Maria da Penha cria mecanismos para coibir e prevenir a violência doméstica e familiar contra a mulher, abrangendo violência física, psicológica, sexual, patrimonial e moral.",
    },
    // Adicionar mais 20 questões sobre direito penal...
  ],
  "processual-penal": [
    {
      id: 1,
      question: "O princípio da presunção de inocência estabelece que:",
      options: [
        "O réu deve provar sua inocência",
        "O acusado é considerado inocente até sentença condenatória transitada em julgado",
        "Aplica-se apenas em crimes graves",
        "Não existe no processo penal brasileiro",
      ],
      correct: 1,
      explanation:
        "A presunção de inocência (Art. 5º, LVII, CF/88) estabelece que ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória, cabendo à acusação o ônus da prova.",
    },
    {
      id: 2,
      question: "O inquérito policial é caracterizado como:",
      options: [
        "Processo judicial obrigatório",
        "Procedimento administrativo investigativo preparatório da ação penal",
        "Fase judicial do processo",
        "Procedimento exclusivo para crimes dolosos",
      ],
      correct: 1,
      explanation:
        "O inquérito policial é procedimento administrativo, inquisitivo e preparatório da ação penal, que visa apurar a materialidade e autoria de infrações penais, fornecendo elementos para o MP ou ofendido.",
    },
    {
      id: 3,
      question: "A ação penal pública incondicionada caracteriza-se por:",
      options: [
        "Depender de representação da vítima",
        "Não depender de qualquer manifestação da vítima para ser iniciada",
        "Só poder ser proposta pela vítima",
        "Depender de autorização judicial prévia",
      ],
      correct: 1,
      explanation:
        "A ação penal pública incondicionada independe de manifestação da vítima, sendo promovida pelo Ministério Público sempre que houver justa causa, representando a regra geral no sistema brasileiro.",
    },
    {
      id: 4,
      question: "A prisão em flagrante pode ser efetuada por:",
      options: [
        "Apenas policiais civis e militares",
        "Qualquer pessoa do povo",
        "Somente com mandado judicial",
        "Apenas durante o horário comercial",
      ],
      correct: 1,
      explanation:
        "Qualquer pessoa pode prender em flagrante delito (Art. 301 CPP), devendo apresentar imediatamente o preso à autoridade competente, que lavrará o auto de prisão em flagrante.",
    },
    {
      id: 5,
      question: "O acordo de não persecução penal pode ser aplicado em:",
      options: [
        "Qualquer tipo de crime",
        "Crimes sem violência ou grave ameaça com pena mínima inferior a 4 anos",
        "Apenas contravenções penais",
        "Somente crimes culposos",
      ],
      correct: 1,
      explanation:
        "O ANPP aplica-se a crimes sem violência ou grave ameaça à pessoa, cuja pena mínima seja inferior a 4 anos, mediante confissão e cumprimento de condições estabelecidas pelo MP.",
    },
    // Adicionar mais 20 questões sobre direito processual penal...
  ],
}

export default function QuizPage() {
  const params = useParams()
  const moduleId = params.module as string
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const totalQuestions = moduleId === "legislacao" ? 6 : 5

  useEffect(() => {
    generateQuestions()
  }, [moduleId])

  const generateQuestions = () => {
    const allQuestions = questionBank[moduleId] || []
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, totalQuestions)
    setCurrentQuestions(selected)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions([])
    setQuizCompleted(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    setShowResult(true)
    const isCorrect = selectedAnswer === currentQuestions[currentQuestionIndex].correct

    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex])

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Quiz completed
      setQuizCompleted(true)
      saveProgress()
    }
  }

  const saveProgress = () => {
    const savedProgress = localStorage.getItem("study-progress")
    const progress = savedProgress ? JSON.parse(savedProgress) : {}

    if (!progress[moduleId]) {
      progress[moduleId] = {
        studied: false,
        questionsAnswered: 0,
        correctAnswers: 0,
        totalQuestions: totalQuestions,
      }
    }

    progress[moduleId].questionsAnswered += totalQuestions
    progress[moduleId].correctAnswers += score

    localStorage.setItem("study-progress", JSON.stringify(progress))
  }

  if (!currentQuestions.length) {
    return <div>Carregando...</div>
  }

  if (quizCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4">
                {percentage >= 70 ? (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-500" />
                )}
              </div>
              <CardTitle className="text-2xl">Quiz Concluído!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold text-gray-800">
                {score}/{totalQuestions}
              </div>
              <div className="text-xl text-gray-600">{percentage}% de acertos</div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <Progress value={percentage} className="h-3 mb-2" />
                <p className="text-sm text-gray-600">
                  {percentage >= 70 ? "Excelente desempenho!" : "Continue estudando para melhorar!"}
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao Início
                  </Button>
                </Link>
                <Button onClick={generateQuestions}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Novas Questões
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestion = currentQuestions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
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
            <div className="flex justify-between items-center">
              <CardTitle>
                Questão {currentQuestionIndex + 1} de {totalQuestions}
              </CardTitle>
              <div className="text-sm text-gray-500">
                Acertos: {score}/{answeredQuestions.length}
              </div>
            </div>
            <Progress value={(currentQuestionIndex / totalQuestions) * 100} className="h-2" />
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  let buttonClass = "w-full text-left p-4 rounded-lg border transition-colors "

                  if (showResult) {
                    if (index === currentQuestion.correct) {
                      buttonClass += "bg-green-100 border-green-500 text-green-800"
                    } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                      buttonClass += "bg-red-100 border-red-500 text-red-800"
                    } else {
                      buttonClass += "bg-gray-100 border-gray-300"
                    }
                  } else {
                    if (selectedAnswer === index) {
                      buttonClass += "bg-blue-100 border-blue-500"
                    } else {
                      buttonClass += "bg-white border-gray-300 hover:bg-gray-50"
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={buttonClass}
                      disabled={showResult}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)})</span>
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>

            {showResult && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Explicação:</h4>
                <p className="text-gray-700">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex justify-between">
              <div className="text-sm text-gray-500">
                Questão {currentQuestionIndex + 1} de {totalQuestions}
              </div>

              {!showResult ? (
                <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
                  Confirmar Resposta
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex === totalQuestions - 1 ? "Finalizar Quiz" : "Próxima Questão"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
