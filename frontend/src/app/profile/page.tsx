'use client'

import { DashboardLayout } from "@/components/layout"
import {Container} from "@/components/layout/Container"
import {Card, CardHeader, CardTitle, CardContent, Button, Badge} from "@/components/ui"

export default function ProfilePage(){
    return(
        <DashboardLayout> 
            <Container>
                 <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
      
      {/* Grid com 2 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {/* Card Perfil */}
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            {/* Avatar */}
            <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center text-3xl font-bold text-purple-700">
              FD
            </div>
            <h2 className="mt-4 text-xl font-bold">Frederick Silva</h2>
            <p className="text-gray-600">frederick@email.com</p>
            <Badge className="mt-2">Desenvolvedor Backend</Badge>
          </CardContent>
        </Card>
        
        {/* Card Métricas */}
        <Card>
          <CardHeader>
            <CardTitle>Minhas Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total de Feedbacks</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Média de Likes</p>
                <p className="text-2xl font-bold text-gray-900">4.5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
      </div>


            </Container>
        </DashboardLayout>
    )
}