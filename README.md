# Classements

## Description du Projet

**Classements** est un **générateur de classements** qui vous permet de comparer et de classer des éléments par thèmes. L'application propose plusieurs thèmes prédéfinis tels que :

*   **Chiens** : Classez une sélection aléatoire de 10 races de chiens.
*   **Chats** : Classez une sélection aléatoire de 10 races de chats.
*   **Jeux vidéo** : Classez une sélection aléatoire de 10 jeux parmi les 40 meilleurs jeux selon les critiques.
*   **Films** : Classez une sélection aléatoire de 10 films parmi les mieux notés selon les critiques.

De plus, l'application offre la possibilité de **créer vos propres batailles personnalisées.** Vous pouvez définir un nom pour votre bataille et ajouter jusqu'à 10 éléments avec leurs noms et URLs d'image. Ces batailles personnalisées sont ensuite sauvegardées et seront accessible par les autres utilisateurs.

Le processus de classement se fait par **comparaison de paires d'éléments.** Vous choisissez l'élément que vous préférez dans chaque paire, et l'application met à jour votre classement en conséquence.

L'application utilise :

*   **Next.js** : Pour le rendu côté serveur niveau frontend et la création de routes API côté backend.
*   **Tailwind CSS** : Pour le style visuel de l'application.
*   **Prisma** : Comme ORM pour interagir avec la base de données, utilisée notamment pour la gestion des batailles personnalisées.
*   **Ant Design** : Une bibliothèque de composants UI pour React.
*   Des **APIs externes** : Pour récupérer les données des chiens, des chats, des jeux vidéo et des films. Les URLs de ces APIs sont configurées via des variables d'environnement dans le fichier `.env`.
*   **Docker Compose** : Pour faciliter la mise en place d'une base de données PostgreSQL pour le développement.
*   **`localStorage`** : Pour stocker l'historique de vos classements récents (la dernière heure) localement dans votre navigateur.

## Procédure d'Installation

Suivez ces étapes pour installer et exécuter l'application en local :

1.  **Cloner le dépôt :**
    ```bash
    git clone <URL_DU_DEPOT>
    cd classements
    ```

2.  **Installer les dépendances :**
    Éxécutez la commande correspondante pour installer les dépendances :

    ```bash
    npm install
    ```

3.  **Configurer la base de données avec Docker Compose :**
    Si vous souhaitez utiliser les fonctionnalités de batailles personnalisées, vous pouvez démarrer une instance PostgreSQL locale à l'aide de Docker Compose. Assurez-vous d'avoir Docker installé sur votre machine.

    ```bash
    docker-compose up -d
    ```
    Cela démarrera un conteneur PostgreSQL nommé `battle-db` avec les identifiants définis dans le fichier `docker-compose.yml`.

4.  **Configurer les variables d'environnement :**
    Certaines fonctionnalités de l'application dépendent de variables d'environnement, notamment les clés d'API pour les données des chiens, chats, jeux et films. Vous devrez créer un fichier `.env.local` à la racine du projet et y définir ces variables. Contactez le propriétaire du dépôt pour obtenir les clés d'API nécessaires.

    ```
    NEXT_PUBLIC_DOG_API=
    NEXT_PUBLIC_DOG_BREED_API=
    NEXT_PUBLIC_CAT_API=
    NEXT_PUBLIC_CAT_BREED_API=
    NEXT_PUBLIC_GAME_API=
    NEXT_PUBLIC_GAME_API_KEY=
    NEXT_PUBLIC_MOVIE_API=
    NEXT_PUBLIC_MOVIE_API_KEY=
    DATABASE_URL=
    ```

5.  **Démarrer le serveur de développement :**
    Cette commande lancera le serveur de développement Next.js.

    ```bash
    npm run dev
    ```

6.  **Ouvrir l'application dans votre navigateur :**
    Rendez-vous sur [http://localhost:3000](http://localhost:3000) avec votre navigateur web. Vous devriez voir l'interface de l'application **Classements**.