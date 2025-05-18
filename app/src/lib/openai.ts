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
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      })

      return response.choices[0]?.message?.content || 'Désolé, je n\'ai pas pu générer de réponse.'
    } catch (error) {
      console.error('Erreur lors de la génération du texte:', error)
      throw error
    }
  }

  async generateCV(formData: any): Promise<string> {
    try {
      console.log('Envoi de la requête à Mistral API pour le CV')
      const prompt = `Génère un CV professionnel pour ${formData.nom} ${formData.prenom} avec les informations suivantes:
        Expérience: ${formData.experience}
        Formation: ${formData.formation}
        Compétences: ${formData.competences}
        Langues: ${formData.langues}
        Format: Format professionnel avec sections clairement définies`

      return await this.generateText(prompt)
    } catch (error) {
      console.error('Erreur lors de la génération du CV:', error)
      throw error
    }
  }

  async generateLettre(formData: any): Promise<string> {
    try {
      console.log('Envoi de la requête à Mistral API pour la lettre')
      const prompt = `En tant qu'expert en rédaction de lettres de motivation, génère une lettre de motivation professionnelle et persuasive pour ${formData.nom} ${formData.prenom} avec les informations suivantes:

Poste: ${formData.poste}
Entreprise: ${formData.entreprise}
Secteur: ${formData.secteur}
Ton souhaité: ${formData.ton}

Expérience pertinente: ${formData.experience}
Compétences clés: ${formData.competences}
Motivation: ${formData.motivation}

Instructions spécifiques:
- Structure la lettre en 3 parties: introduction, développement et conclusion
- Adapte le ton selon le choix de l'utilisateur (${formData.ton})
- Mettre en valeur les compétences et l'expérience les plus pertinentes pour le poste
- Inclure des exemples concrets de réalisations si mentionnés
- Terminer par une conclusion dynamique et un appel à l'action
- Format professionnel avec mise en page claire et paragraphes bien structurés

Format de sortie:
[En-tête avec coordonnées]
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