import { NextResponse } from 'next/server'
import { MistralClient } from '@/lib/openai'

const mistral = new MistralClient()

export async function POST(request: Request) {
  try {
    const { message, context, language = 'fr' } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Le message est requis' },
        { status: 400 }
      )
    }

    // Instructions spécifiques selon la langue
    let instructionLang = ""
    if (language === 'fr') {
      instructionLang = "Réponds en français."
    } else if (language === 'en') {
      instructionLang = "Réponds en anglais (English)."
    } else if (language === 'fa') {
      instructionLang = "Réponds en dari (افغانستان)."
    } else if (language === 'ku') {
      instructionLang = "Réponds en kurde (کوردی)."
    } else if (language === 'zh') {
      instructionLang = "Réponds en chinois (中文)."
    }

    // Instructions détaillées pour le format de réponse concernant les CV et lettres
    const cvInstructions = `
    LORSQUE l'utilisateur demande des conseils sur comment présenter une expérience, une formation ou une compétence dans son CV ou sa lettre de motivation, structure ta réponse ainsi:
    
    1. D'abord, donne des conseils précis et pertinents DANS LA LANGUE SÉLECTIONNÉE (${language}), expliquant comment mettre en valeur l'expérience ou la compétence. Commence par une formule comme "Voici comment vous pouvez améliorer cette expérience:" ou similaire.
    
    2. Ensuite, propose un exemple concret et CONCIS (maximum 3 lignes) OBLIGATOIREMENT EN FRANÇAIS, prêt à être copié-collé directement dans le CV. Ce texte doit être clairement séparé du reste et introduit par "EXEMPLE À COPIER:". 
    
    3. ${language !== 'fr' ? `Si la langue sélectionnée n'est pas le français, fournit également une traduction de cet exemple dans la langue sélectionnée (${language}) pour compréhension, clairement marquée comme "TRADUCTION:".` : 'Ne fournis pas de traduction puisque l\'exemple est déjà en français.'}
    
    IMPORTANT: 
    - Les sections de CV doivent être concises, précises et mettre l'accent sur les réalisations concrètes et mesurables, pas seulement sur les responsabilités.
    - L'exemple à copier doit TOUJOURS être en français, même si le reste de la conversation est dans une autre langue.
    - Utilise des balises Markdown pour améliorer la présentation:
      * Utilise **texte en gras** pour les éléments importants
      * Utilise des listes à puces avec - pour les listes
      * Utilise des > pour les citations ou exemples
      * Utilise des ### pour les titres de section
    `

    const userQuery = `
    Contexte: ${context || 'Assistant pour la création de CV et lettres de motivation'}
    
    Question de l'utilisateur: ${message}
    `
    
    // Sans streaming pour l'instant, nous reviendrons au streaming plus tard
    const response = await mistral.generateText(instructionLang + '\n\n' + cvInstructions + '\n\n' + userQuery)
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Erreur lors du traitement du message:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement du message' },
      { status: 500 }
    )
  }
}
