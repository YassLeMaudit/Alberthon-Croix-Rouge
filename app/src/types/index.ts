export interface CVFormData {
  nom: string
  prenom: string
  email: string
  telephone: string
  experience: string
  formation: string
  competences: string
}

export interface LettreFormData {
  poste: string
  entreprise: string
  secteur: string
  experience: string
  motivation: string
  competences: string
  ton: 'professionnel' | 'dynamique' | 'formel' | 'créatif'
} 