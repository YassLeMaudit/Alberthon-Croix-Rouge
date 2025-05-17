import { NextResponse } from 'next/server'
import { MistralClient } from '@/lib/openai'

const mistral = new MistralClient()

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Le message est requis' },
        { status: 400 }
      )
    }

    const prompt = `Contexte: ${context || 'Assistant général'}\n\nUtilisateur: ${message}\n\nAssistant:`
    
    const response = await mistral.generateText(prompt)
    
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Erreur lors du traitement du message:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement du message' },
      { status: 500 }
    )
  }
} 