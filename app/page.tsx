"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Clock, Trophy } from "lucide-react"
import Link from "next/link"

interface ModuleProgress {
  studied: boolean
  questionsAnswered: number
  correctAnswers: number
  totalQuestions: number
}

const modules = [
  {
    id: "legislacao",
    title: "Legislação",
    description: "Constituição do Estado do Paraná, Estatuto dos Servidores, Regimento Interno do TJPR",
    totalQuestions: 6,
    color: "bg-blue-500",
  },
  {
    id: "constitucional",
    title: "Direito Constitucional",
    description: "Constituição, Poder Constituinte, Princípios Fundamentais, Direitos e Garantias",
    totalQuestions: 5,
    color: "bg-green-500",
  },
  {
    id: "administrativo",
    title: "Direito Administrativo",
    description: "Regime Jurídico-Administrativo, Poderes da Administração, Atos Administrativos",
    totalQuestions: 5,
    color: "bg-purple-500",
  },
  {
    id: "civil",
    title: "Direito Civil",
    description: "Lei de Introdução, Pessoas, Domicílio, Bens, Fatos Jurídicos",
    totalQuestions: 5,
    color: "bg-orange-500",
  },
  {
    id: "processual-civil",
    title: "Direito Processual Civil",
    description: "Normas Fundamentais, Jurisdição, Sujeitos do Processo, Procedimento Comum",
    totalQuestions: 5,
    color: "bg-red-500",
  },
  {
    id: "penal",
    title: "Direito Penal",
    description: "Princípios, Aplicação da Lei Penal, Crime, Imputabilidade, Crimes contra Administração",
    totalQuestions: 5,
    color: "bg-indigo-500",
  },
  {
    id: "processual-penal",
    title: "Direito Processual Penal",
    description: "Princípios, Inquérito Policial, Ação Penal, Jurisdição, Provas, Medidas Cautelares",
    totalQuestions: 5,
    color: "bg-pink-500",
  },
]

export default function HomePage() {
  const [progressData, setProgressData] = useState<Record<string, ModuleProgress>>({})

  useEffect(() => {
    const savedProgress = localStorage.getItem("study-progress")
    if (savedProgress) {
      setProgressData(JSON.parse(savedProgress))
    }
  }, [])

  const getModuleProgress = (moduleId: string) => {
    return (
      progressData[moduleId] || {
        studied: false,
        questionsAnswered: 0,
        correctAnswers: 0,
        totalQuestions: modules.find((m) => m.id === moduleId)?.totalQuestions || 5,
      }
    )
  }

  const getTotalProgress = () => {
    const totalModules = modules.length
    const completedModules = modules.filter((module) => {
      const moduleProgress = getModuleProgress(module.id)
      return moduleProgress.questionsAnswered >= module.totalQuestions
    }).length

    return Math.round((completedModules / totalModules) * 100)
  }

  const getTotalStats = () => {
    let totalQuestions = 0
    let totalCorrect = 0

    modules.forEach((module) => {
      const moduleProgress = getModuleProgress(module.id)
      totalQuestions += moduleProgress.questionsAnswered
      totalCorrect += moduleProgress.correctAnswers
    })

    return { totalQuestions, totalCorrect }
  }

  const stats = getTotalStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sistema de Estudo - Direito</h1>
          <p className="text-lg text-gray-600">Estude e pratique com questões dos principais temas jurídicos</p>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{getTotalProgress()}%</div>
              <div className="text-sm text-gray-600">Progresso Geral</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalCorrect}</div>
              <div className="text-sm text-gray-600">Acertos</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalQuestions}</div>
              <div className="text-sm text-gray-600">Questões Respondidas</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{modules.length}</div>
              <div className="text-sm text-gray-600">Módulos</div>
            </CardContent>
          </Card>
        </div>

        {/* Progresso Geral */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Progresso Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={getTotalProgress()} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">
              {
                modules.filter((module) => {
                  const moduleProgress = getModuleProgress(module.id)
                  return moduleProgress.questionsAnswered >= module.totalQuestions
                }).length
              }{" "}
              de {modules.length} módulos concluídos
            </p>
          </CardContent>
        </Card>

        {/* Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const moduleProgress = getModuleProgress(module.id)
            const progressPercentage = Math.round((moduleProgress.questionsAnswered / module.totalQuestions) * 100)
            const isCompleted = moduleProgress.questionsAnswered >= module.totalQuestions

            return (
              <Card key={module.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-4 h-4 rounded-full ${module.color}`} />
                    {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription className="text-sm">{module.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{progressPercentage}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        Questões: {moduleProgress.questionsAnswered}/{module.totalQuestions}
                      </span>
                      <span>Acertos: {moduleProgress.correctAnswers}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/study/${module.id}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Estudar
                        </Button>
                      </Link>

                      <Link href={`/quiz/${module.id}`} className="flex-1">
                        <Button className="w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Questões
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
