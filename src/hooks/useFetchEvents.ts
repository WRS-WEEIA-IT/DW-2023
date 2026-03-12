import { useState, useEffect } from 'react';
import { supabase } from '../supabaseConfig';
import CardInterface from '../components/Card/CardInterface';

const useFetchEvents = () => {
  const [events, setEvents] = useState<CardInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('timeStart', { ascending: true });

      console.log(data);
      if (error) {
        setError(error.message);
      } else {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

export default useFetchEvents;
