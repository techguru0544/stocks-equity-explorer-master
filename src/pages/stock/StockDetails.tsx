import { FC } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetStockDetailsQuery,
  useGetStockOverviewQuery
} from '@/services/stocks.service';
import { Alert, Loader, Progress } from '@mantine/core';
import { extractInitailObjectKey } from '@/utils/customFunctions';
import { IconInfoCircle } from '@tabler/icons-react';

const StockDetails: FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetStockDetailsQuery(
    {
      symbol: id?.toUpperCase()
    },
    {
      skip: !id
    }
  );

  const { data: stock_overview_data, isLoading: overview_loading } =
    useGetStockOverviewQuery(
      {
        symbol: id?.toUpperCase()
      },
      {
        skip: !id
      }
    );

  if (
    isError ||
    data?.['Information'] ||
    stock_overview_data?.['Information']
  ) {
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
          {data?.Information || stock_overview_data?.['Information']}
        </Alert>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-10 flex justify-center items-center h-full">
      {!(isLoading || overview_loading) ? (
        <div className="bg-white w-full rounded-2xl p-8">
          <div className="w-full pb-5">
            <div className="flex flex-wrap justify-between w-full gap-3 pb-2">
              <h3 className="font-bold  sm:text-2xl lg:text-4xl text-black flex items-center gap-5">
                {stock_overview_data?.Name} ({id?.toUpperCase()})
              </h3>
              <p className="text-2xl font-bold flex flex-col text-black">
                {' '}
                {extractInitailObjectKey(
                  data?.['Time Series (Daily)'],
                  '4. close'
                )}{' '}
                ({stock_overview_data?.['Currency']})
                <span className="text-sm text-end text-gray-400 font-semibold">
                  {data?.['Meta Data']?.['3. Last Refreshed']}
                </span>
              </p>
            </div>
            <p className="text-red-400 text-sm font-semibold">
              {stock_overview_data?.['AssetType']} -{' '}
              {stock_overview_data?.['Exchange']}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 items-start pt-5">
            <div className="w-full lg:w-3/5">
              <div className="border border-solid border-gray-300 py-5 px-8 rounded-lg ">
                <h2 className="text-2xl font-bold pb-2">Performance</h2>
                <div className="space-y-8 py-5">
                  <div className="relative pt-10">
                    <p className=" font-semibold absolute left-0 top-0 flex flex-col">
                      <span className="text-gray-500 font-bold text-xs">
                        Today's Low
                      </span>
                      $
                      {extractInitailObjectKey(
                        data?.['Time Series (Daily)'],
                        '3. low'
                      )}
                    </p>
                    <p className=" font-semibold absolute right-0 top-0 flex flex-col text-end">
                      <span className="text-gray-500 font-bold text-xs">
                        Today's High
                      </span>
                      $
                      {extractInitailObjectKey(
                        data?.['Time Series (Daily)'],
                        '2. high'
                      )}
                    </p>
                    <Progress value={80} />
                  </div>
                  <div className="relative pt-10">
                    <p className=" font-semibold absolute left-0 top-0 flex flex-col">
                      <span className="text-gray-500 font-bold text-xs">
                        52 week Low
                      </span>
                      ${stock_overview_data?.['52WeekLow']}
                    </p>
                    <p className=" font-semibold absolute right-0 top-0 flex flex-col text-end">
                      <span className="text-gray-500 font-bold text-xs">
                        52 week High
                      </span>
                      ${stock_overview_data?.['52WeekHigh']}
                    </p>
                    <Progress value={50} />
                  </div>
                </div>
              </div>
              <div className="border border-solid border-gray-300 py-5 px-8 rounded-lg mt-4">
                <div className="flex justify-between items-center flex-wrap gap-8 text-center py-5">
                  <p className="text-gray-400 flex flex-col font-semibold text-base">
                    Open{' '}
                    <span className="text-black text-2xl">
                      $
                      {extractInitailObjectKey(
                        data?.['Time Series (Daily)'],
                        '1. open'
                      )}
                    </span>
                  </p>
                  <p className="text-gray-400 flex flex-col font-semibold text-base">
                    Close{' '}
                    <span className="text-black text-2xl">
                      $
                      {extractInitailObjectKey(
                        data?.['Time Series (Daily)'],
                        '4. close'
                      )}
                    </span>
                  </p>
                  <p className="text-gray-400 flex flex-col font-semibold text-base">
                    Volume{' '}
                    <span className="text-black text-2xl">
                      $
                      {extractInitailObjectKey(
                        data?.['Time Series (Daily)'],
                        '5. volume'
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-solid border-gray-300 rounded-lg py-5 px-8 w-full lg:w-2/5">
              <h3 className="font-bold text-2xl pb-2 text-black">
                About Compnay
              </h3>
              <p className="text-gray-400 text-sm font-semibold text-justify">
                {stock_overview_data?.['Description']}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default StockDetails;
