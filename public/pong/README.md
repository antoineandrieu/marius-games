# Pong

Jeu Pong jouable dans le navigateur (solo vs ordinateur ou deux joueurs).

## Lancer le jeu

Ouvrez [index.html](index.html) dans votre navigateur.

Ou lancez un serveur local depuis ce dossier :

```bash
python -m http.server 8000
# Puis http://localhost:8000

# Ou
npx serve
```

## Contrôles

- **Menu** : **1** = Solo (vs ordinateur), **2** = Deux joueurs
- **Joueur 1 (raquette gauche)** : **Z** monter, **S** descendre
- **Joueur 2 (raquette droite)** : **Flèche Haut** / **Flèche Bas**
- **Fin de partie** : **Espace** pour rejouer, **Échap** pour le menu

## Règles

- La balle rebondit sur les murs et les raquettes.
- Un point quand la balle sort à gauche (point droite) ou à droite (point gauche).
- Premier à 10 points gagne.
