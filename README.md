# istex-api-faker

Programme permettant de créer un serveur Web simulant une API Istex avec quelques données.

## Installation

```
git clone https://github.com/istex/istex-api-faker.git
cd istex-api-faker/
npm install
```

## Usage

```
cd istex-api-faker/
npm start
```

Ensuite naviguez sur [http://127.0.0.1:35000/](http://127.0.0.1:35000/)

Voici ce que ça donne en image :

![istex-api-faker ouverte dans le navigateur](https://trello-attachments.s3.amazonaws.com/5482facf6fa9f710a64cb2bc/564x338/bf3c46f438cff28cefa11b082f632edc/upload_2015-02-18_at_10.55.28_am.png)

## Mettre à jour les données

Par défaut, des données sont fournies mais il est possible de les mettre à jour. La mise à jour peut être utile lorsque le format des données de l'API officielle change.

```
cd istex-api-faker/
./bin/istex-api-faker-generator.njs
```

Les données seront alors téléchargées dans le répertoire ``data/``

Vous devez être autorisé par l'[API Istex de production](https://api.istex.fr). Pour cela, créez un fichier ``config.local.js`` où vous placerez vos identifiants. Exemple :
```json
{
  "username": "chuck.norris@univers.fr",
  "password": "justme"
}
```
