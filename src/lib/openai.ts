import OpenAI from 'openai'
import { CVFormData, LettreFormData } from '@/types'

const mistralApiKey = process.env.MISTRAL_API_KEY

if (!mistralApiKey) {
  console.error('MISTRAL_API_KEY n\'est pas définie')
  throw new Error('MISTRAL_API_KEY n\'est pas définie')
}

export class MistralClient {
  private client: OpenAI

  constructor() {
    this.client = new OpenAI({
      apiKey: mistralApiKey,
      baseURL: 'https://api.mistral.ai/v1',
    })
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'mistral-tiny',
        messages: [
          { role: 'system', content: 'Tu es un assistant spécialisé dans la création de CV et lettres de motivation. Réponds uniquement à la requête de l\'utilisateur sans répéter les instructions.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })

      return response.choices[0]?.message?.content || 'Désolé, je n\'ai pas pu générer de réponse.'
    } catch (error) {
      console.error('Erreur lors de la génération du texte:', error)
      throw error
    }
  }

  async generateTextStream(prompt: string) {
    try {
      const stream = await this.client.chat.completions.create({
        model: 'mistral-tiny',
        messages: [
          { role: 'system', content: 'Tu es un assistant spécialisé dans la création de CV et lettres de motivation. Réponds uniquement à la requête de l\'utilisateur sans répéter les instructions.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      })
      
      return stream
    } catch (error) {
      console.error('Erreur lors de la génération du texte en streaming:', error)
      throw error
    }
  }

  async generateCV(formData: any): Promise<string> {
    try {
      console.log('Envoi de la requête à Mistral API pour le CV')
      const prompt = `Tu es un assistant spécialisé dans la rédaction de CV professionnels en français. 
      
      Génère un CV professionnel UNIQUEMENT en français pour ${formData.nom} ${formData.prenom} avec les informations suivantes:
        Expérience: ${formData.experience}
        Formation: ${formData.formation}
        Compétences: ${formData.competences}
        Langues: ${formData.langues}
        Format: Format professionnel avec sections clairement définies
        
      IMPORTANT: Quel que soit la langue d'interface de l'utilisateur, le contenu du CV doit toujours être rédigé en français standard.`

      return await this.generateText(prompt)
    } catch (error) {
      console.error('Erreur lors de la génération du CV:', error)
      throw error
    }
  }

  async generateLettre(formData: any): Promise<string> {
    try {
      console.log('Envoi de la requête à Mistral API pour la lettre')
      
      // Construction du prompt de base
      let prompt = `Tu es un assistant spécialisé dans la rédaction de lettres de motivation professionnelles en français.

Génère une lettre de motivation professionnelle et persuasive UNIQUEMENT en français avec les informations suivantes:

Poste: ${formData.poste}
Entreprise: ${formData.entreprise}
Secteur: ${formData.secteur}
Ton souhaité: ${formData.ton}

Expérience pertinente: ${formData.experience}
Compétences clés: ${formData.competences}
Motivation: ${formData.motivation}

IMPORTANT: Quel que soit la langue d'interface de l'utilisateur, la lettre de motivation doit toujours être rédigée en français standard.
`

      // Ajout des informations de la fiche de poste si disponible
      if (formData.fichePoste && formData.fichePoste.trim()) {
        prompt += `
Fiche de poste: ${formData.fichePoste}

Instructions supplémentaires:
- Analyse attentivement la fiche de poste ci-dessus
- Identifie les mots-clés et compétences recherchées dans la fiche de poste
- Adapte la lettre pour mettre en évidence les compétences de l'utilisateur qui correspondent aux exigences du poste
- Utilise une terminologie similaire à celle de la fiche de poste
`
      }

      // Finalisation du prompt avec les instructions générales
      prompt += `
Instructions générales:
- Structure la lettre en 3 parties: introduction, développement et conclusion
- Adapte le ton selon le choix de l'utilisateur (${formData.ton})
- Mettre en valeur les compétences et l'expérience les plus pertinentes pour le poste
- Inclure des exemples concrets de réalisations si mentionnés
- Terminer par une conclusion dynamique et un appel à l'action
- Format professionnel avec mise en page claire et paragraphes bien structurés

Format de sortie:
[Date]
[Nom et adresse de l'entreprise]

[Corps de la lettre]

[Cordialement]
[Signature]`

      return await this.generateText(prompt)
    } catch (error) {
      console.error('Erreur lors de la génération de la lettre:', error)
      throw error
    }
  }
} 