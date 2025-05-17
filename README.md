# Job Coach AI

Une application web moderne pour vous aider dans votre recherche d'emploi, avec des fonctionnalités de création de CV et de lettre de motivation assistées par IA.

## Fonctionnalités

- Création de CV professionnel avec l'aide de l'IA
- Génération de lettres de motivation personnalisées
- Interface utilisateur moderne et intuitive
- Formulaires interactifs et faciles à utiliser

## Prérequis

- Node.js 18.0.0 ou supérieur
- npm ou yarn

## Installation

1. Clonez le dépôt :
```bash
git clone [URL_DU_REPO]
cd job-coach-ai
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
```

3. Créez un fichier `.env.local` à la racine du projet et ajoutez votre clé API OpenAI :
```
OPENAI_API_KEY=votre_clé_api
```

4. Lancez le serveur de développement :
```bash
npm run dev
# ou
yarn dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Utilisation

### Création de CV

1. Accédez à la page "Création de CV"
2. Remplissez les informations demandées dans le formulaire
3. Cliquez sur "Générer mon CV"
4. L'IA générera un CV professionnel basé sur vos informations

### Lettre de Motivation

1. Accédez à la page "Lettre de Motivation"
2. Remplissez les informations sur le poste et l'entreprise
3. Décrivez votre expérience et vos motivations
4. Choisissez le ton souhaité pour votre lettre
5. Cliquez sur "Générer ma lettre"

## Technologies utilisées

- Next.js 14
- React 18
- Chakra UI
- OpenAI API
- TypeScript

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT 