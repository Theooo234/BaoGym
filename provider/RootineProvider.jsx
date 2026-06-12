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
  updateExercice: () => { },
  setLoading: () => { },
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
      id: Date.now().toString(),
      nom: exerciceDeBase.nom, 
      image: exerciceDeBase.image, 
      description: exerciceDeBase.description,
      poids : 0, 
      nbr_rep : 0, 
      nbr_serie : 0
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


      for (const ex of exercices) {
        const exerviceToInsert = {
          nom: ex.nom,
          image: ex.image,
          description: ex.description,
        };

        const { data: insertedExercice, error: exerciceError } = await supabase
          .from('exercices')
          .insert(exerviceToInsert)
          .select()
          .single()

        if (exerciceError) throw exerciceError;

        // creer la relation entre la routine et l'exercice
        const { error: relationError } = await supabase
          .from('routine_exercices')
          .insert({
            routine_id: rootineId,
            exercice_id: insertedExercice.id,
          })
          .select()

        if (relationError) throw relationError;

        // creer les séries pour chaque exercice
        await addSerie(insertedExercice.id, ex.poids, ex.nbr_rep, ex.nbr_serie);
      }


      // const exercicesToInsert = exercices.map(ex => ({
      //   nom: ex.nom,
      //   image: ex.image,
      //   description: ex.description,
      // }));

      // // for each exercice, insert it and get its id, then insert the relation with the routine and insert the series
      // for (const ex of exercicesToInsert) {
      //   const { data: insertedExercice, error: exerciceError } = await supabase
      //     .from('exercices')
      //     .insert(ex)
      //     .select()
      //     .single()

      //   if (exerciceError) throw exerciceError;

      //   // creer la relation entre la routine et l'exercice
      //   const { error: relationError } = await supabase
      //     .from('routine_exercices')
      //     .insert({
      //       routine_id: rootineId,
      //       exercice_id: insertedExercice.id,
      //     })
      //     .select()

      //   if (relationError) throw relationError;

      //   // creer les séries pour chaque exercice
      //   await addSerie(insertedExercice.id);
      // }

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

  const addSerie = async (exerciceId, poids, nbr_rep, nbr_serie)  => {
    setLoading(true);

    try {
  
      for (let i = 0; i < nbr_serie; i++) {
        const { data: insertedSerie, error: SerieError } = await supabase
          .from('series')
          .insert({
            exercice_id: exerciceId,
            poids: poids || 0,
            nbr_rep: nbr_rep || 0,
          })
          .select()
          .single()

        if (SerieError) throw SerieError;
      }
      } catch (error) {
        Alert.alert('Erreur', error.message);
      } finally {
        setLoading(false);
        getRootines();
      }
    }



      const updateExercice = (id , updates) => {
        const index = exercices.findIndex(ex => ex.id === id);
        if (index !== -1) {
          const updatedExercices = {...exercices[index], ...updates};
          const newExercices = [...exercices];
          newExercices[index] = updatedExercices;
          setExercices(newExercices);
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
          updateExercice,
          setLoading
        }}
      >
        {children}
      </RootineContext.Provider>
    );
  }

  export default RootineContext;
