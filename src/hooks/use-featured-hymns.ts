import { useState, useEffect } from 'react';
import { File } from 'expo-file-system/next';
import { Asset } from 'expo-asset';
import {
  initHymnsDatabase,
  getAllHymns,
  isHymnsDataLoaded,
  importHymnsFromSQL,
  type Hymn,
} from '../services/hymns-database';

export interface UseFeaturedHymnsReturn {
  hymns: Hymn[];
  loading: boolean;
  error: string | null;
}

export function useFeaturedHymns(limit: number = 6): UseFeaturedHymnsReturn {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHymns = async () => {
      try {
        setLoading(true);
        setError(null);

        await initHymnsDatabase();

        const dataLoaded = await isHymnsDataLoaded();

        if (!dataLoaded) {
          const asset = Asset.fromModule(require('../../assets/data/cantiques_eesim_complet.sql'));
          await asset.downloadAsync();

          if (asset.localUri) {
            const file = new File(asset.localUri);
            const sqlContent = await file.text();
            await importHymnsFromSQL(sqlContent);
          }
        }

        const featuredHymns = await getAllHymns(limit);
        setHymns(featuredHymns);
      } catch (err) {
        console.error('Error loading featured hymns:', err);
        setError('Erreur lors du chargement des cantiques');
      } finally {
        setLoading(false);
      }
    };

    loadHymns();
  }, [limit]);

  return { hymns, loading, error };
}
