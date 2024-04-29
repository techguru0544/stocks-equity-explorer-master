import { Stock } from '@/types/stock';
import {
  Avatar,
  Text,
  Paper,
  Box,
  useComputedColorScheme
} from '@mantine/core';
import { IconCaretUpFilled } from '@tabler/icons-react';
import { IconCaretDownFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface CardPropsT {
  stockData: Stock;
  isGainers?: boolean;
}

const Card = ({ stockData, isGainers }: CardPropsT) => {
  const navigate = useNavigate();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true
  });

  return (
    <Paper
      radius="md"
      withBorder
      p="md"
      bg="var(--mantine-color-body)"
      className={`cursor-pointer ${computedColorScheme === 'dark' ? 'border-theme' : 'border-none'}`}
      onClick={() => navigate(`stock/${stockData?.ticker}`)}
    >
      <Avatar
        className="w-24 h-24 object-cover shadow-xl"
        src="https://i.pinimg.com/564x/dd/31/84/dd3184f55d2908ef8c35b85d00553bcb.jpg"
        size={60}
        mx="auto"
      />
      <Box pt="md" className="space-y-2">
        <Text ta="center" c="dimmed" fz="xl">
          {stockData.ticker}
        </Text>
        <Text ta="center" fz="md" fw={600}>
          ${stockData.change_amount}
        </Text>
        <Text
          className={`flex justify-center items-center ${isGainers ? 'text-green-600' : 'text-red-600'}`}
          ta="center"
          fz="md"
        >
          {isGainers ? <IconCaretUpFilled /> : <IconCaretDownFilled />}
          {stockData.change_amount} ({stockData.change_percentage})
        </Text>
      </Box>
    </Paper>
  );
};

export default Card;
