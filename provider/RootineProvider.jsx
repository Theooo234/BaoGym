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
  deleteRootine: () => { },
  deleteExercice: () => { },
  fetchExercicesByRootine: () => { },
  fetchExercicesDeBase: () => { },
  exercicesDeBase: [],
  loading: false,
  serie: [],
  addSerie: () => { },
  setSerie: () => { },
});



export function RootineProvider({ children }) {

  const [rootines, setRootines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exercicesDeBase, setExercicesDeBase] = useState([]);
  const [serie , setSerie] = useState([{ poids : 0 , nbr_rep : 0 , nbr_serie : 0}]);

  const [rootine, setRootine] = useState({
    nom: "", duree: "", jour: ""
  });
  const [exercices, setExercices] = useState([]);


  const addExerciceToRootine = (exerciceDeBase) => {

    const exo = { 
      nom: exerciceDeBase.nom, 
      image: exerciceDeBase.image, 
      description: exerciceDeBase.description,
      poids : 10, 
      nbr_rep : 20, 
      nbr_serie : 30
    }

    setExercices([...exercices, exo]);
  };



  const addRootine = async () => {
    try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        // Insert rootine

        const { data: insertedRootine, error: routinesError } = await supabase
          .from('routines')
          .insert([
            {
              nom: rootine?.nom?.trim(),
              duree_estimee: rootine?.duree?.trim()  || 0,
              jour_prevu: rootine?.jour?.trim(),
              user_id: user?.id,
            },
          ])
          .select()
          .single();


          if (routinesError) {
            console.log('Erreur lors de l\'insertion de la routine', routinesError.message);
          }

          // Insert exercices
      await addExercices(insertedRootine.id);

      Alert.alert('Succès', 'Rootine créée avec succès');
      } catch (error) {
        console.log('Erreur', error.message);
      } finally {
        //setLoading(false);
      }
  }



    const getRootines = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('routines')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setRootines(data || []);
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de charger les routines');
      } finally {
        setLoading(false);
      }
  }

    useEffect(() => {
      const fetchData =  () => {
         getRootines();
         fetchExercicesDeBase();
      };
      fetchData();
    }, []);


const addExercices = async (rootineId) => {
    try {
      // Insert exercises

      const exercicesToInsert = exercices.map(ex => ({
        nom: ex.nom.trim(),
        image: ex.image.trim() || null,
        description: ex.description || null,

      }));

      const { data: insertedExercices, error: exercicesError } = await supabase
        .from('exercices')
        .insert(exercicesToInsert)
        .select()

      if (exercicesError) throw exercicesError;

      // creer la relation entre la routine et les exercices
      const relationsToInsert = insertedExercices.map((exercice) => ({
        routine_id: rootineId,
        exercice_id: exercice.id,
      }));

      // creer les séries pour chaque exercice
      addSerie()

      const { error: relationsError } = await supabase
        .from('routine_exercices')
        .insert(relationsToInsert)
        .select()

      if (relationsError) throw relationsError;

    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
      getRootines();
    }
  }

    const deleteRootine = async (id) => {
      try {
        const { error } = await supabase
          .from('routines')
          .delete()
          .eq('id', id);



        if (error) throw error;
        Alert.alert('Succès', 'Rootine supprimée avec succès');
        getRootines();
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de supprimer la routine');
      }
    }

      const deleteExercice = async (id) => {
      try {

        const { error: relationError } = await supabase
          .from('routine_exercices')
          .delete()
          .eq('exercice_id', id);

        const { error } = await supabase
          .from('exercices')
          .delete()
          .eq('id', id);



        if (relationError) throw relationError;

        if (error) throw error;
        Alert.alert('Succès', 'Exercice supprimé avec succès');
        getRootines();
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de supprimer l\'exercice');
      }
    }



  const fetchExercicesByRootine = async (id) => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("routine_exercices")
        .select(
          `
    id,
    ordre,
    exercices (
      id,
      nom,
      image,
      description
    )
  `,
        )

        .eq("routine_id", id);

      if (error) throw error;

      setExercices(data || []);
      console.log("Exercices pour la rootine", data);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les exercices.");
    } finally {
      setLoading(false);

    }
  };


 const fetchExercicesDeBase = async () => {
  setLoading(true);
    try {
      const { data, error } = await supabase
        .from("exercices_de_base")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setExercicesDeBase(data || []);

    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les exercices.");
    } finally {
      setLoading(false);
    }
  };

  const addSerie = async ()  => {
    setLoading(true);

    try {
  
      const SerieToInsert = exercices.map(ex => ({
        exercice_id: ex.id,
        poids: ex.poids.trim(),
        nbr_rep: ex.nbr_rep.trim() || null,
  
      }));
      const { data: insertedSerie, error: SerieError } = await supabase
        .from('series')
        .insert(SerieToInsert)
        .select()

    if (SerieError) throw SerieError;
      

    Alert.alert('Succès', 'Série ajoutée avec succès');
      } catch (error) {
        Alert.alert('Erreur', error.message);
      } finally {
        setLoading(false);
        getRootines();
      }
    }




    return (
      <RootineContext.Provider
        value={{
          rootine,
          addRootine,
          setRootine,
          rootines,
          exercices,
          addExerciceToRootine,
          deleteRootine,
          deleteExercice,
          fetchExercicesByRootine,
          fetchExercicesDeBase,
          exercicesDeBase,
          loading,
          serie,
          setSerie,
          addSerie,
        }}
      >
        {children}
      </RootineContext.Provider>
    );
  }

  export default RootineContext;
