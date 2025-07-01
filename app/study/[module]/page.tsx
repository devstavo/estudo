"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

const studyContent: { [key: string]: { title: string; content: string[] } } = {
  legislacao: {
    title: "Legislação",
    content: [
      "1. Constituição do Estado do Paraná - Estabelece a organização política e administrativa do Estado, definindo competências, direitos e deveres.",
      "2. Estatuto dos Servidores do Poder Judiciário do Paraná (Lei Estadual nº 16.024/2008) - Regula o regime jurídico dos servidores públicos do Poder Judiciário.",
      "3. Regimento Interno do TJPR - Define a organização interna, competências e funcionamento do Tribunal de Justiça.",
      "4. Código de Organização e Divisão Judiciárias do Estado do Paraná - Estabelece a estrutura e organização do Poder Judiciário estadual.",
      "5. Código de Ética e Conduta do Poder Judiciário - Define princípios éticos e regras de conduta para magistrados e servidores.",
      "6. Regulamento Administrativo do TJPR - Normas administrativas internas do Tribunal.",
      "7. Lei Geral de Proteção de Dados (Lei nº 13.709/2018) - LGPD regula o tratamento de dados pessoais.",
      "8. Lei de Acesso à Informação (Lei nº 12.527/2011) - Garante o direito de acesso às informações públicas.",
    ],
  },
  constitucional: {
    title: "Noções de Direito Constitucional",
    content: [
      "1. Constituição: Conceito, estrutura, elementos e classificação - Lei fundamental que organiza o Estado e define direitos.",
      "2. Poder Constituinte - Poder de elaborar e modificar a Constituição (originário e derivado).",
      "3. Princípios fundamentais da República Federativa do Brasil - Soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho.",
      "4. Direitos e garantias fundamentais - Direitos individuais, coletivos, sociais, nacionalidade e políticos.",
      "5. Remédios constitucionais: Habeas corpus, mandado de segurança, mandado de injunção, habeas data, ação popular.",
      "6. Organização do Estado - Federação, repartição de competências, intervenção federal.",
      "7. Administração Pública - Princípios da legalidade, impessoalidade, moralidade, publicidade e eficiência.",
      "8. Organização dos Poderes - Legislativo, Executivo, Judiciário e funções essenciais à Justiça.",
    ],
  },
  administrativo: {
    title: "Noções de Direito Administrativo",
    content: [
      "1. Regime jurídico-administrativo - Conjunto de princípios e regras que regem a Administração Pública.",
      "2. Poderes administrativos: Regulamentar, hierárquico, disciplinar e de polícia.",
      "3. Organização administrativa - Centralização, descentralização, concentração e desconcentração.",
      "4. Atos administrativos - Manifestação de vontade da Administração com requisitos, atributos e classificações.",
      "5. Responsabilidade civil do Estado - Teoria do risco administrativo e responsabilidade objetiva.",
      "6. Improbidade administrativa (Lei nº 8.429/1992) - Atos que violam princípios da Administração.",
      "7. Processo administrativo - Procedimentos para tomada de decisões administrativas.",
      "8. Licitações e contratos (Lei nº 14.133/2021) - Procedimentos para contratações públicas.",
      "9. Agentes públicos - Servidores, empregados públicos e particulares em colaboração.",
      "10. Bens públicos - Patrimônio público e sua classificação.",
    ],
  },
  civil: {
    title: "Noções de Direito Civil",
    content: [
      "1. Lei de Introdução às Normas do Direito Brasileiro - Regras sobre aplicação das leis no tempo e espaço.",
      "2. Pessoas naturais - Personalidade jurídica, capacidade, direitos da personalidade.",
      "3. Pessoas jurídicas - Conceito, classificação, constituição e extinção.",
      "4. Domicílio - Sede jurídica da pessoa para suas relações e obrigações.",
      "5. Bens - Classificação: móveis/imóveis, públicos/privados, fungíveis/infungíveis.",
      "6. Fatos jurídicos - Negócios jurídicos, atos lícitos e ilícitos.",
      "7. Prescrição e decadência - Perda do direito pelo decurso do tempo.",
      "8. Estatuto da Pessoa Idosa (Lei nº 10.741/2003) - Proteção e direitos dos idosos.",
      "9. Estatuto da Pessoa com Deficiência (Lei nº 13.146/2015) - Inclusão e acessibilidade.",
    ],
  },
  "processual-civil": {
    title: "Noções de Direito Processual Civil",
    content: [
      "1. Normas fundamentais - Princípios do processo civil e aplicação das normas.",
      "2. Jurisdição e ação - Poder estatal de resolver conflitos e direito de ação.",
      "3. Competência - Critérios para determinar o juízo competente.",
      "4. Sujeitos do processo - Partes, procuradores, litisconsórcio, intervenção de terceiros.",
      "5. Atos processuais - Forma, tempo, lugar, prazos e comunicações.",
      "6. Tutela provisória - Medidas urgentes e cautelares.",
      "7. Procedimento comum - Petição inicial, contestação, saneamento, instrução, sentença.",
      "8. Recursos - Meios de impugnação das decisões judiciais.",
      "9. Juizados Especiais (Lei nº 9.099/1995) - Procedimento simplificado para causas de menor complexidade.",
      "10. Juizados da Fazenda Pública (Lei nº 12.153/2009) - Procedimento contra entes públicos.",
    ],
  },
  penal: {
    title: "Noções de Direito Penal",
    content: [
      "1. Princípios do Direito Penal - Legalidade, anterioridade, irretroatividade da lei penal.",
      "2. Aplicação da lei penal - Tempo, lugar, extraterritorialidade.",
      "3. Crime - Conceito, elementos, classificação, consumação e tentativa.",
      "4. Imputabilidade penal - Capacidade de entender e querer, causas excludentes.",
      "5. Concurso de pessoas - Coautoria e participação em crimes.",
      "6. Concurso de crimes - Material, formal e crime continuado.",
      "7. Extinção da punibilidade - Causas que extinguem a pretensão punitiva.",
      "8. Crimes contra a administração pública - Peculato, corrupção, prevaricação.",
      "9. Lei do Abuso de Autoridade (Lei nº 13.869/2019) - Crimes praticados por agentes públicos.",
      "10. Legislação especial - Crimes de preconceito, hediondos, Lei Maria da Penha, Lei de Drogas.",
    ],
  },
  "processual-penal": {
    title: "Noções de Direito Processual Penal",
    content: [
      "1. Princípios processuais penais - Contraditório, ampla defesa, presunção de inocência.",
      "2. Lei processual penal - Aplicação no tempo, espaço e em relação às pessoas.",
      "3. Inquérito policial - Procedimento investigativo preparatório da ação penal.",
      "4. Acordo de não persecução penal - Alternativa ao processo para crimes sem violência.",
      "5. Ação penal - Pública (incondicionada/condicionada) e privada.",
      "6. Jurisdição e competência criminal - Critérios para determinar o juízo competente.",
      "7. Provas - Teoria geral, meios de prova, valoração e licitude.",
      "8. Medidas cautelares pessoais - Prisões e medidas alternativas.",
      "9. Liberdade provisória - Direito do acusado de responder em liberdade.",
      "10. Procedimentos - Comum (ordinário, sumário, sumaríssimo) e especiais.",
      "11. Nulidades - Vícios que podem invalidar atos processuais.",
      "12. Recursos e ações autônomas - Meios de impugnação das decisões.",
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
