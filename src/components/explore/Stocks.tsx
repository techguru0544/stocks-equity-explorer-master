import { useRef } from 'react';
import { useGetTopStocksQuery } from '@/services/stocks.service';
import { Stock } from '../../types/stock';
import Card from '../card/Card';
import SearchBar from '../search-bar/SearchBar';
import { Alert, Loader } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { IconInfoCircle } from '@tabler/icons-react';

const Stocks = () => {
  const { data, isLoading, isError } = useGetTopStocksQuery({
    function: 'TOP_GAINERS_LOSERS'
  });

  const gainerAutoplay = useRef(Autoplay({ delay: 2000 }));
  const losersAutoplay = useRef(Autoplay({ delay: 2000 }));

  if (isError || data?.['Information']) {
    const icon = <IconInfoCircle />;
    return (
      <section className="container mx-auto py-10 flex justify-center items-center h-full">
        <Alert
          p={26}
          variant="light"
          color="red"
          title="Alert title"
          icon={icon}
        >
          {data?.['Information']}
        </Alert>
      </section>
    );
  }

  return (
    <section className="section-defaults gap-16">
      <SearchBar />
      {!(isLoading || isError) ? (
        <div className="container mx-auto">
          <h2 className="my-4">Top Gainers</h2>
          <Carousel
            height={250}
            controlSize={18}
            slideSize={{ base: '100%', sm: '50%', md: '25%' }}
            slideGap={{ base: 0, sm: 'md' }}
            align="start"
            slidesToScroll={1}
            plugins={[gainerAutoplay.current]}
            onMouseEnter={gainerAutoplay.current.stop}
            onMouseLeave={gainerAutoplay.current.reset}
          >
            {data?.top_gainers?.map((stock: Stock, stock_index: number) => (
              <Carousel.Slide key={stock_index}>
                <Card stockData={stock} isGainers={true} />
              </Carousel.Slide>
            ))}
          </Carousel>
          <div className="pt-5">
            <h2 className="my-4">Top Losers</h2>
            <Carousel
              height={250}
              controlSize={18}
              slideSize={{ base: '100%', sm: '50%', md: '25%' }}
              slideGap={{ base: 0, sm: 'md' }}
              align="start"
              slidesToScroll={1}
              plugins={[losersAutoplay.current]}
              onMouseEnter={losersAutoplay.current.stop}
              onMouseLeave={losersAutoplay.current.reset}
            >
              {data?.top_losers?.map((stock: Stock, stock_index: number) => (
                <Carousel.Slide key={stock_index}>
                  <Card stockData={stock} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </div>
      ) : (
        <Loader className="m-auto" />
      )}
    </section>
  );
};

export default Stocks;
