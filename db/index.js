import Sequelize from "sequelize"

/**
 * Définition de l'instance de base de donnée
 * type: sqlite
 * stocké dans le fichier db.sqlite
 */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite"
})

/**
 * Définitiion de la table ville
 */
const Ville = sequelize.define("Ville", {
  nom: Sequelize.STRING,
  pays: Sequelize.STRING
})

/**
 * Définition de la table séjour
 */
const Sejour = sequelize.define("Sejour", {
  nom: Sequelize.STRING
})

/**
 * Définition des relations
 */
Ville.hasMany(Sejour)
Sejour.belongsTo(Ville, {
  onDelete: "cascade"
})

/**
 * Synchronisation de la base
 * => Si la base n'existe pas, le fichier est créer,
 * vérification que toutes les tables existent
 */
sequelize.sync()

/**
 * Export de l'instance sequelize en tant que module par défaut,
 * export des différents models
 */
export { sequelize as default, Ville, Sejour }
