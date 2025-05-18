import { NextResponse } from 'next/server'
import { MistralClient } from '@/lib/openai'

const mistral = new MistralClient()

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    console.log('Données reçues:', formData)
    
    const lettre = await mistral.generateLettre(formData)
    console.log('Lettre générée avec succès')
    
    return NextResponse.json({ lettre })
  } catch (error: any) {
    console.error('Erreur complète:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la génération de la lettre',
        details: error.message || 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
} 