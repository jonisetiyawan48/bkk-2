import { ANIM_TRANSITION } from '../../../utils/constants';
import { motion } from 'framer-motion';
import { Grid, Progress } from '@chakra-ui/react';
import NewsCard from '../../LandingPage/fragments/NewsCard';
import { useEffect, useState } from 'react';
import { fetchNews } from '../api/apihandler';
import { isoToString } from '../../../utils/helpers/isoDateFormatter';

export default function NewsSection() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  const loadNews = async () => {
    await fetchNews()
      .then((data) => setNews(data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    loadNews();
  }, []);

  if (loading) {
    return <Progress size="xs" isIndeterminate colorScheme="red" />;
  } else {
    return (
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          ...ANIM_TRANSITION,
        }}
        style={{ width: '100%' }}
        exit={{ y: 300, opacity: 0, ...ANIM_TRANSITION }}
      >
        <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={3}>
          {news.map(
            (
              item: { newsTitle: string; createdAt: string; newsImageUrl: string, description:string },
              index
            ) => (
              <NewsCard
                key={index}
                title={item.newsTitle}
                date={isoToString(item.createdAt)}
                imageUrl={item.newsImageUrl}
                description={item.description}
              />
            )
          )}
        </Grid>
      </motion.div>
    );
  }
}
