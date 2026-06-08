import { useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";

const RootineContext = createContext({
  rootine: {},
  addRootine: () => { },
  setRootine: () => { },
  rootines: [],
});

export function RootineProvider({ children }) {

  const router = useRouter();
  const [rootines, setRootines] = useState([]);
  const [rootine, setRootine] = useState({
    nom: "", duree: "", jour: ""
  });
  const [exercice, setExercice] = useState([
    { name: '', image: '' },
  ]);

    const addExercice = () => {
    setExercice([exercice]);
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

        console.log('Succès', 'Recette créée avec succès');
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

























// try {
//       // Get current user
//       const { data: { user } } = await supabase.auth.getUser();

//       // Insert recipe
//       const { data: recipe, error: recipeError } = await supabase
//         .from('recipes')
//         .insert([
//           {
//             title: title.trim(),
//             description: description.trim() || null,
//             user_id: user.id,
//           },
//         ])
//         .select()
//         .single();

//       if (recipeError) throw recipeError;

//       // Insert ingredients
//       const ingredientsToInsert = validIngredients.map(ing => ({
//         recipe_id: recipe.id,
//         name: ing.name.trim(),
//         quantity: ing.quantity.trim() || null,
//         unit: ing.unit.trim() || null,
//       }));

//       const { error: ingredientsError } = await supabase
//         .from('ingredients')
//         .insert(ingredientsToInsert);

//       if (ingredientsError) throw ingredientsError;

//       Alert.alert('Succès', 'Recette créée avec succès');
//       router.back();
//     } catch (error) {
//       Alert.alert('Erreur', error.message);
//     } finally {
//       setLoading(false);
//     }































    return (
      <RootineContext.Provider
        value={{
          rootine,
          addRootine,
          setRootine,
          rootines,
        }}
      >
        {children}
      </RootineContext.Provider>
    );
  }

  export default RootineContext;