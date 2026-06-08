import { useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const RootineContext = createContext({
  rootine: {},
  addRootine: () => { },
  setRootine: () => { },
});

export function RootineProvider({ children }) {

  const router = useRouter();
  const [rootine, setRootine] = useState({
    nom: "", duree: "", jour: ""
  });

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
        //await getRootines();
      };
      fetchData();
    }, []);

    return (
      <RootineContext.Provider
        value={{
          rootine,
          addRootine,
          setRootine
        }}
      >
        {children}
      </RootineContext.Provider>
    );
  }

  export default RootineContext;