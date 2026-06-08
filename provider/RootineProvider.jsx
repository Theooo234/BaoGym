import { useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";

const RootineContext = createContext({
  rootine: {},
  addRootine: () => { },
  setRootine: () => { },
  rootines: [],
  exercices: [],
  addExerciceToRootine: () => { },
});



export function RootineProvider({ children }) {

  const router = useRouter();
  const [rootines, setRootines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rootine, setRootine] = useState({
    nom: "", duree: "", jour: ""
  });
  const [exercices, setExercices] = useState([]);


  const addExerciceToRootine = (exerciceDeBase) => {
    console.log("====>", exerciceDeBase)
    //setExercices([...exercices, { nom: exerciceDeBase.nom, image: exerciceDeBase.image, description: exerciceDeBase.description }]);
  };



  const addRootine = async () => {
    try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        // Insert rootine
        console.log('Données de la routine à insérer', rootine);

        const { data: insertedRootine, error: routinesError } = await supabase
          .from('routines')
          .insert([
            {
              nom: rootine?.nom?.trim(),
              duree_estimee: parseInt(rootine?.duree?.trim())  || 0,
              jour_prevu: rootine?.jour?.trim(),
              user_id: user?.id,
            },
          ])
          .select()
          .single();

          console.log('Résultat de l\'insertion de la routine', insertedRootine, routinesError);

          if (routinesError) {
            console.log('Erreur lors de l\'insertion de la routine', routinesError.message);
          }

          // Insert exercices
          addExercices(insertedRootine.id);

      Alert.alert('Succès', 'Rootine créée avec succès');
      router.back();
      } catch (error) {
        console.log('Erreur', error.message);
      } finally {
        //setLoading(false);
      }
  }

    useEffect(() => {
      const fetchData = async () => {
        await getRootines();
      };
      fetchData();
    }, []);

    const getRootines = async () => {
    try {
      const { data, error } = await supabase
        .from('routines')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRootines(data || []);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les routines');
    } }


const addExercices = async (rootineId) => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // Insert exercises

      const exercicesToInsert = exercices.map(ex => ({
        nom: ex.nom.trim(),
        image: ex.image.trim() || null,
        description: ex.description.trim() || null,
        rootine_id: rootineId,
        user_id: user.id,
      }));

      const { data: insertedExercices, error: exercicesError } = await supabase
        .from('exercices')
        .insert(exercicesToInsert)
        .select()
        .single();

      if (exercicesError) throw exercicesError;

    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }}


    return (
      <RootineContext.Provider
        value={{
          rootine,
          addRootine,
          setRootine,
          rootines,
          exercices,
          addExerciceToRootine,
        }}
      >
        {children}
      </RootineContext.Provider>
    );
  }

  export default RootineContext;