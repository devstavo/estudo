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
      question: "Qual lei estabelece o Estatuto dos Servidores do Poder Judiciário do Paraná?",
      options: [
        "Lei Estadual nº 16.024/2008",
        "Lei Estadual nº 15.024/2007",
        "Lei Estadual nº 17.024/2009",
        "Lei Estadual nº 14.024/2006",
      ],
      correct: 0,
      explanation:
        "A Lei Estadual nº 16.024/2008 estabelece o Estatuto dos Servidores do Poder Judiciário do Estado do Paraná.",
    },
    {
      id: 2,
      question: "A Lei Geral de Proteção de Dados (LGPD) tem qual numeração?",
      options: ["Lei nº 13.709/2018", "Lei nº 12.709/2017", "Lei nº 14.709/2019", "Lei nº 13.609/2018"],
      correct: 0,
      explanation: "A Lei nº 13.709/2018 é a Lei Geral de Proteção de Dados Pessoais (LGPD).",
    },
    {
      id: 3,
      question: "A Lei de Acesso à Informação corresponde a qual diploma legal?",
      options: ["Lei nº 12.527/2011", "Lei nº 11.527/2010", "Lei nº 13.527/2012", "Lei nº 12.427/2011"],
      correct: 0,
      explanation: "A Lei nº 12.527/2011 é a Lei de Acesso à Informação, que regula o acesso a informações públicas.",
    },
    {
      id: 4,
      question: "O Código de Ética e Conduta do Poder Judiciário do Estado do Paraná estabelece:",
      options: [
        "Apenas regras para magistrados",
        "Apenas regras para servidores",
        "Princípios éticos para magistrados e servidores",
        "Somente procedimentos administrativos",
      ],
      correct: 2,
      explanation:
        "O Código estabelece princípios éticos e regras de conduta tanto para magistrados quanto para servidores do Poder Judiciário.",
    },
    {
      id: 5,
      question: "O Regimento Interno do TJPR define:",
      options: [
        "Apenas a competência dos desembargadores",
        "A organização interna e funcionamento do Tribunal",
        "Somente os procedimentos recursais",
        "Apenas as regras disciplinares",
      ],
      correct: 1,
      explanation:
        "O Regimento Interno define a organização interna, competências e funcionamento do Tribunal de Justiça do Paraná.",
    },
    {
      id: 6,
      question: "A Constituição do Estado do Paraná estabelece:",
      options: [
        "Apenas a organização dos municípios",
        "A organização política e administrativa do Estado",
        "Somente os direitos dos servidores",
        "Apenas as competências do Governador",
      ],
      correct: 1,
      explanation:
        "A Constituição Estadual estabelece a organização política e administrativa do Estado, definindo competências, direitos e deveres.",
    },
  ],
  constitucional: [
    {
      id: 1,
      question: "Quais são os princípios fundamentais da República Federativa do Brasil?",
      options: [
        "Soberania, cidadania, dignidade da pessoa humana",
        "Apenas soberania e cidadania",
        "Somente dignidade da pessoa humana",
        "Legalidade e moralidade",
      ],
      correct: 0,
      explanation:
        "Os princípios fundamentais incluem soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa, e pluralismo político.",
    },
    {
      id: 2,
      question: "O habeas corpus é utilizado para proteger:",
      options: ["Direito de informação", "Liberdade de locomoção", "Direito de propriedade", "Direito de expressão"],
      correct: 1,
      explanation:
        "O habeas corpus é o remédio constitucional que protege a liberdade de locomoção contra abuso de poder.",
    },
    {
      id: 3,
      question: "O Poder Constituinte originário é:",
      options: [
        "Limitado juridicamente",
        "Condicionado",
        "Inicial, ilimitado e incondicionado",
        "Derivado da Constituição anterior",
      ],
      correct: 2,
      explanation:
        "O Poder Constituinte originário é inicial, ilimitado juridicamente e incondicionado, pois estabelece uma nova ordem jurídica.",
    },
    {
      id: 4,
      question: "São princípios da Administração Pública:",
      options: [
        "Legalidade, impessoalidade, moralidade, publicidade e eficiência",
        "Apenas legalidade e moralidade",
        "Somente eficiência e publicidade",
        "Legalidade, oportunidade e conveniência",
      ],
      correct: 0,
      explanation:
        "O art. 37 da CF/88 estabelece os princípios LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.",
    },
    {
      id: 5,
      question: "O mandado de segurança protege:",
      options: [
        "Apenas direitos individuais",
        "Direito líquido e certo não amparado por habeas corpus",
        "Somente direitos coletivos",
        "Apenas direitos políticos",
      ],
      correct: 1,
      explanation:
        "O mandado de segurança protege direito líquido e certo não amparado por habeas corpus ou habeas data.",
    },
  ],
  administrativo: [
    {
      id: 1,
      question: "O princípio da supremacia do interesse público significa que:",
      options: [
        "O interesse público sempre prevalece",
        "Há ponderação entre interesse público e privado",
        "O interesse privado é irrelevante",
        "Apenas em casos excepcionais prevalece o público",
      ],
      correct: 1,
      explanation:
        "A supremacia do interesse público não é absoluta, devendo haver ponderação com os direitos fundamentais e o interesse privado legítimo.",
    },
    {
      id: 2,
      question: "São atributos dos atos administrativos:",
      options: [
        "Presunção de legitimidade, imperatividade e autoexecutoriedade",
        "Apenas legalidade",
        "Somente moralidade e eficiência",
        "Discricionariedade e vinculação",
      ],
      correct: 0,
      explanation:
        "Os atos administrativos possuem os atributos da presunção de legitimidade, imperatividade e autoexecutoriedade.",
    },
    {
      id: 3,
      question: "A responsabilidade civil do Estado no Brasil é:",
      options: ["Subjetiva", "Objetiva", "Apenas por culpa", "Inexistente"],
      correct: 1,
      explanation: "A CF/88 adotou a teoria da responsabilidade objetiva do Estado, baseada no risco administrativo.",
    },
    {
      id: 4,
      question: "O poder de polícia é:",
      options: ["Apenas repressivo", "Preventivo e repressivo", "Somente preventivo", "Inexistente na Administração"],
      correct: 1,
      explanation:
        "O poder de polícia tem caráter preventivo (fiscalização, licenças) e repressivo (multas, interdições).",
    },
    {
      id: 5,
      question: "A Lei nº 14.133/2021 trata de:",
      options: [
        "Processo administrativo",
        "Licitações e contratos",
        "Improbidade administrativa",
        "Responsabilidade civil",
      ],
      correct: 1,
      explanation: "A Lei nº 14.133/2021 é a nova Lei de Licitações e Contratos Administrativos.",
    },
  ],
  civil: [
    {
      id: 1,
      question: "A personalidade jurídica da pessoa natural inicia-se:",
      options: ["Com a concepção", "Com o nascimento com vida", "Com o registro civil", "Com a maioridade"],
      correct: 1,
      explanation:
        "A personalidade civil da pessoa natural inicia-se com o nascimento com vida, conforme art. 2º do Código Civil.",
    },
    {
      id: 2,
      question: "São direitos da personalidade:",
      options: ["Apenas o nome", "Nome, imagem, honra e privacidade", "Somente a honra", "Apenas a imagem"],
      correct: 1,
      explanation:
        "Os direitos da personalidade incluem nome, imagem, honra, privacidade, integridade física e moral, entre outros.",
    },
    {
      id: 3,
      question: "A prescrição extingue:",
      options: ["O direito", "A pretensão", "A obrigação", "O contrato"],
      correct: 1,
      explanation: "A prescrição extingue a pretensão (direito de ação), mas não o direito material em si.",
    },
    {
      id: 4,
      question: "São bens imóveis por natureza:",
      options: [
        "Apenas terrenos",
        "Solo e tudo que se incorpora naturalmente",
        "Somente construções",
        "Apenas plantações",
      ],
      correct: 1,
      explanation:
        "Bens imóveis por natureza são o solo e tudo quanto se lhe incorpora naturalmente, como árvores e frutos pendentes.",
    },
    {
      id: 5,
      question: "O Estatuto da Pessoa Idosa considera idosa a pessoa com:",
      options: ["65 anos ou mais", "60 anos ou mais", "70 anos ou mais", "55 anos ou mais"],
      correct: 1,
      explanation: "O Estatuto da Pessoa Idosa (Lei 10.741/2003) considera idosa a pessoa com 60 anos ou mais.",
    },
  ],
  "processual-civil": [
    {
      id: 1,
      question: "O princípio do contraditório significa:",
      options: [
        "Apenas o direito de defesa",
        "Direito de informação e participação",
        "Somente o direito de recurso",
        "Apenas o direito de produzir provas",
      ],
      correct: 1,
      explanation:
        "O contraditório compreende o direito de informação (ciência) e participação (possibilidade de manifestação).",
    },
    {
      id: 2,
      question: "A competência absoluta:",
      options: [
        "Pode ser prorrogada",
        "Não pode ser prorrogada",
        "Depende da vontade das partes",
        "É sempre territorial",
      ],
      correct: 1,
      explanation: "A competência absoluta não pode ser prorrogada e deve ser declarada de ofício pelo juiz.",
    },
    {
      id: 3,
      question: "A revelia produz o efeito de:",
      options: [
        "Presunção absoluta de veracidade",
        "Presunção relativa de veracidade dos fatos",
        "Extinção do processo",
        "Julgamento imediato",
      ],
      correct: 1,
      explanation: "A revelia produz presunção relativa de veracidade dos fatos alegados pelo autor.",
    },
    {
      id: 4,
      question: "Os Juizados Especiais Cíveis julgam causas de valor até:",
      options: ["20 salários mínimos", "40 salários mínimos", "60 salários mínimos", "100 salários mínimos"],
      correct: 1,
      explanation: "Os Juizados Especiais Cíveis têm competência para causas de até 40 salários mínimos.",
    },
    {
      id: 5,
      question: "A tutela provisória pode ser:",
      options: ["Apenas cautelar", "Apenas antecipada", "Cautelar ou antecipada", "Somente satisfativa"],
      correct: 2,
      explanation:
        "A tutela provisória pode ser cautelar (assegurar) ou antecipada (antecipar efeitos da tutela final).",
    },
  ],
  penal: [
    {
      id: 1,
      question: "O princípio da legalidade penal significa:",
      options: [
        "Não há crime sem lei anterior que o defina",
        "Qualquer lei pode criar crimes",
        "Apenas decretos podem definir crimes",
        "A analogia é sempre permitida",
      ],
      correct: 0,
      explanation:
        "O princípio da legalidade (nullum crimen, nulla poena sine lege) exige lei anterior definindo o crime.",
    },
    {
      id: 2,
      question: "A tentativa ocorre quando:",
      options: [
        "O crime se consuma",
        "Iniciada a execução, não se consuma por circunstâncias alheias à vontade do agente",
        "Há apenas cogitação",
        "Há apenas preparação",
      ],
      correct: 1,
      explanation:
        "Tentativa é quando, iniciada a execução, o crime não se consuma por circunstâncias alheias à vontade do agente.",
    },
    {
      id: 3,
      question: "São causas excludentes da ilicitude:",
      options: [
        "Estado de necessidade, legítima defesa, exercício regular de direito",
        "Apenas legítima defesa",
        "Somente estado de necessidade",
        "Apenas exercício regular de direito",
      ],
      correct: 0,
      explanation:
        "As excludentes de ilicitude são: estado de necessidade, legítima defesa, estrito cumprimento do dever legal e exercício regular de direito.",
    },
    {
      id: 4,
      question: "O peculato é crime praticado:",
      options: [
        "Por qualquer pessoa",
        "Apenas por funcionário público",
        "Somente por particular",
        "Por funcionário público ou quem lhe é equiparado",
      ],
      correct: 3,
      explanation:
        "Peculato é crime próprio, praticado por funcionário público ou quem lhe é equiparado para efeitos penais.",
    },
    {
      id: 5,
      question: "A Lei Maria da Penha (11.340/2006) trata de:",
      options: [
        "Violência urbana",
        "Violência doméstica e familiar contra a mulher",
        "Apenas violência sexual",
        "Somente violência patrimonial",
      ],
      correct: 1,
      explanation: "A Lei Maria da Penha cria mecanismos para coibir a violência doméstica e familiar contra a mulher.",
    },
  ],
  "processual-penal": [
    {
      id: 1,
      question: "O princípio da presunção de inocência significa que:",
      options: [
        "O réu deve provar sua inocência",
        "O acusado é considerado inocente até sentença condenatória transitada em julgado",
        "Apenas em crimes graves",
        "Não existe no processo penal",
      ],
      correct: 1,
      explanation:
        "A presunção de inocência estabelece que ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.",
    },
    {
      id: 2,
      question: "O inquérito policial é:",
      options: [
        "Obrigatório para toda ação penal",
        "Procedimento administrativo investigativo",
        "Processo judicial",
        "Apenas para crimes dolosos",
      ],
      correct: 1,
      explanation:
        "O inquérito policial é procedimento administrativo investigativo que visa apurar infrações penais e sua autoria.",
    },
    {
      id: 3,
      question: "A ação penal pública incondicionada:",
      options: [
        "Depende de representação",
        "Não depende de manifestação da vítima",
        "Só pode ser proposta pela vítima",
        "Depende de autorização",
      ],
      correct: 1,
      explanation:
        "A ação penal pública incondicionada independe de manifestação da vítima, sendo promovida pelo Ministério Público.",
    },
    {
      id: 4,
      question: "A prisão em flagrante:",
      options: [
        "Só pode ser feita por policiais",
        "Pode ser feita por qualquer pessoa",
        "Apenas com mandado",
        "Somente durante o dia",
      ],
      correct: 1,
      explanation:
        "Qualquer pessoa pode prender em flagrante delito, devendo apresentar o preso à autoridade competente.",
    },
    {
      id: 5,
      question: "O acordo de não persecução penal pode ser aplicado em:",
      options: [
        "Qualquer crime",
        "Crimes sem violência ou grave ameaça com pena mínima inferior a 4 anos",
        "Apenas contravenções",
        "Somente crimes culposos",
      ],
      correct: 1,
      explanation: "O ANPP aplica-se a crimes sem violência ou grave ameaça, cuja pena mínima seja inferior a 4 anos.",
    },
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
