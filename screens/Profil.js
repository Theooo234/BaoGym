import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ActivityChart from "../components/GraphiqueMois";
import Screen from "../components/Screen";
import colors from "../config/color";
export default function Profil(props) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);

  // Dates à entourer en rouge
  const markedDates = [
    new Date(2026, 4, 18), // 18 mai 2026
    new Date(2026, 4, 19), // 19 mai 2026
    new Date(2026, 4, 20), // 20 mai 2026
    new Date(2026, 4, 22), // 22 mai 2026
    new Date(2026, 4, 22), // 23 mai 2026
    new Date(2026, 4, 25), // 25 mai 2026
    new Date(2026, 4, 26), // 26 mai 2026
    new Date(2026, 4, 27), // 27 mai 2026
    new Date(2026, 4, 29), // 29 mai 2026
    new Date(2026, 4, 30), // 30 mai 2026
    new Date(2026, 5, 1), // 1er juin 2026
    new Date(2026, 5, 2), // 2 juin 2026
    new Date(2026, 5, 3), // 3 juin 2026
    new Date(2026, 5, 5), // 5 juin 2026
    new Date(2026, 5, 6), // 6 juin 2026
    new Date(2026, 5, 8), // 8 juin 2026
    new Date(2026, 5, 9), // 9 juin 2026
  ];

  // Convertir les dates marquées en calendarActiveDateRanges
  const calendarActiveDateRanges = markedDates.map((date) => ({
    startId: toDateId(date),
    endId: toDateId(date),
  }));

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newDate = new Date(prevMonth);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newDate = new Date(prevMonth);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const monthYear = currentMonth.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Screen>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 280 }}
        >
          <View style={styles.margeHorizontale}>
            <View style={styles.hautPage}>
              <View style={styles.profilTitleContainer}>
                <Text style={styles.profilTitle}>Profil</Text>
              </View>
              <View style={styles.settingsButtonContainer}>
                <Feather name="edit-2" style={styles.settingsButton} />
                <Feather name="settings" style={styles.settingsButton} />
              </View>
            </View>
            <View style={styles.profilContainer}>
              <View style={styles.profilalign}>
                <Image
                  style={styles.pp}
                  source={require("../assets/images/OeufRemplidAura.jpg")}
                />
                <View style={styles.pastilleWhite}>
                  <View style={styles.pastille}>
                    <FontAwesome6 name="crown" size={16} color="white" />
                  </View>
                  {/* <Text style={styles.pastilleText}>BaoBoss</Text> */}
                </View>
              </View>

              <Text style={styles.name}>Cypoux.lst</Text>

              <View style={styles.infoContainer}>
                {/* <Text style={styles.infoText}>Membre depuis 1an</Text>
            <Text style={styles.infoText}>18ans</Text>
            <Text style={styles.infoText}>Arras</Text>
            <Text style={styles.infoText}>Célibataire</Text> */}
              </View>
            </View>

            <View style={styles.statAbo}>
              <View style={styles.statColumn}>
                <Text style={styles.statLabel}>Abonnés</Text>
                <Text style={styles.statNumber}>1</Text>
              </View>
              <View style={styles.statColumn}>
                <Text style={styles.statLabel}>Abonnements</Text>
                <Text style={styles.statNumber}>0</Text>
              </View>
            </View>

            <View style={styles.cards}>
              <View style={styles.performances}>
                <View style={styles.seanceMonthly}>
                  <FontAwesome name="calendar-o" size={24} color="#65A30D" />

                  <Text style={styles.seanceMonthlyValue}>32</Text>
                  <Text style={styles.seanceMonthlyText}>
                    Séances{"\n"}ce mois-ci
                  </Text>
                </View>
                <View style={styles.maxWeight}>
                  <FontAwesome6 name="dumbbell" size={24} color="#65A30D" />

                  <Text style={styles.maxWeightValue}>12.5t</Text>
                  <Text style={styles.maxWeightText}>
                    Poids total{"\n"}soulevé
                  </Text>
                </View>
              </View>

              <View style={styles.streakCard}>
                <View style={styles.streakTextContainer}>
                  <Text style={styles.streakText}>
                    Tu as déjà atteint ton objectif de séances hebdomadaires
                    cette semaine !
                  </Text>
                </View>
                <View style={styles.streakIconContainer}>
                  <FontAwesome5 name="seedling" style={styles.streakIcon} />
                </View>
              </View>
            </View>

            {/* Calendrier */}

            <View style={styles.cardCalendar}>
              <View style={styles.navigationHeader}>
                <TouchableOpacity onPress={goToPreviousMonth}>
                  <Entypo name="chevron-left" style={styles.navButton} />
                </TouchableOpacity>

                <Text style={styles.monthYearText}>{monthYear}</Text>

                <TouchableOpacity onPress={goToNextMonth}>
                  <Entypo name="chevron-right" style={styles.navButton} />
                </TouchableOpacity>
              </View>

              <Calendar
                calendarMonthId={toDateId(currentMonth)}
                calendarActiveDateRanges={calendarActiveDateRanges}
                calendarFormatLocale="fr-FR"
                calendarFirstDayOfWeek="monday"
                calendarDayHeight={40}
                onCalendarDayPress={(dateId) => {
                  console.log("Date pressed:", dateId);
                  setSelectedDate(dateId);
                }}
                calendarColorScheme="light"
                calendarMonthHeaderHeight={0}
                // calendarRowHorizontalSpacing={20}
                // calendarRowVerticalSpacing={20}
                theme={{
                  rowMonth: {
                    container: {
                      height: 0,
                      display: "none",
                    },
                  },
                  rowWeek: {
                    container: {
                      borderBottomWidth: 1,
                      borderBottomColor: "#e0e0e0",
                      paddingBottom: 4,
                    },
                  },
                  itemWeekName: { content: { color: "#666" } },
                  itemDayContainer: {
                    activeDayFiller: {
                      backgroundColor: "transparent",
                    },
                    base: () => ({
                      justifyContent: "center",
                      alignItems: "center",
                    }),
                  },
                  itemDay: {
                    base: () => ({
                      container: {
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        width: 40,
                        height: 40,
                        alignSelf: "center",
                      },
                      content: {
                        fontSize: 18,
                      },
                    }),
                    idle: ({ isPressed, isWeekend }) => ({
                      container: {
                        backgroundColor: isPressed ? "#e8e8e8" : "transparent",
                        width: 40,
                        height: 40,
                      },
                    }),
                    today: ({ isPressed }) => ({
                      container: {
                        backgroundColor: isPressed
                          ? "#8ACE14"
                          : colors.baogreen,
                        borderColor: colors.baogreen,
                        borderWidth: 2,
                      },
                      content: {
                        color: "white",
                        fontWeight: "bold",
                      },
                    }),
                    active: ({ isEndOfRange, isStartOfRange, isPressed }) => ({
                      container: {
                        backgroundColor: isPressed ? "#c8e6c9" : "transparent",
                        borderWidth: 2,
                        borderColor: colors.baogreen,
                      },
                      content: {
                        color: colors.baogreen,
                        fontWeight: "bold",
                      },
                    }),
                  },
                }}
              />

              {/* {selectedDate && (
              <View style={styles.selectedDateContainer}>
                <Text style={styles.selectedDateText}>
                  Date sélectionnée: {selectedDate}
                </Text>
              </View>
            )} */}
            </View>

            {/* Plus calendrier  */}

            <ActivityChart />

            <View style={styles.abonnementCard}>
              <View style={styles.abonnementTextContainer}>
                <Text style={styles.abonnementTitle}>PLAN ACTUEL</Text>
                <Text style={styles.abonnementType}>BaoBoss</Text>
              </View>
              <View style={styles.abonnementButtonContainer}>
                <TouchableOpacity>
                  <View style={styles.abonnementButton}>
                    <Text style={styles.abonnementButtonText}>Gérer</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.cardBottom}>
              <Feather
                name="settings"
                style={[
                  styles.settingsButton,
                  { backgroundColor: "#ECFCCB", padding: 6, borderRadius: 6 },
                ]}
              />
              <Text style={styles.settingsButtonText}>
                Paramètres du compte
              </Text>
              <Entypo
                style={styles.chevronRight}
                name="chevron-right"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardBottom}>
              <AntDesign
                name="lock"
                style={[
                  styles.settingsButton,
                  { backgroundColor: "#ECFCCB", padding: 6, borderRadius: 6 },
                ]}
              />
              <Text style={styles.settingsButtonText}>Confidentialité</Text>
              <Entypo
                style={styles.chevronRight}
                name="chevron-right"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardBottom}>
              <AntDesign
                name="usergroup-add"
                style={[
                  styles.settingsButton,
                  { backgroundColor: "#ECFCCB", padding: 6, borderRadius: 6 },
                ]}
              />
              <Text style={styles.settingsButtonText}>Inviter des amis</Text>
              <Entypo
                style={styles.chevronRight}
                name="chevron-right"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deconnexionContainer}>
              <FontAwesome6
                style={[styles.deconnexionButton]}
                name="arrow-right-from-bracket"
                size={24}
                color="red"
              />
              <Text style={styles.deconnecterText}>Déconnecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f9fcf8",
  },
  margeHorizontale: {
    marginHorizontal: 20,
  },
  hautPage: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profilTitleContainer: {
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  profilTitle: {
    fontFamily: "Montserrat",
    fontSize: 30,
    fontWeight: "900",
    color: colors.slate,
    // backgroundColor: "green",
  },
  settingsButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    position: "absolute",
    right: 20,
    top: 6,
  },
  settingsButton: {
    fontSize: 24,
    // color: "#94A4B8",
    color: colors.baogreen,
  },
  profilContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fcf8",
    marginTop: 25,
  },
  infoContainer: {
    // backgroundColor: colors.baogreen,
    // padding: 20,
    justifyContent: "center",
    paddingRight: 20,
    width: "67%",
  },
  infoText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    color: "#0F172A",
  },
  profilalign: {
    backgroundColor: "#f9fcf8",
    width: 110,
    height: 110,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.baogreen,
    borderWidth: 4,
  },
  pp: {
    width: 95,
    height: 95,
    borderRadius: 90,
  },
  pastilleWhite: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    bottom: -12,
    left: 58,
    backgroundColor: "#f9fcf8",
    borderRadius: 50,
  },
  pastille: {
    width: 30,
    height: 30,
    padding: 6,
    backgroundColor: colors.baogreen,
    borderRadius: 50,
  },
  pastilleText: {
    color: "#f9fcf8",
  },
  name: {
    fontFamily: "Montserrat",
    fontSize: 25,
    fontWeight: "700",
    color: colors.slate,
    marginTop: 10,
  },
  statAbo: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingVertical: 30,
    // backgroundColor: "green",
  },
  statColumn: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "900",
    color: "#64748b",
  },
  cards: {
    backgroundColor: "#f9fcf8",
  },
  performances: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  seanceMonthly: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f2e7e7",
    borderStyle: "solid",
    marginRight: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  seanceMonthlyValue: {
    paddingTop: 5,
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
  },
  seanceMonthlyText: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
    color: "#0F172A",
    textAlign: "center",
  },
  maxWeight: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f2e7e7",
    borderStyle: "solid",
    marginLeft: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  maxWeightValue: {
    paddingTop: 5,
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
  },
  maxWeightText: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
    color: "#0F172A",
    textAlign: "center",
  },

  streakCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f2e7e7",
    borderStyle: "solid",
    shadowColor: "#000",
    marginTop: 11,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  streakTextContainer: {
    // backgroundColor: "blue",
    width: "80%",
  },
  streakText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    color: "#0F172A",
    alignSelf: "left",
  },
  streakIconContainer: {
    // backgroundColor: "green",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  streakIcon: {
    fontSize: 24,
    color: colors.baogreen,
    borderColor: colors.baogreen,
    borderWidth: 2,
    borderRadius: 90,
    padding: 10,
  },
  cardCalendar: {
    marginTop: 30,
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f2e7e7",
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  navigationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  navButton: {
    fontSize: 35,
    color: colors.baogreen,
  },
  monthYearText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
  },
  abonnementCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.baogreen,
    padding: 16,
    borderRadius: 24,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 80,
  },
  abonnementTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // backgroundColor: "blue",
    width: "100%",
    height: "100%",
  },
  abonnementTitle: {
    color: "#2B4903",
    fontFamily: "Montserrat",
    fontSize: 13,
    fontWeight: "300",
    paddingBottom: 2,
  },
  abonnementType: {
    color: "#2B4903",
    fontFamily: "Montserrat",
    fontSize: 23,
    fontWeight: "500",
  },
  abonnementButtonContainer: {
    // backgroundColor: "red",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  abonnementButton: {
    backgroundColor: "#2B4903",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    width: "50%",
    marginLeft: "auto",
    alignItems: "center",
  },
  abonnementButtonText: {
    color: colors.baogreen,
    fontSize: 18,
    fontWeight: "600",
  },
  cardBottom: {
    flexDirection: "row",

    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f2e7e7",
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: colors.white,
    marginTop: 20,
  },
  settingsButtonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 20,
    alignSelf: "center",
  },
  chevronRight: {
    alignSelf: "center",
    marginLeft: "auto",
  },
  deconnecterText: {
    color: "red",
    fontSize: 16,
    fontWeight: "700",
  },
  deconnexionContainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  deconnexionButton: {
    fontSize: 24,
    marginRight: 5,
  },
});
