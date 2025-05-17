import { NextResponse } from 'next/server'
import { MistralClient } from '@/lib/openai'

const mistral = new MistralClient()

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    console.log('Données reçues:', formData)
    
    const cv = await mistral.generateCV(formData)
    console.log('CV généré avec succès')
    
    return NextResponse.json({ cv })
  } catch (error: any) {
    console.error('Erreur complète:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la génération du CV',
        details: error.message || 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
} 