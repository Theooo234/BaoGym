import { StyleSheet, Text, View } from "react-native";

export default function ActivityChart() {
  // 1. LES DONNÉES DU GRAPHIQUE
  // 'value' = nombre de séances, 'days' = nombre de jours dans ce mois
  const data = [
    { id: 1, label: "J", value: 12, days: 31 },
    { id: 2, label: "F", value: 7, days: 28 }, // (ou 29 si bissextile)
    { id: 3, label: "M", value: 14, days: 31 },
    { id: 4, label: "A", value: 10, days: 30 },
    { id: 5, label: "M", value: 6, days: 31 },
    { id: 6, label: "J", value: 18, isCurrent: true, days: 30 },
    { id: 7, label: "J", value: 0, days: 31 },
    { id: 8, label: "A", value: 0, days: 31 },
    { id: 9, label: "S", value: 0, days: 30 },
    { id: 10, label: "O", value: 0, days: 31 },
    { id: 11, label: "N", value: 0, days: 30 },
    { id: 12, label: "D", value: 0, days: 31 },
  ];

  // 2. LA LOGIQUE MATHÉMATIQUE
  // On n'a plus besoin du 'maxValue', on calcule juste le total
  const totalSessions = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <View style={styles.card}>
      {/* En-tête du graphique */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Évolution annuelle</Text>
          <Text style={styles.subtitle}>Taux de présence mensuel</Text>
        </View>
        <View style={styles.totalBadge}>
          <Text style={styles.totalNumber}>{totalSessions}</Text>
        </View>
      </View>

      {/* Le Graphique en lui-même */}
      <View style={styles.chartContainer}>
        {data.map((item) => {
          // NOUVEAU CALCUL : (Séances / Jours dans le mois) * 100
          // On utilise Math.min pour bloquer la barre à 100% si le gars y va 2x par jour !
          const heightPercent = Math.min((item.value / item.days) * 100, 100);

          return (
            <View key={item.id} style={styles.barWrapper}>
              {/* Conteneur de la barre (Fond gris clair) */}
              <View style={styles.barBackground}>
                {/* La barre colorée qui se remplit de bas en haut */}
                <View
                  style={[
                    styles.barFill,
                    { height: `${heightPercent}%` }, // La hauteur calculée dynamiquement !
                    item.isCurrent ? styles.barActive : styles.barInactive,
                  ]}
                />
              </View>

              {/* Lettre du mois en dessous de la barre */}
              <Text
                style={[styles.label, item.isCurrent && styles.labelActive]}
              >
                {item.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f2e7e7",
    borderStyle: "solid",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    // fontFamily: 'Montserrat', // Si tu as importé la police
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 2,
  },
  totalBadge: {
    backgroundColor: "#ECFCCB", // Vert très clair
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  totalNumber: {
    color: "#65A30D", // Vert BaoGym
    fontWeight: "900",
    fontSize: 14,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", // Aligne les barres par le bas
    height: 140, // Hauteur totale de la zone du graphique
  },
  barWrapper: {
    alignItems: "center",
    width: 20, // Largeur de chaque colonne (Barre + Texte)
  },
  barBackground: {
    width: 8, // Largeur de la barre
    height: 100, // Hauteur maximum de la barre (en pixels)
    backgroundColor: "#F8FAFC", // Fond gris très clair quand la barre est vide
    borderRadius: 4,
    justifyContent: "flex-end", // Fait en sorte que la couleur "monte" depuis le bas
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    borderRadius: 4,
    // L'animation de hauteur serait un plus, mais pour l'instant on gère la taille statique
  },
  barInactive: {
    backgroundColor: "#CBD5E1", // Gris pour les mois passés
  },
  barActive: {
    backgroundColor: "#65A30D", // Vert BaoGym pour le mois actuel
  },
  label: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: "bold",
    color: "#94A3B8",
  },
  labelActive: {
    color: "#0F172A", // Plus foncé pour le mois en cours
  },
});
