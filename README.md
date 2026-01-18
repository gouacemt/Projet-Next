# SaaS Mini App

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

Application SaaS de gestion de projets et de tâches avec système d'authentification et d'abonnement via Stripe.

🔗 **Déploiement en ligne** : [https://projet-next-git-main-saas-miniapps-projects-8b01ee47.vercel.app](https://projet-next-git-main-saas-miniapps-projects-8b01ee47.vercel.app)

---

## 📋 Table des matières

- [Aperçu du projet](#aperçu-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Installation et lancement](#installation-et-lancement)
- [Documentation de l'API](#documentation-de-lapi)
- [Structure du projet](#structure-du-projet)
- [Répartition du travail](#répartition-du-travail)
- [Variables d'environnement](#variables-denvironnement)
- [Déploiement](#déploiement)

---

## 🎯 Aperçu du projet

**SaaS Mini App** est une plateforme moderne de gestion de projets permettant aux utilisateurs de :
- Créer et gérer des projets avec un système de tâches
- S'authentifier de manière sécurisée via NextAuth
- Souscrire à un abonnement premium via Stripe
- Suivre l'avancement de leurs projets avec des statistiques en temps réel

Le projet met l'accent sur une architecture production-ready avec une séparation claire entre frontend et backend.

---

## ✨ Fonctionnalités

### Authentification
- ✅ Inscription et connexion par email/mot de passe
- ✅ Système de session sécurisé avec NextAuth
- ✅ Protection des routes nécessitant une authentification

### Dashboard
- ✅ Vue d'ensemble des projets (total, en cours, complétés)
- ✅ Statistiques d'activité récente
- ✅ Interface responsive (mobile & desktop)
- ✅ Gestion des tâches par projet

### Système d'abonnement Stripe
- ✅ Plan gratuit (Free) avec fonctionnalités limitées
- ✅ Plan premium (Pro) à 9€/mois avec projets illimités
- ✅ Paiement sécurisé via Stripe Checkout (mode sandbox)
- ✅ Génération automatique de factures
- ✅ Annulation et remboursement d'abonnement
- ✅ Webhooks Stripe pour synchronisation en temps réel

### Gestion de projets
- ✅ Création/modification/suppression de projets
- ✅ Suivi de la progression (pourcentage de complétion)
- ✅ Gestion des tâches par projet
- ✅ Historique d'activité

---

## 🛠️ Stack technique

### Frontend
- **Next.js 16.1.1** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling moderne et responsive
- **shadcn/ui** - Composants UI accessibles et customisables
- **Lucide React** - Icônes

### Backend
- **Next.js API Routes** - Backend serverless
- **Prisma** - ORM pour la gestion de la base de données
- **PostgreSQL (Neon)** - Base de données cloud
- **NextAuth** - Système d'authentification
- **Stripe API** - Paiements et abonnements

### Déploiement
- **Vercel** - Hébergement et CI/CD automatique
- **GitHub** - Gestion de version

---

## 🚀 Installation et lancement

### Prérequis
- Node.js 18+ et npm/yarn/pnpm
- Un compte GitHub
- Un compte Vercel (pour le déploiement)
- Un compte Stripe (mode test)
- Une base de données PostgreSQL (Neon recommandé)

### Installation locale

1. **Cloner le repository**
```bash
git clone https://github.com/gouacemt/Projet-Next.git
cd Projet-Next
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet :

```env
# Base de données
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre_secret_aleatoire_32_caracteres"

# Stripe
STRIPE_SECRET_KEY="sk_test_votre_cle_secrete_stripe"
STRIPE_WEBHOOK_SECRET="whsec_votre_webhook_secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Initialiser la base de données**
```bash
npx prisma generate
npx prisma db push
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Configuration du webhook Stripe (optionnel en local)

Pour tester les webhooks en local :

```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe  # Mac
# ou télécharger depuis https://stripe.com/docs/stripe-cli

# Se connecter
stripe login

# Écouter les webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## 📚 Documentation de l'API

### Routes d'authentification

#### `POST /api/auth/register`
Inscription d'un nouvel utilisateur.

**Body :**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Réponse (201) :**
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès"
}
```

#### `POST /api/auth/[...nextauth]`
Routes NextAuth pour connexion/déconnexion (gérées automatiquement).

---

### Routes Stripe

#### `POST /api/stripe/checkout`
Créer une session de paiement Stripe.

**Headers :**
- Nécessite une session authentifiée

**Body :**
```json
{
  "priceId": "price_1234567890"
}
```

**Réponse (200) :**
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

#### `POST /api/stripe/webhook`
Webhook Stripe pour gérer les événements de paiement.

**Events gérés :**
- `customer.subscription.created` - Nouvel abonnement
- `customer.subscription.updated` - Mise à jour d'abonnement
- `customer.subscription.deleted` - Annulation d'abonnement
- `invoice.paid` - Facture payée

**Réponse (200) :**
```json
{
  "received": true
}
```

---

### Routes de compte utilisateur

#### `GET /api/account`
Récupérer les informations du compte utilisateur.

**Headers :**
- Nécessite une session authentifiée

**Réponse (200) :**
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "subscription": {
    "status": "active",
    "plan": "pro",
    "currentPeriodEnd": "2026-02-18T00:00:00.000Z"
  }
}
```

---

## 📁 Structure du projet

```
Projet-Next/
├── prisma/
│   └── schema.prisma          # Schéma de base de données
├── public/                    # Assets statiques
├── src/
│   ├── app/                   # App Router Next.js
│   │   ├── api/              # Routes API
│   │   │   ├── auth/         # Authentification
│   │   │   ├── stripe/       # Paiements Stripe
│   │   │   └── account/      # Gestion du compte
│   │   ├── dashboard/        # Page dashboard
│   │   ├── login/            # Page de connexion
│   │   ├── pricing/          # Page de pricing
│   │   ├── register/         # Page d'inscription
│   │   ├── layout.tsx        # Layout principal
│   │   └── page.tsx          # Page d'accueil
│   ├── components/           # Composants React
│   │   └── ui/               # Composants shadcn/ui
│   ├── lib/                  # Utilitaires
│   │   ├── auth.ts           # Configuration NextAuth
│   │   ├── prisma.ts         # Client Prisma
│   │   └── stripe.ts         # Client Stripe
│   └── types/                # Types TypeScript
├── .env                      # Variables d'environnement
├── .gitignore
├── next.config.js            # Configuration Next.js
├── package.json
├── tailwind.config.ts        # Configuration Tailwind
├── tsconfig.json             # Configuration TypeScript
└── README.md
```

---

## 👥 Répartition du travail

### Membre 1 - [Votre nom]
- ✅ Architecture du projet et configuration initiale
- ✅ Mise en place de Next.js, Prisma, et Neon
- ✅ Développement du système d'authentification (NextAuth)
- ✅ Intégration de Stripe (checkout, webhooks, factures)
- ✅ Développement du frontend (dashboard, pricing, composants UI)
- ✅ Déploiement sur Vercel et configuration des webhooks
- ✅ Documentation (README, API)
- ✅ Tests et debugging

### Répartition globale
- **Frontend** : 30%
- **Backend & API** : 35%
- **Stripe & Paiements** : 25%
- **Déploiement & Documentation** : 10%

---

## 🔐 Variables d'environnement

Le projet nécessite les variables suivantes (à ajouter dans Vercel) :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL de connexion PostgreSQL | `postgresql://user:pass@host/db` |
| `NEXTAUTH_URL` | URL de l'application | `https://votre-app.vercel.app` |
| `NEXTAUTH_SECRET` | Secret pour NextAuth (32 caractères) | Généré aléatoirement |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (mode test) | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Secret du webhook Stripe | `whsec_...` |
| `NEXT_PUBLIC_APP_URL` | URL publique de l'app | `https://votre-app.vercel.app` |

---

## 🚀 Déploiement

### Déploiement sur Vercel

1. **Pusher le code sur GitHub**
```bash
git add .
git commit -m "feat: projet complet avec Stripe"
git push origin main
```

2. **Importer le projet sur Vercel**
- Aller sur [vercel.com](https://vercel.com)
- Cliquer sur "New Project"
- Importer votre repository GitHub
- Configurer les variables d'environnement

3. **Configurer le webhook Stripe**
- Aller sur le [Dashboard Stripe](https://dashboard.stripe.com/test/webhooks)
- Créer un endpoint : `https://votre-app.vercel.app/api/stripe/webhook`
- Sélectionner les événements :
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.paid`
- Copier le "Signing secret" dans `STRIPE_WEBHOOK_SECRET`

4. **Redéployer**
- Retourner sur Vercel
- Redéployer le projet pour prendre en compte les nouvelles variables

---

## 🧪 Tests

### Tester le paiement Stripe

Utilisez les cartes de test Stripe :

| Carte | Résultat |
|-------|----------|
| `4242 4242 4242 4242` | Paiement réussi |
| `4000 0000 0000 0002` | Paiement refusé |
| `4000 0000 0000 9995` | Fonds insuffisants |

- **Date d'expiration** : N'importe quelle date future
- **CVC** : N'importe quel code à 3 chiffres

---

## 📝 Notes importantes

- **Mode test Stripe** : Le projet utilise les clés de test Stripe (`sk_test_...`). Aucun vrai paiement n'est effectué.
- **Base de données** : Utilise Neon (PostgreSQL serverless) pour une scalabilité optimale.
- **Sécurité** : Les secrets sont stockés dans des variables d'environnement et jamais committés.
- **Production-ready** : Code organisé, typé, et prêt pour la production.

---

