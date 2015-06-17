#Moleskine

## Présentation fonctionnelle
Moleskine est une Webapplication complète qui permet d'archiver mon expérience culturelle. Par cette application je mémorise les différents films et concerts que je peux voir ainsi que tous les livres que je lis. Pour chaque item, une note permet de conserver mon niveau d'appréciation.

## Documentation technique
### Base de donnée
Le stockage des informations est réalisé dans une base de données mongoDb. 3 environnements définis dans server.js sont accessibles :

| Environnement  | Base     |
| :------------- | :------------- |
| Production     | mongodb://moleskine:xxx@ds031631.mongolab.com:31631/moleskine|
| Préproduction  | mongodb://moleskine:xxx@ds029541.mongolab.com:29541/moleskine_test|
| Local          | mongodb://localhost/todoApp|

### Comment ajouter une nouvelle page ?
* Ajouter le lien sur la nouvelle page dans public/js/appRoutes.js
* Créer la vue html dans public/views (exemple : mapage.html)
* Créer le 'controller' dans public/js/controllers (exemple : mapage.js)
* Modifier le fichier public/views/index.html :
  * Ajouter les références au controller
  ```<script src="js/controllers/mapage.js"></script>```
  * Ajouter le lien sur la page mapage.html
  ```<li><a href="/mapage">Ma Page</a></li>```
* Ajouter la référence au controller dans public/js/app.js
