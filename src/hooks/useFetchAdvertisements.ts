import { useState, useEffect } from 'react';
import { supabase } from '../supabaseConfig';

type Advertisement = {
  id: number;
  name: string;
  imageSrc?: string | null;
  link?: string | null;
};

const useFetchAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('advertisements')
        .select('*');

      console.log(data);
      if (error) {
        setError(error.message);
      } else {
        setAdvertisements(data || []);
      }
      setLoading(false);
    };

    fetchAdvertisements();
  }, []);

  return { 
    advertisements, 
    loading, 
    error 
  };
};

export default useFetchAdvertisements;