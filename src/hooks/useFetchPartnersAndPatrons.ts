import { useState, useEffect } from 'react';
import { supabase } from '../supabaseConfig';

type Partner = {
  imageSrc: string;
  name: string;
  package: string;
  url: string;
};

type Patron = {
  name: string;
  url: string;
  imageSrc: string;
  category: 'honorary' | 'media';
};

const useFetchPartnersAndPatrons = () => {
  const [silverPartners, setSilverPartners] = useState<Partner[]>([]);
  const [goldPartners, setGoldPartners] = useState<Partner[]>([]);
  const [diamondPartners, setDiamondPartners] = useState<Partner[]>([]);
  const [strategicPartners, setStrategicPartners] = useState<Partner[]>([]);
  const [patrons, setPatrons] = useState<Patron[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .order('name', { ascending: true });

        if (error) {
          throw error;
        }

        const diamondPartners = data.filter((partner: Partner) => partner.package === 'diamond');
        const goldPartners = data.filter((partner: Partner) => partner.package === 'gold');
        const silverPartners = data.filter((partner: Partner) => partner.package === 'silver');
        console.log(data);
        console.log(silverPartners);
        const strategicPartners = data.filter(
          (partner: Partner) => partner.package === 'strategic'
        );

        setDiamondPartners(diamondPartners);
        setGoldPartners(goldPartners);
        setSilverPartners(silverPartners);
        setStrategicPartners(strategicPartners);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const fetchPatrons = async () => {
      try {
        const { data, error } = await supabase
          .from('patrons')
          .select('*')
          .order('name', { ascending: true });

        if (error) {
          throw error;
        }

        setPatrons(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchPartners(), fetchPatrons()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    silverPartners,
    goldPartners,
    diamondPartners,
    strategicPartners,
    patrons,
    loading,
    error,
  };
};

export default useFetchPartnersAndPatrons;
