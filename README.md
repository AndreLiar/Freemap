# Freemap - Guide d'installation et d'exécution

Freemap est une application complète avec un **backend** en Node.js/Express et un **frontend** en React.js. Ce guide fournit des instructions détaillées pour configurer et exécuter le projet en local.

---

## 📌 Prérequis
Avant de commencer, assure-toi d'avoir les outils suivants installés sur ton système :

- [Node.js](https://nodejs.org/) (version 16+ recommandée)
- [MongoDB](https://www.mongodb.com/) (ou un compte MongoDB Atlas)
- [Git](https://git-scm.com/)
- [Cloudinary](https://cloudinary.com/) (pour la gestion des fichiers médias)

---

## 🚀 Installation du projet

### 1️⃣ Cloner le dépôt

Ouvre un terminal et exécute la commande suivante :

```bash
  git clone https://github.com/AndreLiar/Freemap.git
  cd Freemap
```

---

## ⚙️ Configuration des variables d'environnement

### 2️⃣ Créer un fichier `.env`
Dans le dossier `backend/`, crée un fichier `.env` et ajoute les informations suivantes :

```
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@freemap.htx8b.mongodb.net/
CLOUDINARY_CLOUD_NAME=dtos46rtr
CLOUDINARY_API_KEY=553892217738515
CLOUDINARY_API_SECRET=iSPv7Eb2f8DC_UZ5-poBrxdESm0
```

**Remarque** :
- Remplace `<USERNAME>` et `<PASSWORD>` par les informations correctes.
- Ne partage jamais ce fichier `.env` publiquement !

### 3️⃣ Ajouter un fichier JSON de configuration
Dans `backend/config/`, ajoute le fichier JSON requis (assure-toi qu'il est bien ajouté).

---

## 🔧 Installation des dépendances

### 4️⃣ Installer les dépendances du **backend**

```bash
cd backend
npm install
```

### 5️⃣ Installer les dépendances du **frontend**

```bash
cd ../frontend-freemap
npm install
```

---

## ▶️ Exécution du projet

### 6️⃣ Lancer le **backend**

```bash
cd backend
npm start
```

Le backend devrait s'exécuter sur `http://localhost:5001` (ou un autre port si configuré).

### 7️⃣ Lancer le **frontend**

```bash
cd ../frontend-freemap
npm start
```

Le frontend devrait s'ouvrir automatiquement sur `http://localhost:3000`.

---
