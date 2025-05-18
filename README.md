# Job Coach AI

This project is split into two main parts:

## Frontend App (`/app`)
A Next.js application that provides the user interface for the Job Coach AI. It includes:
- React components
- Chakra UI for styling
- Client-side state management
- API integration with the backend

To run the frontend:
```bash
cd app
npm install
npm run dev
```

## Backend API (`/api`)
An Express.js API that handles:
- OpenAI integration
- Business logic
- Data processing

To run the backend:
```bash
cd api
npm install
npm run dev
```

## Development
1. Clone the repository
2. Set up environment variables:
   - Create `.env` file in `/api` with:
     ```
     PORT=3001
     OPENAI_API_KEY=your_key_here
     ```
   - Create `.env.local` file in `/app` with:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:3001
     ```
3. Install dependencies and start both services:
   ```bash
   # Terminal 1 - API
   cd api
   npm install
   npm run dev

   # Terminal 2 - Frontend
   cd app
   npm install
   npm run dev
   ```

## Project Structure
```
.
├── api/                # Backend API
│   ├── src/           # Source code
│   ├── package.json   # API dependencies
│   └── tsconfig.json  # TypeScript configuration
│
└── app/               # Frontend Next.js application
    ├── src/           # Source code
    ├── public/        # Static files
    ├── package.json   # Frontend dependencies
    └── tsconfig.json  # TypeScript configuration
```

## Fonctionnalités

- Création de CV professionnel avec l'aide de l'IA
- Génération de lettres de motivation personnalisées
- Interface utilisateur moderne et intuitive
- Formulaires interactifs et faciles à utiliser

## Prérequis

- Node.js 18.0.0 ou supérieur
- npm ou yarn

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